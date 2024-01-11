import { firestore } from "firebase-admin";
import { StreamingTextResponse, LangChainStream } from "ai";

import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import { CallbackManager } from "@langchain/core/callbacks/manager";



import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { adminDB } from "@/firebase-admin";
import { nextAuthOptions } from "@/auth";

import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";

import { Message } from "@/lib/converters/Message";
import { Companion } from "@/lib/converters/Companion";

export async function POST(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session?.user || !session?.user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const identifier = req.url + "-" + session.user.id;
    const { success: RateLimitSuccess } = await rateLimit(identifier);

    if (!RateLimitSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Rate limit exceeded",
        },
        { status: 429 }
      );
    }

    const { prompt } = await req.json();
    const { companionId } = params;

    if (!prompt || !companionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Required body params are missing",
        },
        { status: 400 }
      );
    }

    const message: Message = {
      content: prompt,
      role: "user",
      createdAt: firestore.Timestamp.now() as unknown as Date,
      updatedAt: firestore.Timestamp.now() as unknown as Date,
    };

    const companionCollectionRef = adminDB
      .collection("users")
      .doc(session.user.id)
      .collection("companion")
      .doc(companionId);

    const companionDoc = await companionCollectionRef.get();
    const companion: Companion | undefined = companionDoc.data() as Companion;

    if (!companion) {
      return NextResponse.json(
        {
          success: false,
          message: "Companion not found",
        },
        { status: 400 }
      );
    }

    const messageRef = adminDB
      .collection("users")
      .doc(session?.user.id!)
      .collection("companion")
      .doc(companionId)
      .collection("message");

    await messageRef.add(message);

    const companion_file_name = companionId + ".txt";

    const companionKey = {
      companionName: companionId!,
      userId: session.user.id,
      modelName: "llama2-13b",
    };

    const memoryManager = await MemoryManager.getInstance();
    const records = await memoryManager.readLatestHistory(companionKey);

    if (records.length === 0) {
      await memoryManager.seedChatHistory(companion.seed, "\n\n", companionKey);
    }
    await memoryManager.writeToHistory("User: " + prompt + "\n", companionKey);

    const recentChatHistory = await memoryManager.readLatestHistory(
      companionKey
    );

    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      companion_file_name
    );

    let relevantHistory = "";
    if (!!similarDocs && similarDocs.length !== 0) {
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");
    }
    const { handlers } = LangChainStream();

    const model = new OpenAI(
      {
          modelName: "gpt-3.5-turbo-16k",
          openAIApiKey: process.env.OPENAI_API_KEY,
          callbackManager: CallbackManager.fromHandlers(handlers),
      }
  )

  model.verbose = true;
  const chainPrompt = PromptTemplate.fromTemplate(
      `
      ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix. 
      
      You are ${companion.name} and are currently talking to ${session.user.name}.
      
      ${companion.instructions}
      
      Below are relevant details about ${companion.name}'s past and the conversation you are in.
      ${relevantHistory}
      
      Below is a relevant conversation history
      ${recentChatHistory}\n${companion.name}
      `
  )

  const chain = new LLMChain({
      llm: model,
      prompt: chainPrompt
  })

  const resp = await chain
      .call({
          relevantHistory,
          recentChatHistory: recentChatHistory,
      })
      .catch(
          console.error
      )

    const text = resp?.text;

    const cleaned = text.replaceAll(",", "");
    const chunks = cleaned.split("\n");
    const response = chunks[0];

    await memoryManager.writeToHistory("" + response.trim(), companionKey);
    var Readable = require("stream").Readable;

    let s = new Readable();
    s.push(response);
    s.push(null);
    if (response !== undefined && response.length > 1) {
      memoryManager.writeToHistory("" + response.trim(), companionKey);

      const botMessage: Message = {
        content: response.trim(),
        role: "system",
        createdAt: firestore.Timestamp.now() as unknown as Date,
        updatedAt: firestore.Timestamp.now() as unknown as Date,
      };
      await messageRef.add(botMessage);
    }

    return new StreamingTextResponse(s);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

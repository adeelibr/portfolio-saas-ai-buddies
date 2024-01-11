"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCompletion } from "ai/react";

import { Message } from "@/lib/converters/Message";
import { Companion } from "@/lib/converters/Companion";

import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";
import LoadingSpinner from "@/components/LoadingSpinner";

interface ChatClientProps {
  companion: Companion | undefined;
  messages: Message[];
}

function ChatClient({ companion, messages: propMessages }: ChatClientProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(propMessages || []);

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion?.id}`,
      onFinish: (prompt, completion) => {
        const systemMessage: Message = {
          content: completion,
          role: "system",
          createdAt: Date.now() as unknown as Date,
          updatedAt: Date.now() as unknown as Date,
        };
        setMessages((currentMessages) => [...currentMessages, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: Message = {
      content: input,
      role: "user",
      createdAt: Date.now() as unknown as Date,
      updatedAt: Date.now() as unknown as Date,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);

    handleSubmit(e);
  };

  if (!companion) return <LoadingSpinner />;

  return (
    <div
      className="flex flex-col flex-1 justify-between"
      style={{ height: "calc(100vh - 70px)" }}
    >
      <ChatHeader companion={companion} />
      <ChatMessages messages={messages} companion={companion} />
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default ChatClient;

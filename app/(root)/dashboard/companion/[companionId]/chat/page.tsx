import { nextAuthOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { getDoc, getDocs } from "firebase/firestore";
import { getCompanionDocumentReferenceById } from "@/lib/converters/Companion";

import { messageRef } from "@/lib/converters/Message";
import ChatClient from "@/components/ChatClient";

interface ChatPageProps {
  params: {
    companionId: string;
  };
}

async function ChatPage({ params }: ChatPageProps) {
  const { companionId } = params;

  const session = await getServerSession(nextAuthOptions);

  const companion = await getDoc(
    getCompanionDocumentReferenceById(session?.user.id!, companionId)
  ).then((doc) => doc.data());

  const messages = await getDocs(
    messageRef(session?.user.id!, companionId)
  ).then((docs) => docs.docs.map((doc) => doc.data()));

  return <ChatClient companion={companion} messages={messages} />;
}

export default ChatPage;

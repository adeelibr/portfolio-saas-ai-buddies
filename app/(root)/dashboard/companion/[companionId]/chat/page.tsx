import Link from "next/link";
import { nextAuthOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { getDoc } from "firebase/firestore";
import { getCompanionDocumentReferenceById } from "@/lib/converters/Companion";

import { ChevronLeft, Edit, MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import BotAvatar from "@/components/BotAvatar";
import ChatHeader from "@/components/ChatHeader";

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

  if (!session?.user) return null;

  return (
    <div>
      <ChatHeader companion={companion} />
    </div>
  );
}

export default ChatPage;

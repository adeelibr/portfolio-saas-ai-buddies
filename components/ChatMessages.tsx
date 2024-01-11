import React, { ElementRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/converters/Message";
import { Companion } from "@/lib/converters/Companion";
import BotAvatar from "@/components/BotAvatar";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "next-auth/react";

interface ChatMessagesProps {
  messages: Message[];
  companion: Companion;
}

function ChatMessages({ messages, companion }: ChatMessagesProps) {
  const { data: session } = useSession();

  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);


  return (
    <section className="flex flex-col flex-1 px-5">
      {messages?.map((message) => (
        <article
          key={message.content}
          className={cn(
            "group flex items-start gap-x-3 py-4 w-full",
            message.role === "user" && "justify-end"
          )}
        >
          {message.role !== "user" && (
            <BotAvatar src={companion.src} name="Bot" />
          )}
          <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
            {message.content}
          </div>
          {message.role === "user" && (
            <UserAvatar
              name={session?.user.name!}
              image={session?.user.image!}
            />
          )}
        </article>
      ))}
      <div ref={scrollRef} />
    </section>
  );
}

export default ChatMessages;

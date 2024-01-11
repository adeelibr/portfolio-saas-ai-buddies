"use client";
import Link from "next/link";
import axios from "axios";
import { ChevronLeft, Edit, MoreVertical, Trash } from "lucide-react";

import { Companion } from "@/lib/converters/Companion";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BotAvatar from "@/components/BotAvatar";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

function ChatHeader({ companion }: { companion: Companion | undefined }) {
  const { toast } = useToast();
  const router = useRouter();

  const onDelete = async () => {
    try {
      axios.delete(`/api/companion/${companion?.id}`);
      toast({
        title: "Deleted",
        description: "Deleted buddy & all of it's messages",
        className: "bg-green-600 text-white",
      });
      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      toast({
        description: "Something went wrong deleting buddy",
        variant: "destructive",
      });
    }
  };

  if (!companion) return null;

  return (
    <section className="flex w-full items-center border-b border-primary/10 py-4 px-4">
      <div className="flex gap-x-2 items-center flex-1">
        <Button size="icon" variant="ghost">
          <Link href="/dashboard" prefetch={false}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex items-center justify-between flex-1">
          {/* RIGHT SECTION */}
          <section className="flex items-center gap-x-3">
            <BotAvatar src={companion?.src!} name={companion?.name!} />
            <div className="flex flex-col">
              <h2 className="text-lg">{companion?.name}</h2>
              <p className="text-xs text-muted-foreground">
                {companion?.description}
              </p>
            </div>
          </section>
          {/* LEFT SECTION */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/dashboard/companion/${companion?.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Edit className="w-4 h-4 mr-4" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={onDelete}>
                <Trash className="w-4 h-4 mr-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  );
}

export default ChatHeader;

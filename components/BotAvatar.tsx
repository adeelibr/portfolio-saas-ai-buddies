import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function BotAvatar({ src, name }: { src: string; name: string }) {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={src} className="h-10 w-10" />
      <AvatarFallback>
        {name
          .split(" ")
          .map((n) => n?.[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}

export default BotAvatar;

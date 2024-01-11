"use client";
import { Companion } from "@/lib/converters/Companion";
import Link from "next/link";
import Image from "next/image";

import { Edit2Icon, MessagesSquareIcon } from "lucide-react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function CompanionsList({ companions }: { companions: Companion[] }) {
  console.log(companions);
  if (companions?.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60 opacity-40">
          <Image fill className="grayscale" alt="Empty" src="/empty.png" />
        </div>
        <p className="text-sm text-muted-foreground text-center tracking-tighter">
          No companion found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
      {companions.map((companion) => (
        <Card
          key={companion.id}
          className="flex flex-col flex-1 justify-between bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
        >
          <Link href={`/dashboard/companion/${companion.id}/chat`}>
            <CardHeader className="flex justify-center items-center text-center text-muted-foreground">
              <div className="relative w-32 h-32">
                <Image
                  fill
                  className="rounded-xl object-cover"
                  alt="Companion image"
                  src={companion.src}
                />
              </div>
              <p className="font-bold">{companion.name}</p>
              <p className="text-xs">{companion.description}</p>
            </CardHeader>
            <CardFooter className="flex  justify-center items-center gap-x-2 ">
              <p className="lowercase text-xs text-muted-foreground">
                @{companion.name.replace(" ", "_")}
              </p>
            </CardFooter>
          </Link>
          <section>
            <Button asChild className="w-full rounded-none" variant="outline">
              <Link href={`/dashboard/companion/${companion.id}`}>
                <Edit2Icon className="h-4 m-4" />
                <span className="text-sm text-muted-foreground">Edit</span>
              </Link>
            </Button>
            <Button asChild className="w-full rounded-none" variant="outline">
              <Link href={`/dashboard/companion/${companion.id}/chat`}>
                <MessagesSquareIcon className="h-4 m-4" />
                <span className="text-sm text-muted-foreground">Chat</span>
              </Link>
            </Button>
          </section>
        </Card>
      ))}
    </div>
  );
}

export default CompanionsList;

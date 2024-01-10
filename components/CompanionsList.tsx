import { Companion } from "@/lib/converters/Companion";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

function CompanionsList({ companions }: { companions: Companion[] }) {
  if (!companions || companions.length === 0) {
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
          className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
        >
          <Link href={`/dashboard/companion/${companion.id}`}>
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
            <CardFooter className="flex justify-center items-center text-xs text-muted-foreground">
              <p className="lowercase">@{companion.name.replace(" ", "_")}</p>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
}

export default CompanionsList;

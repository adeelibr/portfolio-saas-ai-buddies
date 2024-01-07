import { UserButton } from "@clerk/nextjs";
import { Menu, Sparkle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import MobileSidebar from "@/components/MobileSidebar";

function Navbar() {
  return (
    <nav className="w-full z-50 flex items-center justify-between py-2 px-4 border-b  border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/" prefetch={false}>
          <h1 className="hidden md:block text-xl md:text-3xl font-bold text-primary">ai.buddies </h1>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-x-3">
        <Button size="sm" variant="premium">
          Upgrade
          <Sparkle className="h-4 w-4 ml-2"/>
        </Button>
        <DarkModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}

export default Navbar;

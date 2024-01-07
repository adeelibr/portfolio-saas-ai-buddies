import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Sidebar from "@/components/Sidebar";

function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="bg-secondary w-32 p-0 pt-10">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;

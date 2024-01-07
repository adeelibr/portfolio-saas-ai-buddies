'use client';
import { usePathname, useRouter } from "next/navigation";
import { Home, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const routes = [
  {
    icon: Home,
    href: "/",
    label: "Home",
    pro: false,
  },
  {
    icon: Plus,
    href: "/companion/new",
    label: "Create",
    pro: false,
  },
  {
    icon: Settings,
    href: "/settings",
    label: "Settings",
    pro: false,
  },
];

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-full text-primary bg-secondary space-y-4">
      <div className="flex p-3 justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-muted-foreground text-xs group flex justify-center w-full p-3 font-medium hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex flex-col items-center justify-center gap-y-2 ">

              <route.icon className="h-4 w-4" />
              {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

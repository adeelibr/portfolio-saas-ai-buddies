import React, { PropsWithChildren } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full">
      <Navbar />
      <div className="hidden md:flex flex-col mt-16 w-20 fixed inset-y-0 bg-red">
        <Sidebar />
      </div>
      <main className="md:pl-20 h-full">{children}</main>
    </div>
  );
}

export default RootLayout;

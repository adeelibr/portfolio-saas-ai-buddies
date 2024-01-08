import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function HomePage() {
  return (
    <div>
      HomePage
      <Button asChild>
        <Link href="/register">Login</Link>
      </Button>
    </div>
  );
}

export default HomePage;

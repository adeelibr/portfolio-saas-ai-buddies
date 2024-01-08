import React, { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <section className="h-full w-full">
      {children}
    </section>
  );
}

export default AuthLayout;

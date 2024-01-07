import React, { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <section className="flex items-center justify-center h-full mt-20">
      {children}
    </section>
  );
}

export default AuthLayout;

import type { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";
import { ThemeProvider } from "@/components/ThemeProvider";
import FirebaseAuthProvider from "@/components/FirebaseAuthProvider";
import { Toaster } from "@/components/ui/toaster";

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ai.buddies",
  description: "Your artificial buddy to talk to",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("bg-secondary", inter.className)}>
          <FirebaseAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </FirebaseAuthProvider>
          <Toaster />
        </body>
      </html>
    </ClientProviders>
  );
}

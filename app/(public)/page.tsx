/* eslint-disable @next/next/no-img-element */
("");
import { nextAuthOptions } from "@/auth";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function HomePage() {
  const session = await getServerSession(nextAuthOptions);

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-slate-300 dark:bg-blue-500">
      <header className="bg-white dark:bg-blue-600 text-muted-foreground">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link
            className="block text-muted-foreground dark:text-muted "
            href="/"
          >
            <span className="sr-only">Home</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 dark:invert"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 dark:text-muted transition hover:text-gray-500/75"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                {session?.user?.image ? (
                  <li>
                    <Link
                      className="text-gray-500 dark:text-muted transition hover:text-gray-500/75"
                      href="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      className="text-gray-500 dark:text-muted transition hover:text-gray-500/75"
                      href="/dashboard"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gray-300 dark:bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Have an AI buddy
              <span className="sm:block"> by your side. </span>
            </h1>

            <p className="mx-auto text-muted-foreground dark:text-white mt-4 max-w-xl sm:text-xl/relaxed">
              Experience the Future of Friendship - Chat, Learn, and Explore
              with the Digital Echo of Celebrities, Heroes, and More!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/dashboard"
              >
                Get Started
              </Link>

              <Link
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/dashboard"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-blue-600/60 p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl text-center">
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  Personalized Companions
                </h2>

                <p className="hidden text-white/90 sm:mt-4 sm:block">
                  Our platform lets you create an AI buddy that embodies the
                  essence of your most admired celebrities, historical figures,
                  or fictional characters. Imagine having meaningful
                  conversations, gaining insights, or simply sharing a joke with
                  an AI that mirrors the personality traits, wisdom, and quirks
                  of your chosen personality. Whether youre a fan of a
                  charismatic movie star, a visionary leader, or a beloved
                  fictional hero, your AI Star is here to offer an interactive,
                  personalized, and innovative way to engage with the figures
                  youve always admired.
                </p>

                <div className="mt-4 md:mt-8">
                  <Link
                    href="/dashboard"
                    className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                  >
                    Get Started Today
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
              <img
                alt="Student"
                src="/home-image-1.avif"
                className="h-40 w-full object-cover sm:h-56 md:h-full opacity-40"
              />

              <img
                alt="Student"
                src="/home-image-2.avif"
                className="h-40 w-full object-cover sm:h-56 md:h-full opacity-40"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

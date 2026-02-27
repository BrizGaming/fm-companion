import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FM Companion",
  description: "Generate Football Manager challenges: random or preset.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <header className="flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              FM Companion
            </Link>

            <nav className="flex items-center gap-4 text-sm text-zinc-300">
              <Link className="hover:text-white" href="/generate">
                Random Generator
              </Link>
              <Link className="hover:text-white" href="/presets">
                Preset Challenges
              </Link>
              <Link className="hover:text-white" href="/about">
                About
              </Link>
            </nav>
          </header>

          <div className="mt-10">{children}</div>

          <footer className="mt-12 text-xs text-zinc-500">
            Built by TheBrizGaming • Not affiliated with Sports Interactive or SEGA.
          </footer>
        </div>
      </body>
    </html>
  );
}
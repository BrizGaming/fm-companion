import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            FM Companion
          </Link>
          <Link className="text-sm text-zinc-300 hover:text-white" href="/generate">
            Generate
          </Link>
        </header>

        <h1 className="mt-10 text-3xl font-bold">About</h1>
        <p className="mt-4 text-zinc-300">
          FM Companion helps you generate quick, structured save ideas: a club pick plus rules,
          objectives, and a wildcard. Built for creators and players who want a fresh challenge
          without spending hours deciding what to do next.
        </p>

        <p className="mt-6 text-sm text-zinc-500">
          Not affiliated with Sports Interactive or SEGA.
        </p>
      </div>
    </main>
  );
}
import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { PocketCube } from "@/components/secret/pocket-cube";
import { MathVault, PromptLab, Terminal } from "@/components/secret/eggs";

export const Route = createFileRoute("/secret-base")({
  head: () => ({
    meta: [
      { title: "Secret Base · Syed Muntasir (Mint)" },
      { name: "description", content: "A hidden layer of Mint's portfolio with a terminal, cube challenge, math vault, and prompt lab." },
      { property: "og:title", content: "Secret Base · Syed Muntasir (Mint)" },
      { property: "og:description", content: "You found the hidden layer of Mint's portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SecretBase,
});

const RECORDS = [
  ["3×3", "8.87s"],
  ["2×2", "1.09s"],
  ["4×4", "1:03"],
  ["Megaminx", "1:47"],
  ["Pyraminx", "4.53s"],
  ["3×3 One-Handed", "20.94s"],
  ["3×3 Blindfolded", "2:12.94"],
  ["2×2 Blindfolded", "21.66s"],
];

const VAULT = [
  "95% in Grade 9 final examinations",
  "First position, Mathematics Model · School Science Exhibition",
  "Elected Magazine Editor · School Parliament Election",
  "Best Catalyst · Zeal Summer Camp 2026, Riyadh",
  "Mathematics & Science Olympiad participant",
  "School assembly and event anchoring",
];

function Room({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section id={id} className="rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-mint" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-mint">{eyebrow}</span>
        </div>
        <h2 className="mb-6 text-3xl font-medium text-foreground">{title}</h2>
        {children}
      </section>
    </Reveal>
  );
}

function SecretBase() {
  return (
    <div className="min-h-screen bg-background text-foreground grid-bg">
      <header className="border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <img src="/minteez-logo.png" alt="Minteez" className="h-8 w-auto" />
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-mint hover:text-mint">
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-mint">/ hidden layer</p>
          <h1 className="text-5xl font-medium leading-tight md:text-6xl">
            Welcome to the <span className="italic text-mint">Secret Base.</span>
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            You found it. A few small experiments for curious visitors. Explore at your own pace.
          </p>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          <Room id="terminal" eyebrow="01 · Terminal" title="A harmless terminal."><Terminal /></Room>
          <Room id="cube" eyebrow="02 · Cube Challenge" title="Solve the 2×2."><PocketCube /></Room>
          <Room id="math" eyebrow="03 · Math Vault" title="Crack the locks."><MathVault /></Room>
          <Room id="prompt" eyebrow="04 · Prompt Lab" title="Vague to advanced."><PromptLab /></Room>
          <Room id="records" eyebrow="05 · Record Room" title="Personal bests.">
            <dl className="grid grid-cols-2 gap-3">
              {RECORDS.map(([e, t]) => (
                <div key={e} className="rounded-2xl border border-border p-4">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{e}</dt>
                  <dd className="mt-1 font-serif text-2xl text-mint">{t}</dd>
                </div>
              ))}
            </dl>
          </Room>
          <Room id="vault" eyebrow="06 · Achievement Vault" title="Moments worth keeping.">
            <ul className="space-y-3">
              {VAULT.map((v) => (
                <li key={v} className="flex gap-3 border-b border-border/60 pb-3 text-sm text-muted-foreground">
                  <span className="text-mint">◆</span>{v}
                </li>
              ))}
            </ul>
          </Room>
        </div>
      </main>
    </div>
  );
}

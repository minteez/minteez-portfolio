import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, Box } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";
import { PocketCube } from "@/components/secret/pocket-cube";
import { AchievementVault, CoorgRoots, MathLab, PromptLab, Terminal } from "@/components/secret/eggs";

export const Route = createFileRoute("/secret-base")({
  head: () => ({
    meta: [
      { title: "Secret Base · Syed Muntasir (Mint)" },
      { name: "description", content: "A hidden layer of Mint's portfolio with a terminal, cube lab, math lab, and prompt lab." },
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

const NAV = [
  ["terminal", "Terminal"],
  ["cube", "Cube Lab"],
  ["math", "Math Lab"],
  ["prompt", "Prompt Lab"],
  ["records", "Record Room"],
  ["vault", "Achievement Vault"],
  ["roots", "Coorg Roots"],
];

function Room({ id, eyebrow, title, children, className = "" }: { id: string; eyebrow: string; title: string; children: ReactNode; className?: string }) {
  return (
    <Reveal className={className}>
      <section id={id} className="h-full scroll-mt-28 rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-8">
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

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SecretBase() {
  const [roots, setRoots] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const discover = (msg: string) => setToast(msg);
  const unlockRoots = () => {
    if (!roots) {
      setRoots(true);
      discover("Secret roots found. Coorg Roots unlocked.");
    }
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  // Hidden keyboard shortcut: type "kodagu" anywhere outside inputs
  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      buf = (buf + e.key.toLowerCase()).slice(-6);
      if (buf === "kodagu") unlockRoots();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="min-h-screen bg-background text-foreground grid-bg">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <Link to="/" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-mint hover:text-mint">
            <ArrowLeft className="h-4 w-4" /> Return to Portfolio
          </Link>
          <button
            type="button"
            onClick={() => { go("cube"); discover("A tiny cube. You noticed."); }}
            aria-label="Tiny cube"
            className="rounded p-1 text-muted-foreground/40 hover:rotate-45 hover:text-mint"
          >
            <Box className="h-4 w-4" />
          </button>
        </div>
        <nav aria-label="Secret Base" className="mx-auto max-w-6xl overflow-x-auto px-6 pb-3">
          <ul className="flex w-max gap-1">
            {NAV.map(([id, label]) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => go(id)}
                  className="rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:bg-mint/10 hover:text-mint"
                >
                  {label}{id === "roots" && !roots ? " ·" : ""}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
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
          <Room id="terminal" eyebrow="01 · Terminal" title="A harmless terminal."><Terminal onCoorg={unlockRoots} /></Room>
          <Room id="cube" eyebrow="02 · Cube Lab" title="Solve the 2×2."><PocketCube /></Room>
          <Room id="math" eyebrow="03 · Math Lab" title="Crack the challenge.">
            <MathLab onSolve={(n) => n >= 3 && unlockRoots()} />
          </Room>
          <Room id="prompt" eyebrow="04 · Prompt Lab" title="Vague to advanced."><PromptLab /></Room>
          <Room id="records" eyebrow="05 · Record Room" title="Personal bests.">
            <dl className="grid grid-cols-2 gap-3">
              {RECORDS.map(([e, t]) => (
                <div key={e} className="rounded-2xl border border-border p-4 transition-colors hover:border-mint/50">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{e}</dt>
                  <dd className="mt-1 font-serif text-2xl text-mint">{t}</dd>
                </div>
              ))}
            </dl>
          </Room>
          <Room id="vault" eyebrow="06 · Achievement Vault" title="Moments worth keeping."><AchievementVault /></Room>
          <Room id="roots" eyebrow="07 · Coorg Roots" title="Roots." className="lg:col-span-2"><CoorgRoots found={roots} /></Room>
        </div>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
          <button type="button" onClick={() => discover("e^(iπ) + 1 = 0. The most beautiful equation.")} className="hover:text-mint">
            e^(iπ) + 1 = ?
          </button>
          <span title="try typing the name of the land, not the city">k·o·d·a·g·u</span>
          <button type="button" onClick={() => { go("terminal"); discover("Psst… try 'coorg' in the terminal."); }} className="hover:text-mint">
            &gt;_
          </button>
        </footer>
      </main>

      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-mint/40 bg-background/90 px-5 py-2.5 font-mono text-xs text-mint backdrop-blur-xl mint-glow">
          {toast}
        </div>
      )}
    </div>
  );
}

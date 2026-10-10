import { useState } from "react";
import {
  Brain,
  Calculator,
  Cpu,
  Mic2,
  Shield,
  Sparkles,
  Terminal,
  Users,
  Box,
} from "lucide-react";
import { Reveal } from "./reveal";

const ITEMS = [
  { icon: Cpu, title: "Computer Lover", note: "Operating systems, hardware, and how machines really work." },
  { icon: Shield, title: "Cybersecurity Aspirant", note: "Learning the foundations, building toward a future in security." },
  { icon: Calculator, title: "Mathematics Enthusiast", note: "Patterns, logic, and the joy of a clean proof." },
  { icon: Terminal, title: "Prompt Engineer", note: "Turning vague ideas into clear, structured AI instructions." },
  { icon: Sparkles, title: "Vibe Coder", note: "Building websites through AI-assisted development." },
  { icon: Box, title: "Speedcuber", note: "Algorithms, finger tricks, and seconds shaved off." },
  { icon: Mic2, title: "Public Speaker", note: "Anchoring, elocution, and speaking with confidence." },
  { icon: Users, title: "Student Leader", note: "Elected Magazine Editor through the School Parliament." },
  { icon: Brain, title: "AI Enthusiast", note: "Exploring generative AI as a young AI builder." },
];

export function WhatImAbout() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="what-im-about" className="relative border-t border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-mint" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-mint">What I'm About</span>
          </div>
          <h2 className="text-4xl font-medium leading-tight text-foreground md:text-5xl">
            Many interests, one curious mind.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            A young AI builder and AI-assisted developer, still learning every day.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            const on = active === it.title;
            return (
              <Reveal key={it.title} delay={i * 0.03}>
                <button
                  type="button"
                  onClick={() => setActive(on ? null : it.title)}
                  aria-expanded={on}
                  className={`group h-full w-full rounded-2xl border bg-card/50 p-5 text-left backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-mint/50 hover:mint-glow ${
                    on ? "border-mint/60 mint-glow" : "border-border"
                  }`}
                >
                  <Icon className="mb-3 h-5 w-5 text-mint" />
                  <p className="font-serif text-lg text-foreground">{it.title}</p>
                  <p
                    className={`mt-2 text-sm text-muted-foreground transition-all ${
                      on ? "max-h-24 opacity-100" : "max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100"
                    }`}
                  >
                    {it.note}
                  </p>
                </button>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl font-serif text-lg italic text-muted-foreground">
            A personal aspiration: inspired by Raul John Aju, the "AI Kid of India", I hope to
            one day become an NRI version of the AI Kid of India, a young person from the
            Indian diaspora exploring AI, technology, and innovation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

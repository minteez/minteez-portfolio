import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/* ------------------------------- Terminal -------------------------------- */

const RESPONSES: Record<string, string[]> = {
  help: [
    "commands: help, about, skills, projects, cube, math, coorg, ai, secret, history, clear",
    "tip: use ↑ / ↓ to browse previous commands.",
    "note: fictional terminal. no real security operations.",
  ],
  about: ["Syed Muntasir (Mint) · Grade 10 CBSE student", "Coorg/Kodava · NRI · building toward Computer Science and cybersecurity."],
  skills: [
    "cybersecurity          [developing]",
    "mathematics            [enthusiast]",
    "speedcubing            [active]",
    "public-speaking        [active]",
    "AI/prompt-engineering  [developing]",
    "vibe-coding            [active]",
  ],
  projects: ["Browser Game Hub · OS Archive · BootArchive · VM Playground", "The Complete History of Mysore · SpeakUp · Intezaar-E-Dastaan"],
  cube: ["3x3 PB: 8.87s. Open the Cube Lab and try to beat the scramble."],
  math: ["1 + 2 + ... + 100 = 5050. The Math Lab is waiting."],
  ai: ["vague prompt → better prompt → advanced prompt.", "See the Prompt Lab for live examples."],
  secret: ["access granted... just kidding.", "You're already inside. Some rooms stay locked until you look closer."],
  coorg: ["> tracing roots...", "SECRET ROOTS FOUND · Coorg / Kodagu, Karnataka", "Scroll to Coorg Roots, it just unlocked."],
};

export function Terminal({ onCoorg }: { onCoorg?: () => void }) {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<string[]>(["mint@secret-base:~$ type 'help' to begin"]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const b = boxRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  }, [lines]);

  const run = (e: FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput("");
    setHIdx(-1);
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    if (cmd === "clear") return setLines([]);
    let out: string[];
    if (cmd === "history") out = history.length ? history.map((h, i) => `${i + 1}  ${h}`) : ["no history yet."];
    else if (cmd === "sudo" || cmd.startsWith("sudo ")) out = ["Nice try. Permission politely denied."];
    else if (cmd === "mint") out = ["🌿 fresh. You know the password already."];
    else out = RESPONSES[cmd] ?? [`command not found: ${cmd}. Try 'help'.`];
    if (cmd === "coorg") onCoorg?.();
    setLines((l) => [...l, `$ ${cmd}`, ...out]);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!history.length) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx < 0) return;
      const i = hIdx + 1;
      if (i >= history.length) { setHIdx(-1); setInput(""); }
      else { setHIdx(i); setInput(history[i]); }
    }
  };

  return (
    <div
      className="rounded-2xl border border-border bg-background/80 font-mono text-xs sm:text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-mint/70" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="ml-3 text-[10px] uppercase tracking-widest text-muted-foreground">mint@secret-base</span>
      </div>
      <div ref={boxRef} className="h-56 space-y-1 overflow-y-auto p-4 text-muted-foreground" aria-live="polite">
        {lines.map((l, i) => (
          <motion.p
            key={`${i}-${l}`}
            initial={reduce ? false : { opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`whitespace-pre-wrap ${l.startsWith("$") ? "text-mint" : ""}`}
          >
            {l}
          </motion.p>
        ))}
      </div>
      <form onSubmit={run} className="flex items-center gap-2 border-t border-border px-4 py-3">
        <span className="text-mint">$</span>
        <div className="relative flex-1">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            aria-label="Terminal command"
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent text-foreground caret-transparent outline-none"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 h-4 w-2 -translate-y-1/2 bg-mint animate-blink"
            style={{ left: `${input.length}ch` }}
          />
        </div>
      </form>
    </div>
  );
}

/* -------------------------------- Math Lab ------------------------------- */

const PUZZLES = [
  { tag: "Primes", q: "Next in the sequence: 2, 3, 5, 7, 11, 13, ?", a: "17", hint: "They're all primes." },
  { tag: "Sequence", q: "Next in the sequence: 1, 1, 2, 3, 5, 8, ?", a: "13", hint: "Add the previous two." },
  { tag: "Mental math", q: "25 × 48 = ?", a: "1200", hint: "25 × 4 = 100." },
  { tag: "Primes", q: "How many primes are there below 30?", a: "10", hint: "2, 3, 5, 7, ..." },
  { tag: "Gauss", q: "1 + 2 + 3 + ... + 100 = ?", a: "5050", hint: "Pair the first and last terms." },
  { tag: "Coordinate geometry", q: "Distance between (0, 0) and (6, 8)?", a: "10", hint: "Pythagoras: √(6² + 8²)." },
  { tag: "Pattern", q: "Next in the sequence: 1, 4, 9, 16, 25, ?", a: "36", hint: "Perfect squares." },
  { tag: "Logic", q: "A bat and ball cost 110 together. The bat costs 100 more than the ball. Ball = ?", a: "5", hint: "It's not 10." },
  { tag: "Mental math", q: "15% of 240 = ?", a: "36", hint: "10% is 24, 5% is 12." },
  { tag: "Cube math", q: "How many corner pieces does a Rubik's Cube have?", a: "8", hint: "Count a 2×2." },
];

export function MathLab({ onSolve }: { onSolve?: (count: number) => void }) {
  const [order] = useState(() => PUZZLES.map((_, i) => i).sort(() => Math.random() - 0.5));
  const [i, setI] = useState(0);
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [solved, setSolved] = useState(0);
  const p = PUZZLES[order[i % order.length]];

  const check = (e: FormEvent) => {
    e.preventDefault();
    if (val.trim().replace(/\s/g, "") === p.a) {
      const n = solved + 1;
      setSolved(n);
      onSolve?.(n);
      setMsg({ ok: true, text: "Your brain passed the test." });
      setVal("");
    } else setMsg({ ok: false, text: `Not quite. Hint: ${p.hint}` });
  };

  const next = () => { setI(i + 1); setMsg(null); setVal(""); };

  return (
    <form onSubmit={check} className="space-y-4">
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest">
        <span className="text-mint">{p.tag}</span>
        <span className="text-muted-foreground">Solved {solved}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="min-h-14 font-serif text-xl text-foreground"
        >
          {p.q}
        </motion.p>
      </AnimatePresence>
      <div className="flex gap-2">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          inputMode="numeric"
          aria-label="Your answer"
          className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 font-mono text-sm outline-none focus:border-mint"
        />
        <button type="submit" className="rounded-full bg-mint px-5 py-2 font-mono text-xs uppercase tracking-widest text-mint-foreground">Check</button>
        <button type="button" onClick={next} className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-mint">Next</button>
      </div>
      {msg && (
        <p className={`text-sm ${msg.ok ? "font-serif text-base italic text-mint" : "text-muted-foreground"}`} role="status">
          {msg.text}
        </p>
      )}
    </form>
  );
}

/* ------------------------------- Prompt lab ------------------------------ */

const EXAMPLES = [
  {
    topic: "Website",
    stages: [
      "Make me a website.",
      "Make a personal portfolio website for a Grade 10 student interested in cybersecurity and speedcubing, with About, Projects, and Contact sections.",
      "Act as a senior web designer. Build a responsive personal portfolio for a Grade 10 student named Mint.\n• Style: minimalist black, white, and mint green; serif headings.\n• Sections: About, Education, Skills, Projects (3-column cards), Contact.\n• Constraints: accessible, fast, no fake achievements.\n• Output: a clean layout with subtle animations that respect reduced motion.",
    ],
  },
  {
    topic: "Study help",
    stages: [
      "Explain trigonometry.",
      "Explain sine, cosine, and tangent for a Grade 10 CBSE student with one simple example each.",
      "You are a patient maths tutor. Explain sin, cos, and tan to a Grade 10 CBSE student.\n• Start with a right-triangle diagram described in words.\n• Give one worked example per ratio.\n• End with 3 practice questions (answers hidden at the bottom).\n• Keep it under 300 words, no jargon.",
    ],
  },
  {
    topic: "Speech",
    stages: [
      "Write a speech.",
      "Write a 2-minute school assembly speech about the importance of curiosity.",
      "Act as a speech coach. Write a 2-minute (≈260 words) assembly speech on curiosity for students aged 12–16.\n• Hook: open with a surprising question.\n• Structure: hook → one short story → 3 key points → call to action.\n• Tone: warm, confident, simple words.\n• Add [pause] markers for delivery.",
    ],
  },
  {
    topic: "Cubing",
    stages: [
      "Teach me cubing.",
      "Give me a beginner method to solve a 3×3 Rubik's Cube step by step.",
      "You are a speedcubing coach. Teach a complete beginner the layer-by-layer method for a 3×3.\n• Use standard notation (R, U, F, ') and explain it first.\n• Split into 7 numbered steps, each with its goal and one algorithm.\n• Add one common mistake per step.\n• Finish with a 7-day practice plan.",
    ],
  },
];
const LABELS = ["Vague", "Better", "Advanced"];
const WHY = [
  "No context, no goal. The AI has to guess everything.",
  "Adds context and a clear goal, so the result is more relevant.",
  "Adds a role, structure, constraints, and the expected output format.",
];

export function PromptLab() {
  const [ex, setEx] = useState(0);
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {EXAMPLES.map((e, j) => (
          <button
            key={e.topic}
            type="button"
            onClick={() => { setEx(j); setI(0); }}
            aria-pressed={ex === j}
            className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${ex === j ? "text-mint underline underline-offset-4" : "text-muted-foreground hover:text-mint"}`}
          >
            {e.topic}
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {LABELS.map((l, j) => (
          <button
            key={l}
            type="button"
            onClick={() => setI(j)}
            aria-pressed={i === j}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest ${i === j ? "border-mint bg-mint/10 text-mint" : "border-border text-muted-foreground hover:border-mint"}`}
          >
            {j + 1}. {l}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.pre
          key={`${ex}-${i}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="min-h-44 whitespace-pre-wrap rounded-2xl border border-border bg-background/80 p-4 font-mono text-xs leading-relaxed text-foreground sm:text-sm"
        >
          {EXAMPLES[ex].stages[i]}
        </motion.pre>
      </AnimatePresence>
      <p className="mt-3 text-sm text-muted-foreground">
        <span className="text-mint">Why: </span>{WHY[i]}
      </p>
    </div>
  );
}

/* ------------------------------ Coorg Roots ------------------------------ */

export function CoorgRoots({ found }: { found: boolean }) {
  const reduce = useReducedMotion();
  if (!found)
    return (
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        ▒▒▒ locked · some roots run deeper than the page. Ask the terminal, or solve three in the Math Lab.
      </p>
    );
  const item = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 8, letterSpacing: "0.5em" },
    animate: { opacity: 1, y: 0, letterSpacing: "0.2em" },
    transition: { duration: 0.8, delay: d },
  });
  return (
    <div className="py-4 text-center">
      <motion.p {...item(0)} className="font-mono text-xs uppercase text-mint">Secret Roots Found</motion.p>
      <motion.p {...item(0.4)} className="mt-4 font-serif text-3xl text-foreground" style={{ letterSpacing: "normal" }}>
        Coorg / Kodagu, Karnataka
      </motion.p>
      <motion.p {...item(0.8)} className="mt-2 font-serif italic text-muted-foreground" style={{ letterSpacing: "normal" }}>
        Where my family roots trace back.
      </motion.p>
    </div>
  );
}

/* ---------------------------- Achievement Vault -------------------------- */

const VAULT: { cat: string; items: string[] }[] = [
  { cat: "Academic", items: ["95% · Class Topper · Grade 9 Final Examination", "Honour Roll of the Class (Academic Topper)", "Talent Search Examination 2022-23"] },
  { cat: "Leadership", items: ["Elected Magazine Editor · 2026–27 School Parliament", "Best Catalyst · Zeal Summer Camp 2026, Riyadh", "School Assembly Anchor"] },
  { cat: "Public Speaking", items: ["4x Hindi Speech Winner (World & National Hindi Day)", "Elocution", "Extempore", "News Reader"] },
  { cat: "Fine Arts", items: ["Fine Arts", "Drawing", "Handwriting", "Solo Dance", "Quran Recitation"] },
  { cat: "Olympiads", items: ["Math Olympiad", "Science Olympiad", "School Quiz", "Spelling Bee"] },
  { cat: "Speedcubing", items: ["3×3 PB · 8.87s", "Rubik's Cube Demonstrator", "2025 Science Exhibition · Rubik's Cube Functioning Model (1st)"] },
  { cat: "Technology", items: ["2026 Science Exhibition · MathLab Website (1st)", "Websites like VM Playground, OS Archive & BootArchive"] },
  { cat: "AI", items: ["AI Foundations · OpenAI Academy", "Applied AI Foundations · OpenAI Academy", "AI Fluency for Students · Anthropic", "Introduction to Generative AI · Google Skills", "AI Skills for Students · Canva"] },
];

export function AchievementVault() {
  const [open, setOpen] = useState<string | null>("Academic");
  return (
    <div className="space-y-2">
      {VAULT.map((v, idx) => {
        const on = open === v.cat;
        return (
          <div key={v.cat} className={`rounded-2xl border transition-colors ${on ? "border-mint/50" : "border-border"}`}>
            <button
              type="button"
              onClick={() => setOpen(on ? null : v.cat)}
              aria-expanded={on}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-mint">{String(idx + 1).padStart(2, "0")}</span>
                <span className="font-serif text-lg text-foreground">{v.cat}</span>
              </span>
              <span className="font-mono text-xs text-muted-foreground">{on ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden px-4"
                >
                  {v.items.map((it) => (
                    <li key={it} className="flex gap-3 border-t border-border/60 py-2.5 text-sm text-muted-foreground">
                      <span className="text-mint">◆</span>{it}
                    </li>
                  ))}
                  <li className="h-2" />
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

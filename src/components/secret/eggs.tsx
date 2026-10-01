import { useEffect, useRef, useState, type FormEvent } from "react";

/* ------------------------------- Terminal -------------------------------- */

const RESPONSES: Record<string, string[]> = {
  help: ["Available commands: help, about, skills, projects, cube, math, ai, secret, clear", "Note: this is a fictional, harmless terminal."],
  about: ["Syed Muntasir (Mint) · Grade 10 CBSE student · Coorg/Kodava · NRI", "Building toward a future in Computer Science and cybersecurity."],
  skills: ["mathematics · operating systems · cybersecurity (learning)", "prompt engineering · vibe coding · public speaking · speedcubing"],
  projects: ["Browser Game Hub · OS Archive · BootArchive · VM Playground", "The Complete History of Mysore · SpeakUp · Intezaar-E-Dastaan"],
  cube: ["Speedcubing PB: 3x3 in 8.87s. Try the Cube Challenge on this page."],
  math: ["Fun fact: 1 + 2 + ... + 100 = 5050. Try the Math Vault below."],
  ai: ["vague prompt → clear prompt → structured prompt.", "See the Prompt Lab below."],
  secret: ["access granted... just kidding.", "You're already in the Secret Base. Well done, explorer."],
};

export function Terminal() {
  const [lines, setLines] = useState<string[]>(["mint@secret-base:~$ type 'help' to begin"]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ block: "nearest" }), [lines]);

  const run = (e: FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput("");
    if (!cmd) return;
    if (cmd === "clear") return setLines([]);
    if (cmd === "sudo" || cmd.startsWith("sudo ")) {
      return setLines((l) => [...l, `$ ${cmd}`, "Nice try. Permission politely denied."]);
    }
    setLines((l) => [...l, `$ ${cmd}`, ...(RESPONSES[cmd] ?? [`command not found: ${cmd}. Try 'help'.`])]);
  };

  return (
    <div className="rounded-2xl border border-border bg-background/80 p-4 font-mono text-xs sm:text-sm">
      <div className="h-56 space-y-1 overflow-y-auto text-muted-foreground" aria-live="polite">
        {lines.map((l, i) => (
          <p key={i} className={l.startsWith("$") ? "text-mint" : ""}>{l}</p>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={run} className="mt-3 flex items-center gap-2 border-t border-border pt-3">
        <span className="text-mint">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Terminal command"
          autoCapitalize="none"
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent text-foreground outline-none"
          placeholder="help"
        />
      </form>
    </div>
  );
}

/* ------------------------------- Math vault ------------------------------ */

const PUZZLES = [
  { q: "Next in the sequence: 2, 3, 5, 7, 11, 13, ?", a: "17", hint: "They're all primes." },
  { q: "Next in the sequence: 1, 1, 2, 3, 5, 8, ?", a: "13", hint: "Add the previous two." },
  { q: "Mental math: 25 × 48 = ?", a: "1200", hint: "25 × 4 = 100." },
  { q: "How many primes are there below 30?", a: "10", hint: "2, 3, 5, 7, ..." },
  { q: "1 + 2 + 3 + ... + 100 = ?", a: "5050", hint: "Pair the first and last terms." },
];

export function MathVault() {
  const [i, setI] = useState(0);
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState("");
  const done = i >= PUZZLES.length;
  const p = PUZZLES[i];

  const check = (e: FormEvent) => {
    e.preventDefault();
    if (val.trim() === p.a) {
      setMsg("Correct.");
      setVal("");
      setI(i + 1);
    } else setMsg(`Not quite. Hint: ${p.hint}`);
  };

  if (done)
    return (
      <div className="text-center">
        <p className="font-serif text-2xl text-mint">Vault unlocked.</p>
        <p className="mt-2 text-sm text-muted-foreground">All {PUZZLES.length} puzzles solved.</p>
        <button type="button" onClick={() => { setI(0); setMsg(""); }} className="mt-4 rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-mint">Restart</button>
      </div>
    );

  return (
    <form onSubmit={check} className="space-y-4">
      <p className="font-mono text-xs uppercase tracking-widest text-mint">Lock {i + 1} / {PUZZLES.length}</p>
      <p className="font-serif text-xl text-foreground">{p.q}</p>
      <div className="flex gap-2">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          inputMode="numeric"
          aria-label="Your answer"
          className="flex-1 rounded-full border border-border bg-background px-4 py-2 font-mono text-sm outline-none focus:border-mint"
        />
        <button type="submit" className="rounded-full bg-mint px-5 py-2 font-mono text-xs uppercase tracking-widest text-mint-foreground">Check</button>
      </div>
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
    </form>
  );
}

/* ------------------------------- Prompt lab ------------------------------ */

const STAGES = [
  { label: "Vague", text: "Make me a website." },
  { label: "Improved", text: "Make a personal portfolio website for a Grade 10 student interested in cybersecurity and speedcubing, with About, Projects, and Contact sections." },
  {
    label: "Advanced",
    text: "Act as a senior web designer. Build a responsive personal portfolio for a Grade 10 student named Mint.\n• Style: minimalist black, white, and mint green; serif headings.\n• Sections: About, Education, Skills, Projects (3-column cards), Contact.\n• Constraints: accessible, fast, no fake achievements.\n• Output: a clean layout with subtle animations that respect reduced motion.",
  },
];

export function PromptLab() {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {STAGES.map((s, j) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setI(j)}
            aria-pressed={i === j}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest ${i === j ? "border-mint bg-mint/10 text-mint" : "border-border text-muted-foreground hover:border-mint"}`}
          >
            {j + 1}. {s.label}
          </button>
        ))}
      </div>
      <pre className="min-h-40 whitespace-pre-wrap rounded-2xl border border-border bg-background/80 p-4 font-mono text-xs leading-relaxed text-foreground sm:text-sm">{STAGES[i].text}</pre>
      <p className="mt-3 text-sm text-muted-foreground">
        Better prompts add a role, context, clear requirements, constraints, and the expected output.
      </p>
    </div>
  );
}

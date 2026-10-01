import { useEffect, useMemo, useState } from "react";

type V = [number, number, number];
type Sticker = { p: V; n: V; c: string };
type Face = "U" | "D" | "F" | "B" | "L" | "R";

const COLORS: Record<Face, string> = {
  U: "oklch(0.98 0 0)",
  D: "oklch(0.88 0.17 95)",
  F: "oklch(0.72 0.17 150)",
  B: "oklch(0.6 0.16 255)",
  L: "oklch(0.72 0.17 55)",
  R: "oklch(0.6 0.21 27)",
};

function faceOf(n: V): Face {
  if (n[1] === 1) return "U";
  if (n[1] === -1) return "D";
  if (n[2] === 1) return "F";
  if (n[2] === -1) return "B";
  if (n[0] === 1) return "R";
  return "L";
}

function solved(): Sticker[] {
  const s: Sticker[] = [];
  for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) {
    const p: V = [x, y, z];
    for (let a = 0; a < 3; a++) {
      const n: V = [0, 0, 0];
      n[a] = p[a];
      s.push({ p, n, c: COLORS[faceOf(n)] });
    }
  }
  return s;
}

const rot: Record<"U" | "R" | "F", (v: V) => V> = {
  U: ([x, y, z]) => [-z, y, x],
  R: ([x, y, z]) => [x, z, -y],
  F: ([x, y, z]) => [y, -x, z],
};
const inLayer: Record<"U" | "R" | "F", (p: V) => boolean> = {
  U: (p) => p[1] === 1,
  R: (p) => p[0] === 1,
  F: (p) => p[2] === 1,
};

function apply(state: Sticker[], move: string): Sticker[] {
  const base = move[0] as "U" | "R" | "F";
  const times = move.includes("'") ? 3 : move.includes("2") ? 2 : 1;
  let s = state;
  for (let t = 0; t < times; t++) {
    s = s.map((st) => (inLayer[base](st.p) ? { ...st, p: rot[base](st.p), n: rot[base](st.n) } : st));
  }
  return s;
}

function isSolved(s: Sticker[]) {
  const seen: Record<string, string> = {};
  for (const st of s) {
    const f = faceOf(st.n);
    if (seen[f] && seen[f] !== st.c) return false;
    seen[f] = st.c;
  }
  return true;
}

// [col, row] in 2x2 grid for each face
function cell(f: Face, p: V): [number, number] {
  const b = (v: number) => (v > 0 ? 1 : 0);
  const [x, y, z] = p;
  switch (f) {
    case "U": return [b(x), b(z)];
    case "D": return [b(x), b(-z)];
    case "F": return [b(x), b(-y)];
    case "B": return [b(-x), b(-y)];
    case "R": return [b(-z), b(-y)];
    case "L": return [b(z), b(-y)];
  }
}

const MOVES = ["U", "U'", "R", "R'", "F", "F'"];
const NET: (Face | null)[][] = [
  [null, "U", null, null],
  ["L", "F", "R", "B"],
  [null, "D", null, null],
];

export function PocketCube() {
  const [s, setS] = useState<Sticker[]>(solved);
  const [moves, setMoves] = useState(0);
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [scrambled, setScrambled] = useState(false);

  useEffect(() => {
    if (!start || end) return;
    const id = setInterval(() => setNow(Date.now()), 50);
    return () => clearInterval(id);
  }, [start, end]);

  const faces = useMemo(() => {
    const out: Record<string, string[]> = {};
    for (const st of s) {
      const f = faceOf(st.n);
      const [c, r] = cell(f, st.p);
      (out[f] ??= Array(4))[r * 2 + c] = st.c;
    }
    return out;
  }, [s]);

  const doMove = (m: string) => {
    const next = apply(s, m);
    setS(next);
    if (!scrambled) return;
    setMoves((x) => x + 1);
    const t = start ?? Date.now();
    if (!start) setStart(t);
    if (isSolved(next)) {
      setEnd(Date.now());
      setScrambled(false);
    }
  };

  const scramble = () => {
    let st = solved();
    let last = "";
    for (let i = 0; i < 12; i++) {
      let m = MOVES[Math.floor(Math.random() * MOVES.length)];
      while (m[0] === last) m = MOVES[Math.floor(Math.random() * MOVES.length)];
      last = m[0];
      st = apply(st, m);
    }
    if (isSolved(st)) st = apply(st, "R");
    setS(st);
    setMoves(0);
    setStart(null);
    setEnd(null);
    setScrambled(true);
  };

  const reset = () => {
    setS(solved());
    setMoves(0);
    setStart(null);
    setEnd(null);
    setScrambled(false);
  };

  const elapsed = start ? ((end ?? now) - start) / 1000 : 0;

  return (
    <div className="space-y-5">
      <div className="mx-auto grid w-fit grid-cols-4 gap-1.5">
        {NET.flat().map((f, i) =>
          f ? (
            <div key={i} className="grid grid-cols-2 gap-0.5 rounded-md border border-border p-0.5">
              {faces[f].map((c, j) => (
                <span key={j} className="h-6 w-6 rounded-sm sm:h-8 sm:w-8" style={{ background: c }} />
              ))}
            </div>
          ) : (
            <span key={i} />
          ),
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {MOVES.map((m) => (
          <button key={m} type="button" onClick={() => doMove(m)} className="min-w-12 rounded-full border border-border px-4 py-2 font-mono text-sm hover:border-mint hover:text-mint">
            {m}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest">
        <button type="button" onClick={scramble} className="rounded-full bg-mint px-4 py-2 text-mint-foreground">Scramble</button>
        <button type="button" onClick={reset} className="rounded-full border border-border px-4 py-2 hover:border-mint">Reset</button>
        <span className="text-muted-foreground">Time <span className="text-mint">{elapsed.toFixed(2)}s</span></span>
        <span className="text-muted-foreground">Moves <span className="text-mint">{moves}</span></span>
      </div>
      {end && <p className="text-center font-serif text-lg italic text-mint">Solved in {elapsed.toFixed(2)}s · {moves} moves</p>}
    </div>
  );
}

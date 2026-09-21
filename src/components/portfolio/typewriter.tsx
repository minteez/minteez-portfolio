import { useEffect, useState } from "react";

export function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setText(words[0]);
      return;
    }

    const current = words[index % words.length];
    const speed = deleting ? 40 : 80;

    const timer = window.setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          window.setTimeout(() => setDeleting(true), 1600);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);

    return () => window.clearTimeout(timer);
  }, [text, deleting, index, words, reducedMotion]);

  if (reducedMotion) {
    return <span className="font-mono text-mint">{words[0]}</span>;
  }

  return (
    <span className="font-mono text-mint">
      {text}
      <span className="animate-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-1 bg-mint" />
    </span>
  );
}
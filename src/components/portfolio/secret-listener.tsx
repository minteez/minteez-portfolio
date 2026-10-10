import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/** Listens for hidden keyboard sequences ("mint" or the Konami code) and opens the Secret Base. */
export function SecretListener() {
  const navigate = useNavigate();
  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      buf = [...buf, e.key].slice(-10);
      const typed = buf.slice(-4).join("").toLowerCase();
      if (typed === "mint" || buf.join() === KONAMI.join()) {
        buf = [];
        navigate({ to: "/secret-base" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);
  return null;
}

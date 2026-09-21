import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "skills", label: "Skills" },
  { id: "cubing", label: "Cubing" },
  { id: "leadership", label: "Leadership" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "goals", label: "Goals" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.4, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-mint/40 bg-mint/10 font-serif text-sm font-semibold text-mint transition-all group-hover:mint-glow">
            M
          </span>
          <span className="font-serif text-lg tracking-tight">Mint</span>
        </a>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={activeId === l.id ? "page" : undefined}
              className={`relative text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full px-2 py-1 ${
                activeId === l.id
                  ? "text-mint"
                  : "text-muted-foreground hover:text-mint"
              }`}
            >
              {l.label}
              {activeId === l.id && (
                <span className="absolute -bottom-1.5 left-1/2 h-px w-5 -translate-x-1/2 bg-mint" />
              )}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span className="flex flex-col gap-1">
              <span className="h-px w-4 bg-foreground" />
              <span className="h-px w-4 bg-foreground" />
              <span className="h-px w-4 bg-foreground" />
            </span>
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                aria-current={activeId === l.id ? "page" : undefined}
                className={`py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  activeId === l.id ? "text-mint" : "text-muted-foreground hover:text-mint"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
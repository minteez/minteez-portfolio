import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ElementType } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  Brain,
  Building2,
  Calendar,
  ChevronRight,
  Code,
  Cpu,
  ExternalLink,
  Feather,
  Gamepad2,
  Github,
  HardDrive,
  Instagram,
  Library,
  Lock,
  Mail,
  Maximize2,
  Mic2,
  Monitor,
  MonitorPlay,
  Puzzle,
  Shield,
  Sparkles,
  Target,
  Terminal,
  Timer,
  Trophy,
  X,
  Youtube,
} from "lucide-react";
import { Nav } from "./nav";
import { Typewriter } from "./typewriter";
import { Counter } from "./counter";
import { CursorGlow } from "./cursor-glow";
import { Reveal } from "./reveal";
import profileAsset from "@/assets/mint-profile.png.asset.json";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const TYPEWRITER_ROLES = [
  "Grade 10 Student",
  "Future Cybersecurity Specialist",
  "Mathematics Enthusiast",
  "Speedcuber",
  "Public Speaker",
];

const EDUCATION = [
  {
    school: "International Indian School",
    place: "Dammam",
    years: "2016 – 2023",
    detail: "UKG – Mid Grade 7",
  },
  {
    school: "Modern International School",
    place: "Riyadh",
    years: "2023 – 2027",
    detail: "Grade 7 – Grade 10 · CBSE",
  },
  {
    school: "International Indian School",
    place: "Riyadh",
    years: "2027 – 2029 · Planned",
    detail: "Science Stream · Computer Science",
  },
];

const CERTIFICATIONS = [
  {
    title: "Talent Search Examination 2022-23",
    issuer: "International Indian School, Dammam",
    date: "January 30, 2023",
    image: "/cert1.jpg",
  },
  {
    title: "Honour Roll of the Class (Academic Topper)",
    issuer: "International Indian School, Dammam",
    date: "March 22, 2023",
    image: "/cert2.jpg",
  },
  {
    title: "AI Foundations",
    issuer: "OpenAI Academy",
    date: "August 9, 2026",
    image: "/cert3.jpg",
  },
  {
    title: "Applied AI Foundations",
    issuer: "OpenAI Academy",
    date: "August 10, 2026",
    image: "/cert4.jpg",
  },
  {
    title: "Canva Essentials",
    issuer: "Canva Design School",
    date: "August 13, 2026",
    image: "/cert5.jpg",
  },
];

const SKILLS = [
  { name: "Learning Ability", value: 99 },
  { name: "Discipline", value: 98 },
  { name: "Leadership", value: 96 },
  { name: "Mathematics", value: 96 },
  { name: "Public Speaking", value: 95 },
  { name: "Communication", value: 95 },
  { name: "Problem Solving", value: 94 },
  { name: "General Knowledge", value: 93 },
  { name: "Writing", value: 90 },
  { name: "Operating Systems", value: 65, label: "Intermediate" },
  { name: "Programming", value: 55, label: "Beginner – Intermediate" },
  { name: "Cybersecurity Concepts", value: 40, label: "Beginner" },
];

const CUBING = [
  { event: "3×3", time: "8.87s" },
  { event: "2×2", time: "1.06s" },
  { event: "4×4", time: "1:03" },
  { event: "Megaminx", time: "1:47" },
  { event: "Pyraminx", time: "4.53s" },
  { event: "3×3 One-Handed", time: "20.94s" },
  { event: "3×3 Blindfolded", time: "2:12.94" },
  { event: "2×2 Blindfolded", time: "21.66s" },
];

const LEARNING = ["5×5", "Skewb", "4×4 Blindfolded"];

const LEADERSHIP = [
  { title: "Magazine Editor", icon: BookOpen },
  { title: "Student Leader", icon: Sparkles },
  { title: "School Assembly Anchor", icon: Mic2 },
  { title: "News Reader", icon: Mic2 },
  { title: "Public Speaker", icon: Mic2 },
  { title: "Quiz Participant", icon: Brain },
  { title: "Speech Competitor", icon: Mic2 },
  { title: "Science Exhibition Presenter", icon: Cpu },
  { title: "Rubik's Cube Demonstrator", icon: Puzzle },
];

const ACHIEVEMENTS = [
  {
    title: "First Position",
    detail: "Best Mathematics Model · School Science Exhibition",
    sub: "Rubik's Cube Functioning Model",
  },
  {
    title: "95% · Class Topper",
    detail: "Grade 9 Final Examination",
  },
  {
    title: "Magazine Editor",
    detail: "Won School Parliament Election",
  },
  {
    title: "Best Catalyst",
    detail: "Zeal Summer Camp 2026 · Riyadh",
  },
  {
    title: "Grade 6 Talent Search Examination 2022-23",
    detail: "Rank 11 (74%)",
    sub: "International Indian School, Dammam · 2023",
  },
  {
    title: "Grade 6 Honour Roll - Academic Topper (2022-23)",
    detail: "97% Average",
    sub: "International Indian School, Dammam · 2023",
  },
];

const ACHIEVEMENT_TAGS = [
  "Quran Recitation",
  "Fine Arts",
  "Drawing",
  "Handwriting",
  "Spelling Bee",
  "Elocution",
  "Extempore",
  "School Quiz",
  "Olympiads",
  "Math Olympiad",
  "Science Olympiad",
  "Solo Dance",
];

const INTERESTS = [
  { name: "Cybersecurity", icon: Shield },
  { name: "Operating Systems", icon: Terminal },
  { name: "Computers", icon: Cpu },
  { name: "Mathematics", icon: Brain },
  { name: "Speedcubing", icon: Puzzle },
  { name: "Chess", icon: Target },
  { name: "Checkers", icon: Target },
  { name: "UNO", icon: Sparkles },
  { name: "Football", icon: Trophy },
  { name: "Table Tennis", icon: Trophy },
  { name: "Reading Books", icon: BookOpen },
  { name: "Public Speaking", icon: Mic2 },
  { name: "Writing", icon: BookOpen },
  { name: "Technology", icon: Cpu },
  { name: "Ethical Hacking", icon: Lock },
  { name: "Learning", icon: Brain },
];

const GOALS = [
  "Finish Grade 10",
  "Science Stream",
  "Computer Science",
  "University",
  "Cybersecurity Career",
  "Ethical Hacker",
  "Security Researcher",
  "Helping Young Learners",
];

const QUOTES = [
  "Every expert was once a beginner.",
  "Knowledge grows when curiosity never stops.",
  "Discipline beats talent.",
  "Think logically. Learn continuously.",
];

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.22.645-1.873.891a.077.077 0 0 0-.041.107c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.539-1.262.24-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function EpicGamesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2 2 7v10l10 5 10-5V7L12 2zm-1 4h4v2h-4v2h3v2h-3v2h4v2h-6V6h2z" />
    </svg>
  );
}

function ElyByIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2 4 6.5v11L12 22l8-4.5v-11L12 2zm-4 6h5v2H8v-2zm0 4h7v2H8v-2zm0 4h6v2H8v-2z" />
    </svg>
  );
}

function PlayStationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 5.5c1.5 0 2.5.7 2.5 2.2 0 1.1-.6 1.7-1.5 2.1v.05c1.2.3 1.9 1.2 1.9 2.4 0 1.7-1.2 2.7-3.1 2.7H7V7.5h3zm-.4 3.5c.6 0 1-.3 1-.9 0-.6-.4-.9-1-.9H8.5v1.8h1.1zm.1 3.7c.7 0 1.1-.4 1.1-1.1 0-.7-.4-1.1-1.1-1.1H8.5v2.2h1.2zm5.3-6.9h1.2v4c0 1.4-.7 2.2-2.1 2.2-1.3 0-2-.8-2-2.2v-4h1.2v3.9c0 .8.3 1.2 1 1.2.6 0 .9-.4.9-1.2v-3.9z" />
    </svg>
  );
}

type SocialItem = {
  name: string;
  value: string;
  href: string;
  icon: ElementType;
  id?: string;
};

type SocialCategory = {
  label: string;
  items: SocialItem[];
};

const SOCIAL_CATEGORIES: SocialCategory[] = [
  {
    label: "Social Media",
    items: [
      { name: "Instagram", value: "@sudo.minteez", href: "https://instagram.com/sudo.minteez", icon: Instagram },
      { name: "Pinterest", value: "pinterest.com/dzi45k", href: "https://www.pinterest.com/dzi45k/", icon: PinterestIcon },
      { name: "Discord", value: "sudo.minteez", href: "#", icon: DiscordIcon },
      { name: "Spotify", value: "Minteez", href: "https://open.spotify.com/user/31vgqtxjdj64jakklqq3ojtpht2e", icon: SpotifyIcon },
    ],
  },
  {
    label: "Games",
    items: [
      { name: "Epic Games", value: "sudo.minteez", href: "#", icon: EpicGamesIcon },
      { name: "Chess.com", value: "chess.com/member/mint_yt", href: "https://www.chess.com/member/mint_yt", icon: Puzzle },
      { name: "ROBLOX", value: "Quit since 2024 · kept for identity", href: "https://web.roblox.com/users/2925195006/profile", icon: Gamepad2 },
      { name: "PlayStation Network", value: "dzi45k", href: "#", icon: PlayStationIcon },
      { name: "Scratch", value: "scratch.mit.edu/users/thecubermint", href: "https://scratch.mit.edu/users/thecubermint", icon: Sparkles },
      { name: "Ely.by", value: "ely.by/u6947957", href: "https://ely.by/u6947957", icon: ElyByIcon },
    ],
  },
  {
    label: "Cubing",
    items: [
      { name: "CubingTime", value: "cubingtime.com/users/id99492", href: "https://cubingtime.com/users/id99492", icon: Timer },
      { name: "CubePB", value: "All unofficial cubing records", href: "https://cubepb.com/i/view?id=1892&expand=0&type=user", icon: Trophy, id: "cubepb-contact" },
    ],
  },
  {
    label: "Other",
    items: [
      { name: "Email", value: "kerzibakthestickmanyt101@gmail.com", href: "mailto:kerzibakthestickmanyt101@gmail.com", icon: Mail },
      { name: "YouTube", value: "@thecubermint", href: "https://youtube.com/@thecubermint", icon: Youtube },
      { name: "GitHub", value: "github.com/minteez", href: "https://github.com/minteez", icon: Github },
      { name: "Internet Archive", value: "@syed_muntasir_muhammad_mint_", href: "https://archive.org/details/@syed_muntasir_muhammad_mint_", icon: Library },
      { name: "Lovable Profile", value: "lovable.dev/@minteez", href: "https://www.lovable.dev/@minteez", icon: Code },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Reusable                                                                   */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-16 max-w-2xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-mint" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-mint">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-4xl font-medium leading-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

function SkillBar({ name, value, label }: { name: string; value: number; label?: string }) {
  return (
    <Reveal>
      <div className="mb-6">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="font-mono text-xs text-mint">{label ?? `${value}%`}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${value}%` }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full gradient-mint"
          />
        </div>
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*  Loader                                                                     */
/* -------------------------------------------------------------------------- */

function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 900);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.7, duration: 0.4 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-background"
    >
      <div className="grid animate-spin-slow grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="h-4 w-4 rounded-sm"
            style={{
              background: i % 2 === 0 ? "var(--mint)" : "transparent",
              border: "1px solid var(--mint)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen items-center overflow-hidden pt-28">
      {/* grid backdrop */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* floating shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute left-[8%] top-[20%] h-24 w-24 rounded-2xl border border-mint/30 bg-mint/5 backdrop-blur-sm" />
        <div
          className="animate-float-slow absolute right-[10%] top-[30%] h-16 w-16 rotate-45 border border-mint/40 bg-mint/10"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="animate-float-slow absolute bottom-[15%] left-[15%] h-12 w-12 rounded-full bg-mint/20 blur-xl"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto grid w-full max-w-7xl gap-16 px-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-mint">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              Available for opportunities
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mb-3 font-mono text-sm text-muted-foreground">Hi, I'm</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-5xl font-medium leading-[1.05] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Syed
              <br />
              <span className="italic text-mint">Muntasir.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-mono text-sm text-muted-foreground">
              Known as <span className="text-foreground">Mint</span>
              <span className="mx-3 text-mint">/</span>
              <Typewriter words={TYPEWRITER_ROLES} />
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              A Grade 10 student passionate about cybersecurity, mathematics,
              computers, operating systems, public speaking, and speedcubing.
              I enjoy solving complex problems, exploring technology, and
              continuously learning new skills that prepare me for a future
              in computer science.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#about"
                className="group inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 text-sm font-medium text-mint-foreground transition-all hover:mint-glow"
              >
                Explore My Journey
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-mint hover:text-mint"
              >
                Contact Me
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Avatar */}
        <Reveal delay={0.3} className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="animate-spin-slow absolute -inset-6 rounded-full border border-dashed border-mint/30" />
            <div className="animate-mint-pulse relative h-64 w-64 overflow-hidden rounded-full border border-mint/40 bg-gradient-to-br from-mint/20 via-background to-background sm:h-80 sm:w-80">
              <img
                src={profileAsset.url}
                alt="Syed Muntasir — Mint"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-mint/40 bg-background px-4 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mint">
              Mint · sudo
            </div>
          </div>
        </Reveal>
      </motion.div>

      {/* Scroll arrow */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="grid h-10 w-10 place-items-center rounded-full border border-mint/40 text-mint"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  About                                                                      */
/* -------------------------------------------------------------------------- */

function About() {
  const highlights = [
    "Grade 10 · CBSE",
    "Cybersecurity",
    "Ethical Hacking",
    "Mathematics",
    "Operating Systems",
    "Public Speaker",
    "Student Leader",
    "Magazine Editor",
  ];
  return (
    <section id="about" className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="01 · About"
          title="Curious by nature, disciplined by choice."
        />
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                I'm currently a Grade 10 student following the CBSE curriculum,
                studying at Modern International School in Riyadh. Ever since
                I picked up my first computer, I've been fascinated by how
                machines think, how systems talk to each other, and how a few
                lines of thoughtful code can shape entire experiences.
              </p>
              <p>
                My deepest interests sit at the intersection of{" "}
                <span className="text-foreground">cybersecurity</span>,{" "}
                <span className="text-foreground">operating systems</span>,
                and <span className="text-foreground">mathematics</span>. I
                spend a lot of time reading books, watching lectures, and
                slowly building the foundations I'll need to pursue ethical
                hacking and security research in the future.
              </p>
              <p>
                Outside of computers, I lead where I can — as a school
                magazine editor, a student leader, an assembly anchor, and a
                regular voice in speech and quiz competitions. I love talking
                about ideas, teaching what I learn, and hopefully inspiring
                other students who are just as curious about technology as I
                am.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm">
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-mint">
                / Identity
              </p>
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Name</dt>
                  <dd className="font-medium">Syed Muntasir</dd>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Alias</dt>
                  <dd className="font-medium text-mint">Mint</dd>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Grade</dt>
                  <dd className="font-medium">10 · CBSE</dd>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Based in</dt>
                  <dd className="font-medium">Riyadh, KSA</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Focus</dt>
                  <dd className="font-medium">Cybersecurity</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-2">
                {highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-mint/25 bg-mint/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-mint"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Education                                                                  */
/* -------------------------------------------------------------------------- */

function Education() {
  return (
    <section id="education" className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="02 · Education"
          title="A path built one milestone at a time."
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-mint/60 via-mint/20 to-transparent md:left-1/2" />
          {EDUCATION.map((e, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className={`relative mb-12 grid gap-6 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[&>div:first-child]:col-start-2" : ""
                }`}
              >
                <div className="absolute left-4 top-4 -translate-x-1/2 md:left-1/2">
                  <div className="animate-mint-pulse h-3 w-3 rounded-full bg-mint" />
                </div>
                <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-mint/50 hover:mint-glow">
                    <p className="mb-2 font-mono text-xs text-mint">{e.years}</p>
                    <h3 className="font-serif text-xl text-foreground">{e.school}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{e.place}</p>
                    <p className="mt-3 text-sm text-foreground/80">{e.detail}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Certifications                                                            */
/* -------------------------------------------------------------------------- */

function Certifications() {
  const [selectedCert, setSelectedCert] = useState<(typeof CERTIFICATIONS)[0] | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  return (
    <section id="certifications" className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="03 · Certifications"
          title="Verified achievements & course completions."
          subtitle="Click on any certificate card to view it in full size."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div
                onClick={() => setSelectedCert(c)}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-mint/50 hover:mint-glow cursor-pointer"
              >
                {/* Image preview */}
                <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/80 bg-background/50">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-4 py-2 font-mono text-xs text-mint shadow-lg">
                      <Maximize2 className="h-3.5 w-3.5" />
                      View Full Size
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-mint">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <BadgeCheck className="h-5 w-5 text-mint/70 transition-colors group-hover:text-mint" />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-foreground transition-colors group-hover:text-mint">
                      {c.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/40 space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4 shrink-0 text-mint/80" />
                      <span className="truncate">{c.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/80">
                      <Calendar className="h-3.5 w-3.5 shrink-0 text-mint/80" />
                      <span>{c.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Modal / Lightbox */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity"
              onClick={() => setSelectedCert(null)}
            />
            <div className="relative z-10 flex max-h-[90vh] max-w-4xl w-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-border bg-card/80 text-muted-foreground backdrop-blur-sm transition-all hover:border-mint/50 hover:text-foreground"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-background/40 p-2 sm:p-4">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[68vh] w-auto max-w-full rounded-xl object-contain shadow-md"
                />
              </div>
              <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between px-2">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-foreground">
                    {selectedCert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Issued by {selectedCert.issuer}
                  </p>
                </div>
                <p className="font-mono text-xs text-mint shrink-0 sm:text-right">
                  {selectedCert.date}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Skills                                                                     */
/* -------------------------------------------------------------------------- */

function Skills() {
  const left = SKILLS.slice(0, 6);
  const right = SKILLS.slice(6);
  return (
    <section id="skills" className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="04 · Skills"
          title="Sharpening the tools I care about."
          subtitle="Percentages reflect confidence and consistency rather than formal certification."
        />
        <div className="grid gap-12 lg:grid-cols-2">
          <div>{left.map((s) => <SkillBar key={s.name} {...s} />)}</div>
          <div>{right.map((s) => <SkillBar key={s.name} {...s} />)}</div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Cubing                                                                     */
/* -------------------------------------------------------------------------- */

function Cubing() {
  return (
    <section id="cubing" className="relative border-t border-border/60 py-32">
      {/* subtle cube grid accent */}
      <div className="pointer-events-none absolute right-8 top-24 hidden opacity-20 lg:block">
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-6 w-6 rounded-sm border border-mint/50 bg-mint/10" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="05 · Speedcubing"
          title="Personal bests, measured in seconds."
          subtitle="A record of my fastest solves across events. Times move as I keep practicing."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CUBING.map((c, i) => (
            <Reveal key={c.event} delay={i * 0.05}>
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-mint/60 hover:mint-glow">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {c.event}
                </p>
                <p className="mt-3 font-serif text-3xl text-foreground">{c.time}</p>
                <p className="mt-4 font-mono text-[10px] text-mint">Personal best</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            ...and more records in{" "}
            <a
              href="#cubepb-contact"
              className="inline-flex items-center gap-1 font-medium text-mint underline decoration-mint/40 underline-offset-4 transition-colors hover:text-mint/80"
            >
              my CubePB Profile
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 rounded-3xl border border-mint/30 bg-mint/5 p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-mint">
              Currently learning
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {LEARNING.map((l) => (
                <span
                  key={l}
                  className="rounded-full border border-mint/40 bg-background/60 px-4 py-1.5 text-sm font-medium text-foreground"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Leadership                                                                 */
/* -------------------------------------------------------------------------- */

function Leadership() {
  return (
    <section id="leadership" className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="06 · Leadership & Activities"
          title="Roles that shaped how I show up."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.05}>
              <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 transition-all hover:border-mint/50 hover:bg-card">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-mint/30 bg-mint/10 text-mint transition-all group-hover:mint-glow">
                  <l.icon className="h-5 w-5" />
                </div>
                <p className="min-w-0 font-medium text-foreground">{l.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Achievements                                                               */
/* -------------------------------------------------------------------------- */

function Achievements() {
  return (
    <section id="achievements" className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="07 · Achievements"
          title="Small wins that keep me building."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 transition-all hover:border-mint/50">
                <Trophy className="absolute right-6 top-6 h-6 w-6 text-mint/60 transition-all group-hover:text-mint group-hover:mint-glow" />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-mint">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-foreground">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.detail}</p>
                {a.sub && <p className="mt-1 text-sm text-muted-foreground">{a.sub}</p>}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-mint">
              / Also recognised in
            </p>
            <div className="flex flex-wrap gap-2.5">
              {ACHIEVEMENT_TAGS.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm text-foreground/80 transition-colors hover:border-mint/50 hover:text-mint"
                >
                  <Award className="h-3 w-3 text-mint" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Projects                                                                   */
/* -------------------------------------------------------------------------- */

const PROJECTS = [
  {
    title: "Browser Game Hub",
    description:
      "A collection of browser-based games built entirely with Gemini. Every game loads instantly and can be played directly in your browser — no installs, no setup.",
    href: "https://minteez.github.io/browser-game-hub",
    tags: ["Gemini", "Browser Games", "Web Development"],
    icon: Gamepad2,
  },
  {
    title: "OS Archive",
    description:
      "An interactive digital museum dedicated to OS history with a dark retro CRT aesthetic. Explore Windows codenames, macOS, and Linux milestones through visual timelines, comparison tools, an OS family tree, a CLI terminal simulator, and interactive trivia.",
    href: "https://minteez.github.io/os-archive/",
    tags: ["Operating Systems", "Retro CRT", "Interactive"],
    icon: HardDrive,
    note: "No longer maintained — updates have stopped.",
  },
  {
    title: "BootArchive",
    description:
      "An interactive museum of OS startup history. From 1970s terminal interfaces to modern high-fidelity sequences, it preserves the \u201cfirst impression\u201d of computing through educational simulations and original recreations of the visual evolution of boot experiences.",
    href: "https://minteez.github.io/bootarchive/",
    tags: ["Boot Sequences", "Simulation", "Computing History"],
    icon: MonitorPlay,
  },
  {
    title: "VM Playground",
    description:
      "A playful virtual-machine sandbox where you can create and run made-up operating systems like MintOS, Aurora Linux, and RetroDOS. Six totally fictional OSes, each with its own personality, boot sequence, and retro-futuristic interface.",
    href: "https://vmplayground.lovable.app",
    tags: ["Virtual Machines", "Fictional OS", "Interactive"],
    icon: Monitor,
  },
  {
    title: "The Complete History of Mysore",
    description:
      "A comprehensive educational website exploring the rich history, culture, and heritage of Mysore (Mysuru) from ancient times to the present day. It presents historical events, dynasties, rulers, architecture, traditions, and notable personalities through interactive timelines, maps, and galleries, with citations, accessible design, and responsive visuals for students, researchers, and history enthusiasts.",
    href: "https://mysore-history-vault.lovable.app/",
    tags: ["History", "Mysore", "Digital Archive", "Educational"],
    icon: BookOpen,
  },
  {
    title: "SpeakUp",
    description:
      "A student-created website that helps young learners build confidence in public speaking through practical tips, speech-writing guides, competition strategies, practice techniques, inspiring speaker stories, and motivational resources. A personal passion project by Minteez — no ads and no login required.",
    href: "https://speakup-studio.lovable.app/",
    tags: ["Public Speaking", "Student Guide", "Education"],
    icon: Mic2,
  },
  {
    title: "Intezaar-E-Dastaan",
    description:
      "An elegant Hindi-Urdu poetry website featuring Shayari, Nazm, heartfelt Quotes, and reflections on love, انتظار, silence, loneliness, relationships, hope, and life. Every emotion is presented as a story waiting to be felt.",
    href: "https://intezaar-e-dastaan.lovable.app/",
    tags: ["Hindi-Urdu Poetry", "Shayari", "Nazm"],
    icon: Feather,
    note: "Currently in preview mode — URL will be updated once published.",
  },
];

function Projects() {
  return (
    <section id="projects" className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="08 · Projects"
          title="Things I've built, one experiment at a time."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-3xl border border-border bg-card/60 p-8 transition-all hover:-translate-y-1 hover:border-mint/60 hover:mint-glow"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-mint/30 bg-mint/10 text-mint">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <ExternalLink className="h-5 w-5 text-mint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="font-serif text-2xl text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                {"note" in p && p.note ? (
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    {p.note}
                  </p>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-mint/25 bg-mint/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-mint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Interests                                                                  */
/* -------------------------------------------------------------------------- */

function Interests() {
  return (
    <section id="interests" className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="09 · Interests"
          title="What I lean toward, on and off the screen."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {INTERESTS.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.03}>
              <div className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:-translate-y-0.5 hover:border-mint/50 hover:bg-card">
                <it.icon className="h-5 w-5 text-mint transition-all group-hover:scale-110" />
                <p className="text-sm font-medium text-foreground">{it.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Goals                                                                      */
/* -------------------------------------------------------------------------- */

function Goals() {
  return (
    <section id="goals" className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="10 · Future Goals"
          title="The next few steps, in order."
        />
        <div className="mx-auto max-w-3xl">
          {GOALS.map((g, i) => (
            <Reveal key={g} delay={i * 0.05}>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-mint/40 bg-mint/10 font-mono text-xs text-mint">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {i < GOALS.length - 1 && (
                    <div className="h-10 w-px bg-gradient-to-b from-mint/60 to-mint/10" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="group flex items-center justify-between rounded-2xl border border-border bg-card/50 px-6 py-4 transition-all hover:border-mint/50 hover:mint-glow">
                    <p className="font-serif text-lg text-foreground">{g}</p>
                    <ChevronRight className="h-4 w-4 text-mint opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Quotes                                                                     */
/* -------------------------------------------------------------------------- */

function Quotes() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-mint" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-mint">
            Thoughts I return to
          </span>
          <span className="h-px w-8 bg-mint" />
        </div>
        <motion.blockquote
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl italic leading-tight text-foreground md:text-5xl"
        >
          "{QUOTES[i]}"
        </motion.blockquote>
        <div className="mt-8 flex justify-center gap-2">
          {QUOTES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Quote ${idx + 1}`}
              className={`h-1 rounded-full transition-all ${
                idx === i ? "w-8 bg-mint" : "w-4 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Facts                                                                      */
/* -------------------------------------------------------------------------- */

const FACTS: Array<{ value: number; suffix: string; label: string; text?: string }> = [
  { value: 95, suffix: "%", label: "Grade 9 Score" },
  { value: 8, suffix: "+", label: "Puzzle Types Solved" },
  { value: 20, suffix: "+", label: "School Competitions" },
  { value: 100, suffix: "+", label: "Hours Practicing Cubes" },
];

function Facts() {
  return (
    <section className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="11 · Fun Facts" title="A quick look, in numbers." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {FACTS.map((f) => (
            <Reveal key={f.label}>
              <div className="rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-mint/50">
                <p className="font-serif text-5xl text-mint text-mint-glow">
                  <Counter to={f.value} suffix={f.suffix} />
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{f.label}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <div className="rounded-2xl border border-mint/40 bg-mint/10 p-6">
              <p className="font-serif text-4xl text-mint text-mint-glow">Thousands</p>
              <p className="mt-3 text-sm text-muted-foreground">of Algorithms Learned</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact                                                                    */
/* -------------------------------------------------------------------------- */

function Contact() {
  return (
    <section id="contact" className="relative border-t border-border/60 py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="12 · Contact"
          title="Let's talk about ideas, cubes, or code."
          subtitle="I'm easiest to reach on email — the rest is where I share what I'm learning."
        />
        <div className="grid gap-12 lg:grid-cols-2">
          {SOCIAL_CATEGORIES.map((category) => (
            <div key={category.label}>
              <Reveal>
                <h3 className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-mint">
                  <span className="h-px w-6 bg-mint" />
                  {category.label}
                </h3>
              </Reveal>
              <div className="grid gap-3">
                {category.items.map((s, i) => (
                  <Reveal key={s.name} delay={i * 0.05}>
                    <a
                      id={s.id}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-border bg-card/50 px-6 py-5 transition-all hover:border-mint/60 hover:mint-glow sm:flex sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-mint/30 bg-mint/10 text-mint">
                          <s.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            {s.name}
                          </p>
                          <p className="truncate font-medium text-foreground">{s.value}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-mint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center sm:flex-row sm:text-left">
        <p className="font-serif italic text-muted-foreground">
          Designed with curiosity, discipline, and a passion for technology.
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          ©2026 SYED MUNTASIR
        </p>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Root                                                                       */
/* -------------------------------------------------------------------------- */

export function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Loader />
      <CursorGlow />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Education />
        <Certifications />
        <Skills />
        <Cubing />
        <Leadership />
        <Achievements />
        <Projects />
        <Interests />
        <Goals />
        <Quotes />
        <Facts />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback, useId } from "react";
import { ContactSection } from "../components/ContactSection";
import { Journey } from "../components/Journey";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Terminal, TypingAnimation, AnimatedSpan } from "../components/Terminal";
import { ArrowUp, Instagram, Facebook } from "lucide-react";
import { EditableBlock } from "../components/EditableBlock";
import { Marquee } from "../components/Marquee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import LottieReact from "lottie-react";
const Lottie = (LottieReact as any).default || LottieReact;
import aboutLottie from "../assets/about.json";
import ninjaLottie from "../assets/ninja.json";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
  type Variants,
} from "motion/react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iManipur — Independent Initiative for Manipur" },
      {
        name: "description",
        content:
          "iManipur is an independent initiative advancing culture, education, and innovation for Manipur.",
      },
      { property: "og:title", content: "iManipur — Independent Initiative for Manipur" },
      {
        property: "og:description",
        content: "Preserving knowledge. Inspiring learning. Building the future.",
      },
    ],
  }),
  component: Index,
});

/* ─── Data ──────────────────────────────────────────────── */

const ABOUT_DEFAULT_HTML = `<p>Every generation inherits knowledge. Some of it is written. Some of it is remembered. Some exists only in stories, traditions, languages, and the people who carry them forward.</p><p>When knowledge is preserved, a society grows stronger. When it is forgotten, something irreplaceable disappears.</p><p>iManipur exists to help ensure that knowledge continues. We are an independent initiative bringing together educators, researchers, artists, technologists, designers, historians, and creators to build projects that contribute to the cultural, educational, and creative development of Manipur.</p><p>Rather than operating within a single discipline, we work across culture, education, research, design, and technology. This interdisciplinary approach allows us to build initiatives that are locally relevant, thoughtfully designed, and valuable over the long term.</p><blockquote>Our work is rooted in Manipur, but its purpose is timeless: To help knowledge move from one generation to the next.</blockquote>`;

const pillars = [
  {
    no: "01",
    tag: "Culture",
    symbol: "◈",
    title: "Knowledge begins with identity",
    body: "We preserve the stories, traditions, languages, art, and historical narratives that define Manipur. By documenting and sharing cultural knowledge, we help ensure that future generations inherit more than memories—they inherit understanding.",
    points: [
      "Document oral traditions & folk tales",
      "Archive historical narratives",
      "Celebrate Manipuri art forms",
    ],
  },
  {
    no: "02",
    tag: "Education",
    symbol: "◎",
    title: "Knowledge grows when it is shared",
    body: "We create opportunities for learning through educational resources, mentorship, research, workshops, and collaborative initiatives that encourage curiosity and lifelong learning. Education is a continuous process of discovering, questioning, and contributing.",
    points: [
      "Mentorship & knowledge sharing",
      "Open learning resources",
      "Skill-building workshops",
    ],
  },
  {
    no: "03",
    tag: "Innovation",
    symbol: "◇",
    title: "Knowledge creates progress",
    body: "Innovation is most meaningful when it responds to real needs and reflects local context. We explore technology, design, creative media, and interdisciplinary collaboration to build practical solutions that contribute to the future of Manipur.",
    points: [
      "Community-first digital tools",
      "Creative storytelling media",
      "Local problem-solving",
    ],
  },
];

const projects = [
  {
    title: "Manipur Historical Animation",
    status: "In Progress" as const,
    pillar: "History",
    image: "/assets/Historical-Animation.png",
    description:
      "An animation project honoring the 13th August Patriots' Day and our Fallen Heroes. Bringing Manipur's rich history to life through visual storytelling.",
    href: "#projects",
  },
  {
    title: "Folk Stories of Manipur",
    status: "In Progress" as const,
    pillar: "Story",
    image: "/assets/project-image.png",
    description:
      "Collecting and retelling the folk tales passed down through generations in Manipur — preserving oral traditions through modern media and illustration.",
    href: "#projects",
  },
  {
    title: "Historical Stories Collection",
    status: "Coming Soon" as const,
    pillar: "Culture",
    image: "/assets/Stories-Collection.jpeg",
    description:
      "A growing archive of lesser-known historical narratives from Manipur — stories of communities, places, and events that deserve to be remembered.",
    href: "#projects",
  },
];

const principles = [
  {
    k: "Research",
    v: "Thoughtful work begins with understanding. We take time to learn, document, verify, and listen before creating solutions.",
    symbol: "◬",
  },
  {
    k: "Integrity",
    v: "Accuracy matters more than attention. We value careful research, honest representation, and responsible storytelling over popularity.",
    symbol: "⟁",
  },
  {
    k: "Stewardship",
    v: "We are not interested in short-lived projects. Every initiative is designed to remain useful and valuable for years to come.",
    symbol: "◫",
  },
  {
    k: "Collaboration",
    v: "Great work rarely happens in isolation. We bring together diverse perspectives because they produce stronger outcomes.",
    symbol: "◌",
  },
  {
    k: "Accessibility",
    v: "Knowledge should not be hidden behind barriers. We strive to present ideas in ways that are understandable and open to everyone.",
    symbol: "◒",
  },
  {
    k: "Rootedness",
    v: "Our work begins with Manipur. Being locally grounded enables us to contribute meaningfully while remaining open to global ideas.",
    symbol: "◎",
  },
];

const faqs = [
  {
    q: "What is iManipur?",
    a: "iManipur is an independent initiative from Manipur focused on cultural preservation, education, and innovation. We work on projects that preserve knowledge and build for the future.",
  },
  {
    q: "How can I contribute?",
    a: "We welcome collaborators — whether you're a writer, artist, educator, developer, or simply someone who cares about Manipur. Reach out to us via email and tell us what you'd like to work on.",
  },
  {
    q: "Who funds iManipur?",
    a: "iManipur is currently self-funded by its contributors. We are open to partnerships and support that align with our values and long-term vision.",
  },
  {
    q: "Where is iManipur based?",
    a: "The iManipur team is rooted in Manipur, but our contributors are spread out in different parts of the world, collaborating remotely.",
  },
  {
    q: "Can I join the initiative?",
    a: "Yes. We're always looking for people who share our values — people who care about Manipur and want to contribute through culture, education, or creative work. Get in touch.",
  },
  {
    q: "Is iManipur open to new contributors?",
    a: "Absolutely. We are always looking for researchers, artists, developers, and educators who care about Manipur to collaborate with us. Reach out via email.",
  },
];

const teamMembers = [
  { name: "Oliver Oinam", desc: "Founder & Technologist", image: "/team/oliver-oinam.png" },
  { name: "Basanta Haobijam", desc: "Founder & Academician", image: "/team/basanta.png" },
  {
    name: "Rajbobo Khumukcham",
    desc: "Founder & Content Creator",
    image: "/team/rajbobo.png",
    imgClass: "object-[50%_15%]",
  },
  {
    name: "Harishore Tourangbam",
    desc: "Founder & Academician",
    image: "/team/Harishore.png",
    imgClass: "object-[50%_15%]",
  },
  {
    name: "Rimba Thoudam",
    desc: "Digital Illustrator & Artist",
    image: "/team/rimba.png",
    imgClass: "object-[50%_15%]",
  },
  { name: "Preeti Yumnam", desc: "Singer & Creative Artist", image: "/team/preeti.png" },
];

const stats = [
  { value: "6", label: "Team Members" },
  { value: "3", label: "Focus Areas" },
  { value: "3", label: "Active Projects" },
  { value: "∞", label: "Commitment" },
];

/* ─── Animation Variants ────────────────────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 24 },
  },
};

/* ─── Section Rule Component ─────────────────────────────── */

function SectionRule() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="section-rule mx-auto"
    />
  );
}

/* ─── FAQ Item Component ─────────────────────────────────── */

/* ─── Navbar ─────────────────────────────────────────────── */

/* ─── Main Page ─────────────────────────────────────────── */

function Index() {
  const [terminalKey, setTerminalKey] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { scrollY } = useScroll();
  const replayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (replayTimerRef.current) clearTimeout(replayTimerRef.current);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowTopBtn(latest > 500);
  });

  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        id="about"
        className="relative overflow-hidden border-b border-border bg-hero-gradient"
      >
        {/* Animated grid background — adapted from ali imam hero-01 */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-10 dark:opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, var(--gold-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--gold-primary) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            maskImage: `repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 8px), radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)`,
            WebkitMaskImage: `repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 8px), radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)`,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        {/* Radial glow at bottom — adapted from ali imam hero-01 */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 10%, transparent 40%, var(--gold-primary) 100%)",
            opacity: 0.07,
          }}
        />
        {/* Parallax Dot-grid background */}
        <motion.div
          style={{ y: heroY, opacity }}
          className="pointer-events-none absolute inset-0 dot-bg mix-blend-overlay opacity-5"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative mx-auto flex max-w-[1200px] flex-col items-center px-5 pb-20 pt-[120px] text-center md:px-8 md:pb-36 md:pt-[200px]"
        >
          <motion.p variants={itemVariants} className="label-mono text-primary/70">
            Independent Initiative · Manipur
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[3.5rem]"
          >
            Preserving Manipur's knowledge for the next generation.{" "}
            <span className="inline-block text-gradient-primary pb-1">Building the future.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl text-[16px] leading-relaxed text-muted-foreground/80"
          >
            iManipur is an independent initiative advancing culture, education, and innovation for
            Manipur through research, storytelling, and technology.
          </motion.p>

          {/* Animated Terminal */}
          <motion.div variants={itemVariants} className="mt-10 w-full max-w-xl">
            <Terminal
              key={terminalKey}
              title="imanipur.sh"
              onComplete={() => {
                if (replayTimerRef.current) clearTimeout(replayTimerRef.current);
                replayTimerRef.current = setTimeout(() => setTerminalKey((prev) => prev + 1), 3000);
              }}
            >
              <TypingAnimation className="font-mono text-sm text-muted-foreground">
                {"$ imanipur start"}
              </TypingAnimation>
              <AnimatedSpan className="font-mono text-sm text-muted-foreground">
                <span>&gt; loading: folk tales archive</span>
              </AnimatedSpan>
              <AnimatedSpan className="font-mono text-sm text-muted-foreground">
                <span>&gt; loading: historical resources</span>
              </AnimatedSpan>
              <AnimatedSpan className="font-mono text-sm text-muted-foreground">
                <span>[OK] Core initiatives loaded...</span>
              </AnimatedSpan>
              <AnimatedSpan className="font-mono text-sm text-muted-foreground">
                <span>[OK] Education framework ready.</span>
              </AnimatedSpan>
              <AnimatedSpan className="font-mono text-sm text-muted-foreground">
                <span>[OK] Culture preserved.</span>
              </AnimatedSpan>
              <TypingAnimation className="mt-2 font-mono text-sm font-semibold text-primary">
                {"Building for Manipur."}
              </TypingAnimation>
            </Terminal>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#culture"
              className="btn-shimmer inline-flex items-center gap-2 rounded-none px-5 py-2.5 font-semibold text-[11px] tracking-[0.14em] uppercase text-primary-foreground"
            >
              Our pillars
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="inline-flex items-center gap-2 rounded-none border border-border px-5 py-2.5 font-semibold text-[11px] tracking-[0.14em] uppercase text-foreground/80 transition-all duration-200 hover:border-primary/60 hover:text-foreground"
            >
              Our projects
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div variants={itemVariants} className="mt-16 flex flex-col items-center gap-1">
            <div className="h-12 w-px bg-gradient-to-b from-primary/40 to-transparent" />
            <span className="font-semibold text-[10px] tracking-[0.18em] uppercase text-muted-foreground/50">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Marquee ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="border-b border-t border-border bg-card/40 py-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <Marquee gap="60px" speed={30} pauseOnHover>
          {[
            "Culture",
            "Education",
            "Innovation",
            "Manipur",
            "Heritage",
            "Language",
            "Research",
            "Technology",
            "Future",
            "Community",
            "Identity",
            "Stories",
          ].map((word) => (
            <span
              key={word}
              className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground/60 select-none"
            >
              <span className="text-primary/50 mr-4">◈</span>
              {word}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── Content Wrapper ──────────────────────────────── */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* ── About ──────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
          className="py-20"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="flex flex-col items-center">
              <p className="label-mono text-primary/70">Built for Manipur</p>
            </div>
            <div className="mt-14 w-full text-left">
              <EditableBlock
                slug="homepage-about"
                defaultHtml={ABOUT_DEFAULT_HTML}
                className="prose-p:mb-8 prose-p:leading-[1.85] prose-p:text-[1.1rem] prose-p:first-of-type:text-2xl md:prose-p:first-of-type:text-3xl prose-p:first-of-type:font-display prose-p:first-of-type:text-foreground prose-p:first-of-type:leading-snug prose-blockquote:font-display prose-blockquote:text-3xl md:prose-blockquote:text-4xl prose-blockquote:not-italic prose-blockquote:text-foreground prose-blockquote:border-l-primary prose-blockquote:py-4 prose-blockquote:my-12 prose-blockquote:px-8 prose-blockquote:leading-tight"
              />
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-10 overflow-hidden rounded-none border border-border"
            >
              <div className="w-full bg-muted/20 flex items-center justify-center p-8">
                <Lottie
                  animationData={aboutLottie}
                  loop={true}
                  className="w-full max-w-xs opacity-80 mix-blend-screen"
                />
              </div>
            </motion.div>

            {/* Stats row */}
            <div className="mt-14 grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group flex flex-col items-center gap-2 rounded-none border border-border bg-card px-4 py-6 transition-colors duration-200 hover:border-primary/30 hover:bg-accent/20"
                >
                  <span className="font-display text-3xl font-bold text-primary transition-colors duration-200">
                    {s.value}
                  </span>
                  <span className="font-semibold text-[10px] tracking-[0.16em] uppercase text-muted-foreground/70">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <SectionRule />

        {/* ── Pillars ────────────────────────────────────── */}
        <motion.section
          id="culture"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={gridContainerVariants}
          className="scroll-mt-20 py-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <p className="label-mono text-primary/70">What we care about</p>
            <h2 className="mt-4 text-foreground">
              Three pillars, <span className="text-primary block sm:inline">one intention.</span>
            </h2>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
              Work that is grounded in place — culture, learning, and ideas that serve Manipur.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-none border border-border bg-border md:grid-cols-3">
            {pillars.map((p) => (
              <motion.article
                key={p.tag}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="scroll-mt-24 flex flex-col items-start text-left group relative overflow-hidden bg-card p-8 md:p-10"
              >
                {/* Decorative number */}
                <span className="pointer-events-none absolute right-4 bottom-4 font-display text-[8rem] font-bold leading-none text-foreground/[0.03] select-none">
                  {p.no}
                </span>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />

                {/* Symbol + Tag */}
                <div className="relative flex flex-col items-start gap-3">
                  <span className="font-semibold text-2xl text-primary/60 transition-colors duration-200 group-hover:text-primary">
                    {p.symbol}
                  </span>
                  <p className="font-semibold text-[10px] tracking-[0.2em] uppercase text-primary/70">
                    {p.no} · {p.tag}
                  </p>
                </div>

                <h3 className="relative mt-6 text-foreground transition-colors duration-200 group-hover:text-primary">
                  {p.title}
                </h3>

                <p className="relative mt-4 text-[14px] leading-relaxed text-muted-foreground">
                  {p.body}
                </p>

                <ul className="relative mt-6 flex flex-col gap-2 text-left w-full">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2 text-[13px] text-muted-foreground/80"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-none bg-primary/50" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <SectionRule />

        {/* ── Projects ───────────────────────────────────── */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={gridContainerVariants}
          className="scroll-mt-20 py-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <p className="label-mono text-primary/70">What we're building</p>
            <h2 className="mt-4 text-foreground">
              Our <span className="text-primary">projects.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              Real work in progress — documenting, preserving, and telling the stories of Manipur
              through animation, illustration, and archival research.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {projects.map((proj) => (
              <motion.a
                href={proj.href || "#"}
                key={proj.title}
                variants={itemVariants}
                className="group flex flex-col overflow-hidden rounded-none border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-[var(--shadow-glow)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-muted/20">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-5">
                    <span className="font-semibold text-[10px] tracking-[0.16em] uppercase text-primary">
                      {proj.pillar}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[16px] font-medium text-foreground group-hover:text-primary transition-colors">
                      {proj.title}
                    </h3>
                    <span
                      className={[
                        "px-2 py-0.5 rounded-none text-[9px] font-semibold tracking-[0.1em] uppercase border",
                        proj.status === "In Progress"
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-muted-foreground/30 bg-muted/30 text-muted-foreground",
                      ].join(" ")}
                    >
                      {proj.status}
                    </span>
                  </div>
                  <p className="mt-3 mb-4 text-[13px] leading-relaxed text-muted-foreground flex-1">
                    {proj.description}
                  </p>
                  <div className="mt-auto flex items-center gap-1 font-semibold text-[11px] tracking-[0.12em] uppercase text-primary transition-colors hover:text-primary/80">
                    View project <ArrowUp className="h-3 w-3 rotate-45" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        <SectionRule />

        {/* ── How we work ────────────────────────────────── */}
        <motion.section
          id="how-we-work"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={gridContainerVariants}
          className="scroll-mt-20 py-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <p className="label-mono text-primary/70">Our Principles</p>
            <h2 className="mt-4 text-foreground">
              Building for the <span className="text-primary block sm:inline">long term.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              We focus on creating work that is accurate, accessible, and built to endure.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((row) => (
              <motion.div
                key={row.k}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group flex flex-col items-start gap-4 rounded-none border border-border bg-card px-6 py-10 text-left transition-colors duration-200 hover:border-primary/30 hover:bg-accent/30"
              >
                <span className="font-semibold text-xl text-primary/40 transition-colors duration-200 group-hover:text-primary/70">
                  {row.symbol}
                </span>
                <span className="font-semibold text-[12px] tracking-[0.18em] uppercase text-primary/70 transition-colors duration-200 group-hover:text-primary">
                  {row.k}
                </span>
                <p className="text-[14px] leading-relaxed text-foreground/80 transition-colors duration-200 group-hover:text-foreground">
                  {row.v}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <SectionRule />

        {/* ── Timeline ───────────────────────────────────── */}
        <Journey />

        <SectionRule />

        {/* ── Team ───────────────────────────────────────── */}
        <motion.section
          id="team"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={gridContainerVariants}
          className="scroll-mt-20 py-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <p className="label-mono text-primary/70">The Initiative</p>
            <h2 className="mt-4 text-foreground">
              Our <span className="text-primary block sm:inline">contributors.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              We are an independent group of individuals working together to build and support
              projects that matter to Manipur.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-none border border-border bg-card px-6 py-8 text-center transition-all duration-300 hover:border-t-primary/70 hover:shadow-[inset_0_40px_100px_rgba(202,146,29,0.02)]"
              >
                {/* Cartographic Crosshairs */}
                <div className="absolute -left-1 -top-1 h-2.5 w-2.5 border-l border-t border-primary/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -right-1 -top-1 h-2.5 w-2.5 border-r border-t border-primary/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -bottom-1 -left-1 h-2.5 w-2.5 border-b border-l border-primary/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 border-b border-r border-primary/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {member.image ? (
                  // Real Photo Portrait
                  <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-none border border-border bg-primary/10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-primary/50 group-hover:shadow-[inset_0_0_15px_rgba(202,146,29,0.1)]">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className={`h-full w-full object-cover opacity-80 mix-blend-luminosity transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:opacity-100 group-hover:mix-blend-normal ${member.imgClass || ""}`}
                    />
                  </div>
                ) : (
                  // Barcode Graphic
                  <div className="relative flex h-10 w-24 items-center justify-center overflow-hidden rounded-none border border-border bg-[#000] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-primary/50 group-hover:shadow-[inset_0_0_15px_rgba(202,146,29,0.1)]">
                    <img
                      src="/barcode.png"
                      alt=""
                      className="h-full w-full object-cover opacity-60 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                )}

                <div className="flex flex-col items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  <h3 className="text-[15px] font-medium text-foreground/90 transition-colors duration-200 group-hover:text-foreground">
                    {member.name}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground/60 transition-colors duration-200 group-hover:text-primary">
                    {member.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <SectionRule />

        {/* ── Mission ────────────────────────────────────── */}
        <motion.section
          id="mission"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
          className="scroll-mt-20 py-20"
        >
          <div className="relative mx-auto flex max-w-4xl flex-col items-start overflow-hidden rounded-none border border-border bg-card p-6 text-left md:p-12 lg:p-16">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-none bg-primary/5 blur-[80px]" />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 -top-4 -translate-x-1/2 font-display text-[10rem] font-bold leading-none text-primary/[0.04] select-none"
            >
              "
            </div>
            <p className="relative label-mono text-primary/70">Mission</p>
            <blockquote className="relative mt-8 max-w-2xl text-[1.2rem] leading-relaxed text-foreground/90 md:text-[1.4rem]">
              Our mission is to preserve knowledge, strengthen education, and encourage innovation
              through projects that remain useful across generations.
            </blockquote>
            <div className="relative mt-10 flex flex-col items-start gap-5">
              <div className="h-px w-12 bg-primary/60" />
              <p className="font-semibold text-[12px] text-muted-foreground">
                We believe lasting impact comes from consistent effort, open collaboration, and a
                deep understanding of the place we serve.
              </p>
            </div>
          </div>
        </motion.section>

        <SectionRule />

        {/* ── Acknowledgement ────────────────────────────── */}
        <motion.section
          id="acknowledgement"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
          className="scroll-mt-20 py-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <p className="label-mono text-primary/70">Acknowledgement</p>
            <h2 className="mt-4 text-foreground">
              With deepest <span className="text-primary">gratitude.</span>
            </h2>
          </motion.div>
          <div className="mx-auto mt-14 flex max-w-4xl flex-col items-center md:flex-row gap-8">
            <motion.div variants={itemVariants} className="flex items-center justify-center">
              <div className="group relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-none border border-border bg-primary/10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-primary/50 hover:shadow-[inset_0_0_15px_rgba(202,146,29,0.1)]">
                <img
                  src="/team/indira.png"
                  alt="Indira Laisram"
                  className="h-full w-full object-cover object-[50%_15%] opacity-80 mix-blend-luminosity transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:opacity-100 group-hover:mix-blend-normal"
                />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex-1 space-y-5 text-[15px] leading-relaxed text-muted-foreground md:pl-16"
            >
              <p>
                This initiative exists because of the quiet, enduring efforts of people who believed
                in preserving our culture before we did. We owe a profound debt of gratitude to{" "}
                <strong>Indira Laisram</strong>, whose foundational work and extensive documentation
                provided the bedrock upon which iManipur stands. Her lifelong dedication to
                safeguarding our stories and traditions ensures that they survive not merely as
                memories, but as a living inheritance for the generations that follow.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <SectionRule />

        {/* ── FAQ ─────────────────────────────────────────── */}
        <motion.section
          id="faq"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={gridContainerVariants}
          className="scroll-mt-20 py-20"
        >
          {/* faq-02 two-column layout: heading left, accordion right */}
          <div className="mx-auto flex max-w-5xl flex-1 flex-col gap-6 lg:flex-row">
            {/* Left: Heading & support text */}
            <motion.div
              variants={itemVariants}
              className="flex w-full flex-col gap-4 lg:flex-1 lg:py-5"
            >
              <p className="label-mono text-primary/70">FAQ</p>
              <h2 className="mt-2 text-foreground text-4xl font-bold leading-tight tracking-tight">
                Common <span className="text-primary">questions.</span>
              </h2>
              <p className="mt-2 text-muted-foreground text-base leading-7">
                Things people usually want to know about iManipur.
              </p>
            </motion.div>

            {/* Right: Accordion */}
            <motion.div variants={itemVariants} className="w-full lg:flex-1">
              <Accordion type="single" collapsible className="-mb-1 w-full">
                {faqs.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="space-y-1 border-none"
                  >
                    <AccordionTrigger className="group flex w-full justify-between py-0 hover:no-underline">
                      <div className="bg-primary text-primary-foreground max-w-[90%] flex-1 cursor-pointer px-4 py-3 text-left text-base transition">
                        {item.q}
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="flex justify-start">
                      <div className="bg-muted text-muted-foreground max-w-[90%] px-4 py-3 text-base text-left">
                        {item.a}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </motion.section>

        <SectionRule />

        {/* ── Contact ────────────────────────────────────── */}
        <ContactSection />
      </div>

      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            type="button"
            aria-label="Scroll to top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-none bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer />
    </div>
  );
}

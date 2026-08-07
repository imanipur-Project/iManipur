import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback, useId } from "react";
import { ContactForm } from "../components/ContactForm";
import { Journey } from "../components/Journey";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Terminal, TypingAnimation, AnimatedSpan } from "../components/Terminal";
import { ArrowUp, Instagram, Facebook } from "lucide-react";
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
  },
  {
    title: "Folk Stories of Manipur",
    status: "In Progress" as const,
    pillar: "Story",
    image: "/assets/project-image.png",
    description:
      "Collecting and retelling the folk tales passed down through generations in Manipur — preserving oral traditions through modern media and illustration.",
  },
  {
    title: "Historical Stories Collection",
    status: "Coming Soon" as const,
    pillar: "Culture",
    image: "/assets/Stories-Collection.jpeg",
    description:
      "A growing archive of lesser-known historical narratives from Manipur — stories of communities, places, and events that deserve to be remembered.",
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
    symbol: "◈",
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
    q: "What technologies do you use?",
    a: "Our digital projects are built with modern web technologies. Our animation and storytelling work uses a mix of digital illustration, motion graphics, and traditional research methods.",
  },
];

const teamMembers = [
  { name: "Oliver Oinam", desc: "Founder & Tech Dept", image: "/team/oliver-oinam.png" },
  { name: "Basanta Haobijam", desc: "Founder & Academician", image: "/team/basanta.png" },
  {
    name: "Rajbobo Khumukcham",
    desc: "Founder, Educator & Content Creator",
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
    desc: "Digital Illustrator",
    image: "/team/rimba.png",
    imgClass: "object-[50%_15%]",
  },
  { name: "Preeti Yumnam", desc: "Singer, Writer & Creative Artist", image: "/team/preeti.png" },
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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <motion.div variants={itemVariants} className="group border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-200 hover:text-primary"
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
      >
        <span className="text-[15px] font-medium text-foreground/90 transition-colors duration-200 group-hover:text-primary">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-border text-primary/60 transition-colors duration-200 group-hover:border-primary/40 group-hover:text-primary"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[14px] leading-relaxed text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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
      <section id="about" className="relative overflow-hidden border-b border-border">
        {/* Parallax Dot-grid background */}
        <motion.div
          style={{ y: heroY, opacity }}
          className="pointer-events-none absolute inset-0 dot-bg"
        />

        {/* Radial amber glow at center */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px] animate-pulse" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative mx-auto flex max-w-[1200px] flex-col items-center px-5 pb-24 pt-[160px] text-center md:px-8 md:pb-36 md:pt-[200px]"
        >
          <motion.p variants={itemVariants} className="label-mono text-primary/70">
            Independent Initiative · Manipur
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[3.5rem]"
          >
            Preserving knowledge. Inspiring learning.{" "}
            <span className="inline-block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Building the future.
            </span>
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
                {"$ python3 init.py"}
              </TypingAnimation>
              <AnimatedSpan className="font-mono text-sm text-muted-foreground">
                <span>&gt; import imanipur</span>
              </AnimatedSpan>
              <AnimatedSpan className="font-mono text-sm text-muted-foreground">
                <span>&gt; imanipur.initialize()</span>
              </AnimatedSpan>
              <AnimatedSpan className="font-mono text-sm text-muted-foreground">
                <span>[OK] Core modules loaded...</span>
              </AnimatedSpan>
              <AnimatedSpan className="font-mono text-sm text-muted-foreground">
                <span>[OK] Education framework ready.</span>
              </AnimatedSpan>
              <AnimatedSpan className="font-mono text-sm text-muted-foreground">
                <span>[OK] Innovation engine online.</span>
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
              className="btn-shimmer inline-flex items-center gap-2 rounded-sm px-5 py-2.5 font-semibold text-[11px] tracking-[0.14em] uppercase text-primary-foreground"
            >
              What we care about
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 font-semibold text-[11px] tracking-[0.14em] uppercase text-foreground/80 transition-all duration-200 hover:border-primary/40 hover:bg-accent hover:text-foreground"
            >
              Our projects
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div variants={itemVariants} className="mt-16 flex flex-col items-center gap-3">
            <div className="h-12 w-px bg-gradient-to-b from-primary/40 to-transparent" />
            <span className="font-semibold text-[10px] tracking-[0.18em] uppercase text-muted-foreground/50">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </section>

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
              <p className="label-mono text-primary/70">Built for Manipur.</p>
              <div className="mt-4 h-px w-12 bg-primary/40" />
            </div>
            <div className="mt-10 space-y-6 text-[16px] leading-relaxed text-muted-foreground">
              <p>
                Every generation inherits knowledge. Some of it is written. Some of it is
                remembered. Some exists only in stories, traditions, languages, and the people who
                carry them forward.
              </p>
              <p>
                When knowledge is preserved, a society grows stronger. When it is forgotten,
                something irreplaceable disappears.
              </p>
              <p>
                iManipur exists to help ensure that knowledge continues. We are an independent
                initiative bringing together educators, researchers, artists, technologists,
                designers, historians, and creators to build projects that contribute to the
                cultural, educational, and creative development of Manipur.
              </p>
              <p>
                Rather than operating within a single discipline, we work across culture, education,
                research, design, and technology. This interdisciplinary approach allows us to build
                initiatives that are locally relevant, thoughtfully designed, and valuable over the
                long term.
              </p>
              <div className="flex justify-center pt-2">
                <p className="max-w-2xl border-b border-t border-primary/20 py-6 text-[15px] italic text-foreground/80">
                  Our work is rooted in Manipur, but its purpose is timeless: To help knowledge move
                  from one generation to the next.
                </p>
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-10 overflow-hidden rounded-sm border border-border"
            >
              <div className="aspect-[4/3] w-full bg-muted/20 flex items-center justify-center p-8">
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
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group flex flex-col items-center gap-2 rounded-sm border border-border bg-card px-4 py-6 transition-colors duration-200 hover:border-primary/30 hover:bg-accent/20"
                >
                  <span className="font-display text-3xl font-bold text-primary transition-transform duration-200 group-hover:scale-110">
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

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
            {pillars.map((p) => (
              <motion.article
                key={p.tag}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="scroll-mt-24 flex flex-col items-center text-center group relative overflow-hidden bg-card p-8 md:p-10"
              >
                {/* Decorative number */}
                <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[12rem] font-bold leading-none text-foreground/[0.03] select-none">
                  {p.no}
                </span>

                {/* Top accent line */}
                <div className="absolute top-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-primary transition-all duration-500 group-hover:w-full" />

                {/* Symbol + Tag */}
                <div className="relative flex flex-col items-center gap-3">
                  <span className="font-semibold text-2xl text-primary/60 transition-colors duration-200 group-hover:text-primary">
                    {p.symbol}
                  </span>
                  <p className="font-semibold text-[10px] tracking-[0.2em] uppercase text-primary/70">
                    {p.no} · {p.tag}
                  </p>
                </div>

                {/* Title */}
                <h3 className="relative mt-6 text-foreground transition-colors duration-200 group-hover:text-primary">
                  {p.title}
                </h3>

                {/* Body */}
                <p className="relative mt-4 text-[14px] leading-relaxed text-muted-foreground">
                  {p.body}
                </p>

                {/* Sub-points */}
                <ul className="relative mt-6 flex flex-col gap-2 text-left w-full">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2 text-[13px] text-muted-foreground/80"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                      {pt}
                    </li>
                  ))}
                </ul>

                {/* Bottom arrow */}
                <div className="relative mt-8 flex items-center justify-center gap-2 font-semibold text-[10px] tracking-[0.14em] uppercase text-primary/0 transition-all duration-300 group-hover:text-primary/60">
                  <div className="h-px w-4 bg-primary/0 transition-all duration-300 group-hover:w-6 group-hover:bg-primary/50" />
                  Learn more
                  <div className="h-px w-4 bg-primary/0 transition-all duration-300 group-hover:w-6 group-hover:bg-primary/50" />
                </div>
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
              <motion.div
                key={proj.title}
                variants={itemVariants}
                className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-[var(--shadow-glow)]"
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
                        "px-2 py-0.5 rounded-sm text-[9px] font-semibold tracking-[0.1em] uppercase border",
                        proj.status === "In Progress"
                          ? "border-primary/20 bg-primary/5 text-primary"
                          : "border-teal/20 bg-teal/5 text-teal",
                      ].join(" ")}
                    >
                      {proj.status}
                    </span>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground flex-1">
                    {proj.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-foreground/50 group-hover:text-primary transition-colors">
                    Explore project →
                  </div>
                </div>
              </motion.div>
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
                className="group flex flex-col items-center gap-4 rounded-sm border border-border bg-card px-6 py-10 text-center transition-colors duration-200 hover:border-primary/30 hover:bg-accent/30"
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
                className="group flex h-[220px] flex-col items-center justify-center gap-4 rounded-sm border border-border bg-card px-6 py-8 text-center transition-colors duration-200 hover:border-primary/30 hover:bg-accent/30 hover:shadow-[var(--shadow-glow)]"
              >
                {member.image ? (
                  // Real Photo Portrait
                  <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-sm border border-primary/20 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-primary/50 group-hover:shadow-[var(--shadow-glow)]">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className={`h-full w-full object-cover grayscale transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:grayscale-0 ${member.imgClass || ""}`}
                    />
                  </div>
                ) : (
                  // Barcode Graphic
                  <div className="relative flex h-10 w-24 items-center justify-center overflow-hidden rounded-sm border border-primary/20 bg-[#000] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-primary/50 group-hover:shadow-[var(--shadow-glow)]">
                    <img
                      src="/barcode.png"
                      alt=""
                      className="h-full w-full object-cover opacity-60 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                )}

                <div className="flex flex-col items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  <h3 className="text-[15px] font-medium text-foreground/90 transition-colors duration-200 group-hover:text-primary">
                    {member.name}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground/60">
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
          <div className="relative mx-auto flex max-w-4xl flex-col items-center overflow-hidden rounded-sm border border-border bg-card p-8 text-center md:p-16">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[80px]" />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 font-display text-[10rem] font-bold leading-none text-primary/[0.04] select-none"
            >
              "
            </div>
            <p className="relative label-mono text-primary/70">Mission</p>
            <blockquote className="relative mt-8 max-w-2xl text-[1.2rem] leading-relaxed text-foreground/90 md:text-[1.4rem]">
              Our mission is to preserve knowledge, strengthen education, and encourage innovation
              through projects that remain useful across generations.
            </blockquote>
            <div className="relative mt-10 flex flex-col items-center gap-5">
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
          <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center text-center">
            <motion.p
              variants={itemVariants}
              className="text-[16px] leading-relaxed text-muted-foreground"
            >
              We would like to express our deepest and most sincere gratitude to{" "}
              <span className="font-medium text-foreground">Eche Indira Laishram</span> for her
              invaluable support, guidance, and encouragement throughout this journey. Her belief in
              this project, along with her constant willingness to help, has played a meaningful
              role in bringing this book to life and to publication.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-[16px] leading-relaxed text-muted-foreground"
            >
              This book would not have reached its launch in the same way without her generous
              presence, thoughtful advice, and unwavering support. We are truly humbled by her
              contribution, and we carry forward her encouragement with great appreciation and
              respect.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-[16px] leading-relaxed text-muted-foreground"
            >
              Her support reminded us that every meaningful story is also shaped by the people who
              stand beside it with patience, trust, and care. With heartfelt thanks, we dedicate
              this achievement to her kindness and to the spirit of encouragement she shared with
              us.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-12 flex items-center justify-center">
              <div className="group relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-sm border border-primary/20 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-primary/50 hover:shadow-[var(--shadow-glow)]">
                <img
                  src="/team/indira.png"
                  alt="Eche Indira Laishram"
                  className="h-full w-full object-cover object-[50%_15%] grayscale transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:grayscale-0"
                />
              </div>
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
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <p className="label-mono text-primary/70">FAQ</p>
            <h2 className="mt-4 text-foreground">
              Common <span className="text-primary">questions.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              Things people usually want to know about iManipur.
            </p>
          </motion.div>

          <div className="mx-auto mt-14 max-w-2xl rounded-sm border border-border bg-card px-6 md:px-10">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </motion.section>

        <SectionRule />

        {/* ── Contact ────────────────────────────────────── */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="scroll-mt-20 py-20"
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <p className="label-mono text-primary/70">Get in touch</p>
            <h2 className="mt-4 text-foreground">
              Let's work on <span className="text-primary block sm:inline">Manipur</span> together.
            </h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
              If you are working on something for Manipur — in culture, education, or a new idea —
              we would like to hear about it.
            </p>

            {/* Main Interactive Panel */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="panel mt-12 flex w-full flex-col items-center rounded-sm p-10 hover:border-primary/40 hover:bg-accent/20 transition-colors duration-300"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 mb-6">
                Reach us at
              </p>

              <div className="flex w-full flex-col sm:flex-row justify-center gap-12 sm:gap-20">
                <div className="flex flex-col items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground/50">
                    Email
                  </span>
                  <a
                    href="mailto:heyimanipur@gmail.com"
                    className="text-[1.2rem] font-medium text-foreground transition-colors duration-200 hover:text-primary"
                  >
                    heyimanipur@gmail.com
                  </a>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground/50">
                    Phone
                  </span>
                  <div className="flex flex-col items-center gap-1">
                    <a
                      href="tel:+919612055277"
                      className="text-[1.1rem] font-medium text-foreground transition-colors duration-200 hover:text-primary"
                    >
                      +91 96120 55277
                    </a>
                    <a
                      href="tel:+917982284458"
                      className="text-[1.1rem] font-medium text-foreground transition-colors duration-200 hover:text-primary"
                    >
                      +91 79822 84458
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex w-full max-w-[240px] flex-col items-center border-t border-border pt-8">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground/50">
                  We respond within
                </p>
                <p className="mt-2 font-mono text-[13px] text-foreground/70">
                  A few days, usually sooner.
                </p>
              </div>
            </motion.div>

            {/* Contact Form Panel */}
            <motion.div
              variants={itemVariants}
              className="panel mt-6 flex w-full flex-col rounded-sm p-8 sm:p-10 text-left"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 mb-6 text-center">
                Send a message
              </p>
              <ContactForm />
            </motion.div>

            {/* Stay connected */}
            <div className="mt-12 flex w-full flex-col items-center rounded-sm border border-dashed border-border p-8">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground/60">
                Stay connected
              </p>
              <p className="mt-3 text-[14px] text-muted-foreground">
                Follow our journey and get updates on new projects.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://instagram.com/imanipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-foreground"
                >
                  <Instagram size={14} strokeWidth={1.5} /> Instagram
                </a>
                <a
                  href="https://facebook.com/imanipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-foreground"
                >
                  <Facebook size={14} strokeWidth={1.5} /> Facebook
                </a>
              </div>
            </div>
          </div>
        </motion.section>
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
            className="fixed bottom-8 right-8 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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

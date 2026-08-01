import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback, useId } from "react";
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
      { title: "iManipur — Cultural, Educational & Innovative Projects" },
      {
        name: "description",
        content:
          "iManipur is a community from Manipur working on simple, meaningful projects that support learning, culture, and new ideas.",
      },
      { property: "og:title", content: "iManipur — Cultural, Educational & Innovative Projects" },
      {
        property: "og:description",
        content:
          "A small team from Manipur doing honest work: culture, education, and grounded innovation.",
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
    title: "Preserve what matters",
    body: "We care about preserving and presenting the stories, identity, and heritage of Manipur in ways that remain accessible to future generations.",
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
    title: "Support learning",
    body: "We support learning through practical, community-focused work that helps people grow their skills, confidence, and curiosity.",
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
    title: "Build useful ideas",
    body: "We work on new ideas and projects that are useful, grounded, and relevant to Manipur.",
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
    pillar: "Culture",
    description:
      "An animation project bringing Manipur's rich history to life through visual storytelling — documenting key historical events, rulers, and moments that shaped the land.",
  },
  {
    title: "Folk Stories of Manipur",
    status: "In Progress" as const,
    pillar: "Culture",
    description:
      "Collecting and retelling the folk tales passed down through generations in Manipur — preserving oral traditions through modern media and illustration.",
  },
  {
    title: "Historical Stories Collection",
    status: "Coming Soon" as const,
    pillar: "Culture",
    description:
      "A growing archive of lesser-known historical narratives from Manipur — stories of communities, places, and events that deserve to be remembered.",
  },
];

const principles = [
  { k: "Scope", v: "We are not trying to do everything.", symbol: "◬" },
  { k: "Method", v: "We learn, build, collaborate, and improve as we go.", symbol: "⟁" },
  { k: "Pace", v: "Steady and practical, never rushed for show.", symbol: "◫" },
  { k: "Voice", v: "Meaningful work does not need to be loud to matter.", symbol: "◌" },
  { k: "Roots", v: "Everything we build starts from understanding this place.", symbol: "◈" },
  { k: "People", v: "We put community before metrics, connection before reach.", symbol: "◎" },
];

const timeline = [
  {
    year: "2024",
    label: "Idea Formed",
    desc: "The idea of building a community around Manipur's culture and education took shape.",
  },
  {
    year: "2025",
    label: "iManipur Founded",
    desc: "The team came together, and iManipur was officially established as a working community.",
  },
  {
    year: "2025",
    label: "Animation Project Begins",
    desc: "Work started on the Manipur Historical Animation — bringing history to life through visual storytelling.",
  },
  {
    year: "2025",
    label: "Folk Stories Initiative",
    desc: "Began collecting and retelling Manipuri folk tales through modern media and illustration.",
  },
  {
    year: "2026",
    label: "Growing Forward",
    desc: "Expanding our projects, welcoming new collaborators, and deepening our cultural archive.",
  },
];

const faqs = [
  {
    q: "What is iManipur?",
    a: "iManipur is a community-driven initiative from Manipur focused on cultural preservation, education, and innovation. We work on projects that are honest, useful, and locally relevant.",
  },
  {
    q: "How can I contribute?",
    a: "We welcome collaborators — whether you're a writer, artist, educator, developer, or simply someone who cares about Manipur. Reach out to us via email and tell us what you'd like to work on.",
  },
  {
    q: "Who funds iManipur?",
    a: "iManipur is currently self-funded by its members. We are a volunteer-driven community. We are open to partnerships and support that align with our values.",
  },
  {
    q: "Where is iManipur based?",
    a: "We are based in Manipur, India. Our team members work from different parts of the state, collaborating remotely and in person.",
  },
  {
    q: "Can I join the team?",
    a: "Yes. We're always looking for people who share our values — people who care about Manipur and want to contribute through culture, education, or creative work. Get in touch.",
  },
  {
    q: "What technologies do you use?",
    a: "Our digital projects are built with modern web technologies. Our animation and storytelling work uses a mix of digital illustration, motion graphics, and traditional research methods.",
  },
];

const teamMembers = [
  { name: "Oliver Oinam", desc: "Tech Dept" },
  { name: "Basanta Haobijam", desc: "Educator" },
  { name: "Rajbobo Khumukcham", desc: "Educator & Content Creator" },
  { name: "Harishsor Tourangbam", desc: "Educator" },
  { name: "Rimba Thoudam", desc: "Digital Illustrator" },
  { name: "Preety Yumnam", desc: "Singer, Writer & Creative Artist" },
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

const CONTACT_EMAIL = "hello@imanipur.org";
const GITHUB_URL = "https://github.com/imanipur-Project";

function Logo({ size = "sm" }: { size?: "sm" | "lg" }) {
  const badge = size === "lg" ? "h-8 w-8 text-[12px]" : "h-6 w-6 text-[10px]";
  return (
    <motion.span
      variants={{ hover: { rotate: 90, scale: 1.1, borderRadius: "50%" } }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`flex items-center justify-center rounded-sm bg-primary font-mono font-semibold text-primary-foreground transition-shadow duration-300 group-hover:shadow-[0_0_10px_-2px_var(--color-primary)] ${badge}`}
    >
      <motion.span variants={{ hover: { rotate: -90 } }}>iM</motion.span>
    </motion.span>
  );
}

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

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Close mobile menu on scroll
  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [mobileOpen]);

  const navLinks = ["About", "Culture", "Projects", "How we work", "Team", "FAQ"];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={[
        "sticky top-0 z-30 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)]"
          : "border-b border-transparent bg-transparent backdrop-blur-sm",
      ].join(" ")}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-5 md:px-8">
        <motion.a href="#about" className="group flex items-center gap-2.5" whileHover="hover">
          <Logo size="sm" />
          <span className="hidden font-mono text-[11px] tracking-[0.22em] uppercase text-foreground transition-colors duration-200 group-hover:text-primary sm:inline-block">
            iManipur
          </span>
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex absolute left-1/2 -translate-x-1/2">
          {navLinks.map((n) => (
            <a
              key={n}
              href={`#${n.toLowerCase().replace(/ /g, "-")}`}
              className="group relative font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {n}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-sm border border-primary/40 px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-primary transition-all duration-300 hover:border-primary/70 hover:bg-primary/10"
          >
            Contact →
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block h-px w-5 bg-foreground"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-5 bg-foreground"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block h-px w-5 bg-foreground"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col items-center gap-4 px-5 py-6">
              {navLinks.map((n) => (
                <a
                  key={n}
                  href={`#${n.toLowerCase().replace(/ /g, "-")}`}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-[12px] tracking-[0.14em] uppercase text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {n}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */

function Index() {
  const { scrollY } = useScroll();
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
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[80px]" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative mx-auto flex max-w-[1200px] flex-col items-center px-5 py-28 text-center md:px-8 md:py-36"
        >
          <motion.p variants={itemVariants} className="label-mono text-primary/70">
            Community · Manipur
          </motion.p>

          <motion.h1 variants={itemVariants} className="mt-6 max-w-4xl text-foreground">
            Building cultural, educational, and innovative projects{" "}
            <span className="text-primary block sm:inline">for Manipur.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-[16px] leading-relaxed text-muted-foreground"
          >
            iManipur is a community from Manipur working on simple, meaningful projects that support
            learning, culture, and new ideas.
          </motion.p>

          {/* Terminal block */}
          <motion.div
            variants={itemVariants}
            className="mt-10 w-full max-w-xl overflow-hidden rounded-sm border border-border bg-card text-left shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.18_25)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.75_0.18_78)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.15_140)]" />
              <div className="flex-1 text-center">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground/60">
                  imanipur.sh
                </span>
              </div>
              <div className="w-[30px]" />
            </div>
            <div className="p-5">
              <p className="font-mono text-[13px] leading-relaxed text-muted-foreground">
                <span className="text-primary font-medium">$</span> We are a small team focused on
                work that is honest, useful, and locally relevant. The goal is not to overpromise,
                but to create projects that matter to Manipur and the people here.
              </p>
              <p className="mt-2 font-mono text-[11px] text-primary/50 cursor-blink">ready</p>
            </div>
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
              className="btn-shimmer inline-flex items-center gap-2 rounded-sm px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase text-primary-foreground"
            >
              What we care about
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/80 transition-all duration-200 hover:border-primary/40 hover:bg-accent hover:text-foreground"
            >
              Our projects
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div variants={itemVariants} className="mt-16 flex flex-col items-center gap-3">
            <div className="h-12 w-px bg-gradient-to-b from-primary/40 to-transparent" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground/50">
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
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="py-20"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="flex flex-col items-center">
              <p className="label-mono text-primary/70">About</p>
              <div className="mt-4 h-px w-12 bg-primary/40" />
            </div>
            <div className="mt-10 space-y-6 text-[16px] leading-relaxed text-muted-foreground">
              <p>
                iManipur is a community from Manipur focused on cultural, educational, and
                innovative projects. We believe local ideas, local knowledge, and local talent
                matter.
              </p>
              <p>
                Our work is centered on creating useful projects, supporting learning, and exploring
                thoughtful ways to connect culture and innovation. Some of our work focuses on
                education. Some focuses on culture. Some explores new ideas that can be useful for
                people and communities in Manipur.
              </p>
              <div className="flex justify-center pt-2">
                <p className="max-w-2xl border-b border-t border-primary/20 py-6 text-[15px] italic text-foreground/80">
                  We are not trying to do everything. We want to do honest work that is relevant to
                  our place, our people, and our future.
                </p>
              </div>
            </div>

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
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground/70">
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
          viewport={{ once: true, margin: "-100px" }}
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
                  <span className="font-mono text-2xl text-primary/60 transition-colors duration-200 group-hover:text-primary">
                    {p.symbol}
                  </span>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary/70">
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
                <div className="relative mt-8 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-primary/0 transition-all duration-300 group-hover:text-primary/60">
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
          viewport={{ once: true, margin: "-100px" }}
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

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {projects.map((proj) => (
              <motion.div
                key={proj.title}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group flex flex-col rounded-sm border border-border bg-card p-8 transition-colors duration-200 hover:border-primary/30 hover:bg-accent/20 hover:shadow-[var(--shadow-glow)]"
              >
                {/* Status + Pillar */}
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-[0.1em] uppercase",
                      proj.status === "In Progress"
                        ? "bg-primary/15 text-primary"
                        : "bg-teal/15 text-teal",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "h-1.5 w-1.5 rounded-full",
                        proj.status === "In Progress" ? "bg-primary animate-pulse" : "bg-teal",
                      ].join(" ")}
                    />
                    {proj.status}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground/50">
                    {proj.pillar}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-5 text-foreground transition-colors duration-200 group-hover:text-primary">
                  {proj.title}
                </h3>

                {/* Description */}
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted-foreground">
                  {proj.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-primary/0 transition-all duration-300 group-hover:text-primary/60">
                  <div className="h-px w-0 bg-primary/50 transition-all duration-300 group-hover:w-6" />
                  Details coming soon
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
          viewport={{ once: true, margin: "-100px" }}
          variants={gridContainerVariants}
          className="scroll-mt-20 py-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <p className="label-mono text-primary/70">How we work</p>
            <h2 className="mt-4 text-foreground">
              Steady and <span className="text-primary">practical.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              We keep things simple. We care more about meaningful work than big claims.
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
                <span className="font-mono text-xl text-primary/40 transition-colors duration-200 group-hover:text-primary/70">
                  {row.symbol}
                </span>
                <span className="font-mono text-[12px] tracking-[0.18em] uppercase text-primary/70 transition-colors duration-200 group-hover:text-primary">
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
        <motion.section
          id="journey"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={gridContainerVariants}
          className="scroll-mt-20 py-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <p className="label-mono text-primary/70">Our journey</p>
            <h2 className="mt-4 text-foreground">
              How we <span className="text-primary">got here.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              From an idea to a working community — each step grounded in purpose.
            </p>
          </motion.div>

          <div className="relative mt-14 mx-auto max-w-2xl">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border to-transparent sm:left-1/2 sm:-translate-x-px" />

            {timeline.map((item, i) => (
              <motion.div
                key={`${item.year}-${item.label}`}
                variants={itemVariants}
                className={["relative flex gap-8 pb-12 last:pb-0", "sm:even:flex-row-reverse"].join(
                  " ",
                )}
              >
                {/* Dot */}
                <div className="absolute left-4 top-1 z-10 flex h-2.5 w-2.5 -translate-x-1/2 items-center justify-center sm:left-1/2">
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />
                </div>

                {/* Content */}
                <div
                  className={[
                    "ml-10 flex-1 sm:ml-0",
                    i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:text-left",
                  ].join(" ")}
                >
                  <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-primary/60">
                    {item.year}
                  </span>
                  <h3 className="mt-1 text-foreground">{item.label}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <SectionRule />

        {/* ── Team ───────────────────────────────────────── */}
        <motion.section
          id="team"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={gridContainerVariants}
          className="scroll-mt-20 py-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <p className="label-mono text-primary/70">The Team</p>
            <h2 className="mt-4 text-foreground">
              Our team <span className="text-primary block sm:inline">members.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              We are a dedicated group of individuals working together to build and support projects
              that matter to Manipur.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group flex flex-col items-center justify-center gap-4 rounded-sm border border-border bg-card px-6 py-8 text-center transition-colors duration-200 hover:border-primary/30 hover:bg-accent/30 hover:shadow-[var(--shadow-glow)]"
              >
                <div className="relative flex h-10 w-24 items-center justify-center overflow-hidden rounded-sm border border-primary/20 bg-[#000] transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[var(--shadow-glow)]">
                  <img
                    src="/barcode.png"
                    alt=""
                    className="h-full w-full object-cover opacity-60 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
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
          viewport={{ once: true, amount: 0.4 }}
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
              iManipur is a community from Manipur working on cultural, educational, and innovative
              projects. We care about preserving what matters, supporting learning, and building
              ideas that are useful for our people and our future.
            </blockquote>
            <div className="relative mt-10 flex flex-col items-center gap-5">
              <div className="h-px w-12 bg-primary/60" />
              <p className="font-mono text-[12px] text-muted-foreground">
                We are a small team — meaningful work does not need to be loud to matter.
              </p>
            </div>
          </div>
        </motion.section>

        <SectionRule />

        {/* ── FAQ ─────────────────────────────────────────── */}
        <motion.section
          id="faq"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
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
          viewport={{ once: true, amount: 0.3 }}
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

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="panel mt-12 flex w-full flex-col items-center rounded-sm p-10 hover:border-primary/40 hover:bg-accent/20 transition-colors duration-300"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60">
                Reach us at
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group mt-5 flex flex-col items-center gap-3 transition-opacity duration-200 hover:opacity-80"
              >
                <span className="text-[1.3rem] font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
                  {CONTACT_EMAIL}
                </span>
                <span className="font-mono text-primary transition-transform duration-200 group-hover:translate-y-1">
                  ↓
                </span>
              </a>

              <div className="mt-10 flex w-full max-w-[240px] flex-col items-center border-t border-border pt-8">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground/50">
                  We respond within
                </p>
                <p className="mt-2 font-mono text-[13px] text-foreground/70">
                  A few days, usually sooner.
                </p>
              </div>
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
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-foreground"
                >
                  GitHub
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-foreground"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="relative border-t border-border text-center">
        <div className="pointer-events-none absolute inset-x-0 -top-20 h-20 bg-gradient-to-b from-transparent to-background/60" />

        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 px-5 py-14 md:px-8">
          <motion.button
            type="button"
            whileHover="hover"
            className="flex flex-col items-center gap-4 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Logo size="lg" />
            <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-primary transition-colors duration-200 hover:text-primary/80">
              iManipur
            </span>
          </motion.button>

          <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground/60">
            A community from Manipur building honest, useful, and locally relevant projects in
            culture, education, and innovation.
          </p>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {["Culture", "Projects", "Team", "FAQ", "Contact"].map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted-foreground/60 transition-colors duration-200 hover:text-muted-foreground"
              >
                {n}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground/40 transition-colors duration-200 hover:text-primary"
            >
              GitHub
            </a>
            <span className="h-3 w-px bg-border" />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground/40 transition-colors duration-200 hover:text-primary"
            >
              Email
            </a>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="h-px w-12 bg-border" />
            <p className="font-mono text-[11px] text-muted-foreground/40">
              © {new Date().getFullYear()} iManipur
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

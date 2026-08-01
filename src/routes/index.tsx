import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";

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
} as any);

/* ─── Data ──────────────────────────────────────────────── */

const pillars = [
  {
    no: "01",
    tag: "Culture",
    title: "Preserve what matters",
    symbol: "◈",
    body: "We care about preserving and presenting the stories, identity, and heritage of Manipur in ways that remain accessible to future generations.",
  },
  {
    no: "02",
    tag: "Education",
    title: "Support learning",
    symbol: "◎",
    body: "We support learning through practical, community-focused work that helps people grow their skills, confidence, and curiosity.",
  },
  {
    no: "03",
    tag: "Innovation",
    title: "Build useful ideas",
    symbol: "◇",
    body: "We work on new ideas and projects that are useful, grounded, and relevant to Manipur.",
  },
];

const principles = [
  { k: "Scope", v: "We are not trying to do everything." },
  { k: "Method", v: "We learn, build, collaborate, and improve as we go." },
  { k: "Pace", v: "Steady and practical, never rushed for show." },
  { k: "Voice", v: "Meaningful work does not need to be loud to matter." },
];

const teamMembers = [
  "Oliver Oinam",
  "Basanta Haobijam",
  "Rajbobo Khumukcham",
  "Harishsor Tourangbam",
  "Rimba Thoudam",
  "Preety Yumnam",
];

/* ─── Animation Variants ────────────────────────────────── */

// Stagger orchestrator
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

// Standard spring reveal for items
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

/* ─── Navbar ─────────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = ["About", "Culture", "Education", "Innovation", "How we work"];

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
          <motion.span
            variants={{ hover: { rotate: 90, scale: 1.1, borderRadius: "50%" } }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary font-mono text-[10px] font-semibold text-primary-foreground transition-shadow duration-300 group-hover:shadow-[0_0_10px_-2px_var(--color-primary)]"
          >
            <motion.span variants={{ hover: { rotate: -90 } }}>iM</motion.span>
          </motion.span>
          <span className="hidden font-mono text-[11px] tracking-[0.22em] uppercase text-foreground transition-colors duration-200 group-hover:text-primary sm:inline-block">
            iManipur
          </span>
        </motion.a>

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

        <a
          href="#contact"
          className="group relative overflow-hidden rounded-sm border border-primary/40 px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-primary transition-all duration-300 hover:border-primary/70 hover:bg-primary/10"
        >
          Contact →
        </a>
      </div>
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
              href="#how-we-work"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/80 transition-all duration-200 hover:border-primary/40 hover:bg-accent hover:text-foreground"
            >
              How we work
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
          </div>
        </motion.section>

        {/* Section rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="section-rule mx-auto"
        />

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

                {/* Top accent line — animates on hover */}
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

        {/* Section rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="section-rule mx-auto"
        />

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

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((row) => (
              <motion.div
                key={row.k}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group flex flex-col items-center gap-4 rounded-sm border border-border bg-card px-6 py-10 text-center transition-colors duration-200 hover:border-primary/30 hover:bg-accent/30"
              >
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

        {/* Section rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="section-rule mx-auto"
        />

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
            {teamMembers.map((name) => (
              <motion.div
                key={name}
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
                <h3 className="text-[15px] font-medium text-foreground/90 transition-colors duration-200 group-hover:text-primary">
                  {name}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="section-rule mx-auto"
        />

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

        {/* Section rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="section-rule mx-auto"
        />

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
                href="mailto:hello@imanipur.org"
                className="group mt-5 flex flex-col items-center gap-3 transition-opacity duration-200 hover:opacity-80"
              >
                <span className="text-[1.3rem] font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
                  hello@imanipur.org
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
          </div>
        </motion.section>
      </div>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="relative border-t border-border text-center">
        <div className="pointer-events-none absolute inset-x-0 -top-20 h-20 bg-gradient-to-b from-transparent to-background/60" />

        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 px-5 py-14 md:px-8">
          <motion.div
            whileHover="hover"
            className="flex flex-col items-center gap-4 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <motion.span
              variants={{ hover: { rotate: 90, scale: 1.1, borderRadius: "50%" } }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary font-mono text-[12px] font-semibold text-primary-foreground"
            >
              <motion.span variants={{ hover: { rotate: -90 } }}>iM</motion.span>
            </motion.span>
            <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-primary transition-colors duration-200 hover:text-primary/80">
              iManipur
            </span>
          </motion.div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {["Culture", "Education", "Innovation", "Manipur"].map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted-foreground/60 transition-colors duration-200 hover:text-muted-foreground"
              >
                {n}
              </a>
            ))}
          </nav>

          <p className="font-mono text-[11px] text-muted-foreground/40">© 2025 iManipur</p>
        </div>
      </footer>
    </div>
  );
}

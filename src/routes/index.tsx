import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback, useId } from "react";
import { EditableBlock } from "../components/EditableBlock";
import { ContactSection } from "../components/ContactSection";
import { Journey } from "../components/Journey";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Terminal, TypingAnimation, AnimatedSpan } from "../components/Terminal";
import { Lens } from "../components/ui/lens";
import { BorderBeam } from "../components/ui/border-beam";
import { ShineBorder } from "../components/ui/shine-border";
import { NumberTicker } from "../components/ui/number-ticker";
import { AnimatedShinyText } from "../components/ui/animated-shiny-text";
import { ArrowUp, Instagram, Facebook, ShieldCheck, Sprout } from "lucide-react";

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
      { title: "iManipur - Independent Initiative for Manipur" },
      {
        name: "description",
        content:
          "iManipur functions as an autonomous initiative optimizing culture, education, and technological frameworks for Manipur.",
      },
      { property: "og:title", content: "iManipur - Independent Initiative for Manipur" },
      {
        property: "og:description",
        content: "Safeguarding data. Accelerating intelligence. Architecting the future.",
      },
    ],
  }),
  component: Index,
});

/* ─── Data ──────────────────────────────────────────────── */

const ABOUT_HERO_TITLE = "Knowledge is the fundamental framework of civilization.";
const ABOUT_HERO_SUBTITLE =
  "While some is formally documented, much is encoded within the cultural matrix \u2014 the narratives, traditions, languages, and the consciousness of the people who sustain them.";

const ABOUT_CARDS = [
  {
    icon: ShieldCheck,
    heading: "Preserve. Protect. Connect.",
    body: [
      "Cultural heritage is more than a record of the past\u2014it is a foundation for identity, continuity, and resilience.",
      "When preserved, it strengthens communities and connects generations. When lost, it risks the irreversible disappearance of collective memory and cultural knowledge.",
    ],
  },
  {
    icon: Sprout,
    heading: "Revitalize. Unite. Advance.",
    body: [
      "iManipur exists to help safeguard and revitalize this inheritance. As an independent initiative, we unite educators, researchers, technologists, artists, and cultural practitioners to create innovative pathways for the cultural, educational, and creative advancement of Manipur.",
    ],
  },
];

const ABOUT_QUOTE =
  "Our work transcends conventional disciplinary boundaries, combining research, technology, design, and storytelling into a cohesive framework. Through this approach, we develop initiatives that are contextually informed, strategically designed, and capable of creating enduring value for present and future generations.";

const pillars = [
  {
    no: "01",
    tag: "Culture",
    symbol: "◈",
    title: "Identity is the Genesis of Knowledge",
    body: "We systematically preserve the narratives, traditions, languages, and artistic expressions that define Manipur. Through advanced documentation and strategic dissemination of cultural data, we guarantee that the future inherits profound comprehension - not merely fragmented memories.",
    points: [
      "Document oral traditions & folklore",
      "Archive historical data systems",
      "Immortalize artistic expressions",
    ],
  },
  {
    no: "02",
    tag: "Education",
    symbol: "◎",
    title: "Dissemination Accelerates Intelligence",
    body: "We architect dynamic learning ecosystems through strategic mentorship, open-source resources, and collaborative frameworks designed to optimize intellectual curiosity. Education is conceptualized as an iterative algorithm of discovery, analysis, and active contribution.",
    points: [
      "Mentorship & intelligence sharing",
      "Open-source learning nodes",
      "Skill-optimization workshops",
    ],
  },
  {
    no: "03",
    tag: "Innovation",
    symbol: "◇",
    title: "Innovation Catalyzes Evolution",
    body: "Technological advancement achieves peak efficacy when calibrated to localized paradigms. We synthesize emerging technologies, strategic design, and interdisciplinary methodologies to engineer pragmatic solutions that directly accelerate the future of Manipur.",
    points: [
      "Community-optimized digital tools",
      "Advanced storytelling media",
      "Localized system engineering",
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
      "A sophisticated animation initiative memorializing the 13th August Patriots' Day and our fallen visionaries. Reviving Manipur's historical archives through high-fidelity visual storytelling.",
    href: "#projects",
  },
  {
    title: "Folk Stories of Manipur",
    status: "In Progress" as const,
    pillar: "Story",
    image: "/assets/project-image-new.png",
    description:
      "Aggregating and reimagining traditional folklore - deploying modern digital media and advanced illustration techniques to immortalize oral histories for the future.",
    href: "#projects",
  },
  {
    title: "Historical Stories Collection",
    status: "Coming Soon" as const,
    pillar: "Culture",
    image: "/assets/Stories-Collection-new.png",
    description:
      "An expanding, high-resolution archive of undocumented historical narratives - synthesizing data on communities, geographical loci, and pivotal events engineered for perpetual preservation.",
    href: "#projects",
  },
];

const principles = [
  {
    k: "Research",
    v: "Strategic execution necessitates profound comprehension. We prioritize rigorous data acquisition, verification, and contextual analysis prior to architecting solutions.",
    symbol: "◬",
  },
  {
    k: "Integrity",
    v: "Precision supersedes visibility. Our operations are governed by empirical research, authentic representation, and ethical narrative synthesis.",
    symbol: "⟁",
  },
  {
    k: "Stewardship",
    v: "We reject ephemeral objectives. Every initiative is meticulously engineered for maximum longevity and sustained utility across subsequent phases.",
    symbol: "◫",
  },
  {
    k: "Collaboration",
    v: "Optimal outputs require systemic integration. We synergize diverse multidisciplinary perspectives to generate exponentially superior results.",
    symbol: "◌",
  },
  {
    k: "Accessibility",
    v: "Information must remain democratized. We engineer our interfaces and intellectual properties to ensure universal access and frictionless comprehension.",
    symbol: "◒",
  },
  {
    k: "Rootedness",
    v: "Our operational matrix originates in Manipur. This localized grounding calibrates our impact, while maintaining interoperability with global advancements.",
    symbol: "◎",
  },
];

const faqs = [
  {
    q: "What is iManipur?",
    a: "iManipur functions as an autonomous initiative engineered to optimize cultural preservation, educational frameworks, and localized innovation. Our operations safeguard foundational knowledge while architecting robust systems for the future.",
  },
  {
    q: "How can I contribute?",
    a: "We actively integrate external collaborators - from developers and researchers to artists and strategists. Initiate contact via our communication channels and propose your operational vector.",
  },
  {
    q: "Who funds iManipur?",
    a: "iManipur operates on a self-sustained financial model driven by core contributors. We remain receptive to strategic partnerships that synchronize with our operational protocols and long-term trajectory.",
  },
  {
    q: "Where is iManipur based?",
    a: "Our organizational core is stationed in Manipur, while our contributor network operates as a decentralized, global matrix collaborating via asynchronous digital frameworks.",
  },
  {
    q: "Can I join the initiative?",
    a: "Affirmative. We continuously scan for aligned individuals who are equipped to contribute to our cultural, educational, or technological directives. Initiate communication to explore integration.",
  },
  {
    q: "Is iManipur open to new contributors?",
    a: "Confirmed. Our ecosystem is dynamically expanding to incorporate researchers, technologists, and visionaries dedicated to the advancement of Manipur. Connect with us to initialize collaboration.",
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
    <div id="home" className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        id="about"
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-b border-border bg-hero-gradient pt-[120px] md:pt-[80px]"
      >
        {/* Background Image Texture */}
        <motion.div
          style={{ y: heroY, opacity }}
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <img
            src="/assets/hero-background.png"
            alt=""
            className="absolute inset-0 h-full w-full object-contain object-[center_15%] md:object-cover md:object-center mix-blend-overlay opacity-[0.15]"
          />
          {/* Fading mask at the edges and bottom */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_25%,transparent_20%,var(--background)_100%)] md:bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_30%,var(--background)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent md:via-background/20" />
        </motion.div>

        {/* Animated grid background - adapted from ali imam hero-01 */}
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
        {/* Angular strict background */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(to bottom right, transparent 40%, var(--gold-primary) 100%)",
            opacity: 0.05,
          }}
        />
        {/* Parallax Crosshatch background */}
        <motion.div
          style={{ y: heroY, opacity }}
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,var(--primary)_20px,var(--primary)_21px)] mix-blend-overlay opacity-[0.02]"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center mt-10 md:mt-0 px-5 py-12 text-center md:px-8 md:py-20"
        >
          <motion.div variants={itemVariants}>
            <AnimatedShinyText className="label-mono text-primary/70">
              Independent Initiative · Manipur
            </AnimatedShinyText>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-6 max-w-4xl text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Preserving Knowledge.{" "}
            <span className="inline-block text-gradient-primary pb-1">Shaping Tomorrow.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground/80 md:text-base"
          >
            Culture, education, and innovation for Manipur.
          </motion.p>

          {/* Animated Terminal */}
          <motion.div
            variants={itemVariants}
            className="group mt-10 w-full max-w-xl transition-shadow duration-500 hover:shadow-[var(--shadow-glow)]"
          >
            <Terminal
              key={terminalKey}
              title="imanipur.sh"
              onComplete={() => {
                if (replayTimerRef.current) clearTimeout(replayTimerRef.current);
                replayTimerRef.current = setTimeout(() => setTerminalKey((prev) => prev + 1), 3000);
              }}
            >
              <TypingAnimation className="font-mono text-xs text-muted-foreground sm:text-sm">
                {"$ imanipur start"}
              </TypingAnimation>
              <AnimatedSpan className="font-mono text-xs text-muted-foreground sm:text-sm">
                <span>&gt; loading: folk tales archive</span>
              </AnimatedSpan>
              <AnimatedSpan className="font-mono text-xs text-muted-foreground sm:text-sm">
                <span>&gt; loading: historical resources</span>
              </AnimatedSpan>
              <AnimatedSpan className="font-mono text-xs text-muted-foreground sm:text-sm">
                <span>[OK] Core initiatives loaded...</span>
              </AnimatedSpan>
              <AnimatedSpan className="font-mono text-xs text-muted-foreground sm:text-sm">
                <span>[OK] Education framework ready.</span>
              </AnimatedSpan>
              <AnimatedSpan className="font-mono text-xs text-muted-foreground sm:text-sm">
                <span>[OK] Culture preserved.</span>
              </AnimatedSpan>
              <TypingAnimation className="mt-2 font-mono text-xs font-semibold text-primary sm:text-sm">
                {"Architecting for Manipur."}
              </TypingAnimation>
            </Terminal>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              href="#culture"
              className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-none px-6 py-3 font-semibold text-[12px] tracking-[0.14em] uppercase text-primary-foreground transition-shadow duration-300 hover:shadow-[var(--shadow-glow)] focus-visible:shadow-[var(--shadow-glow)] sm:w-auto"
            >
              Our pillars
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              href="#projects"
              className="flex w-full items-center justify-center gap-2 rounded-none border border-border px-6 py-3 font-semibold text-[12px] tracking-[0.14em] uppercase text-foreground/80 transition-all duration-200 hover:border-primary/60 hover:text-foreground sm:w-auto"
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
          <div className="mx-auto max-w-[1200px] px-4 md:px-6">
            {/* Section Label */}
            <motion.div variants={itemVariants} className="mb-8 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-none bg-primary" />
              <AnimatedShinyText className="label-mono text-primary">
                Built for Manipur
              </AnimatedShinyText>
            </motion.div>
            {/* Hero Title & Editable Content */}
            <motion.div variants={itemVariants} className="max-w-3xl">
              <EditableBlock
                slug="homepage-about"
                defaultHtml={`<h2 class="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-foreground">${ABOUT_HERO_TITLE}</h2><div class="mt-6 h-0.5 w-16 bg-primary"></div><p class="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">${ABOUT_HERO_SUBTITLE}</p>`}
              />
            </motion.div>

            {/* Lottie Animation Card */}
            <motion.div
              variants={itemVariants}
              className="mt-14 rounded-none border border-border/50 bg-card/20 backdrop-blur-md overflow-hidden relative flex items-center justify-center h-[200px] md:h-[280px] group"
            >
              <BorderBeam duration={8} colorFrom="var(--primary)" colorTo="transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--primary)_10px,var(--primary)_11px)] opacity-[0.03]" />
              <Lottie
                animationData={aboutLottie}
                loop={true}
                className="relative z-10 h-full max-h-[160px] md:max-h-[220px] opacity-90 mix-blend-screen transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>

            {/* Two Feature Cards */}
            <motion.div
              variants={gridContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {ABOUT_CARDS.map((card) => (
                <motion.div
                  key={card.heading}
                  variants={itemVariants}
                  className="group rounded-none border border-border/50 bg-card/30 backdrop-blur-md p-8 lg:p-10 transition-all duration-300 hover:border-primary/30 hover:bg-card/50 relative overflow-hidden"
                >
                  <ShineBorder duration={14} shineColor="var(--primary)" />
                  {/* Icon + accent line */}
                  <div className="flex items-center gap-4 mb-1">
                    <div className="flex size-12 items-center justify-center rounded-full bg-muted/50 border border-border/50 transition-colors group-hover:bg-primary/10 group-hover:border-primary/30">
                      <card.icon className="size-5 text-primary" />
                    </div>
                    <span className="block h-0.5 w-6 bg-primary/40" />
                  </div>

                  {/* Card heading */}
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {card.heading}
                  </h3>

                  {/* Card body paragraphs */}
                  <div className="mt-4 space-y-4">
                    {card.body.map((para, paraIndex) => (
                      <p
                        key={paraIndex}
                        className="text-base text-muted-foreground leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Quote Block */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-6 rounded-none border border-border/50 bg-card/30 backdrop-blur-md p-8 lg:p-10 flex gap-6"
            >
              {/* Decorative quotation mark */}
              <span
                className="hidden md:block shrink-0 font-serif text-6xl leading-none text-primary/25 select-none"
                aria-hidden
              >
                {"\u201C"}
              </span>
              <div className="border-l-2 border-primary/50 pl-6">
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed italic">
                  {ABOUT_QUOTE}
                </p>
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="group relative flex flex-col justify-between rounded-none border border-border/50 bg-card/20 backdrop-blur-md p-6 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-card/40 min-h-[140px] md:min-h-[160px]"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 md:h-32 md:w-32 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
                  <span className="relative z-10 font-display text-5xl md:text-6xl font-medium text-foreground/90 group-hover:text-primary transition-colors duration-500">
                    {!isNaN(Number(s.value)) ? <NumberTicker value={Number(s.value)} /> : s.value}
                  </span>
                  <div className="relative z-10 mt-8 flex items-center gap-3">
                    <div className="h-px w-6 bg-primary/40 transition-all duration-500 group-hover:w-10 group-hover:bg-primary" />
                    <span className="font-semibold text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-muted-foreground/80 group-hover:text-foreground transition-colors duration-300">
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
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
          <motion.div variants={itemVariants} className="flex flex-col items-start text-left">
            <AnimatedShinyText className="label-mono text-primary/70">
              What we care about
            </AnimatedShinyText>
            <h2 className="mt-4 text-foreground">
              Three pillars, <span className="text-primary block sm:inline">one intention.</span>
            </h2>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
              Locally calibrated operations - synthesizing culture, intelligence, and frameworks
              that optimize Manipur.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-none border border-border bg-border md:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.article
                key={p.tag}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="scroll-mt-24 flex flex-col items-start text-left group relative overflow-hidden bg-card p-8 md:p-10 transition-shadow duration-300 hover:shadow-[var(--shadow-glow)] focus-visible:shadow-[var(--shadow-glow)]"
              >
                <ShineBorder duration={14} shineColor="var(--primary)" />
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
          <motion.div variants={itemVariants} className="flex flex-col items-start text-left">
            <AnimatedShinyText className="label-mono text-primary/70">
              What we're building
            </AnimatedShinyText>
            <h2 className="mt-4 text-foreground">
              Our <span className="text-primary">projects.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              Active computational processes - archiving, safeguarding, and transmitting the
              narratives of Manipur through advanced animation, digital illustration, and rigorous
              archival research.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {projects.map((proj, i) => (
              <motion.a
                href={proj.href || "#"}
                key={proj.title}
                variants={itemVariants}
                whileTap={{ scale: 0.98 }}
                className="group relative flex flex-col overflow-hidden rounded-none border border-border bg-card/40 backdrop-blur-md transition-all duration-500 hover:border-primary/50 hover:bg-card/60 hover:shadow-[0_0_30px_rgba(202,146,29,0.15)] focus-visible:border-primary/50 focus-visible:shadow-[0_0_30px_rgba(202,146,29,0.15)]"
              >
                <ShineBorder duration={14} shineColor="var(--primary)" />
                {/* Cartographic Crosshairs */}
                <div className="absolute left-1 top-1 z-20 h-3 w-3 border-l border-t border-primary/70 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:left-0 group-hover:top-0" />
                <div className="absolute right-1 top-1 z-20 h-3 w-3 border-r border-t border-primary/70 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:right-0 group-hover:top-0" />
                <div className="absolute bottom-1 left-1 z-20 h-3 w-3 border-b border-l border-primary/70 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-0 group-hover:left-0" />
                <div className="absolute bottom-1 right-1 z-20 h-3 w-3 border-b border-r border-primary/70 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-0 group-hover:right-0" />

                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/50 bg-background">
                  {/* Subtle primary color tint */}
                  <div className="absolute inset-0 z-0 bg-primary/20 mix-blend-overlay" />

                  <Lens zoomFactor={1.5} lensSize={180} duration={0.3}>
                    <img
                      src={proj.image}
                      alt={proj.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover grayscale opacity-60 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:grayscale-[20%] group-hover:opacity-90 group-hover:scale-105"
                    />
                  </Lens>

                  {/* Bottom gradient fade for text legibility */}
                  <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60" />

                  {/* Glitch/Scanline effect overlay */}
                  <div className="absolute inset-0 z-10 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] opacity-50 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-80" />

                  <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-6 flex flex-col justify-end translate-y-2 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0">
                    <span className="inline-flex w-fit items-center gap-2 border border-primary/30 bg-background/80 backdrop-blur-md px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-primary shadow-[0_0_10px_rgba(202,146,29,0.2)]">
                      <span className="h-1.5 w-1.5 bg-primary/80 rounded-none animate-pulse" />
                      {proj.pillar}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-5 md:p-6 lg:p-8 relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-display text-xl md:text-2xl font-medium text-foreground transition-colors duration-300 group-hover:text-primary leading-[1.2]">
                      {proj.title}
                    </h3>
                  </div>
                  <p className="mb-6 text-[14px] leading-relaxed text-muted-foreground flex-1">
                    {proj.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <span
                      className={[
                        "px-2.5 py-1 rounded-none text-[10px] font-mono tracking-[0.15em] uppercase border transition-colors duration-300",
                        proj.status === "In Progress"
                          ? "border-primary/40 bg-primary/10 text-primary group-hover:border-primary/60 group-hover:bg-primary/20"
                          : "border-muted-foreground/30 bg-muted/30 text-muted-foreground",
                      ].join(" ")}
                    >
                      {proj.status}
                    </span>
                    <div className="flex items-center justify-center h-8 w-8 rounded-none border border-border/50 bg-background transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary">
                      <ArrowUp className="h-4 w-4 rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
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
          <motion.div variants={itemVariants} className="flex flex-col items-start text-left">
            <AnimatedShinyText className="label-mono text-primary/70">
              Our Principles
            </AnimatedShinyText>
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
          <motion.div variants={itemVariants} className="flex flex-col items-start text-left">
            <AnimatedShinyText className="label-mono text-primary/70">
              The Initiative
            </AnimatedShinyText>
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
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-none border border-border bg-card px-6 py-8 text-center transition-all duration-300 hover:border-t-primary/70 hover:shadow-[var(--shadow-glow)] focus-visible:shadow-[var(--shadow-glow)]"
              >
                <ShineBorder duration={14} shineColor="var(--primary)" />
                {/* Cartographic Crosshairs */}
                <div className="absolute -left-1 -top-1 h-2.5 w-2.5 border-l border-t border-primary/70 opacity-0 transition-all duration-300 group-hover:opacity-100 group-active:opacity-100 group-hover:-translate-x-1 group-hover:-translate-y-1" />
                <div className="absolute -right-1 -top-1 h-2.5 w-2.5 border-r border-t border-primary/70 opacity-0 transition-all duration-300 group-hover:opacity-100 group-active:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                <div className="absolute -bottom-1 -left-1 h-2.5 w-2.5 border-b border-l border-primary/70 opacity-0 transition-all duration-300 group-hover:opacity-100 group-active:opacity-100 group-hover:-translate-x-1 group-hover:translate-y-1" />
                <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 border-b border-r border-primary/70 opacity-0 transition-all duration-300 group-hover:opacity-100 group-active:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1" />
                {member.image ? (
                  // Real Photo Portrait
                  <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-none border border-border bg-primary/10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-primary/50 group-active:border-primary group-hover:shadow-[0_0_20px_rgba(202,146,29,0.2),inset_0_0_15px_rgba(202,146,29,0.1)] group-active:shadow-[0_0_30px_rgba(202,146,29,0.6),inset_0_0_20px_rgba(202,146,29,0.3)]">
                    <Lens zoomFactor={1.8} lensSize={56} duration={0.3}>
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        className={`h-full w-full object-cover opacity-80 mix-blend-luminosity transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100 group-hover:mix-blend-normal group-active:opacity-100 group-active:mix-blend-normal ${member.imgClass || ""}`}
                      />
                    </Lens>
                  </div>
                ) : (
                  // Barcode Graphic
                  <div className="relative flex h-10 w-24 items-center justify-center overflow-hidden rounded-none border border-border bg-background transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-primary/50 group-active:border-primary group-hover:shadow-[0_0_20px_rgba(202,146,29,0.2),inset_0_0_15px_rgba(202,146,29,0.1)] group-active:shadow-[0_0_30px_rgba(202,146,29,0.6),inset_0_0_20px_rgba(202,146,29,0.3)]">
                    <img
                      src="/barcode.png"
                      alt=""
                      className="h-full w-full object-cover opacity-60 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
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
            <AnimatedShinyText className="relative label-mono text-primary/70">
              Mission
            </AnimatedShinyText>
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
          <motion.div variants={itemVariants} className="flex flex-col items-start text-left">
            <AnimatedShinyText className="label-mono text-primary/70">
              Acknowledgement
            </AnimatedShinyText>
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
              <AnimatedShinyText className="label-mono text-primary/70">FAQ</AnimatedShinyText>
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

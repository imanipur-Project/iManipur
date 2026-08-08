import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "2024",
    label: "Idea Formed",
    desc: "The idea of building an initiative around Manipur's culture and education took shape.",
  },
  {
    year: "2025",
    label: "iManipur Founded",
    desc: "The contributors came together, and iManipur was officially established as an independent initiative.",
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

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // 1. Draw the line down as the user scrolls
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );

      // 2. Animate the spark travelling down the line
      gsap.fromTo(
        sparkRef.current,
        { top: 0, opacity: 0 },
        {
          top: "100%",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );

      // 3. Animate each timeline item as it enters view
      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        const dot = item.querySelector(".journey-dot");
        const year = item.querySelector(".journey-year");
        const title = item.querySelector(".journey-title");
        const desc = item.querySelector(".journey-desc");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top center+=15%", // Triggers slightly before the item hits center
            toggleActions: "play none none reverse", // Play down, reverse up
          },
        });

        tl.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" },
        ).fromTo(
          [year, title, desc],
          { opacity: 0, y: 15, x: i % 2 === 0 ? -15 : 15 }, // Slide up and from outside
          { opacity: 1, y: 0, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.2",
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="journey" className="scroll-mt-20 py-20" ref={containerRef}>
      <div className="mb-14 flex flex-col items-center text-center">
        <p className="label-mono text-primary/70">Our journey</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          How we <span className="text-primary">got here.</span>
        </h2>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
          From an idea to a working initiative — each step grounded in purpose.
        </p>
      </div>

      <div className="relative mx-auto max-w-2xl">
        {/* Background track for the line */}
        <div className="absolute bottom-0 left-4 top-0 w-px bg-border/40 sm:left-1/2 sm:-translate-x-px" />

        {/* The active drawing line */}
        <div
          ref={lineRef}
          className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-primary via-primary to-transparent sm:left-1/2 sm:-translate-x-px"
        />

        {/* The traveling spark */}
        <div
          ref={sparkRef}
          className="absolute left-4 z-20 h-3 w-1 -translate-x-[1.5px] rounded-none bg-primary shadow-[0_0_15px_2px_var(--color-primary)] sm:left-1/2 sm:-translate-x-px"
        />

        {timeline.map((item, i) => (
          <div
            key={`${item.year}-${item.label}`}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className={[
              "relative flex w-full flex-col pb-20 last:pb-0 sm:flex-row",
              i % 2 === 0 ? "sm:justify-start" : "sm:justify-end",
            ].join(" ")}
          >
            {/* Dot */}
            <div className="absolute left-4 top-2 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center sm:left-1/2">
              <span className="journey-dot h-3 w-3 rounded-none border-[2.5px] border-primary bg-background shadow-[0_0_15px_var(--color-primary)]" />
            </div>

            {/* Content (strictly 50% width on desktop to prevent overlap) */}
            <div
              className={[
                "journey-content ml-10 flex-none sm:ml-0 sm:w-1/2",
                i % 2 === 0 ? "sm:pr-12 sm:text-left" : "sm:pl-12 sm:text-left",
              ].join(" ")}
            >
              <span className="journey-year font-semibold text-[11px] tracking-[0.2em] uppercase text-primary">
                {item.year}
              </span>
              <h3 className="journey-title mt-2 font-serif text-2xl font-bold tracking-wide text-foreground sm:text-3xl">
                {item.label}
              </h3>
              <p className="journey-desc mt-3 text-[15px] leading-relaxed text-muted-foreground/80">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

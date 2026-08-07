import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";

const navLinks = ["About", "Culture", "Projects", "Team", "Acknowledgement", "FAQ"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const [lastYPos, setLastYPos] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Background blur logic
    setScrolled(latest > 20);

    // Smart hide logic
    const isScrollingDown = latest > lastYPos;
    if (latest > 100 && isScrollingDown && !mobileOpen) {
      setHidden(true); // Hide when scrolling down past 100px
    } else {
      setHidden(false); // Show when scrolling up or at top
    }
    setLastYPos(latest);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Clear mobileOpen when viewport crosses md breakpoint
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMatch = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    mediaQuery.addEventListener("change", handleMatch);
    return () => mediaQuery.removeEventListener("change", handleMatch);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)]"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="relative z-50 mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-8">
        <motion.a href="#about" className="group flex items-center gap-2.5" whileHover="hover">
          <Logo size="sm" />
          <span className="hidden font-semibold text-[11px] tracking-[0.22em] uppercase text-foreground transition-colors duration-200 group-hover:text-primary sm:inline-block">
            iManipur
          </span>
        </motion.a>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-2 md:flex absolute left-1/2 -translate-x-1/2"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((n) => (
            <a
              key={n}
              href={`#${n.toLowerCase().replace(/ /g, "-")}`}
              onMouseEnter={() => setHoveredLink(n)}
              className="relative px-4 py-2 font-semibold text-[11px] tracking-[0.12em] uppercase text-muted-foreground transition-colors duration-200 hover:text-foreground z-10"
            >
              <span className="relative z-10">{n}</span>
              {hoveredLink === n && (
                <motion.div
                  layoutId="navbar-hover-pill"
                  className="absolute inset-0 z-0 rounded-full bg-primary/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="hidden md:block group relative overflow-hidden rounded-sm border border-primary/40 px-3 py-1.5 font-semibold text-[10px] tracking-[0.16em] uppercase text-primary transition-all duration-300 hover:border-primary/70 hover:bg-primary/10"
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

      {/* Full-screen Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center gap-8 px-5">
              {navLinks.map((n, i) => (
                <motion.a
                  key={n}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 25 }}
                  href={`#${n.toLowerCase().replace(/ /g, "-")}`}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-4xl font-bold tracking-tight text-foreground transition-all duration-200 hover:text-primary active:scale-95"
                >
                  {n}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: navLinks.length * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-block rounded-sm border border-primary/40 bg-primary/10 px-6 py-3 font-semibold text-[12px] tracking-[0.16em] uppercase text-primary transition-all hover:bg-primary/20"
              >
                Contact →
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10"
            >
              <Logo size="lg" />
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

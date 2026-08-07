import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { Instagram, Facebook } from "lucide-react";
import { Logo } from "./Logo";

const INSTAGRAM_URL = "https://instagram.com/imanipur";
const FACEBOOK_URL = "https://facebook.com/imanipur";

const footerLinks = ["Culture", "Projects", "Team", "Acknowledgement", "FAQ", "Contact"];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
};

export function Footer() {
  const { scrollYProgress } = useScroll();
  // Parallax slide-up effect at the very end of the page
  const y = useTransform(scrollYProgress, [0.8, 1], ["20%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <motion.footer
      style={{ y, opacity }}
      className="mt-20 border-t border-border bg-card/30 px-6 py-24 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]"
    >
      {/* Giant Watermark Background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.02]">
        <h2 className="font-serif text-[25vw] md:text-[15vw] font-bold leading-none tracking-tighter text-foreground whitespace-nowrap">
          IMANIPUR
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center relative z-10 px-4"
      >
        <motion.a
          href="#about"
          variants={itemVariants}
          className="group flex flex-col items-center gap-5"
        >
          <div className="transition-transform duration-500 ease-out group-hover:scale-110">
            <Logo size="lg" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text font-semibold text-[13px] tracking-[0.25em] uppercase text-transparent transition-all duration-300 group-hover:from-primary group-hover:to-primary/50">
            iManipur
          </span>
        </motion.a>

        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-md text-[14px] leading-relaxed text-muted-foreground/70"
        >
          A community from Manipur building honest, useful, and locally relevant projects in
          culture, education, and innovation.
        </motion.p>

        <motion.nav
          variants={itemVariants}
          className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-10"
        >
          {footerLinks.map((n) => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              className="font-semibold text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50 transition-colors duration-200 hover:text-foreground"
            >
              {n}
            </a>
          ))}
        </motion.nav>

        <motion.div variants={itemVariants} className="mt-14 flex items-center gap-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground/60 transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.2)]"
            aria-label="Instagram"
          >
            <Instagram size={18} strokeWidth={1.5} />
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground/60 transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.2)]"
            aria-label="Facebook"
          >
            <Facebook size={18} strokeWidth={1.5} />
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-20 flex flex-col items-center gap-4">
          <div className="h-px w-8 bg-border" />
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground/40 uppercase">
            © {new Date().getFullYear()} iManipur • Built with purpose
          </p>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}

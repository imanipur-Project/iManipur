import { motion, useScroll, useTransform } from "motion/react";
import { Instagram, Facebook, Mail, Twitter, ArrowUp, Heart } from "lucide-react";
import { Logo } from "./Logo";

const INSTAGRAM_URL = "https://instagram.com/imanipur";
const FACEBOOK_URL = "https://facebook.com/imanipur";
const MAIL_URL = "mailto:heyimanipur@gmail.com";
const TWITTER_URL = "https://twitter.com/imanipur";

const navigation = {
  categories: [
    {
      id: "main",
      name: "Main",
      sections: [
        {
          id: "initiative",
          name: "Initiative",
          items: [
            { name: "Culture", href: "#culture" },
            { name: "Projects", href: "#projects" },
          ],
        },
        {
          id: "community",
          name: "Community",
          items: [
            { name: "Team", href: "#team" },
            { name: "Acknowledgement", href: "#acknowledgement" },
          ],
        },
        {
          id: "connect",
          name: "Connect",
          items: [
            { name: "FAQ", href: "#faq" },
            { name: "Contact", href: "#contact" },
          ],
        },
      ],
    },
  ],
};

// Renamed from PascalCase `Underline` (which implies a component) to camelCase.
const socialLinkClass = `hover:-translate-y-1 border border-border border-dotted rounded-none p-2.5 transition-transform bg-card hover:border-primary/50 text-muted-foreground hover:text-primary`;

function handleScrollTop() {
  window.scroll({ top: 0, behavior: "smooth" });
}

export function Footer() {
  const { scrollYProgress } = useScroll();
  // Clamp at 0 opacity minimum so footer stays visible on short pages where
  // scrollYProgress never reaches 0.85.
  const y = useTransform(scrollYProgress, [0.8, 1], ["10%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.6, 1]);

  return (
    <motion.footer
      style={{ y, opacity }}
      className="mx-auto mt-20 flex h-full w-full flex-col items-center justify-center bg-background border-t border-border overflow-hidden relative"
    >
      {/* Giant Watermark Background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.02]">
        <h2 className="font-display text-[15vw] md:text-[12vw] font-bold leading-none tracking-tighter text-foreground whitespace-nowrap">
          IMANIPUR
        </h2>
      </div>

      <div className="relative mx-auto grid max-w-[1200px] items-center justify-center gap-6 px-5 pt-10 pb-0 md:px-8 md:flex z-10 w-full">
        <a href="#home" onClick={handleScrollTop} className="flex items-center justify-center">
          <Logo size="lg" />
        </a>
        <p className="text-muted-foreground text-center text-[15px] leading-relaxed md:text-left max-w-2xl">
          An independent initiative rooted in Manipur — preserving its history, celebrating its
          culture, and building resources for the next generation.
        </p>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-5 py-10 md:px-8 z-10">
        <div className="border-b border-border border-dotted"> </div>
        <div className="py-10">
          {navigation.categories.map((category) => (
            <div
              key={category.name}
              className="grid grid-cols-1 sm:grid-cols-3 flex-row justify-center md:justify-between gap-8 leading-6 md:flex max-w-2xl mx-auto"
            >
              {category.sections.map((section) => (
                <div key={section.name} className="flex-1 text-center">
                  {/* id matches the ul's aria-labelledby */}
                  <h3
                    id={`${category.id}-${section.id}-heading`}
                    className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest"
                  >
                    {section.name}
                  </h3>
                  <ul
                    role="list"
                    aria-labelledby={`${category.id}-${section.id}-heading`}
                    className="flex flex-col space-y-3"
                  >
                    {section.items.map((item) => (
                      <li key={item.name} className="flow-root">
                        <a
                          href={item.href}
                          className="text-[14px] text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="border-b border-border border-dotted"> </div>
      </div>

      <div className="flex flex-wrap justify-center gap-y-6 z-10 mt-4">
        <div className="flex flex-wrap items-center justify-center gap-6 gap-y-4 px-6">
          {/* mailto: should NOT open in a new tab */}
          <a aria-label="Email" href={MAIL_URL} rel="noreferrer" className={socialLinkClass}>
            <Mail strokeWidth={1.5} className="h-5 w-5" />
          </a>
          <a
            aria-label="Twitter"
            href={TWITTER_URL}
            rel="noreferrer"
            target="_blank"
            className={socialLinkClass}
          >
            <Twitter strokeWidth={1.5} className="h-5 w-5" />
          </a>
          <a
            aria-label="Instagram"
            href={INSTAGRAM_URL}
            rel="noreferrer"
            target="_blank"
            className={socialLinkClass}
          >
            <Instagram strokeWidth={1.5} className="h-5 w-5" />
          </a>
          <a
            aria-label="Facebook"
            href={FACEBOOK_URL}
            rel="noreferrer"
            target="_blank"
            className={socialLinkClass}
          >
            <Facebook strokeWidth={1.5} className="h-5 w-5" />
          </a>
        </div>

        {/* Scroll To Top Widget */}
        <div className="flex items-center justify-center mx-6">
          <div className="flex items-center rounded-none border border-border border-dotted bg-card p-1">
            <button
              type="button"
              onClick={handleScrollTop}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowUp className="h-4 w-4" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 mb-10 flex flex-col items-center gap-2 text-center max-w-[1200px] px-5 md:px-8 z-10 w-full">
        <div className="flex flex-row flex-wrap items-center justify-center gap-1.5 text-muted-foreground/60 uppercase tracking-widest font-mono text-[10px]">
          <span>Built by the</span>
          <span className="font-bold text-foreground">iManipur Team</span>
          <span>—</span>
          <span>with</span>
          <Heart className="h-3 w-3 text-primary/70 inline-block" />
          <span>love,</span>
          <span>☕ caffeine,</span>
          <span>&amp; a couple of hours of coding.</span>
        </div>
        <div className="font-mono text-[9px] text-muted-foreground/30 uppercase tracking-widest">
          © {new Date().getFullYear()} iManipur — All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
}

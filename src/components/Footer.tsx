import { motion, useScroll, useTransform } from "motion/react";
import {
  Instagram,
  Facebook,
  Twitter,
  Heart
} from "lucide-react";
import { Logo } from "./Logo";

const INSTAGRAM_URL = "https://www.instagram.com/imanipur_?igsh=MTd6eGt6YWhneWJ6Mg%3D%3D&utm_source=qr";
const TWITTER_URL = "https://x.com/i_manipur?s=11";

const navigation = {
  categories: [
    {
      id: "main",
      name: "Main",
      sections: [
        {
          id: "about",
          name: "About",
          items: [
            { name: "Mission", href: "/#mission" },
            { name: "Vision", href: "/#culture" },
            { name: "Pillars", href: "/#culture" },
          ],
        },
        {
          id: "initiative",
          name: "Initiative",
          items: [
            { name: "Culture", href: "/#culture" },
            { name: "Education", href: "/#culture" },
            { name: "Innovation", href: "/#culture" },
          ],
        },
        {
          id: "projects",
          name: "Projects",
          items: [
            { name: "Animation", href: "/#projects" },
            { name: "Folklore", href: "/#projects" },
            { name: "Archive", href: "/#projects" },
          ],
        },
        {
          id: "community",
          name: "Community",
          items: [
            { name: "Team", href: "/#team" },
            { name: "Partners", href: "/#team" },
            { name: "Gratitude", href: "/#acknowledgement" },
          ],
        },
        {
          id: "legal",
          name: "Legal",
          items: [
            { name: "Terms", href: "/legal#terms" },
            { name: "Privacy", href: "/legal#privacy" },
            { name: "Guidelines", href: "/legal#guidelines" },
          ],
        },
        {
          id: "connect",
          name: "Connect",
          items: [
            { name: "Contact", href: "/#contact" },
            { name: "FAQ", href: "/#faq" },
            { name: "Support", href: "/#contact" },
          ],
        },
      ],
    },
  ],
};

const socialLinkClass = `hover:-translate-y-1 border border-border border-dotted rounded-xl p-2.5 transition-transform bg-card hover:border-primary/50 text-muted-foreground hover:text-primary`;


export function Footer() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.8, 1], ["10%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.6, 1]);

  return (
    <motion.footer
      style={{ y, opacity }}
      className="mx-auto mt-20 flex h-full w-full flex-col items-center justify-center bg-background border-t border-border overflow-hidden relative"
    >
      <div className="relative mx-auto grid max-w-7xl items-center justify-center gap-6 p-10 pb-0 md:flex z-10 w-full">
        <a href="/#home" className="flex items-center justify-center rounded-full">
          <img src="/imanipur_Web.svg" alt="iManipur" className="h-16 w-auto" />
        </a>
        <p className="text-muted-foreground text-center text-xs leading-5 md:text-left max-w-3xl ml-4">
          An autonomous initiative engineered in Manipur - systematically preserving historical
          data, amplifying cultural intelligence, and architecting robust resources for the future.
          I am passionate about transforming ideas into compelling visual experiences. I specialize
          in crafting unique brand identities, immersive digital experiences, and engaging content
          that resonates with your audience. My mission is to empower businesses and brands to
          stand out in a crowded market. I believe in the power of design to tell stories, evoke
          emotions, and drive meaningful connections.
        </p>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-10 z-10">
        <div className="border-b border-border border-dotted"> </div>
        <div className="py-10">
          {navigation.categories.map((category) => (
            <div
              key={category.name}
              className="grid grid-cols-2 md:grid-cols-6 flex-row justify-between gap-6 leading-6"
            >
              {category.sections.map((section) => (
                <div key={section.name} className="flex flex-col text-left">
                  <h3
                    id={`${category.id}-${section.id}-heading`}
                    className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest"
                  >
                    {section.name}
                  </h3>
                  <ul
                    role="list"
                    aria-labelledby={`${category.id}-${section.id}-heading`}
                    className="flex flex-col space-y-2"
                  >
                    {section.items.map((item) => (
                      <li key={item.name} className="flow-root">
                        <a
                          href={item.href}
                          className="text-sm text-muted-foreground hover:text-foreground md:text-xs transition-colors"
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

      <div className="flex flex-wrap justify-center items-center gap-6 z-10">
        <div className="flex flex-wrap items-center justify-center gap-6 gap-y-4 px-6">
          <a aria-label="Instagram" href={INSTAGRAM_URL} rel="noreferrer" target="_blank" className={socialLinkClass}>
            <Instagram strokeWidth={1.5} className="h-5 w-5" />
          </a>
          <a aria-label="Facebook" href="#" rel="noreferrer" target="_blank" className={socialLinkClass}>
            <Facebook strokeWidth={1.5} className="h-5 w-5" />
          </a>
          <a aria-label="Twitter" href={TWITTER_URL} rel="noreferrer" target="_blank" className={socialLinkClass}>
            <Twitter strokeWidth={1.5} className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 mb-10 flex flex-col justify-between text-center text-xs md:max-w-7xl z-10 w-full">
        <div className="flex flex-row items-center justify-center gap-1 text-muted-foreground">
          <span>© {new Date().getFullYear()} iManipur. Built on Stories, Code, and Coffee.</span>
        </div>
      </div>
    </motion.footer>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  type Variants,
} from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AnimatedShinyText } from "../components/ui/animated-shiny-text";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const Route = createFileRoute("/legal")({
  component: LegalPage,
});

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function LegalPage() {
  // Handle smooth scrolling on load if there's a hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  const { scrollYProgress } = useScroll();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowTopBtn(latest > 0.1);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 tracking-tight">
              Legal & <span className="text-primary">Policies</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Transparent, secure, and respectful guidelines for the iManipur community. Last
              updated: <time dateTime="2026-08-10">August 10, 2026</time>
            </p>
          </motion.div>

          <div className="space-y-24">
            {/* Terms of Service */}
            <motion.section
              id="terms"
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="scroll-mt-32"
            >
              <div className="mb-8">
                <AnimatedShinyText className="label-mono text-primary text-sm mb-2 uppercase tracking-widest inline-flex">
                  01 · Agreement
                </AnimatedShinyText>
                <h2 className="text-3xl font-display font-semibold">Terms of Service</h2>
              </div>
              <div className="prose prose-invert max-w-none text-muted-foreground/90 space-y-6">
                <p>
                  Welcome to iManipur. By accessing or using our platform, archives, and resources,
                  you agree to be bound by these Terms of Service. iManipur is an independent,
                  non-profit initiative dedicated to the preservation, documentation, and digital
                  amplification of Manipur's cultural heritage.
                </p>
                <h3 className="text-foreground text-xl font-medium mt-8 mb-4">1. Use of Content</h3>
                <p>
                  The digital archives, stories, code, and media provided on iManipur are strictly
                  for educational, research, and cultural preservation purposes. You may not use our
                  platform or its contents for commercial exploitation without explicit, written
                  permission from the iManipur initiative.
                </p>
                <h3 className="text-foreground text-xl font-medium mt-8 mb-4">
                  2. Intellectual Property
                </h3>
                <p>
                  All proprietary content, original digital illustrations, code architecture, and
                  structured data presented on this platform belong to iManipur and its
                  contributors. Cultural artifacts, folktales, and historical data remain the
                  collective heritage of the people of Manipur. We act solely as custodians and
                  digital curators of this knowledge.
                </p>
                <h3 className="text-foreground text-xl font-medium mt-8 mb-4">3. Governing Law</h3>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of
                  Manipur, India, without regard to its conflict of law provisions. Our failure to
                  enforce any right or provision of these Terms will not be considered a waiver of
                  those rights.
                </p>
              </div>
            </motion.section>

            <div className="border-b border-border border-dotted w-full" />

            {/* Privacy Policy */}
            <motion.section
              id="privacy"
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="scroll-mt-32"
            >
              <div className="mb-8">
                <AnimatedShinyText className="label-mono text-primary text-sm mb-2 uppercase tracking-widest inline-flex">
                  02 · Data Protection
                </AnimatedShinyText>
                <h2 className="text-3xl font-display font-semibold">Privacy Policy</h2>
              </div>
              <div className="prose prose-invert max-w-none text-muted-foreground/90 space-y-6">
                <p>
                  iManipur is committed to protecting your privacy and ensuring that your personal
                  data is handled securely and transparently. We believe in minimal data collection
                  and maximum privacy.
                </p>
                <h3 className="text-foreground text-xl font-medium mt-8 mb-4">
                  1. Data Collection
                </h3>
                <p>
                  We only collect data that is strictly necessary for the operation of the platform.
                  This includes information you explicitly provide when contacting us (such as your
                  name, email address, and message) which is processed securely by our email
                  provider, Resend.
                </p>
                <h3 className="text-foreground text-xl font-medium mt-8 mb-4">
                  2. Data Usage & Sharing
                </h3>
                <p>
                  Your data is never sold, rented, or traded. Information provided via contact forms
                  is used solely for responding to your inquiries. When authentication and CMS
                  features are enabled, user accounts and content edits are stored securely using
                  Supabase. We comply with data protection standards to ensure your rights are
                  respected, retaining contact messages only as long as necessary to address your
                  request.
                </p>
                <h3 className="text-foreground text-xl font-medium mt-8 mb-4">3. Security</h3>
                <p>
                  We utilize industry-standard services (Supabase for backend storage and Resend for
                  communications) that implement robust security measures to protect against
                  unauthorized access or data alteration. While we strive to protect your data, no
                  internet transmission is completely secure.
                </p>
              </div>
            </motion.section>

            <div className="border-b border-border border-dotted w-full" />

            {/* Guidelines */}
            <motion.section
              id="guidelines"
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="scroll-mt-32"
            >
              <div className="mb-8">
                <AnimatedShinyText className="label-mono text-primary text-sm mb-2 uppercase tracking-widest inline-flex">
                  03 · Collaboration
                </AnimatedShinyText>
                <h2 className="text-3xl font-display font-semibold">Community Guidelines</h2>
              </div>
              <div className="prose prose-invert max-w-none text-muted-foreground/90 space-y-6">
                <p>
                  iManipur thrives on collaboration from educators, researchers, artists, and
                  technologists. To maintain the integrity and safety of our community, we expect
                  all participants to adhere to these guidelines.
                </p>
                <h3 className="text-foreground text-xl font-medium mt-8 mb-4">
                  1. Respectful Conduct
                </h3>
                <p>
                  Engage with respect. Cultural preservation is sensitive work. Harassment, hate
                  speech, or discriminatory remarks regarding any community, tradition, or
                  individual will result in immediate removal from our collaborative spaces.
                </p>
                <h3 className="text-foreground text-xl font-medium mt-8 mb-4">
                  2. Academic & Historical Integrity
                </h3>
                <p>
                  Contributions to the archive must be rooted in verifiable historical data,
                  credible oral traditions, or recognized artistic expressions. Plagiarism or
                  intentional misrepresentation of cultural history is strictly prohibited.
                </p>
                <h3 className="text-foreground text-xl font-medium mt-8 mb-4">
                  3. Open Access ethos
                </h3>
                <p>
                  While respecting copyright and proprietary original works, our community operates
                  on an ethos of knowledge sharing. We encourage contributors to open-source their
                  educational findings where appropriate, to accelerate the advancement of Manipur's
                  digital footprint.
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />

      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 hover:bg-primary/90 active:scale-95"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6 text-black" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

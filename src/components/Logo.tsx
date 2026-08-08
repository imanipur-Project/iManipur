import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function Logo({ size = "sm", withText = false }: { size?: "sm" | "lg"; withText?: boolean }) {
  const badge = size === "lg" ? "h-8 w-8 text-[12px]" : "h-6 w-6 text-[10px]";
  const textClass = size === "lg" ? "text-sm" : "text-[11px]";
  
  const [isMeetei, setIsMeetei] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    // Cycle the text every 4 seconds to make the logo feel alive
    // Stop cycling if hovered so it stays on Meetei
    const interval = setInterval(() => {
      if (!isHovered) {
        setIsMeetei((prev) => !prev);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    if (isHovered) setIsMeetei(true);
  }, [isHovered]);

  return (
    <div 
      className="flex items-center gap-2.5 group cursor-pointer" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        variants={{ hover: { rotate: 90, scale: 1.1 } }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className={`flex items-center justify-center shrink-0 rounded-none bg-primary font-semibold text-primary-foreground transition-shadow duration-300 group-hover:shadow-[0_0_10px_-2px_var(--color-primary)] ${badge}`}
      >
        <motion.span variants={{ hover: { rotate: -90 } }}>iM</motion.span>
      </motion.span>
      
      {withText && (
        <div className={`relative flex items-center h-6 font-semibold tracking-[0.22em] uppercase transition-colors duration-200 ${textClass}`}>
          <AnimatePresence mode="wait">
            {!isMeetei ? (
              <motion.span
                key="english"
                initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute left-0 whitespace-nowrap text-foreground group-hover:text-primary transition-colors duration-200"
              >
                iManipur
              </motion.span>
            ) : (
              <motion.span
                key="meetei"
                initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute left-0 whitespace-nowrap tracking-normal text-foreground group-hover:text-primary transition-colors duration-200"
                style={{ fontFamily: "var(--font-meetei)", fontSize: size === "lg" ? "1.1rem" : "0.9rem", marginTop: "-2px" }}
              >
                ꯑꯥꯏ ꯃꯅꯤꯄꯨꯔ
              </motion.span>
            )}
          </AnimatePresence>
          {/* Invisible placeholder to maintain width for the flex container */}
          <span className="invisible whitespace-nowrap tracking-normal" style={{ fontFamily: "var(--font-meetei)", fontSize: size === "lg" ? "1.1rem" : "0.9rem" }}>ꯑꯥꯏ ꯃꯅꯤꯄꯨꯔ</span>
        </div>
      )}
    </div>
  );
}

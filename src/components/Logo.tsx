import { motion } from "motion/react";

export function Logo({ size = "sm" }: { size?: "sm" | "lg" }) {
  const badge = size === "lg" ? "h-8 w-8 text-[12px]" : "h-6 w-6 text-[10px]";
  return (
    <motion.span
      variants={{ hover: { rotate: 90, scale: 1.1, borderRadius: "50%" } }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`flex items-center justify-center rounded-sm bg-primary font-semibold text-primary-foreground transition-shadow duration-300 group-hover:shadow-[0_0_10px_-2px_var(--color-primary)] ${badge}`}
    >
      <motion.span variants={{ hover: { rotate: -90 } }}>iM</motion.span>
    </motion.span>
  );
}

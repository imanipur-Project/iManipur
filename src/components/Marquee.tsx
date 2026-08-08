import { cn } from "../lib/utils";
import React from "react";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  gap?: string;
  children: React.ReactNode;
  speed?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  gap = "40px",
  children,
  speed = 40,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--duration:40s] [--gap:var(--marquee-gap)]",
        className
      )}
      style={
        {
          "--marquee-gap": gap,
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex min-w-full shrink-0 items-center justify-around gap-[var(--marquee-gap)]",
            reverse
              ? "animate-marquee-reverse"
              : "animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

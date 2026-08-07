"use client";

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useInView, type MotionProps } from "motion/react";

/* ─── Sequencing Context ──────────────────────────────────── */

interface SequenceContextValue {
  completeItem: (index: number) => void;
  activeIndex: number;
  sequenceStarted: boolean;
}

const SequenceContext = createContext<SequenceContextValue | null>(null);
const useSequence = () => useContext(SequenceContext);

const ItemIndexContext = createContext<number | null>(null);
const useItemIndex = () => useContext(ItemIndexContext);

/* ─── AnimatedSpan ────────────────────────────────────────── */

interface AnimatedSpanProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedSpan({ children, delay = 0, className, ...props }: AnimatedSpanProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!sequence || itemIndex === null) return;
    if (!sequence.sequenceStarted || hasStarted) return;
    if (sequence.activeIndex === itemIndex) {
      setHasStarted(true);
    }
  }, [sequence, hasStarted, itemIndex]);

  const shouldAnimate = sequence ? hasStarted : true;

  return (
    <motion.div
      ref={elementRef}
      {...props}
      initial={{ opacity: 0, y: -5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: 0.3, delay: sequence ? 0 : delay / 1000 }}
      className={`grid text-sm font-normal tracking-tight ${className ?? ""}`}
      onAnimationComplete={() => {
        if (!sequence || itemIndex === null) return;
        sequence.completeItem(itemIndex);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── TypingAnimation ─────────────────────────────────────── */

interface TypingAnimationProps extends Omit<MotionProps, "children"> {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export function TypingAnimation({
  children,
  className,
  duration = 60,
  delay = 0,
  ...props
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const hasSequence = sequence !== null;
  const sequenceStarted = sequence?.sequenceStarted ?? false;
  const sequenceActiveIndex = sequence?.activeIndex ?? null;
  const completeItemRef = useRef<SequenceContextValue["completeItem"] | null>(null);
  const itemIndexRef = useRef<number | null>(null);

  useEffect(() => {
    completeItemRef.current = sequence?.completeItem ?? null;
    itemIndexRef.current = itemIndex;
  }, [sequence?.completeItem, itemIndex]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (hasSequence && itemIndex !== null) {
      if (sequenceStarted && !started && sequenceActiveIndex === itemIndex) {
        setStarted(true);
      }
    } else {
      timeout = setTimeout(() => setStarted(true), delay);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [delay, started, hasSequence, sequenceActiveIndex, sequenceStarted, itemIndex]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (started) {
      let i = 0;
      interval = setInterval(() => {
        if (i < children.length) {
          setDisplayedText(children.substring(0, i + 1));
          i++;
        } else {
          if (interval) clearInterval(interval);
          const fn = completeItemRef.current;
          const idx = itemIndexRef.current;
          if (fn && idx !== null) fn(idx);
        }
      }, duration);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [children, duration, started]);

  return (
    <motion.span
      ref={elementRef}
      className={`text-sm font-normal tracking-tight ${className ?? ""}`}
      {...props}
    >
      {displayedText}
    </motion.span>
  );
}

/* ─── Terminal ────────────────────────────────────────────── */

interface TerminalProps {
  children: ReactNode;
  className?: string;
  title?: string;
  sequence?: boolean;
  startOnView?: boolean;
  onComplete?: () => void;
}

export function Terminal({
  children,
  className,
  title = "terminal",
  sequence = true,
  startOnView = true,
  onComplete,
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const numChildren = Children.count(children);
  const sequenceHasStarted = sequence ? !startOnView || isInView : false;

  const contextValue = useMemo<SequenceContextValue | null>(() => {
    if (!sequence) return null;
    return {
      completeItem: (index: number) => {
        setActiveIndex((current) => {
          return index === current ? current + 1 : current;
        });
      },
      activeIndex,
      sequenceStarted: sequenceHasStarted,
    };
  }, [sequence, activeIndex, sequenceHasStarted, numChildren, onComplete]);

  useEffect(() => {
    if (activeIndex === numChildren && onComplete) {
      onComplete();
    }
  }, [activeIndex, numChildren, onComplete]);

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children;
    const array = Children.toArray(children);
    return array.map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child as ReactNode}
      </ItemIndexContext.Provider>
    ));
  }, [children, sequence]);

  const content = (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden rounded-sm border border-border bg-card text-left shadow-[var(--shadow-card)] ${className ?? ""}`}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.18_25)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.75_0.18_78)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.15_140)]" />
        <div className="flex-1 text-center">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground/60">
            {title}
          </span>
        </div>
        <div className="w-[30px]" />
      </div>
      <pre className="p-5 h-[220px]">
        <code className="grid gap-y-1 overflow-auto">{wrappedChildren}</code>
      </pre>
    </div>
  );

  if (!sequence) return content;

  return <SequenceContext.Provider value={contextValue}>{content}</SequenceContext.Provider>;
}

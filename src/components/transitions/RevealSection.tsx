"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Animate children individually with stagger (adds data-reveal to direct children) */
  stagger?: boolean;
}

/**
 * Fades and slides a section into view when it enters the viewport.
 * With `stagger`, each direct child animates in sequence.
 */
export function RevealSection({
  children,
  className,
  delay = 0,
  y = 50,
  stagger = false,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = stagger ? Array.from(el.children) : [el];

      const tween = gsap.from(targets, {
        y,
        opacity: 0,
        duration: 0.9,
        stagger: stagger ? 0.12 : 0,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });

      return () => tween.kill();
    },
    { scope: ref, dependencies: [y, delay, stagger] }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

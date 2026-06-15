"use client";

import { useRef, useEffect, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: string;
  className?: string;
  /** Trigger when in viewport (default) or on mount */
  trigger?: "scroll" | "mount";
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Character-by-character staggered text reveal.
 * Each character slides up from a masked container.
 */
export function RevealText({
  children,
  className,
  trigger = "scroll",
  delay = 0,
  tag: Tag = "span",
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      // Build char spans
      const chars = children.split("").map((char) => {
        const wrapper = document.createElement("span");
        const inner = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";
        inner.style.display = "inline-block";
        inner.textContent = char === " " ? " " : char;
        wrapper.appendChild(inner);
        return { wrapper, inner };
      });

      el.innerHTML = "";
      chars.forEach(({ wrapper }) => el.appendChild(wrapper));

      const inners = chars.map((c) => c.inner);

      const tween = gsap.from(inners, {
        y: "110%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.025,
        delay,
        ease: "expo.out",
        ...(trigger === "scroll"
          ? {
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            }
          : {}),
      });

      return () => tween.kill();
    },
    { scope: containerRef, dependencies: [children, trigger, delay] }
  );

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={containerRef} className={cn("overflow-hidden", className)}>
      {children}
    </Tag>
  );
}

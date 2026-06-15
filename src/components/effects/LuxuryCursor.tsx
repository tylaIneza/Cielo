"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/** Custom gold cursor — replaces the default browser cursor on desktop. */
export function LuxuryCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    // Hide on mobile/touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const tick = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.12;

      if (innerRef.current) {
        innerRef.current.style.transform =
          `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${smooth.current.x - 20}px, ${smooth.current.y - 20}px)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(
        !!(t.closest("a") || t.closest("button") || t.dataset.cursor === "hover")
      );
    };

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseleave", () => setIsVisible(false));
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [isVisible]);

  return (
    <>
      {/* Outer ring — follows with lag */}
      <div
        ref={outerRef}
        className="luxury-cursor-outer"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `1px solid rgba(201,168,76,${isHovering ? 0.8 : 0.4})`,
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s, border-color 0.2s, transform 0.0s",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      {/* Inner dot — follows instantly */}
      <div
        ref={innerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#c9a84c",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s, transform 0.0s",
          willChange: "transform",
        }}
      />
    </>
  );
}

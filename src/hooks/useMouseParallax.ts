"use client";

import { useEffect, useRef } from "react";

interface MouseParallaxOptions {
  strength?: number;
  ease?: number;
}

/**
 * Returns a ref to a smoothed [x, y] mouse position
 * normalized to [-1, 1] range, with configurable easing.
 */
export function useMouseParallax({ strength = 1, ease = 0.05 }: MouseParallaxOptions = {}) {
  const raw = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      raw.current.x = ((e.clientX / window.innerWidth) - 0.5) * 2 * strength;
      raw.current.y = -((e.clientY / window.innerHeight) - 0.5) * 2 * strength;
    };

    const tick = () => {
      smooth.current.x += (raw.current.x - smooth.current.x) * ease;
      smooth.current.y += (raw.current.y - smooth.current.y) * ease;
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [strength, ease]);

  return smooth;
}

"use client";

import { useEffect, useRef } from "react";

/**
 * Returns a ref to the current scroll progress [0, 1]
 * relative to the full page height. Updates every frame via Lenis.
 */
export function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? window.scrollY / max : 0;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

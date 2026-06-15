"use client";

import { ReactNode, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GSAPLenisBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Sync Lenis smooth scroll with GSAP ScrollTrigger
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", () => ScrollTrigger.update());

    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      <GSAPLenisBridge />
      {children}
    </ReactLenis>
  );
}

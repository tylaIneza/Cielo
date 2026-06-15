"use client";

import { useLenis as useLenisBase } from "lenis/react";

/** Returns the Lenis instance — use lenis.scrollTo(target) for programmatic scrolling */
export function useLenis() {
  return useLenisBase();
}

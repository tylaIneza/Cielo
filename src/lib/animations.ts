/**
 * Reusable GSAP animation utilities for Cielo Fashion.
 * Import individual functions — never import the whole module to keep bundles lean.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Eases ──────────────────────────────────────────────────────────────────

export const EASE_LUXURY = "expo.out";
export const EASE_SPRING = "elastic.out(1, 0.5)";
export const EASE_SMOOTH = "power3.inOut";

// ─── Text Reveal ─────────────────────────────────────────────────────────────

/** Splits a string into character spans for individual animation */
export function splitToChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.innerHTML = "";
  return text.split("").map((char) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.overflow = "hidden";
    span.textContent = char === " " ? " " : char;
    el.appendChild(span);
    return span;
  });
}

/** Staggered character reveal tied to scroll position */
export function revealChars(el: HTMLElement, options: gsap.TweenVars = {}) {
  const chars = splitToChars(el);
  return gsap.from(chars, {
    y: "110%",
    opacity: 0,
    duration: 0.8,
    stagger: 0.03,
    ease: EASE_LUXURY,
    ...options,
  });
}

// ─── Section Reveals ─────────────────────────────────────────────────────────

/** Fade + slide up reveal on scroll enter */
export function revealOnScroll(
  elements: Element | Element[] | string,
  options: Partial<{
    y: number;
    duration: number;
    stagger: number;
    delay: number;
    start: string;
  }> = {}
) {
  const {
    y = 50,
    duration = 0.9,
    stagger = 0.12,
    delay = 0,
    start = "top 85%",
  } = options;

  return gsap.from(elements, {
    y,
    opacity: 0,
    duration,
    stagger,
    delay,
    ease: EASE_LUXURY,
    scrollTrigger: {
      trigger: Array.isArray(elements) ? (elements[0] as Element) : elements,
      start,
      once: true,
    },
  });
}

// ─── Parallax ────────────────────────────────────────────────────────────────

/** Smooth parallax — element moves at a fraction of the scroll speed */
export function parallaxOnScroll(
  el: Element,
  { speed = 0.3, trigger }: { speed?: number; trigger?: Element }
) {
  return gsap.to(el, {
    y: () => -(window.innerHeight * speed),
    ease: "none",
    scrollTrigger: {
      trigger: trigger ?? el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

// ─── Pin + Scrub ─────────────────────────────────────────────────────────────

/** Pin an element while the user scrolls through a set distance */
export function pinSection(
  trigger: Element,
  options: Partial<ScrollTrigger.Vars> = {}
) {
  return ScrollTrigger.create({
    trigger,
    start: "top top",
    end: "+=100%",
    pin: true,
    pinSpacing: true,
    ...options,
  });
}

// ─── Counter ─────────────────────────────────────────────────────────────────

/** Animate a number from 0 to target when it enters the viewport */
export function animateCounter(el: HTMLElement, target: number, suffix = "") {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: target,
    duration: 1.5,
    ease: EASE_LUXURY,
    scrollTrigger: { trigger: el, start: "top 80%", once: true },
    onUpdate() {
      el.textContent = Math.round(obj.val) + suffix;
    },
  });
}

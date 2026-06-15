"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

interface CameraRigProps {
  /** 0–1 mouse influence on camera position */
  strength?: number;
  /** Lerp speed 0–1 */
  ease?: number;
  disabled?: boolean;
}

/**
 * Adds subtle mouse-parallax to the R3F camera.
 * Place inside a Canvas — no JSX output, pure side-effect component.
 */
export function CameraRig({ strength = 0.35, ease = 0.05, disabled = false }: CameraRigProps) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled) return;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = ((e.clientX / window.innerWidth) - 0.5) * 2;
      mouse.current.y = -((e.clientY / window.innerHeight) - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [disabled]);

  useFrame(() => {
    if (disabled) return;
    smooth.current.x += (mouse.current.x - smooth.current.x) * ease;
    smooth.current.y += (mouse.current.y - smooth.current.y) * ease;
    camera.position.x = smooth.current.x * strength;
    camera.position.y = smooth.current.y * (strength * 0.7);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

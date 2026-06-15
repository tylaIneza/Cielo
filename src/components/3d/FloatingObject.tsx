"use client";

import { useRef, ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface FloatingObjectProps {
  children: ReactNode;
  position?: [number, number, number];
  rotationSpeed?: [number, number, number];
  floatSpeed?: number;
  floatIntensity?: number;
  rotationIntensity?: number;
}

/**
 * Reusable wrapper that adds physics-like floating + rotation to any 3D child.
 * Composes with Drei's Float for smooth GPU-side motion.
 */
export function FloatingObject({
  children,
  position = [0, 0, 0],
  rotationSpeed = [0.3, 0.5, 0.1],
  floatSpeed = 1.5,
  floatIntensity = 0.8,
  rotationIntensity = 0.4,
}: FloatingObjectProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const g = groupRef.current;
    if (!g) return;
    const t = clock.elapsedTime;
    // Extra rotation layered on top of Float
    g.rotation.x += rotationSpeed[0] * 0.01;
    g.rotation.y += rotationSpeed[1] * 0.01;
    g.rotation.z = Math.sin(t * 0.3) * 0.05;
  });

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
      position={position}
    >
      <group ref={groupRef}>{children}</group>
    </Float>
  );
}

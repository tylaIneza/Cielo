"use client";

import { useRef } from "react";
import { Float, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingCardProps {
  position: [number, number, number];
  label: string;
  sublabel: string;
  accent?: string;
  delay?: number;
}

/**
 * A glass-morphism info card floating in 3D space.
 * Uses Drei's Html for DOM content rendered inside the WebGL canvas.
 */
export function FloatingCard({
  position,
  label,
  sublabel,
  delay = 0,
}: FloatingCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const m = meshRef.current;
    if (!m) return;
    m.rotation.y = Math.sin(clock.elapsedTime * 0.4 + delay) * 0.05;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4} floatingRange={[-0.08, 0.08]}>
      <group position={position}>
        {/* Glass backing */}
        <mesh ref={meshRef}>
          <boxGeometry args={[1.6, 0.85, 0.04]} />
          <meshPhysicalMaterial
            color="#0a0a0a"
            metalness={0}
            roughness={0}
            transmission={0.85}
            thickness={0.5}
            transparent
            opacity={0.75}
          />
        </mesh>

        {/* Gold border ring */}
        <mesh position={[0, 0, 0.025]}>
          <boxGeometry args={[1.62, 0.87, 0.002]} />
          <meshStandardMaterial
            color="#c9a84c"
            emissive="#c9a84c"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Text content via Html overlay */}
        <Html
          position={[0, 0, 0.05]}
          center
          style={{ pointerEvents: "none", userSelect: "none" }}
          transform
          occlude="blending"
        >
          <div
            style={{
              width: 160,
              textAlign: "center",
              padding: "6px 12px",
            }}
          >
            <p
              style={{
                fontSize: "0.55rem",
                color: "#c9a84c",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: 3,
                fontFamily: "var(--font-inter, sans-serif)",
              }}
            >
              {sublabel}
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#f5f0e8",
                fontFamily: "var(--font-playfair, serif)",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {label}
            </p>
          </div>
        </Html>
      </group>
    </Float>
  );
}

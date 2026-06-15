"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Torus, Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface ScrollSceneProps {
  /** Normalized scroll progress 0–1 passed from parent */
  scrollProgress: React.MutableRefObject<number>;
}

/**
 * A supplementary 3D scene that morphs as the user scrolls.
 * Geometry scales, rotates, and transitions colour based on scrollProgress ref.
 */
export function ScrollScene({ scrollProgress }: ScrollSceneProps) {
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const scale = Math.min(viewport.width / 6, 1.2);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const s = scrollProgress.current;

    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.2 + s * Math.PI;
      torusRef.current.rotation.y = t * 0.3 + s * Math.PI * 0.5;
      torusRef.current.scale.setScalar(scale * (1 + s * 0.4));
    }

    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t * 0.5) * 0.3 + s * 2;
      sphereRef.current.rotation.y = t * 0.4;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = s * Math.PI * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Pulsing torus */}
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
        <Torus ref={torusRef} args={[1.2, 0.05, 16, 100]} position={[2.5, 0.5, -3]} castShadow>
          <meshStandardMaterial
            color="#c9a84c"
            emissive="#c9a84c"
            emissiveIntensity={0.4}
            metalness={0.95}
            roughness={0.05}
          />
        </Torus>
      </Float>

      {/* Morphing emerald sphere */}
      <Float speed={1.2} floatIntensity={0.6}>
        <Sphere ref={sphereRef} args={[0.6, 64, 64]} position={[-3, 0.8, -2]}>
          <MeshDistortMaterial
            color="#1a6b3c"
            emissive="#1a6b3c"
            emissiveIntensity={0.25}
            speed={2}
            distort={0.35}
            metalness={0.2}
            roughness={0.3}
          />
        </Sphere>
      </Float>

      {/* Second torus ring */}
      <Float speed={0.6} rotationIntensity={0.3}>
        <Torus args={[0.7, 0.03, 12, 80]} position={[-2.2, -1, -1.5]} castShadow>
          <meshStandardMaterial
            color="#c9a84c"
            emissive="#c9a84c"
            emissiveIntensity={0.5}
            metalness={0.98}
            roughness={0.02}
          />
        </Torus>
      </Float>
    </group>
  );
}

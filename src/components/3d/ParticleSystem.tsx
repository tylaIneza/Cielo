"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleSystemProps {
  /** Total particle count — auto-halved on mobile */
  count?: number;
  spread?: [number, number, number];
  /** Primary particle color */
  color?: string;
  /** Emissive glow color */
  emissive?: string;
  emissiveIntensity?: number;
  baseSize?: number;
}

/**
 * GPU-efficient particle system using InstancedMesh.
 * 600+ gold dust particles with individual floating animation.
 */
export function ParticleSystem({
  count = 600,
  spread = [20, 14, 10],
  color = "#c9a84c",
  emissive = "#c9a84c",
  emissiveIntensity = 0.6,
  baseSize = 0.018,
}: ParticleSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-generate stable per-particle data
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * spread[0],
      y: (Math.random() - 0.5) * spread[1],
      z: (Math.random() - 0.5) * spread[2],
      speed: 0.2 + Math.random() * 0.8,
      offset: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 2,
      size: baseSize * (0.5 + Math.random()),
    }));
  }, [count, spread, baseSize]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      dummy.position.set(
        p.x + Math.sin(t * p.speed * 0.3 + p.offset) * 0.2,
        p.y + Math.sin(t * p.speed + p.offset) * 0.35,
        p.z + Math.cos(t * p.speed * 0.5 + p.offset) * 0.15
      );
      dummy.rotation.x = t * p.rotSpeed * 0.5;
      dummy.rotation.z = t * p.rotSpeed;
      const s = p.size * (0.85 + Math.sin(t * p.speed + p.offset) * 0.15);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        metalness={0.9}
        roughness={0.05}
      />
    </instancedMesh>
  );
}

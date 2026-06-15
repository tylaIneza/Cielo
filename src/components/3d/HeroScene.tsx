"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Torus,
  SpotLight,
  useProgress,
  Html,
  Sphere,
} from "@react-three/drei";
import * as THREE from "three";
import { CameraRig } from "./CameraRig";
import { ParticleSystem } from "./ParticleSystem";
import { PostProcessing } from "./PostProcessing";
import { ScrollScene } from "./ScrollScene";
import { useScrollProgress } from "@/hooks/useScrollProgress";

// ─── Loader ──────────────────────────────────────────────────────────────────

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "#c9a84c", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
        {Math.round(progress)}%
      </div>
    </Html>
  );
}

// ─── Golden Ring ─────────────────────────────────────────────────────────────

function GoldenRing({
  position,
  radius = 1,
  tube = 0.04,
  speed = 1,
}: {
  position: [number, number, number];
  radius?: number;
  tube?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.elapsedTime * 0.3 * speed;
    meshRef.current.rotation.y = clock.elapsedTime * 0.5 * speed;
  });
  return (
    <Torus ref={meshRef} args={[radius, tube, 16, 120]} position={position}>
      <meshStandardMaterial
        color="#c9a84c"
        emissive="#c9a84c"
        emissiveIntensity={0.4}
        metalness={0.98}
        roughness={0.02}
        envMapIntensity={3}
      />
    </Torus>
  );
}

// ─── Fabric Panel ─────────────────────────────────────────────────────────────

function FabricPanel({
  position,
  color,
  index,
}: {
  position: [number, number, number];
  color: string;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.rotation.y = Math.sin(t * 0.3 + index) * 0.15;
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.6 + index * 1.2) * 0.12;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} castShadow>
        <boxGeometry args={[0.55, 1.15, 0.07]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.12}
          roughness={0.25}
          metalness={0.08}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

// ─── Mannequin ───────────────────────────────────────────────────────────────

function Mannequin() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.12;
  });
  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Torso */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.21, 1.35, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.25} metalness={0.75} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.19, 32, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.25} metalness={0.75} />
      </mesh>
      {/* Hips */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.30, 0.24, 0.48, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.25} metalness={0.75} />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -1.2, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.8, 16]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.05} metalness={0.98} emissive="#c9a84c" emissiveIntensity={0.2} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -1.65, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.04, 32]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.05} metalness={0.98} emissive="#c9a84c" emissiveIntensity={0.3} />
      </mesh>
      {/* Draped fabric */}
      <mesh position={[0, 0.2, 0.025]}>
        <planeGeometry args={[0.6, 1.55, 8, 16]} />
        <MeshDistortMaterial
          color="#1a6b3c"
          speed={1.2}
          distort={0.07}
          side={THREE.DoubleSide}
          roughness={0.35}
          metalness={0.05}
          opacity={0.93}
          transparent
          envMapIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

// ─── Ambient Orb ─────────────────────────────────────────────────────────────

function GlowOrb({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.2;
    (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.4 + Math.sin(t * 1.2) * 0.15;
  });
  return (
    <Sphere ref={meshRef} args={[0.15, 32, 32]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.3}
        roughness={0.6}
        transparent
        opacity={0.9}
      />
    </Sphere>
  );
}

// ─── Main Scene ──────────────────────────────────────────────────────────────

function Scene({ isMobile, scrollProgress }: { isMobile: boolean; scrollProgress: React.MutableRefObject<number> }) {
  const { viewport } = useThree();
  const scale = Math.min(viewport.width / 7, 1.1);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.25} color="#f5f0e8" />
      <SpotLight
        position={[3, 7, 3]}
        angle={0.35}
        penumbra={0.85}
        intensity={100}
        color="#c9a84c"
        castShadow
        shadow-mapSize={[isMobile ? 512 : 2048, isMobile ? 512 : 2048]}
      />
      <SpotLight
        position={[-3.5, 5, 2]}
        angle={0.5}
        penumbra={0.9}
        intensity={50}
        color="#1a6b3c"
        castShadow={false}
      />
      <pointLight position={[0, 3, 5]} intensity={25} color="#f5f0e8" />
      <pointLight position={[0, -2, 3]} intensity={8} color="#c9a84c" />

      <Environment preset="studio" />

      {/* Main composition group */}
      <group scale={[scale, scale, scale]}>
        <Mannequin />

        {/* Floating fabric panels */}
        <FabricPanel position={[-2.6, 0.5, -1.2]} color="#c9a84c" index={0} />
        <FabricPanel position={[2.6, 0.2, -1.8]} color="#1a6b3c" index={1} />
        <FabricPanel position={[-1.9, -0.9, -0.6]} color="#f5f0e8" index={2} />

        {/* Golden rings */}
        <GoldenRing position={[2.2, 1.8, -2.5]} radius={1.1} tube={0.045} speed={0.9} />
        <GoldenRing position={[-2.8, -0.3, -2]} radius={0.75} tube={0.032} speed={1.3} />
        <GoldenRing position={[0.5, 2.8, -3]} radius={0.5} tube={0.025} speed={0.7} />

        {/* Ambient glow orbs */}
        <GlowOrb position={[1.8, 0.8, -0.5]} color="#c9a84c" />
        <GlowOrb position={[-1.5, 1.2, -0.8]} color="#1a6b3c" />

        {/* GPU particle system — reduced count on mobile */}
        <ParticleSystem
          count={isMobile ? 200 : 650}
          spread={[22, 15, 12]}
          color="#c9a84c"
          emissive="#c9a84c"
          emissiveIntensity={isMobile ? 0.3 : 0.6}
          baseSize={0.017}
        />

        {/* Green accent particles */}
        <ParticleSystem
          count={isMobile ? 60 : 150}
          spread={[18, 12, 8]}
          color="#1a6b3c"
          emissive="#22a85a"
          emissiveIntensity={0.4}
          baseSize={0.022}
        />

        {/* Scroll-reactive geometry */}
        {!isMobile && <ScrollScene scrollProgress={scrollProgress} />}
      </group>

      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4 * scale, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#060606"
          roughness={0.08}
          metalness={0.9}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* Camera parallax rig */}
      <CameraRig strength={0.3} ease={0.04} disabled={isMobile} />

      {/* Post-processing */}
      {!isMobile && <PostProcessing bloomIntensity={1.1} bloomThreshold={0.35} vignetteDarkness={0.5} />}
      {isMobile && <PostProcessing mobile bloomIntensity={0.6} bloomThreshold={0.5} vignetteDarkness={0.4} />}
    </>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

interface HeroSceneProps {
  isMobile?: boolean;
}

export function HeroScene({ isMobile = false }: HeroSceneProps) {
  const scrollProgress = useScrollProgress();

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 48 }}
      shadows
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: !isMobile,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.3,
        powerPreference: "high-performance",
      }}
      className="w-full h-full"
    >
      <Suspense fallback={<Loader />}>
        <Scene isMobile={isMobile} scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}

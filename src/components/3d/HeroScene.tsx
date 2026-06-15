"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Sphere,
  Box,
  Torus,
  SpotLight,
  useProgress,
  Html,
} from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-[#c9a84c] text-sm tracking-widest uppercase">
        {Math.round(progress)}%
      </div>
    </Html>
  );
}

function GoldenRing({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <Torus ref={meshRef} args={[1, 0.04, 16, 100]} position={position}>
      <meshStandardMaterial
        color="#c9a84c"
        metalness={0.95}
        roughness={0.05}
        envMapIntensity={2}
      />
    </Torus>
  );
}

function FloatingGarment({ position, color = "#1a6b3c" }: { position: [number, number, number]; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.08]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.15}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

function MannequinSilhouette() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Body */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.22, 1.4, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Hips */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.25, 0.5, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -1.2, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.1} metalness={0.95} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -1.65, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Fabric drape over body */}
      <mesh position={[0, 0.2, 0.02]}>
        <planeGeometry args={[0.65, 1.6, 8, 16]} />
        <MeshDistortMaterial
          color="#1a6b3c"
          speed={1.5}
          distort={0.08}
          side={THREE.DoubleSide}
          roughness={0.4}
          opacity={0.92}
          transparent
        />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const count = 40;
  const positions = Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 6,
    z: (Math.random() - 0.5) * 5,
    speed: 0.3 + Math.random() * 0.7,
    offset: Math.random() * Math.PI * 2,
  }));

  return (
    <>
      {positions.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}
    </>
  );
}

function FloatingParticle({
  x, y, z, speed, offset,
}: {
  x: number; y: number; z: number; speed: number; offset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = y + Math.sin(state.clock.elapsedTime * speed + offset) * 0.3;
    meshRef.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={meshRef} position={[x, y, z]}>
      <octahedronGeometry args={[0.04, 0]} />
      <meshStandardMaterial
        color={Math.random() > 0.5 ? "#c9a84c" : "#1a6b3c"}
        emissive={Math.random() > 0.5 ? "#c9a84c" : "#1a6b3c"}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.1}
      />
    </mesh>
  );
}

function Scene() {
  const { viewport } = useThree();
  const scale = Math.min(viewport.width / 8, 1);

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.3} color="#f5f0e8" />
      <SpotLight
        position={[3, 6, 3]}
        angle={0.4}
        penumbra={0.8}
        intensity={80}
        color="#c9a84c"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <SpotLight
        position={[-3, 4, 2]}
        angle={0.5}
        penumbra={0.9}
        intensity={40}
        color="#1a6b3c"
        castShadow={false}
      />
      <pointLight position={[0, 2, 4]} intensity={20} color="#f5f0e8" />

      {/* Environment */}
      <Environment preset="studio" />

      {/* Main mannequin */}
      <group scale={[scale, scale, scale]}>
        <MannequinSilhouette />

        {/* Floating garments */}
        <FloatingGarment position={[-2.5, 0.5, -1]} color="#c9a84c" />
        <FloatingGarment position={[2.5, 0.2, -1.5]} color="#1a6b3c" />
        <FloatingGarment position={[-1.8, -0.8, -0.5]} color="#f5f0e8" />

        {/* Golden rings */}
        <GoldenRing position={[2, 1.5, -2]} />
        <GoldenRing position={[-2.5, -0.5, -1.5]} />

        {/* Particles */}
        <FloatingParticles />
      </group>

      {/* Floor reflection plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2 * scale, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.1}
          metalness={0.8}
          envMapIntensity={0.5}
        />
      </mesh>
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      shadows
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      className="w-full h-full"
    >
      <Suspense fallback={<Loader />}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

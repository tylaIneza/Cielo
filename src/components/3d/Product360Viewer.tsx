"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  PresentationControls,
  Float,
  Html,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-[#c9a84c] text-xs tracking-widest uppercase">
        {Math.round(progress)}%
      </div>
    </Html>
  );
}

function GarmentModel({ color = "#1a6b3c" }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Dress body */}
        <mesh castShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.9, 2.2, 32, 8, true]} />
          <meshPhysicalMaterial
            color={color}
            roughness={0.5}
            metalness={0.0}
            side={THREE.DoubleSide}
            transparent
            opacity={0.95}
          />
        </mesh>
        {/* Bodice */}
        <mesh castShadow position={[0, 1.3, 0]}>
          <cylinderGeometry args={[0.38, 0.5, 0.8, 32, 4, true]} />
          <meshPhysicalMaterial
            color={color}
            roughness={0.4}
            metalness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Neck */}
        <mesh castShadow position={[0, 1.85, 0]}>
          <torusGeometry args={[0.28, 0.04, 16, 64]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Shoulders */}
        {[-0.42, 0.42].map((x) => (
          <mesh key={x} castShadow position={[x, 1.6, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        {/* Pattern embroidery (torus rings for decoration) */}
        {[-0.5, 0, 0.5].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.7 + i * 0.05, 0.008, 8, 80]} />
            <meshStandardMaterial
              color="#c9a84c"
              metalness={0.6}
              roughness={0.2}
              emissive="#c9a84c"
              emissiveIntensity={0.1}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

interface Product360ViewerProps {
  color?: string;
  className?: string;
}

export function Product360Viewer({ color = "#1a6b3c", className = "" }: Product360ViewerProps) {
  return (
    <div className={`relative w-full h-full bg-[#0d0d0d] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} color="#f5f0e8" />
          <spotLight position={[4, 8, 4]} angle={0.3} penumbra={0.8} intensity={60} color="#c9a84c" castShadow />
          <spotLight position={[-4, 4, -2]} angle={0.4} penumbra={0.9} intensity={30} color="#1a6b3c" />
          <pointLight position={[0, -2, 4]} intensity={10} color="#f5f0e8" />

          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI, Math.PI]}
            damping={0.2}
            snap
          >
            <GarmentModel color={color} />
          </PresentationControls>

          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.5}
            scale={5}
            blur={2}
            far={4}
          />

          <Environment preset="studio" />
        </Suspense>
      </Canvas>

      {/* Rotation hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[0.65rem] text-[#555] pointer-events-none">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Drag to rotate · Pinch to zoom
      </div>
    </div>
  );
}

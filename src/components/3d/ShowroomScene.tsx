"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Box,
  Sphere,
  Cylinder,
  Plane,
  ContactShadows,
  Float,
  Html,
  useProgress,
  SpotLight,
} from "@react-three/drei";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-[#c9a84c] text-xs tracking-widest">{Math.round(progress)}%</div>
    </Html>
  );
}

function BoutiqueFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#1a1a0a" roughness={0.1} metalness={0.3} envMapIntensity={1} />
    </mesh>
  );
}

function LuxuryCarpet() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.98, 0]}>
      <planeGeometry args={[6, 10]} />
      <meshStandardMaterial color="#1a4d2e" roughness={0.9} metalness={0.0} />
    </mesh>
  );
}

function ClothingRack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Horizontal bar */}
      <mesh castShadow>
        <cylinderGeometry args={[0.03, 0.03, 2.5, 8]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Left support */}
      <mesh position={[-1.2, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Right support */}
      <mesh position={[1.2, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Base */}
      <mesh position={[-1.2, -1, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 16]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.2, -1, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 16]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Hanging clothes */}
      {[-0.8, -0.3, 0.2, 0.7].map((x, i) => (
        <Float key={i} speed={0.8 + i * 0.2} floatIntensity={0.1} rotationIntensity={0.05}>
          <group position={[x, -0.3, 0]}>
            {/* Hanger */}
            <mesh>
              <torusGeometry args={[0.12, 0.015, 8, 32, Math.PI]} />
              <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Garment */}
            <mesh position={[0, -0.5, 0]}>
              <planeGeometry args={[0.35, 0.9, 4, 8]} />
              <meshStandardMaterial
                color={["#1a6b3c", "#c9a84c", "#1a3b6b", "#8b1a1a"][i]}
                roughness={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

function DisplayMannequin({ position, clothColor }: { position: [number, number, number]; clothColor: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.1;
  });
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.22, 0.18, 1.2, 16]} /><meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} /></mesh>
      <mesh position={[0, 1.15, 0]}><sphereGeometry args={[0.18, 16, 16]} /><meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} /></mesh>
      <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.25, 0.22, 0.4, 16]} /><meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} /></mesh>
      <mesh position={[0, -0.85, 0]}><cylinderGeometry args={[0.03, 0.03, 0.8, 8]} /><meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[0, -1.26, 0]}><cylinderGeometry args={[0.22, 0.22, 0.04, 16]} /><meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} /></mesh>
      <mesh position={[0, 0.2, 0.02]}><planeGeometry args={[0.52, 1.4, 4, 8]} /><meshStandardMaterial color={clothColor} roughness={0.5} side={THREE.DoubleSide} /></mesh>
    </group>
  );
}

function GoldMirror({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[1.2, 2.2]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.95} roughness={0.02} envMapIntensity={3} />
      </mesh>
      {/* Gold frame */}
      {[[-0.65, 0, 0.02], [0.65, 0, 0.02]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.06, 2.4, 0.04]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {[[ 0, 1.15, 0.02], [0, -1.15, 0.02]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[1.4, 0.06, 0.04]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} color="#f5f0e8" />
      <SpotLight position={[0, 6, 0]} angle={0.5} penumbra={0.8} intensity={100} color="#f5e8c0" castShadow />
      <SpotLight position={[3, 4, 3]} angle={0.4} penumbra={0.9} intensity={60} color="#c9a84c" />
      <SpotLight position={[-3, 4, -3]} angle={0.4} penumbra={0.9} intensity={40} color="#1a6b3c" />
      <pointLight position={[0, 2, 5]} intensity={30} color="#f5f0e8" />

      <BoutiqueFloor />
      <LuxuryCarpet />

      {/* Mannequins */}
      <DisplayMannequin position={[-1.5, -1.5, 0]} clothColor="#1a6b3c" />
      <DisplayMannequin position={[0, -1.5, -0.3]} clothColor="#c9a84c" />
      <DisplayMannequin position={[1.5, -1.5, 0]} clothColor="#8b1a1a" />

      {/* Clothing racks */}
      <ClothingRack position={[-3.5, 0, -2]} />
      <ClothingRack position={[3.5, 0, -2]} />

      {/* Mirrors */}
      <GoldMirror position={[-4.5, 0, -4]} />
      <GoldMirror position={[4.5, 0, -4]} />

      {/* Ceiling pendants */}
      {[-2, 0, 2].map((x, i) => (
        <group key={i} position={[x, 3, 0]}>
          <mesh><cylinderGeometry args={[0.02, 0.02, 0.5, 8]} /><meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} /></mesh>
          <mesh position={[0, -0.4, 0]}><sphereGeometry args={[0.12, 16, 16]} /><meshStandardMaterial color="#f5e8c0" emissive="#f5e8c0" emissiveIntensity={2} /></mesh>
          <pointLight position={[0, -0.6, 0]} intensity={15} color="#f5e8c0" distance={4} />
        </group>
      ))}

      <ContactShadows position={[0, -1.98, 0]} opacity={0.6} scale={12} blur={2} />
      <Environment preset="apartment" />
    </>
  );
}

export function ShowroomScene() {
  return (
    <Canvas
      camera={{ position: [0, 1, 7], fov: 60 }}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.3 }}
    >
      <Suspense fallback={<Loader />}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

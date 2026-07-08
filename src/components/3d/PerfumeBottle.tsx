"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PerfumeBottleProps {
  liquidColor?: string;
  intensity?: number;
}

export default function PerfumeBottle({
  liquidColor = "#d4af37", // Default gold/champagne
  intensity = 1.0,
}: PerfumeBottleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const liquidMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Smooth transition of color and emissive color
  useEffect(() => {
    if (liquidMaterialRef.current) {
      const targetColor = new THREE.Color(liquidColor);
      liquidMaterialRef.current.color.copy(targetColor);
      liquidMaterialRef.current.emissive.copy(targetColor);
    }
  }, [liquidColor]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // Mouse coords (-1 to +1)

    // Lerp rotation to point slightly towards mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.6 + t * 0.15, // base slow rotation + mouse x offset
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.4, // mouse y offset
      0.05
    );

    // Subtle luxury floating movement
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      Math.sin(t * 1.2) * 0.12 - 0.6, // float offset centered at position y = -0.6
      0.05
    );
  });

  return (
    <group ref={groupRef} scale={[1.6, 1.6, 1.6]} position={[0, -0.6, 0]}>
      {/* 1. Metal Atomizer/Neck */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.35, 32]} />
        <meshStandardMaterial
          metalness={0.9}
          roughness={0.15}
          color="#dfba80" // Warm gold metallic
        />
      </mesh>

      {/* 2. Cap Lip */}
      <mesh position={[0, 1.62, 0]}>
        <torusGeometry args={[0.12, 0.03, 16, 32]} />
        <meshStandardMaterial
          metalness={0.9}
          roughness={0.1}
          color="#dfba80"
        />
      </mesh>

      {/* 3. Outer Glass Bottle Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2.6, 64, 1, false]} />
        {/* Physical glass shader */}
        <meshPhysicalMaterial
          transparent
          opacity={0.3}
          roughness={0.02}
          metalness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          transmission={0.95} // Make it highly transparent glass
          thickness={0.08}    // Thin glass look so liquid shines through
          ior={1.52}          // Index of refraction of glass
          color="#ffffff"
        />
      </mesh>

      {/* 4. Inside Liquid Core - Fills the bottle height and width */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 2.4, 32]} />
        <meshStandardMaterial
          ref={liquidMaterialRef}
          roughness={0.1}
          metalness={0.2}
          transparent
          opacity={0.85}
          color={liquidColor}
          emissive={liquidColor}
          emissiveIntensity={0.45 * intensity}
        />
      </mesh>

      {/* 5. Gold Bottom base Ring */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.51, 0.51, 0.1, 64]} />
        <meshStandardMaterial
          metalness={0.95}
          roughness={0.1}
          color="#dfba80"
        />
      </mesh>

      {/* 6. Glowing core bubble (aesthetic particle) */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6 * intensity} />
      </mesh>
    </group>
  );
}

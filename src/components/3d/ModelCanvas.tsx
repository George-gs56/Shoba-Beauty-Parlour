"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Sparkles, Environment } from "@react-three/drei";
import PerfumeBottle from "./PerfumeBottle";
import { Suspense } from "react";

interface ModelCanvasProps {
  liquidColor?: string;
  intensity?: number;
}

export default function ModelCanvas({
  liquidColor = "#d4af37",
  intensity = 1.0,
}: ModelCanvasProps) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Bright Ambient Light to fully illuminate the bottle */}
        <ambientLight intensity={1.2} />

        {/* Key spotlight from top-left */}
        <spotLight
          position={[4, 8, 4]}
          angle={0.4}
          penumbra={0.8}
          intensity={4.0}
          castShadow={false}
          color="#fffaf0"
        />
        {/* Fill light from right */}
        <spotLight
          position={[-4, 4, 3]}
          angle={0.5}
          penumbra={1}
          intensity={2.5}
          color="#ffffff"
        />

        {/* Strong front fill light so the bottle is fully visible */}
        <directionalLight position={[0, 2, 6]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[0, -2, 5]} intensity={1.5} color="#fffbf0" />

        {/* Colored backlight to glow through the liquid */}
        <pointLight position={[0, 0, -3]} intensity={5.0} color={liquidColor} />
        {/* Side rim light to show bottle edges */}
        <pointLight position={[3, 0, 0]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-3, 0, 0]} intensity={2.0} color="#fffaf0" />

        {/* HDR environment map for reflections */}
        <Environment preset="studio" />

        <Suspense fallback={null}>
          <PerfumeBottle liquidColor={liquidColor} intensity={intensity} />
          
          {/* Floating gold glitter particles */}
          <Sparkles
            count={50}
            scale={5}
            size={2.0}
            speed={0.3}
            color={liquidColor}
            opacity={0.55}
          />

          {/* Luxury soft contact shadow beneath the bottle */}
          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.4}
            scale={5}
            blur={2.4}
            far={2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

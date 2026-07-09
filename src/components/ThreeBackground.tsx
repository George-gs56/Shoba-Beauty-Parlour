"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    
    // Position camera slightly tilted down for looking over the grid
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 15, 35);
    camera.lookAt(0, 2, 0);

    // ── Colors ────────────────────────────────────────────────────────────────
    const colorPurple = new THREE.Color("#67409c"); // rich purple
    const colorGold = new THREE.Color("#d4a96a");   // warm gold
    const colorPink = new THREE.Color("#b55b93");   // orchid pink

    // ═══════════════════════════════════════════════════════════════════════════
    // 1. LIQUID SILK WAVE (Waving Grid of Particles)
    // ═══════════════════════════════════════════════════════════════════════════
    const GRID_COLS = 75;
    const GRID_ROWS = 75;
    const PARTICLE_COUNT = GRID_COLS * GRID_ROWS;
    
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    
    // Grid spacing
    const spacingX = 0.8;
    const spacingZ = 0.8;
    const startX = -((GRID_COLS - 1) * spacingX) / 2;
    const startZ = -((GRID_ROWS - 1) * spacingZ) / 2;

    // Initialize coordinates
    for (let i = 0; i < GRID_COLS; i++) {
      for (let j = 0; j < GRID_ROWS; j++) {
        const index = i * GRID_ROWS + j;
        positions[index * 3] = startX + i * spacingX;     // X coordinate
        positions[index * 3 + 1] = 0;                     // Y (height, will animate)
        positions[index * 3 + 2] = startZ + j * spacingZ; // Z coordinate

        // Initial default colors (purple to pink gradient)
        const ratio = i / GRID_COLS;
        const col = colorPurple.clone().lerp(colorPink, ratio);
        colors[index * 3] = col.r;
        colors[index * 3 + 1] = col.g;
        colors[index * 3 + 2] = col.b;
      }
    }

    const waveGeometry = new THREE.BufferGeometry();
    waveGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    waveGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Create custom circle particle texture
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const waveMaterial = new THREE.PointsMaterial({
      size: 0.32,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    scene.add(wavePoints);

    // ═══════════════════════════════════════════════════════════════════════════
    // 2. AMBIENT GLOW DUST (Slow rising stars)
    // ═══════════════════════════════════════════════════════════════════════════
    const DUST_COUNT = 150;
    const dustPos = new Float32Array(DUST_COUNT * 3);
    const dustVelocities: { x: number; y: number; z: number }[] = [];
    
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 60;
      dustPos[i * 3 + 1] = Math.random() * 30 - 15;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      dustVelocities.push({
        x: (Math.random() - 0.5) * 0.005,
        y: Math.random() * 0.008 + 0.004,
        z: (Math.random() - 0.5) * 0.005,
      });
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    
    const dustMaterial = new THREE.PointsMaterial({
      color: 0xe8c9a0,
      size: 0.16,
      map: particleTexture,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustPoints);

    // ═══════════════════════════════════════════════════════════════════════════
    // 3. ELEGANT GOLD RINGS (Background silhouettes)
    // ═══════════════════════════════════════════════════════════════════════════
    const rings: THREE.Mesh[] = [];
    const ringCount = 3;
    for (let i = 0; i < ringCount; i++) {
      const geo = new THREE.TorusGeometry(8 + i * 4, 0.015, 8, 80);
      const mat = new THREE.MeshBasicMaterial({
        color: colorGold,
        transparent: true,
        opacity: 0.04 + i * 0.02,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, 5, -20);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(mesh);
      rings.push(mesh);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ANIMATION LOOP
    // ═══════════════════════════════════════════════════════════════════════════
    let animId = 0;
    let time = 0;
    let targetX = 0;
    let targetY = 0;

    const wavePositions = waveGeometry.attributes.position as THREE.BufferAttribute;
    const waveColors = waveGeometry.attributes.color as THREE.BufferAttribute;
    const dustPositions = dustGeometry.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.008;

      // ── Animate wave points heights and dynamic colors ──
      for (let i = 0; i < GRID_COLS; i++) {
        for (let j = 0; j < GRID_ROWS; j++) {
          const index = i * GRID_ROWS + j;
          const x = wavePositions.getX(index);
          const z = wavePositions.getZ(index);

          // Combination of multiple sin/cos waves for a natural liquid look
          const heightVal =
            Math.sin(x * 0.12 + time) * 2.2 +
            Math.cos(z * 0.14 + time * 1.2) * 1.8 +
            Math.sin((x + z) * 0.06 - time * 0.7) * 1.5;

          wavePositions.setY(index, heightVal);

          // Dynamic coloring based on height (valleys purple, peaks gold)
          const colorRatio = (heightVal + 5.5) / 11;
          const lerpedColor = colorPurple.clone().lerp(colorGold, THREE.MathUtils.clamp(colorRatio, 0, 1));
          
          waveColors.setXYZ(index, lerpedColor.r, lerpedColor.g, lerpedColor.b);
        }
      }
      wavePositions.needsUpdate = true;
      waveColors.needsUpdate = true;

      // ── Animate rising ambient dust ──
      const dpArray = dustPositions.array as Float32Array;
      for (let i = 0; i < DUST_COUNT; i++) {
        dpArray[i * 3] += dustVelocities[i].x;
        dpArray[i * 3 + 1] += dustVelocities[i].y;
        dpArray[i * 3 + 2] += dustVelocities[i].z;

        // Reset if floats too high
        if (dpArray[i * 3 + 1] > 25) {
          dpArray[i * 3 + 1] = -15;
          dpArray[i * 3] = (Math.random() - 0.5) * 60;
          dpArray[i * 3 + 2] = (Math.random() - 0.5) * 40;
        }
      }
      dustPositions.needsUpdate = true;

      // ── Animate background rings ──
      rings.forEach((ring, idx) => {
        ring.rotation.x += 0.001 * (idx + 1);
        ring.rotation.y += 0.0015 * (idx + 1);
      });

      // ── Mouse Camera Lerp Parallax ──
      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (targetY - camera.position.y) * 0.03;
      camera.lookAt(0, 2, 0);

      renderer.render(scene, camera);
    };

    animate();

    // ── Event Handlers ────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      // Offset target camera coordinates
      targetX = ((e.clientX / window.innerWidth) - 0.5) * 20;
      targetY = 15 - ((e.clientY / window.innerHeight) - 0.5) * 8;
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const SYMBOLS = [
  '</>', '{}', '#', '&&', '0', '1', '()', '=>', '[]', '==', '!=',
  '/*', '*/', ';;', 'if', 'fn', '::', '??', '|>', '0x', 'null',
  'npm', 'git', 'var', 'let', 'int', '>>'
];
const NEON_COLORS = ['#0A84FF', '#A259FF', '#00FFFF', '#00E5FF', '#7C4DFF', '#FF2A6D', '#05FFA1'];

// Creates a glowing text texture using Canvas2D — no drei, no troika, no shader conflicts
function createTextTexture(text, color) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Glow effect
  ctx.shadowColor = color;
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.fillStyle = color;
  ctx.font = 'bold 64px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Draw twice for stronger glow
  ctx.fillText(text, 128, 64);
  ctx.fillText(text, 128, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function FloatingSymbol({ symbol, color, position, speed, scale }) {
  const spriteRef = useRef();
  const initialY = position[1];

  const texture = useMemo(() => createTextTexture(symbol, color), [symbol, color]);

  useFrame(({ clock }) => {
    if (!spriteRef.current) return;
    const t = clock.getElapsedTime();
    // Gentle bob
    spriteRef.current.position.y = initialY + Math.sin(t * speed + position[0]) * 0.6;
    // Slow drift on X
    spriteRef.current.position.x += Math.sin(t * 0.1 + position[2]) * 0.002;
  });

  return (
    <sprite ref={spriteRef} position={position} scale={[scale * 2, scale, 1]}>
      <spriteMaterial map={texture} transparent opacity={0.7} depthWrite={false} />
    </sprite>
  );
}

function SymbolField({ count = 50 }) {
  const group = useRef();

  const symbolsData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20 - 5
      ],
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
      speed: Math.random() * 0.4 + 0.1,
      scale: Math.random() * 1.2 + 0.5
    }));
  }, [count]);

  // Global parallax from mouse
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.03) * 0.08;
    group.current.rotation.x = Math.cos(t * 0.03) * 0.05;

    // Mouse parallax
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      state.pointer.x * 1.5,
      0.03
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      state.pointer.y * 1.5,
      0.03
    );
  });

  return (
    <group ref={group}>
      {symbolsData.map((data, i) => (
        <FloatingSymbol key={i} {...data} />
      ))}
    </group>
  );
}

function ParticleCloud({ count = 300 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 50;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.015;
    pointsRef.current.rotation.x = clock.getElapsedTime() * 0.005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#7C4DFF"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}


export const LiveWallpaper = () => {
  return (
    <div
      className="canvas-container"
      style={{ background: 'linear-gradient(160deg, #050508 0%, #0a0a1a 40%, #0d0520 100%)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} color="#00FFFF" intensity={0.8} />
        <pointLight position={[-10, -5, -10]} color="#A259FF" intensity={0.6} />
        <pointLight position={[0, 8, 5]} color="#05FFA1" intensity={0.4} />

        <SymbolField count={90} />
        <ParticleCloud count={600} />
      </Canvas>
    </div>
  );
};

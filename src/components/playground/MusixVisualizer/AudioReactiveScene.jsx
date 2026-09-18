import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ReactiveSphere from './ReactiveSphere';
import ParticleTunnel from './ParticleTunnel';
import AudioRings from './AudioRings';

// Parallax Camera controller nested component
function CameraParallax({ audioDataRef }) {
  useFrame((state) => {
    const volume = audioDataRef.current?.volume || 0;
    
    // Slow camera orbit drift + user pointer parallax mapping
    const targetX = state.pointer.x * 2.2;
    const targetY = state.pointer.y * 2.2;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    
    // Settle camera z depth slightly based on volume
    const targetZ = 7.5 - volume * 1.5;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function AudioReactiveScene({ audioDataRef }) {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#050507]">
      {/* ThreeJS Canvas webGL workspace */}
      <Canvas
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 7.5], fov: 60, near: 0.1, far: 100 }}
        className="w-full h-full"
      >
        {/* Deep charcoal background */}
        <color attach="background" args={["#050507"]} />
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#EEB8F9" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#050507" />
        <directionalLight position={[0, 5, 5]} intensity={1.2} color="#ffffff" />

        {/* 3D Audio Reactive Visuals */}
        <ReactiveSphere audioDataRef={audioDataRef} />
        <ParticleTunnel audioDataRef={audioDataRef} />
        <AudioRings audioDataRef={audioDataRef} />

        {/* Interactivity camera loop */}
        <CameraParallax audioDataRef={audioDataRef} />
      </Canvas>
    </div>
  );
}

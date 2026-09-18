import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AudioRings({ audioDataRef }) {
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);

  useFrame((state) => {
    const bass = audioDataRef.current?.bass || 0;
    const mid = audioDataRef.current?.mid || 0;
    const volume = audioDataRef.current?.volume || 0;
    const time = state.clock.getElapsedTime();

    // Ring 1 (Inner ring - reacts to bass)
    if (ring1Ref.current) {
      const scaleVal = 1.0 + bass * 0.45;
      ring1Ref.current.scale.set(scaleVal, scaleVal, 1);
      ring1Ref.current.rotation.z = time * 0.12;
      ring1Ref.current.material.opacity = 0.15 + bass * 0.55;
    }

    // Ring 2 (Middle ring - reacts to mids)
    if (ring2Ref.current) {
      const scaleVal = 1.0 + mid * 0.35;
      ring2Ref.current.scale.set(scaleVal, scaleVal, 1);
      ring2Ref.current.rotation.z = -time * 0.08;
      ring2Ref.current.material.opacity = 0.1 + mid * 0.45;
    }

    // Ring 3 (Outer ring - expands with volume)
    if (ring3Ref.current) {
      const scaleVal = 1.0 + volume * 0.25;
      ring3Ref.current.scale.set(scaleVal, scaleVal, 1);
      ring3Ref.current.rotation.z = time * 0.05;
      ring3Ref.current.material.opacity = 0.05 + volume * 0.35;
    }
  });

  return (
    <group rotation={[Math.PI / 2.3, Math.PI / 10, 0]}>
      {/* Ring 1 - Inner */}
      <mesh ref={ring1Ref}>
        <ringGeometry args={[1.9, 1.93, 64]} />
        <meshBasicMaterial 
          color="#EEB8F9" 
          transparent={true} 
          opacity={0.3} 
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ring 2 - Middle */}
      <mesh ref={ring2Ref} scale={[1.4, 1.4, 1]}>
        <ringGeometry args={[2.0, 2.02, 64]} />
        <meshBasicMaterial 
          color="#EEB8F9" 
          transparent={true} 
          opacity={0.2} 
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ring 3 - Outer */}
      <mesh ref={ring3Ref} scale={[1.8, 1.8, 1]}>
        <ringGeometry args={[2.1, 2.11, 64]} />
        <meshBasicMaterial 
          color="#EEB8F9" 
          transparent={true} 
          opacity={0.1} 
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleTunnel({ audioDataRef }) {
  const pointsRef = useRef(null);
  
  const particleCount = 1000;

  // Generate initial particle states (cylinder/tunnel layout)
  const [positions, initialZ, speeds, angles, radii] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const zCoords = new Float32Array(particleCount);
    const sp = new Float32Array(particleCount);
    const ang = new Float32Array(particleCount);
    const rad = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical coordinates
      const r = Math.random() * 8 + 3.0; // Hollow center radius 3 to 11
      const angle = Math.random() * Math.PI * 2;
      const z = -Math.random() * 60; // Spread tunnel depth

      rad[i] = r;
      ang[i] = angle;
      zCoords[i] = z;
      sp[i] = Math.random() * 0.05 + 0.02; // Base forward speed

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle) * r;
      pos[i * 3 + 2] = z;
    }

    return [pos, zCoords, sp, ang, rad];
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const positionAttribute = points.geometry.attributes.position;
    
    // Retrieve real-time audio parameters
    const bass = audioDataRef.current?.bass || 0;
    const treble = audioDataRef.current?.treble || 0;
    const volume = audioDataRef.current?.volume || 0;

    // Slowly rotate the entire points mesh
    const rotationSpeed = 0.03 + volume * 0.2;
    points.rotation.z += rotationSpeed * 0.02;

    for (let i = 0; i < particleCount; i++) {
      // Translate particle forward along Z axis
      const speed = (speeds[i] + volume * 0.4) * (1 + bass * 0.5);
      initialZ[i] += speed;

      // Reset Z coordinate if it flies past the camera (Z > 5)
      if (initialZ[i] > 5) {
        initialZ[i] = -60;
        radii[i] = Math.random() * 8 + 3.0;
        angles[i] = Math.random() * Math.PI * 2;
      }

      // Add a slight radial pulse based on bass peaks
      const currentRadius = radii[i] * (1.0 + bass * 0.15);

      // Recompute Cartesian coordinates
      positionAttribute.setX(i, Math.cos(angles[i] + state.clock.getElapsedTime() * 0.02) * currentRadius);
      positionAttribute.setY(i, Math.sin(angles[i] + state.clock.getElapsedTime() * 0.02) * currentRadius);
      positionAttribute.setZ(i, initialZ[i]);
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#EEB8F9"
        size={0.065}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Ian McEwan, Ashima Arts Simplex Noise GLSL Code
const simplexNoiseGLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+10.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, D.yyy));
  vec3 x0 = v - i + dot(i, D.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + D.xxx;
  vec3 x2 = x0 - i2 + D.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

export default function ReactiveSphere({ audioDataRef }) {
  const groupRef = useRef(null);

  // Custom Shader Material setup
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uBass: { value: 0 },
        uMid: { value: 0 },
        uTreble: { value: 0 },
        uVolume: { value: 0 }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uBass;
        uniform float uMid;
        uniform float uVolume;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vNoise;
        
        ${simplexNoiseGLSL}
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          // Spatial noise displacement warped by uTime
          vec3 noisePos = position * 1.5 + vec3(0.0, 0.0, uTime * 0.6);
          float noiseVal = snoise(noisePos);
          vNoise = noiseVal;
          
          // Bass & mids deform the physical vertices
          float displacement = (uBass * 0.35 + uMid * 0.12) * noiseVal;
          vec3 displacedPosition = position + normal * displacement;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uTreble;
        uniform float uVolume;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vNoise;
        
        void main() {
          // Color Palette: Deep charcoal black and Hassen's violet (#EEB8F9)
          vec3 baseColor = vec3(0.07, 0.07, 0.07);
          vec3 accentColor = vec3(0.93, 0.72, 0.98); // #EEB8F9 in normalized RGB
          
          // Fresnel rim edge glowing logic
          float fresnel = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
          fresnel = pow(fresnel, 2.0); // Sharpen gradient
          
          // Modulate edge glow by treble and simplex noise displacement
          float glowStrength = fresnel * (0.65 + uTreble * 1.3) + (vNoise * 0.1 + 0.1);
          vec3 finalColor = mix(baseColor, accentColor, clamp(glowStrength, 0.0, 1.0));
          
          // Add rim bright white spark overlay on treble spikes
          float spark = step(0.85, vNoise) * uTreble * 0.3;
          finalColor += vec3(spark);
          
          gl_FragColor = vec4(finalColor, 0.95);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    // Retrieve references from audio player
    const bass = audioDataRef.current?.bass || 0;
    const mid = audioDataRef.current?.mid || 0;
    const treble = audioDataRef.current?.treble || 0;
    const volume = audioDataRef.current?.volume || 0;

    // Update uniforms
    shaderMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
    shaderMaterial.uniforms.uBass.value = bass;
    shaderMaterial.uniforms.uMid.value = mid;
    shaderMaterial.uniforms.uTreble.value = treble;
    shaderMaterial.uniforms.uVolume.value = volume;

    // Apply slow ambient rotation + beat modulation
    group.rotation.y = state.clock.getElapsedTime() * 0.15;
    group.rotation.x = state.clock.getElapsedTime() * 0.08;

    // Apply subtle beat scale pulse
    const targetScale = 1.0 + bass * 0.25 + volume * 0.1;
    group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.25);
  });

  return (
    <group ref={groupRef}>
      {/* Central Solid Reactive Mesh */}
      <mesh material={shaderMaterial}>
        <icosahedronGeometry args={[1.5, 32]} />
      </mesh>
      
      {/* Outer Wireframe glow sphere for organic depth */}
      <mesh scale={[1.01, 1.01, 1.01]}>
        <icosahedronGeometry args={[1.5, 32]} />
        <meshBasicMaterial 
          color="#EEB8F9" 
          wireframe 
          transparent 
          opacity={0.06} 
        />
      </mesh>
    </group>
  );
}

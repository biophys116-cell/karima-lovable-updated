import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random, easing } from "maath";

function ParticleCloud() {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 2.5 }), []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Base continuous rotation
      ref.current.rotation.z += delta / 30;
      
      // Butter-smooth mouse interaction
      const targetX = (state.pointer.y * Math.PI) / 8;
      const targetY = (state.pointer.x * Math.PI) / 8;
      
      easing.dampE(ref.current.rotation, [targetX, targetY, ref.current.rotation.z], 0.5, delta);
    }
  });

  return (
    <group>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#d4af37"
          size={0.007}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingShape() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = state.pointer.x * 0.4;
      const targetY = state.pointer.y * 0.4;
      
      easing.damp3(groupRef.current.position, [targetX, targetY, 0], 0.6, delta);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Icosahedron args={[1, 1]} position={[0, 0, -2]}>
          <MeshDistortMaterial 
            color="#d4af37" 
            emissive="#111"
            wireframe
            distort={0.4} 
            speed={2} 
            roughness={0.2}
            transparent
            opacity={0.3}
          />
        </Icosahedron>
        
        <Icosahedron args={[0.6, 0]} position={[0, 0, -2]}>
          <meshStandardMaterial 
            color="#1a362f" 
            emissive="#d4af37"
            emissiveIntensity={0.5}
            wireframe={false}
            roughness={0.1}
            metalness={0.8}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 bg-transparent pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#d4af37" />
        <ParticleCloud />
        <FloatingShape />
      </Canvas>
    </div>
  );
}

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";

function EnergyCore() {

  const meshRef = useRef<any>();

  useFrame(({ clock }) => {

    const t = clock.getElapsedTime()

    meshRef.current.rotation.y += 0.01

    const scale = 1 + Math.sin(t * 2) * 0.1
    meshRef.current.scale.set(scale, scale, scale)

  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial
        emissive="cyan"
        emissiveIntensity={2}
        color="black"
      />
    </mesh>
  )
}
function EnergyWave() {

  const ref = useRef<any>()

  useFrame(({ clock }) => {

    const t = clock.getElapsedTime()

    const scale = 1 + t % 3

    ref.current.scale.set(scale, scale, scale)

  })

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.5, 1.7, 64]} />
      <meshBasicMaterial color="cyan" wireframe />
    </mesh>
  )

}
export default function IntroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>

      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />

      <Stars
        radius={100}
        depth={100}
        count={8000}
        factor={4}
        saturation={0}
        fade
      />

      <EnergyCore />
      <EnergyWave />

      <OrbitControls enableZoom={false} />

    </Canvas>
  );
}

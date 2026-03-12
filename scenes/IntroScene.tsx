"use client";
import HumanHand from "../components/HumanHand"
import RobotHand from "../components/RobotHand"
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

  useFrame((state) => {

  if (!ref.current) return

  const t = state.clock.getElapsedTime()
  const scale = 1 + (t % 3)

  ref.current.scale.set(scale, scale, scale)

})
  return (
    <mesh position={[0,0,0]}>
      <sphereGeometry args={[0.2,32,32]} />
      <meshStandardMaterial emissive="orange" emissiveIntensity={4} color="black" />
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
      <HumanHand />
      <RobotHand />

      <OrbitControls enableZoom={false} />

    </Canvas>
  );
}

"use client"

import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function RobotHand() {

  const model = useGLTF("/models/robotic_hand.glb")
  const ref = useRef<any>()

  useFrame(() => {
    if (!ref.current) return

    if (ref.current.position.x > 1.2) {
      ref.current.position.x -= 0.01

    }
  })

  return (
  <group ref={ref} position={[3, -0.8, 0]} rotation={[0, -0.6, 0]}>
    
    <primitive
      object={model.scene}
      scale={1.6}
      rotation={[-1.6, 0, 0]}
    />

  </group>
)
}

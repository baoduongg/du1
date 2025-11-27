import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'

export default function HeroModel(props) {
    const mesh = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        mesh.current.rotation.x = t * 0.2
        mesh.current.rotation.y = t * 0.3
        // Make it float a bit
        mesh.current.position.y = Math.sin(t * 0.5) * 0.2
    })

    return (
        <Sphere args={[1, 100, 200]} scale={2} ref={mesh} {...props}>
            <MeshDistortMaterial
                color="#8352FD"
                attach="material"
                distort={0.5}
                speed={2}
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    )
}

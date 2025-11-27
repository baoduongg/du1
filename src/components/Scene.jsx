import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import HeroModel from './HeroModel'

export default function Scene() {
    return (
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gray-950">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <Suspense fallback={null}>
                    <HeroModel position={[1.5, 0, 0]} />
                    <Environment preset="city" />
                    <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    )
}

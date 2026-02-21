'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment, Lightformer } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function HeroObject() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { viewport, mouse } = useThree();

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Rotation
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.25;

            // Mouse follow with dampening
            const x = (mouse.x * viewport.width) / 2;
            const y = (mouse.y * viewport.height) / 2;

            meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.1, 0.05);
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.1, 0.05);
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
            <mesh ref={meshRef} scale={3.5}>
                <torusKnotGeometry args={[1, 0.35, 128, 32]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={1024}
                    transmission={1}
                    clearcoat={1}
                    clearcoatRoughness={0.0}
                    thickness={0.5}
                    roughness={0}
                    anisotropy={1}
                    chromaticAberration={0.5}
                    distortion={0.5}
                    distortionScale={0.5}
                    temporalDistortion={0.2}
                    ior={1.5}
                    color="#ffffff"
                    background={new THREE.Color("#030303")}
                />
            </mesh>
        </Float>
    );
}

function Rig() {
    useFrame((state) => {
        state.camera.position.lerp({ x: 0, y: 0, z: 12 }, 0.05)
        state.camera.lookAt(0, 0, 0)
    })
    return null
}

export default function Scene3D() {
    return (
        <div className="canvas-container" style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
            {/* zIndex 0 ensures it's above body background but behind main content (zIndex 1) */}
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 15], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                {/* <color attach="background" args={['#030303']} /> Background handled by CSS */}

                <HeroObject />
                <Rig />

                <Environment preset="city">
                    <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                    <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                    <group rotation={[Math.PI / 2, 1, 0]}>
                        {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
                            <Lightformer key={i} form="circle" intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[4, 1, 1]} />
                        ))}
                    </group>
                </Environment>

                <fog attach="fog" args={['#030303', 5, 25]} />
            </Canvas>
        </div>
    );
}

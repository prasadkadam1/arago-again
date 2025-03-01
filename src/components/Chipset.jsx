

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Chipset() {
    const chipsetRef = useRef();

    return (
        <group ref={chipsetRef}>
            {/* Main Chip Body with a Futuristic Metallic Look */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[4.5, 0.75, 3]} />
                <meshPhysicalMaterial 
                    color="gray" 
                    metalness={2} 
                    roughness={0.9} 
                    clearcoat={1} 
                    clearcoatRoughness={0.05} 
                    reflectivity={6}
                />
            </mesh>
            {/* Emissive Circuit Traces with Animated Glow */}
            {Array.from({ length: 5 }).map((_, i) => (
                <mesh key={i} position={[-1.5 + i * 0.75, 0.45, 0]}>
                    <boxGeometry args={[0.075, 0.015, 2.7]} />
                    <meshStandardMaterial emissive="cyan" emissiveIntensity={3} color="black" />
                </mesh>
            ))}
            {/* Holographic Central Core */}
            <mesh position={[0, 0.45, 0]}>
                <boxGeometry args={[2.5, 0.3, 1.5]} />
                <meshPhysicalMaterial 
                    color="gray" 
                    emissive="blue" 
                    emissiveIntensity={5} 
                    transparent 
                    opacity={0.6} 
                    metalness={1} 
                    roughness={0} 
                    reflectivity={1}
                />
            </mesh>
            {/* Pins with Enhanced Metallic Reflection */}
            {Array.from({ length: 10 }).map((_, i) => (
                <mesh key={i} position={[-2.25 + i * 0.45, -0.6, 1.65]}>
                    <boxGeometry args={[0.3, 0.15, 0.75]} />
                    <meshStandardMaterial color="silver" metalness={1} roughness={0.2} reflectivity={0.9} />
                </mesh>
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
                <mesh key={i} position={[-2.25 + i * 0.45, -0.6, -1.65]}>
                    <boxGeometry args={[0.3, 0.15, 0.75]} />
                    <meshStandardMaterial color="silver" metalness={1} roughness={0.2} reflectivity={0.9} />
                </mesh>
            ))}
        </group>
    );
}

export default Chipset;

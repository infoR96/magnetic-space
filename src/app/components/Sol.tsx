'use client'

import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

export const Sol: React.FC = () => {  
  const texturaTierra = useLoader(THREE.TextureLoader, '/textures/sunmap.jpg'); // Ruta a la textura
  const earthRef = useRef<THREE.Mesh>(null); // Crear una referencia a la esfera

  // Agregar rotación en cada frame
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.01; // Ajusta la velocidad de rotación
    }
  });

  return (
    <mesh ref={earthRef} position={[-8960, 0, 0]}>
      <sphereGeometry args={[696.340, 64, 64]} />
      <meshStandardMaterial map={texturaTierra} />
    </mesh>
  );
};

export default Sol
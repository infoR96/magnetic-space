import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticulaProps {
  position: [number, number, number];
  speed: number;
  target: [number, number, number]; // Punto objetivo
  explode: boolean; // Prop para controlar la explosión
  onDestroy: () => void;
}

const ParticulaSimple: React.FC<ParticulaProps> = ({ position, speed, target, explode, onDestroy }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const direction = useRef<THREE.Vector3>(new THREE.Vector3()); // Dirección de la explosión

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...position);
    }

    // Generar dirección aleatoria para la explosión
    if (explode) {
      direction.current.set(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize().multiplyScalar(50); // Aumentar la distancia de explosión
    }
  }, [position, explode]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (explode) {
        // Movimiento de explosión
        meshRef.current.position.add(direction.current.clone().multiplyScalar(speed * delta));
        
        // Verifica si la partícula ha alcanzado una distancia suficiente
        if (meshRef.current.position.length() > 50) {
          // Cambiar a movimiento hacia el objetivo
          direction.current.set(target[0] - meshRef.current.position.x, target[1] - meshRef.current.position.y, target[2] - meshRef.current.position.z).normalize();
        }
      } else {
        // Lógica de movimiento hacia el objetivo
        const movementDirection = new THREE.Vector3().subVectors(new THREE.Vector3(...target), meshRef.current.position).normalize();
        meshRef.current.position.add(movementDirection.multiplyScalar(speed * delta));

        // Destruir si llega al objetivo
        if (meshRef.current.position.distanceTo(new THREE.Vector3(...target)) < 0.1) {
          onDestroy();
        }
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[2, 16, 16]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

export default ParticulaSimple;

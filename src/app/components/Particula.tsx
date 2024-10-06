import React, { useState, useEffect } from 'react';
import * as THREE from 'three';

interface ParticulaProps {
  position: THREE.Vector3;
  direction: THREE.Vector3;
  speed: number;
  onDestroy: () => void;
}

export const Particula: React.FC<ParticulaProps> = ({ position, direction, speed, onDestroy }) => {
  const [currentPosition, setCurrentPosition] = useState(position);

  // Fijar el tamaño y el color de las partículas
  const fixedSize = 5; // Tamaño fijo de las partículas
  const color = new THREE.Color('yellow'); // Color rojo fijo

  const radiusTierra = 6.371; // Radio de la Tierra en unidades
  const maxDistance = 60; // Distancia máxima en la que la partícula puede pasar cerca de la Tierra
  const animationDuration = 10; // Duración de la animación en segundos

  useEffect(() => {
    let elapsedTime = 0;

    const animate = (time: number) => {
      elapsedTime += time / 1000;

      // Calcular la nueva posición basada en la dirección y velocidad
      const newPos = currentPosition.clone().add(direction.clone().multiplyScalar(speed * elapsedTime));

      // Si la partícula está a una distancia menor o igual a la suma del radio de la Tierra y el margen de error, destruirla
      const distanceToEarth = newPos.distanceTo(new THREE.Vector3(0, 0, 0));
      if (elapsedTime >= animationDuration) {
        onDestroy();
      } else if (distanceToEarth <= radiusTierra + maxDistance) {
        onDestroy(); // Destruir si entra en la zona cercana a la Tierra
      } else {
        setCurrentPosition(newPos);
        requestAnimationFrame(animate);
      }
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [direction, speed, currentPosition, onDestroy]);

  return (
    <mesh position={[currentPosition.x, currentPosition.y, currentPosition.z]}>
      <sphereGeometry args={[fixedSize, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

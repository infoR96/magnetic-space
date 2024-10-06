import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { Particula } from './Particula';

interface ParticulaProps {
  position: THREE.Vector3;
  direction: THREE.Vector3;
  speed: number;
  onDestroy: () => void;
}

export const PaqueteDeParticulas: React.FC<{ numParticulas: number; area: number; speed: number; animar: boolean }> = ({ numParticulas, area, speed, animar }) => {
  const [particulas, setParticulas] = useState<ParticulaProps[]>([]);

  // Generar partículas en posiciones cercanas al sol
  useEffect(() => {
    if (animar) {
      const nuevasParticulas: ParticulaProps[] = [];
      for (let i = 0; i < numParticulas; i++) {
        const posX = (Math.random() - 0.5) * area + -8960; // Cercanas al sol
        const posY = (Math.random() - 0.5) * area;
        const posZ = (Math.random() - 0.5) * area;

        // Dirección hacia la Tierra (0, 0, 0)
        const direction = new THREE.Vector3(0, 0, 0).sub(new THREE.Vector3(posX, posY, posZ)).normalize();

        nuevasParticulas.push({
          position: new THREE.Vector3(posX, posY, posZ),
          direction,
          speed: speed * (0.5 + Math.random()), // Variar ligeramente la velocidad
          onDestroy: () => {
            setParticulas(prev => prev.filter(p => p.position !== new THREE.Vector3(posX, posY, posZ))); // Elimina la partícula
          }
        });
      }
      setParticulas(nuevasParticulas);
    }
  }, [animar, numParticulas, area, speed]);

  return (
    <>
      {particulas.map((particula, index) => (
        <Particula key={index} {...particula} />
      ))}
    </>
  );
};

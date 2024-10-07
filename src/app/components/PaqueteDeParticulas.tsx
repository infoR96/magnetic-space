import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { Particula } from './Particula';

interface ParticulaProps {
  position: THREE.Vector3;
  direction: THREE.Vector3;
  speed: number;
  onDestroy: () => void;
}

export const PaqueteDeParticulas: React.FC<{ numParticulas: number; area: number; speed: number }> = ({ numParticulas, area, speed }) => {
  const [particulas, setParticulas] = useState<ParticulaProps[]>([]);

  // Función para generar partículas en posiciones cercanas al sol
  const generarParticulas = () => {
    const nuevasParticulas: ParticulaProps[] = [];
    for (let i = 0; i < numParticulas; i++) {
      const posX = (Math.random() - 0.5) * area + -4960; // Cercanas al sol
      const posY = (Math.random() - 0.5) * area;
      const posZ = (Math.random() - 0.5) * area;

      // Dirección hacia la Tierra (0, 0, 0)
      const direction = new THREE.Vector3(80, 10, 0).sub(new THREE.Vector3(posX, posY, posZ)).normalize();

      nuevasParticulas.push({
        position: new THREE.Vector3(posX, posY, posZ),
        direction,
        speed: speed * (0.5 + Math.random()), // Variar ligeramente la velocidad
        onDestroy: () => {
          setParticulas(prev => prev.filter(p => p.position !== new THREE.Vector3(posX, posY, posZ))); // Elimina la partícula
        }
      });
    }
    setParticulas(prev => [...prev, ...nuevasParticulas]); // Agregar nuevas partículas a las existentes
  };

  useEffect(() => {
    generarParticulas(); // Generar partículas al iniciar el componente

    // Intervalo para regenerar partículas constantemente
    const interval = setInterval(() => {
      generarParticulas();
    }, 500); // Cambia el intervalo según lo desees

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [numParticulas, area, speed]);

  // Actualizar las posiciones y eliminar partículas que alcanzan el destino
  useEffect(() => {
    const animateParticles = () => {
      setParticulas(prev => {
        return prev.map(p => {
          // Mover la partícula en la dirección especificada
          p.position.add(p.direction.clone().multiplyScalar(p.speed * 0.3));

          // Comprobar si la partícula ha alcanzado el destino
          if (p.position.x <= -30 && p.position.y === 0 && p.position.z === 0) {
            p.onDestroy(); // Eliminar la partícula
          }

          // Evitar que la partícula atraviese el punto (0, 0, 0)
          if (p.position.length() < -1) { // Si está muy cerca del origen
            
            p.position.set(-30, 0, 0); // Colocar la partícula en la posición de destrucción
            p.onDestroy();
          }

          return p;
        });
      });
    };

    // Ejecutar la animación en un intervalo
    const animationInterval = setInterval(animateParticles, 1000 / 60); // 60 FPS

    return () => clearInterval(animationInterval); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <>
      {particulas.map((particula, index) => (
        <Particula key={index} {...particula} />
      ))}
    </>
  );
};

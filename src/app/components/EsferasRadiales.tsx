import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EsferasRadialesProps {
  posicionInicial?: [number, number, number];
  posicionFinal?: [number, number, number];
  numeroEsferas?: number;
  radio?: number;
  tiempoDeMovimiento?: number;
}

export const EsferasRadiales: React.FC<EsferasRadialesProps> = ({
  posicionInicial = [10, 10, 10],
  posicionFinal = [0, 0, 0],
  numeroEsferas = 300,
  radio = 2,
}) => {
  const [posiciones, setPosiciones] = useState<THREE.Vector3[]>([]);
  const [velocidades, setVelocidades] = useState<THREE.Vector3[]>([]);
  const [enRetorno, setEnRetorno] = useState(false);
  const esferasRef = useRef<THREE.Group>(null);

  const inicializarEsferas = () => {
    const nuevasPosiciones = Array.from({ length: numeroEsferas }, () => new THREE.Vector3(...posicionInicial));

    const nuevasVelocidades = nuevasPosiciones.map(() => {
      const direccion = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      return direccion.multiplyScalar(24 * 1.4); // Velocidad de dispersión ajustada (40% más rápida)
    });

    setPosiciones(nuevasPosiciones);
    setVelocidades(nuevasVelocidades);
  };

  useEffect(() => {
    inicializarEsferas();
  }, [posicionInicial, numeroEsferas]);

  useFrame((state, delta) => {
    const distanciaMaxima = 60; // Aumentar la distancia máxima de dispersión

    setPosiciones((posicionesPrevias) =>
      posicionesPrevias.map((posicion, index) => {
        const velocidad = velocidades[index];
        const distanciaAlCentro = posicion.distanceTo(new THREE.Vector3(...posicionInicial));

        // Asegúrate de que velocidad esté definido antes de usarlo
        if (!velocidad) {
          return posicion; // Si no hay velocidad, simplemente devuelve la posición actual
        }

        // Controlar el movimiento: dispersión y luego retorno
        if (!enRetorno) {
          const nuevaPosicion = posicion.clone().add(velocidad.clone().multiplyScalar(delta));
          
          // Si alcanzan la distancia máxima, cambian a modo de retorno
          if (distanciaAlCentro >= distanciaMaxima) {
            setEnRetorno(true); // Comienza el retorno
          }
          return nuevaPosicion;
        } else {
          // Movimiento de retorno hacia el punto final
          const direccionRetorno = new THREE.Vector3(...posicionFinal).sub(posicion).normalize();
          const nuevaPosicion = posicion.clone().add(direccionRetorno.multiplyScalar(24 * 1.4 * delta)); // Velocidad de retorno ajustada (40% más rápida)

          // Si están lo suficientemente cerca del punto final, reiniciar el ciclo
          if (nuevaPosicion.distanceTo(new THREE.Vector3(...posicionFinal)) < 0.1) {
            setEnRetorno(false); // Reinicia el ciclo de dispersión
            inicializarEsferas(); // Reinicia las posiciones y velocidades
            return new THREE.Vector3(...posicionInicial); // Reiniciar en el punto inicial
          }

          return nuevaPosicion;
        }
      })
    );
  });

  return (
    <group ref={esferasRef}>
      {posiciones.map((posicion, index) => (
        <mesh key={index} position={posicion}>
          <sphereGeometry args={[radio, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
};

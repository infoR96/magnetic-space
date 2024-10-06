import React from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

interface ElipseProps {
  color: string;
  centro: [number, number];
  radios: [number, number];
}

const Elipse: React.FC<ElipseProps> = ({ color, centro, radios }) => {
  // Crear la curva elíptica con el centro y los radios proporcionados
  const curve = new THREE.EllipseCurve(
    centro[0], // Coordenada X del centro
    centro[1], // Coordenada Y del centro
    radios[0], // Radio en el eje X
    radios[1], // Radio en el eje Y
    0,         // Ángulo inicial
    2 * Math.PI, // Ángulo final (elipse completa)
    false,     // Sentido horario
    0          // Sin rotación
  );

  // Obtener los puntos de la curva
  const points = curve.getPoints(100).map((point) => new THREE.Vector3(point.x, point.y, 0));

  return (
    <Line points={points} color={color} lineWidth={1} />
  );
};

export default Elipse;

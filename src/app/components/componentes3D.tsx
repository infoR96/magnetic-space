'use client';
import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sol from './Sol';
import { PaqueteDeParticulas } from './PaqueteDeParticulas';
import Elipse from './Elipse';
import { EsferasRadiales } from './EsferasRadiales';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// Componente para la Tierra
const Earth: React.FC = () => {  
  const texturaTierra = useLoader(THREE.TextureLoader, '/model.jpg'); // Ruta a la textura
  const earthRef = useRef<THREE.Mesh>(null); // Crear una referencia a la esfera

  // Agregar rotación en cada frame
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005; // Ajusta la velocidad de rotación
    }
  });

  return (
    <mesh ref={earthRef} position={[0, 0, 0]}>
      <sphereGeometry args={[6.371, 64, 64]} />
      <meshStandardMaterial map={texturaTierra} />
    </mesh>
  );
};

// Componente para la escena
const Scene: React.FC = () => {
  const { camera } = useThree(); // Obtén acceso a la cámara

  useEffect(() => {
    // Establecer la posición inicial de la cámara en [40, 40, 40]
    camera.position.set(40, 40, 40);
    camera.lookAt(0, 0, 0); // Asegúrate de que la cámara esté apuntando al centro
    camera.updateProjectionMatrix(); // Actualizar la matriz de proyección de la cámara después del cambio de posición
  }, [camera]); // Solo lo ejecutamos una vez cuando el componente se monta

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <axesHelper args={[100]} />
      <Sol />
      <Elipse color="red" centro={[-30, 0]} radios={[30, 17]} />
      <Elipse color="red" centro={[-26, 0]} radios={[28, 17]} />
      <Elipse color="red" centro={[-24, 0]} radios={[26, 17]} />
      <Elipse color="red" centro={[-22, 0]} radios={[24, 17]} />
      <Elipse color="red" centro={[-20, 0]} radios={[22, 17]} />
      <Elipse color="red" centro={[-18, 0]} radios={[20, 17]} />
      <Elipse color="red" centro={[-16, 0]} radios={[18, 17]} />
      <Elipse color="red" centro={[-14, 0]} radios={[16, 17]} />
      <Elipse color="red" centro={[-12, 0]} radios={[14, 17]} />
      <Elipse color="blue" centro={[300, 0]} radios={[300, 17]} />
      <Elipse color="blue" centro={[280, 0]} radios={[280, 17]} />
      <Elipse color="blue" centro={[240, 0]} radios={[240, 17]} />
      <Elipse color="blue" centro={[220, 0]} radios={[220, 17]} />
      <Elipse color="blue" centro={[200, 0]} radios={[200, 17]} />
      <Elipse color="blue" centro={[180, 0]} radios={[180, 17]} />
      <Elipse color="blue" centro={[160, 0]} radios={[160, 17]} />
      <Elipse color="blue" centro={[140, 0]} radios={[140, 17]} />
      <Elipse color="blue" centro={[120, 0]} radios={[120, 17]} />
      <Earth />
      <PaqueteDeParticulas numParticulas={8} area={500} speed={100} />
      {true && (
        <EsferasRadiales 
          posicionInicial={[-60, 0, 0]} 
          posicionFinal={[600, 10, 10]} 
          numeroEsferas={100} 
          radio={1} 
          tiempoDeMovimiento={5} 
        />
      )}
      <OrbitControls />
    </>
  );
};

// Componente principal de la aplicación
const App: React.FC = () => {
  return (
    <div style={{ width: '75vw', height: '75vh', margin: 'auto', position: 'relative' }}>
      <Canvas style={{ background: '#000' }} camera={{ fov: 75, near: 0.1, far: 10000 }}>
        <Scene />
      </Canvas>

      {/* Controles fuera del Canvas */}
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
        {/* Controles adicionales o información */}
      </div>
    </div>
  );
};

export default App;

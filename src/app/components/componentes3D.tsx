'use client'
import React, { useState, useEffect, useRef } from 'react';
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
      earthRef.current.rotation.y += 0.001; // Ajusta la velocidad de rotación
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
const Scene: React.FC<{ cameraPosition: [number, number, number], animar: boolean ,  animarEsferasRadiales: boolean}> = ({ cameraPosition, animar, animarEsferasRadiales }) => {
  const { camera } = useThree();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      camera.position.set(...cameraPosition);
      camera.near = 0.1; // Valor cercano
      camera.far = 1000000; // Valor lejano
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      setInitialized(true);
    }
  }, [cameraPosition, camera, initialized]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <axesHelper args={[100]} />
      <Sol />
      <Elipse color='red' centro={[-30, 0]} radios={[30, 17]} />
      <Elipse color='red' centro={[-25, 0]} radios={[30, 17]} />
      <Elipse color='blue' centro={[30, 0]} radios={[30, 17]} />
      <Earth />
     

      <PaqueteDeParticulas numParticulas={100} area={500} speed={10} animar={animar} />
      {animarEsferasRadiales && (
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
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([2000, 2000, 2000]);
  const [animar, setAnimar] = useState(false);
  const [animarEsferasRadiales, setAnimarEsferasRadiales] = useState(false); // Estado para controlar la animación de las esferas radiales

  return (
    <div style={{ width: '75vw', height: '75vh', margin: 'auto', position: 'relative' }}>
      <Canvas style={{ background: '#000' }} camera={{ position: [2000, 2000, 2000], fov: 75, near: 0.1, far: 10000 }}>
        <Scene 
          cameraPosition={cameraPosition} 
          animar={animar} 
     
          animarEsferasRadiales={animarEsferasRadiales}
     
        />
      </Canvas>

      {/* Controles fuera del Canvas */}
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
        <button onClick={() => setCameraPosition([0, 2000, 0])}>Vista XY</button>
        <button onClick={() => setCameraPosition([2000, 0, 0])}>Vista XZ</button>
        <button onClick={() => setCameraPosition([0, 0, 2000])}>Vista YZ</button>
        <button onClick={() => setCameraPosition([2000, 2000, 2000])}>Vista Isométrica</button>
        <button onClick={() => setAnimar(true)}>Iniciar Animación Partículas</button>
        <button onClick={() => setAnimarEsferasRadiales(true)}>Iniciar Animación Esferas Radiales</button>
      </div>
    </div>
  );
};

export default App;

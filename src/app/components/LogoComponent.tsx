'use client'
import React, { useState } from "react";

interface LogoProps {
  logoSrc: string; // Ruta de la imagen del logo
  altText?: string; // Texto alternativo (opcional)
  size?: number; // Tamaño del logo (opcional)
}

const LogoComponent: React.FC<LogoProps> = ({ logoSrc, altText = "Logo", size = 150 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.logoContainer,
        transform: isHovered ? "scale(1.1)" : "scale(1)", // Efecto de escala
        boxShadow: isHovered ? "0px 0px 20px rgba(255, 255, 255, 0.8)" : "none", // Efecto de resplandor
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={logoSrc}
        alt={altText}
        style={{
          ...styles.logoImage,
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  );
};

// Estilos en línea para el componente
const styles = {
  logoContainer: {
    display: "inline-block",
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Suaviza la animación
    cursor: "pointer",
  },
  logoImage: {
    borderRadius: "50%", // Hace la imagen circular si es cuadrada
  },
};

export default LogoComponent;

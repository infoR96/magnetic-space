import React from 'react';


interface LogoProps {
  src: string;
  alt: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt }) => {
  return (
    <div className="logo-container">
      <img src={src} alt={alt} className="responsive-logo" />
    </div>
  );
};

export default Logo;

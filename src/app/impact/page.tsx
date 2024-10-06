import React from 'react';
import './impact.css'

const Impact: React.FC = () => {
  return (
    <div className="content">
      <h1>Impact</h1>
      <p className='texto'>
        Solar storms, also known as geomagnetic storms, can have profound effects on Earth&apos;s technological systems and natural environment. These storms occur when high-speed solar winds or coronal mass ejections (CMEs) from the Sun interact with Earth&apos;s magnetosphere. While some effects are visually stunning, like the appearance of auroras near the poles, the broader impacts can be much more disruptive.
      </p>
      <div className="effects-container">
        <h2>1. Satellite Communications and GPS Disruptions</h2>
        <div className="image-container">
          <img src="/imagenes/2.3.png" alt="Image showing satellite disruptions" />
        </div>
        <p className='texto'>
          Charged solar particles can interfere with satellites in orbit, disrupting communication systems and GPS signals. This can affect navigation systems, airlines, and even everyday smartphone use. Solar storms can also increase drag on satellites, altering their orbits and shortening their operational lifespan.
        </p>
        
        <h2>2. Power Grids and Infrastructure</h2>
        <div className="image-container">
          <img src="/imagenes/6.jpg" alt="Image showing power grid disruptions" />
        </div>
        <p className='texto'>
          Geomagnetic storms can induce electric currents in power grids, known as geomagnetically induced currents (GICs). Estas corrientes pueden sobrecargar transformadores y otra infraestructura crítica, lo que podría provocar cortes de energía generalizados. En casos extremos, estos eventos han causado apagones en regiones enteras.
        </p>

        <h2>3. Aviation and Space Missions</h2>
        <p className='texto'>
          High-energy particles from solar storms pose a risk to astronauts and high-altitude flight paths, particularly near the poles. Airlines may need to reroute flights to avoid exposure to increased radiation levels during significant solar events. Space missions, too, must be carefully monitored and adjusted to minimize the impact of solar activity on spacecraft.
        </p>

        <h2>4. Earth&apos;s Atmosphere</h2>
        <p className='texto'>
          Solar storms deposit energy into Earth&apos;s upper atmosphere, heating the ionosphere and causing changes in atmospheric density. This can affect long-range radio communications, satellite tracking, and even weather patterns. The heating also causes increased drag on low-Earth orbit satellites, impacting their movement and lifespan.
        </p>
      </div>
    </div>
  );
};

export default Impact;

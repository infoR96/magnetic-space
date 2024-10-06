import React from 'react';
import './SolarStorm.css';

export const SolarStorm: React.FC = () => {
  return (
    <>
      <div className="solar-storm-container">
        <div className="solar-storm-header">
          <h1>SOLAR STORM</h1>
          <p>
            Explore the impact of the May 2024 geomagnetic storms. Using real NASA satellite data, we visualize how solar flares and coronal mass ejections affect Earth&apos;s magnetic field. Dive into interactive simulations and discover statistical insights into the effects on Earth&apos;s atmosphere, communication systems, and environment.
          </p>
        </div>


        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="YouTube Video"
            allowFullScreen
            className="video"
          />
        </div>
        <div className="cards">
          <a href="/simulation" className="card">
            <img src="/imagenes/1.1_Simulation.png" alt="Simulation" />
            <h2>SIMULATION</h2>
          </a>
          <a href="/storm" className="card">
            <img src="/imagenes/1.2_geomagnetic_storm.png" alt="Geomagnetic Storm" />
            <h2>GEOMAGNETIC STORM</h2>
          </a>
          <a href="/data" className="card">
            <img src="/imagenes/1.3_data_recollection.png" alt="Data Recollection" />
            <h2>DATA RECOLLECTION</h2>
          </a>
          <a href="/data" className="card">
            <img src="/imagenes/1.4_solar_data.png" alt="Solar Data" />
            <h2>SOLAR DATA</h2>
          </a>
        </div>
      </div>
    </>
  );
};

export default SolarStorm;

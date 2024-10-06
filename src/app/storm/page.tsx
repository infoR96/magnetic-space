import React from 'react';
import './storm.css';

const GeomagneticStorm: React.FC = () => {
  return (
    <div className="geomagnetic-storm-container">
      <div className="content">
        <h1>GEOMAGNETIC STORM</h1>
        <p className='texto'>
          A geomagnetic storm is a powerful disruption of Earth’s magnetosphere, triggered when solar wind energy is efficiently transferred into the space environment surrounding our planet. These storms are caused by variations in solar wind that lead to significant changes in the currents, plasma, and magnetic fields within Earth’s magnetosphere.
        </p>
        <p className='texto'>
          Geomagnetic storms typically occur during sustained periods of high-speed solar wind, often accompanied by a southward-directed magnetic field that opposes Earth’s magnetic field. This alignment enables a greater transfer of energy from the solar wind into Earth’s magnetosphere. The largest and most intense geomagnetic storms are usually associated with coronal mass ejections (CMEs)—massive bursts of plasma from the Sun that can reach Earth in a matter of days, or in extreme cases, as quickly as 18 hours.
        </p >
        <p className='texto'>
        Another contributor to geomagnetic storms is high-speed solar wind streams (HSS), which, when colliding with slower solar wind, create interaction regions known as co-rotating interaction regions (CIRs). While these storms are often less intense than CME-driven storms, they can deposit energy into Earth’s magnetosphere over longer periods.
        </p >
        <div className="effects-container">
      <h2>Key Effects of Geomagnetic Storms</h2>
      <ul className="effects-list">
        <li>
          <strong>Currents in the Magnetosphere:</strong> These storms generate intense currents, affecting the radiation belts and ionosphere, leading to heating in the upper atmosphere.
        </li>
        <li>
          <strong>Disturbance Storm Time Index (Dst):</strong> A historical measure of storm strength, Dst represents the intensity of the magnetic field changes caused by geomagnetic storms.
        </li>
        <li>
          <strong>Auroral Electrojets:</strong> Currents that flow through the ionosphere during storms, which are responsible for beautiful auroras but also cause significant magnetic disturbances.
        </li>
        <li>
          <strong>Kp Index:</strong> This planetary index measures geomagnetic activity, with higher values indicating stronger storms. The NOAA G-Scale classifies these storms based on their potential to disrupt Earth systems, from satellites to power grids.
        </li>
      </ul>
    </div>
      </div>
      <div className="images">
        <img src="/imagenes/2.1.png" alt="Image 1" />
        <img src="/imagenes/2.2.png" alt="Image 2" />
      </div>
    </div>
  );
};

export default GeomagneticStorm;


import './simulacion.css'
import Cubo3DCam from "@/app/components/componentes3D";

export default function Home() {
  return (
    
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start background-image">
      <h1>Geomagnetismo</h1>
      <div className="enviroment">

      <Cubo3DCam/>
      </div>
      </main>


  );
}

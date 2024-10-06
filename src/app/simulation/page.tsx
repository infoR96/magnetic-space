
import './simulacion.css'
import Cubo3DCam from "@/app/components/componentes3D";

export default function Home() {
  return (
    
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start background-image">
      <h1>Geomagnetismo</h1>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis voluptatum impedit reprehenderit nobis illum ullam, maiores suscipit consectetur? Et vitae minus dolor ipsum quisquam libero necessitatibus amet reprehenderit, ducimus aperiam?</p>

      <div className="enviroment">
      {/* <Cubo3D /> */}
      <Cubo3DCam/>
      </div>
      </main>


  );
}

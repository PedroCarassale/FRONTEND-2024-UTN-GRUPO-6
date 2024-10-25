import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Rutinas.css";
import CardRutinaEjercicio from "../components/CardRutinaEjercicio";
const misGimnasios = [
  { imagen_url: "/imagenes/Tren superior.png", nombre: "Tren Superior" },
  { imagen_url: "/imagenes/Tren inferior.png", nombre: "Tren Inferior" },
  { imagen_url: "/imagenes/Tren superior.png", nombre: "Tren Superior" },
  { imagen_url: "/imagenes/Tren inferior.png", nombre: "Tren Inferior" },
  { imagen_url: "/imagenes/Tren superior.png", nombre: "Tren Superior" },
  { imagen_url: "/imagenes/Tren inferior.png", nombre: "Tren Inferior" },
];

function Rutinas() {
  const { id } = useParams<{ id: string }>(); // Aquí obtenemos el parámetro `id` de la URL

  return (
    <section className="gimnasio">
      <Sidebar name={id || "Gimnasio"}></Sidebar>
      <div className="main">
        <div className="title-and-button">
          <span className="title">Rutinas</span>
          <button className="nueva-rutina">Nueva Rutina</button>
        </div>
        <div className="list-cards">
          {misGimnasios.map((gimnasio) => (
            <CardRutinaEjercicio
              img={gimnasio.imagen_url}
              title={gimnasio.nombre}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Rutinas;
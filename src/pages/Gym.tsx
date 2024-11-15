import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Gym.css";

function Gym() {
  const { id } = useParams<{ id: string }>(); // Aquí obtenemos el parámetro `id` de la URL

  return (
    <section className="gimnasio">
      <Sidebar name={id || "Gimnasio"} active=""></Sidebar>
    </section>
  );
}

export default Gym;

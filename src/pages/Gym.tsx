import { useParams } from "react-router-dom";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { Dumbbell, Newspaper, Shapes } from "lucide-react";
import "./Gym.css";

function Gym() {
  const { id } = useParams<{ id: string }>(); // Aquí obtenemos el parámetro `id` de la URL

  return (
    <section className="gimnasio">
      <Sidebar name={id || ""}>
        <SidebarItem icon={<Dumbbell size={20} />} text={"Rutinas"} />
        <SidebarItem icon={<Shapes size={20} />} text={"Clases"} />
        <SidebarItem icon={<Newspaper size={20} />} text={"Novedades"} />
      </Sidebar>
    </section>
  );
}

export default Gym;

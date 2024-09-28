import { useParams } from "react-router-dom";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { Dumbbell, Settings, Shapes } from "lucide-react";
import "./Gym.css";

function Gym() {
  const { id } = useParams<{ id: string }>(); // Aquí obtenemos el parámetro `id` de la URL

  return (
    <section className="gimnasio">
      <Sidebar name={id || ""}>
        <SidebarItem icon={<Dumbbell size={20} />} text={"Rutinas"} />
        <SidebarItem icon={<Shapes size={20} />} text={"Clases"} />
        <SidebarItem icon={<Settings size={20} />} text={"Settings"} />
        <SidebarItem icon={<Settings size={20} />} text={"Settings"} />
        <SidebarItem icon={<Settings size={20} />} text={"Settings"} />
      </Sidebar>
    </section>
  );
}

export default Gym;

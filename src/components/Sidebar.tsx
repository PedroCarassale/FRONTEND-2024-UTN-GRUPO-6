import { CircleGauge, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  name: string;
}

export default function Sidebar({ name }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="gym-name"> {name} </div>
      <ul className={"sidebar-list"}>
        <li className="sidebar-item">
          <Link to={`ejercicios`} className="link">
            <div className="icon">
              <Dumbbell></Dumbbell>
            </div>
            <span className="sidebar-text">Ejercicios</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to={`rutinas`} className="link">
            <div className="icon">
              <CircleGauge></CircleGauge>
            </div>
            <span className="sidebar-text">Rutinas</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

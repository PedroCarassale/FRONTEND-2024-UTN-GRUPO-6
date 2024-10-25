import { CircleGauge, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  name: string;
  active: string;
}

export default function Sidebar({ name, active }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="gym-name"> {name} </div>
      <ul className={"sidebar-list"}>
        <li className="sidebar-item">
          <Link
            to={`ejercicios`}
            className={`link ${active === "ejercicios" ? "item-active" : ""}`}
          >
            <div className="icon">
              <Dumbbell></Dumbbell>
            </div>
            <span className="sidebar-text">Ejercicios</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to={`rutinas`}
            className={`link ${active === "rutinas" ? "item-active" : ""}`}
          >
            {active === "rutinas" ? <></> : <></>}
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

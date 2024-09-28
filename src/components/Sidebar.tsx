import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";
import "./Sidebar.css";

// Definir tipos para las props de Sidebar y SidebarItem
interface SidebarProps {
  name: string;
  children: ReactNode;
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}

// Crear contexto para manejar el estado de expansión del sidebar
const SidebarContext = createContext({ expanded: true });

export default function Sidebar({ name, children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <div className="sidebar-header">
          <span className="sidebar-name">{name}</span>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="toggle-button"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="sidebar-list">{children}</ul>
        </SidebarContext.Provider>

        <div className="sidebar-footer">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User Avatar"
            className="avatar"
          />
          <div className={`user-info ${expanded ? "expanded" : "collapsed"}`}>
            <div className="user-details">
              <h4 className="user-name">John Doe</h4>
              <span className="user-email">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li className={`sidebar-item ${active ? "active" : "inactive"}`}>
      {icon}
      <span className={`sidebar-text ${expanded ? "expanded" : "collapsed"}`}>
        {text}
      </span>
      {alert && <div className={`alert-dot ${expanded ? "" : "collapsed"}`} />}
      {!expanded && <div className="sidebar-tooltip">{text}</div>}
    </li>
  );
}

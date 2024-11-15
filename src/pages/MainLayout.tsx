import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      {/* Mostrar el Navbar si no estamos en la ruta /login */}
      {location.pathname !== "/login" && <NavBar />}
      <Outlet />
    </div>
  );
};

export default MainLayout;

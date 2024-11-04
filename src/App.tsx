import "./App.css";
import Gym from "./pages/Gym";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rutinas from "./pages/Rutinas";
import Login from "./pages/Login";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta específica para /login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas hijas dentro de MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gimnasio/:id" element={<Gym />} />
          <Route path="/gimnasio/:id/rutinas" element={<Rutinas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

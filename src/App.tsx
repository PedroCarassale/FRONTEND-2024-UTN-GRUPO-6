import "./App.css";
import Gym from "./pages/Gym";
import Gimnasios from "./pages/Gimnasios";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rutinas from "./pages/Rutinas";
import Login from "./pages/Login";
import MainLayout from "./pages/MainLayout";
import { AlertProvider } from "./components/AlertContext";

function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta específica para /login */}
          <Route path="/login" element={<Login />} />

          {/* Rutas hijas dentro de MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/gimnasios" element={<Gimnasios />} />
            <Route path="/login" element={<Login />} />
            <Route path="/rutinas" element={<Rutinas />} />
            <Route path="/gimnasio/:id" element={<Gym />} />
            <Route path="/gimnasio/:id/rutinas" element={<Rutinas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;

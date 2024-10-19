import "./App.css";
import Gym from "./pages/Gym";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rutinas from "./pages/Rutinas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gimnasio/:id" element={<Gym />} />
        <Route path="/gimnasio/:id/rutinas" element={<Rutinas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

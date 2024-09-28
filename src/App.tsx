import "./App.css";
import Gym from "./pages/Gym";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gimnasio/:id" element={<Gym />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home2 from "./pages/Home2";
import NavbarComp from "./components/NavbarComp";

function App() {
  return (
    <BrowserRouter>
      <NavbarComp></NavbarComp>
      <Routes>
        <Route path="/mis-gimnasios" element={<Home />} />
        <Route path="/explorar-gimnasios" element={<Home2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

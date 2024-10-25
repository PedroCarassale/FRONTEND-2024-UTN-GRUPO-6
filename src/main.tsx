import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import NavBar from "./components/NavBar.tsx";

const root = createRoot(document.getElementById("root")!);
root.render(
  <>
    <header>
      <NavBar />
    </header>
    <>
      <App />
    </>
  </>
);

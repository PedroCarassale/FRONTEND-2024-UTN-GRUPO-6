import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

interface Gimnasio {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  imagen_url: string;
}

function App() {
  const [misGimnasios, setMisGimnasios] = useState<Gimnasio[]>([]);
  const [gimnasiosDisponibles, setGimnasiosDisponibles] = useState<Gimnasio[]>([]);
  
  // Fetch de mis gimnasios
  useEffect(() => {
    fetch("http://localhost:3000/miembro/gimnasios/1")
      .then((response) => response.json())
      .then((data) => setMisGimnasios(data))
      .catch((error) => console.error("Error al obtener mis gimnasios:", error));
  }, []);

  // Fetch de gimnasios disponibles
  useEffect(() => {
    fetch("http://localhost:3000/miembro/gimnasios/disponibles/1")
      .then((response) => response.json())
      .then((data) => setGimnasiosDisponibles(data))
      .catch((error) => console.error("Error al obtener gimnasios disponibles:", error));
  }, []);

  return (
    <section className="app">
      {/* Mis Gimnasios */}
      <h2 className="mis-gimnasios">Mis Gimnasios</h2>
      <div className="app-explorar-gimnasios-cards">
        {misGimnasios.map((gimnasio) => (
          <Card
            key={gimnasio.id}
            img={gimnasio.imagen_url}
            title={gimnasio.nombre}
            description={`${gimnasio.direccion}, ${gimnasio.ciudad}, Tel: ${gimnasio.telefono}`}
            tags={[["#f00", "Ya inscripto"]]}
          />
        ))}
      </div>

      {/* Explorar Gimnasios */}
      <h2 className="mis-gimnasios">Explorar Gimnasios</h2>
      <div className="app-explorar-gimnasios-cards">
        {gimnasiosDisponibles.map((gimnasio) => (
          <Card
            key={gimnasio.id}
            img={gimnasio.imagen_url}
            title={gimnasio.nombre}
            description={`${gimnasio.direccion}, ${gimnasio.ciudad}, Tel: ${gimnasio.telefono}`}
            tags={[["#139e24", "Disponible"]]}
          />
        ))}
      </div>
    </section>
  );
}

export default App;

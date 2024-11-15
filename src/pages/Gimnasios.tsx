import "./Gimnasios.css";
import Card from "../components/Card";
import { useEffect, useState } from "react";

interface Gimnasio {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  imagen_url: string;
}

function Gimnasios() {
  // En TypeScript, se usa <Gimnasio[]> para decir explícitamente que el estado será un array de objetos Gimnasio.
  // Inicialmente, antes de que lleguen los datos del servidor, el array está vacío ([]), y después lo llenas con los datos que obtienes en el useEffect.
  const [misGimnasios, setMisGimnasios] = useState<Gimnasio[]>([]);
  const [gimnasiosDisponibles, setGimnasiosDisponibles] = useState<Gimnasio[]>(
    []
  );

  // misGimnasios: Es el estado que contiene una lista (array) de gimnasios.
  // setMisGimnasios: Es la función que usas para actualizar el estado misGimnasios. Cuando llamas a setMisGimnasios con una nueva lista de gimnasios, React volverá a renderizar el componente con esos datos actualizados.

  // Fetch de mis gimnasios.
  // useEffect obtener datos de una API.
  useEffect(() => {
    fetch("http://localhost:3000/miembro/gimnasios/2") // 1. Llamada a la API
      .then((response) => response.json()) // 2. Convierte la respuesta a JSON
      .then((data) => setMisGimnasios(data)) // 3. Actualiza el estado con los datos obtenidos
      .catch((error) =>
        console.error("Error al obtener mis gimnasios:", error)
      ); //4. Maneja errores
  }, []);

  // ()=>{} Primer argumento: Es una función que define el efecto a realizar (en este caso, la llamada fetch para obtener los datos de una API).
  //[] Segundo argumento: Es un array de dependencias [] que determina cuándo debe ejecutarse el efecto (en este caso, solo se ejecuta una vez al montar el componente).
  //[] Este array determina cuándo debe ejecutarse el useEffect, []: Esto significa que el efecto solo se ejecutará una vez, Si este array tuviera dependencias, el efecto se ejecutaría cada vez que esas dependencias cambiaran.

  // Fetch de gimnasios disponibles
  useEffect(() => {
    fetch("http://localhost:3000/miembro/gimnasios/disponibles/2")
      .then((response) => response.json())
      .then((data) => setGimnasiosDisponibles(data))
      .catch((error) =>
        console.error("Error al obtener gimnasios disponibles:", error)
      );
  }, []);

  return (
    <section className="app">
      {/* Mis Gimnasios */}
      <h2 className="mis-gimnasios">MIS GIMNASIOS</h2>
      <div className="app-explorar-gimnasios-cards">
        {misGimnasios.map((gimnasio) => (
          <Card
            key={gimnasio.id}
            img={gimnasio.imagen_url}
            title={gimnasio.nombre}
            description={`${gimnasio.direccion}, ${gimnasio.ciudad}, Tel: ${gimnasio.telefono}`}
            tags={[["#f00", "Inscripto"]]}
          />
        ))}
      </div>

      {/* Explorar Gimnasios */}
      <h2 className="mis-gimnasios">EXPLORAR GIMNASIOS</h2>
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

export default Gimnasios;

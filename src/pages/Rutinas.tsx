import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Rutinas.css";
import CardRutina from "../components/CardRutina";
import ModalForm, { Exercise } from "../components/Modal";
import { backendUrl } from "../config";

function Rutinas() {
  type Routine = {
    id: number;
    imagen_url: string;
    nombre: string;
    ejerciciorutina: Exercise[];
    descanso: string;
  };

  const { id } = useParams<{ id: string }>();
  const isSidebarOpen = window.location.href.includes("gimnasio");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
  const [misRutinas, setMisRutinas] = useState<Routine[]>([]);

  const openModal = (routine: Routine | null = null) => {
    setEditingRoutine(routine); // Cargar datos de rutina
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRoutine(null); // Limpiar la rutina cuando se cierre el modal
  };

  const fetchRutinas = async () => {
    // Cargar las rutinas desde el backend al montar el componente
    const storedUserId = localStorage.getItem("usuario_id");
    const storedGymId = localStorage.getItem("gimnasio_id");
    const isGymPage = window.location.href.includes("gimnasio");

    const id = isGymPage ? storedGymId : storedUserId;
    const path = isGymPage ? "gimnasio" : "usuario";
    try {
      const response = await fetch(`${backendUrl}/rutinas/${path}/${id}`);
      if (response.ok) {
        const rutinas: Routine[] = await response.json();
        setMisRutinas(rutinas);
      } else {
        console.error("Error al obtener las rutinas");
      }
    } catch (error) {
      console.error("Error al hacer fetch de las rutinas:", error);
    }
    if (!id) {
      console.error("ID de usuario o gimnasio no encontrado en localStorage");
      return;
    }
  };

  useEffect(() => {
    fetchRutinas();
  }, [isModalOpen]); // Actualizar la lista cuando se cierre el modal

  return (
    <section className="gimnasio">
      {isModalOpen && (
        <ModalForm closeModal={closeModal} initialData={editingRoutine} />
      )}
      {isSidebarOpen && <Sidebar name={id || "Gimnasio"} active="rutinas" />}
      <div className="main">
        <div className="title-and-button">
          <span className="title">Rutinas</span>
          <button className="nueva-rutina" onClick={() => openModal(null)}>
            Nueva Rutina
          </button>
        </div>

        <div className="list-cards">
          {misRutinas && misRutinas.length > 0 ? (
            misRutinas.map((rutina) => (
              <CardRutina
                key={rutina.id}
                id={rutina.id}
                img={rutina.imagen_url}
                title={rutina.nombre}
                exercises={`${rutina.ejerciciorutina.length}`}
                onEdit={() => openModal(rutina)}
                onDelete={() => fetchRutinas()}
              />
            ))
          ) : (
            <p>No se encontraron rutinas.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Rutinas;

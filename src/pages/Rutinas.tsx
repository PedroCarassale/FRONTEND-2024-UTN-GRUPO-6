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
    ejercicios: Exercise[];
    descanso: string;
  };

  const { id } = useParams<{ id: string }>(); // Aquí obtenemos el parámetro `id` de la URL
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

  useEffect(() => {
    // Cargar las rutinas desde el localStorage al montar el componente
    const storedRoutines = JSON.parse(localStorage.getItem("routines") || "[]");
    setMisRutinas(storedRoutines);
  }, [isModalOpen]); // Actualizar la lista cuando se cierra el modal

  // Obtener ID del gimnasio por nombre
  const fetchRutinas = async () => {
    try {
      const response = await fetch(`${backendUrl}/rutinas`);
      if (response.ok) {
        const rutinas = await response.json();
        const gym = gyms.find(
          (g) => g.nombre.toLowerCase() === id?.toLowerCase()
        );
        if (gym) {
          setMisRutinas(gym.id);
        } else {
          console.error("Gimnasio no encontrado");
        }
      } else {
        console.error("Error al obtener los gimnasios");
      }
    } catch (error) {
      console.error("Error al hacer fetch del gimnasio:", error);
    }
  };

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
          {misRutinas.map((rutina, index) => (
            <CardRutina
              key={index}
              img={rutina.imagen_url}
              title={rutina.nombre}
              exercises={`${rutina.ejercicios.length}`}
              onEdit={() => openModal(rutina)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Rutinas;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Rutinas.css";
import CardRutina from "../components/CardRutina";
import ModalForm, { Exercise } from "../components/Modal";

function Rutinas() {
  const { id } = useParams<{ id: string }>(); // Aquí obtenemos el parámetro `id` de la URL
  const isSidebarOpen = window.location.href.includes("gimnasio");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<any | null>(null);
  const [misRutinas, setMisRutinas] = useState<
    {
      imagen: string;
      nombre: string;
      ejercicios: Exercise[];
      descanso: string;
    }[]
  >([]);

  const openModal = (routine = null) => {
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

  return (
    <section className="gimnasio">
      {isModalOpen && (
        <ModalForm closeModal={closeModal} initialData={editingRoutine} />
      )}
      {isSidebarOpen && <Sidebar name={id || "Gimnasio"} active="rutinas" />}
      <div className="main">
        <div className="title-and-button">
          <span className="title">Rutinas</span>
          <button className="nueva-rutina" onClick={openModal}>
            Nueva Rutina
          </button>
        </div>

        <div className="list-cards">
          {misRutinas.map((rutina, index) => (
            <CardRutina
              key={index}
              img={rutina.imagen}
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

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Rutinas.css";
import CardRutina from "../components/CardRutina";
import ModalForm, { Exercise } from "../components/Modal";

function Rutinas() {
  const { id } = useParams<{ id: string }>(); // Aquí obtenemos el parámetro `id` de la URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [misRutinas, setMisRutinas] = useState<
    { imagen: string; nombre: string; ejercicios: Exercise[] }[]
  >([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const clearRoutines = () => {
    localStorage.removeItem("routines");
    window.location.reload();
  };

  useEffect(() => {
    // Cargar las rutinas desde el localStorage al montar el componente
    const storedRoutines = JSON.parse(localStorage.getItem("routines") || "[]");
    setMisRutinas(storedRoutines);
  }, [isModalOpen]); // Actualizar la lista cuando se cierra el modal

  return (
    <section className="gimnasio">
      {isModalOpen && <ModalForm closeModal={closeModal} />}
      <Sidebar name={id || "Gimnasio"} active="rutinas" />
      <div className="main">
        <div className="title-and-button">
          <span className="title">Rutinas</span>
          <button className="nueva-rutina" onClick={openModal}>
            Nueva Rutina
          </button>
          <button className="nueva-rutina" onClick={clearRoutines}>
            Limpiar Rutinas
          </button>
        </div>

        <div className="list-cards">
          {misRutinas.map((rutina, index) => (
            <CardRutina
              key={index}
              img={rutina.imagen}
              title={rutina.nombre}
              exercises={`${rutina.ejercicios.length}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Rutinas;

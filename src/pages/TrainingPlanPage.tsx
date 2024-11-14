import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { backendUrl } from "../config";
import "react-calendar/dist/Calendar.css";
import "./TrainingPlan.css";

interface Routine {
  id: number;
  nombre: string;
}

interface TrainingPlan {
  [date: string]: Routine;
}

const TrainingPlanPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan>({});
  const [showRoutineModal, setShowRoutineModal] = useState(false);

  // Obtener rutinas del backend
  const fetchRoutines = async () => {
    try {
      const response = await fetch(`${backendUrl}/rutinas`);
      if (response.ok) {
        const data = await response.json();
        setRoutines(data);
      } else {
        console.error("Error al obtener rutinas");
      }
    } catch (error) {
      console.error("Error en fetch de rutinas:", error);
    }
  };

  // Asignar rutina a la fecha seleccionada
  const assignRoutineToDate = (routine: Routine) => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      setTrainingPlan((prevPlan) => ({
        ...prevPlan,
        [dateKey]: routine,
      }));
      setShowRoutineModal(false);
    }
  };

  // Manejo de apertura del modal de selección de rutina
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setShowRoutineModal(true);
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  // Renderizar contenido de cada celda del calendario
  const tileContent = ({ date }: { date: Date }) => {
    const dateKey = date.toISOString().split("T")[0];
    const routine = trainingPlan[dateKey];
    return (
      <div className="day-content">
        {routine ? (
          <span className="routine-name">{routine.nombre}</span>
        ) : (
          <button
            className="add-routine-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDayClick(date);
            }}
          >
            Asignar
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="training-plan-container">
      <h2>Planificación de Entrenamiento</h2>
      <Calendar
        onClickDay={(date) => handleDayClick(date)}
        tileContent={tileContent}
      />

      {showRoutineModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Selecciona una rutina</h3>
            <ul className="routine-list">
              {routines.map((routine) => (
                <li key={routine.id}>
                  <button onClick={() => assignRoutineToDate(routine)}>
                    {routine.nombre}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="close-btn"
              onClick={() => setShowRoutineModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingPlanPage;

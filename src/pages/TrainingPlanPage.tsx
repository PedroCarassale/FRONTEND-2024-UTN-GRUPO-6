import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { backendUrl } from "../config";
import "react-calendar/dist/Calendar.css";
import "./TrainingPlan.css";

interface Routine {
  id: number;
  nombre: string;
  descanso_entre_ejercicios: string;
  ejerciciorutina: any[];
  descripcion?: string;
}

interface TrainingPlan {
  [date: string]: Routine;
}

const TrainingPlanPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan>({});
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [showRoutineDetailModal, setShowRoutineDetailModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);

  const userId = localStorage.getItem("usuario_id");

  // Obtener rutinas del backend
  const fetchRoutines = async () => {
    try {
      const response = await fetch(`${backendUrl}/rutinas/usuario/${userId}`);
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

  // Formatea la fecha en formato DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  // Obtener entrenamiento para el mes actual
  const fetchTrainingPlan = async (monthYear: string) => {
    try {
      const response = await fetch(
        `${backendUrl}/entrenamiento/${userId}/${monthYear}`
      );
      if (response.ok) {
        const data = await response.json();
        const formattedPlan: TrainingPlan = {};

        data.forEach((entry: { fecha: string; rutina_id: number }) => {
          const dateKey = formatDate(entry.fecha);
          const routine = routines.find((r) => r.id === entry.rutina_id);
          if (routine) {
            formattedPlan[dateKey] = routine;
          }
        });

        setTrainingPlan(formattedPlan);
      } else {
        console.error("Error al obtener el plan de entrenamiento");
      }
    } catch (error) {
      console.error("Error en fetch del plan de entrenamiento:", error);
    }
  };

  // Asignar rutina a la fecha seleccionada
  const assignRoutineToDate = async (routine: Routine) => {
    if (selectedDate && userId) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      const formattedDate = selectedDate.toLocaleDateString("en-GB");

      try {
        const response = await fetch(`${backendUrl}/entrenamiento`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: Number(userId),
            rutina_id: routine.id,
            fecha: formattedDate,
          }),
        });

        if (response.ok) {
          setTrainingPlan((prevPlan) => ({
            ...prevPlan,
            [dateKey]: routine,
          }));
          setShowRoutineModal(false);
        } else {
          console.error("Error al asignar rutina");
        }
      } catch (error) {
        console.error("Error en POST de asignación de rutina:", error);
      }
    }
    fetchTrainingPlan(currentMonth);
  };

  // Manejo de apertura de modales
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    const dateKey = date.toLocaleDateString("en-GB");
    const routine = trainingPlan[dateKey];
    console.log(routine);
    if (routine) {
      setSelectedRoutine(routine);
      setShowRoutineDetailModal(true);
    } else {
      setShowRoutineModal(true);
    }
  };

  // Manejo del cambio de mes en el calendario
  const handleMonthChange = (date: Date) => {
    const monthYear = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    setCurrentMonth(monthYear);
    fetchTrainingPlan(monthYear);
  };

  useEffect(() => {
    fetchRoutines();
    const initialMonthYear = `${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${new Date().getFullYear()}`;
    setCurrentMonth(initialMonthYear);
  }, []);

  useEffect(() => {
    if (routines.length > 0 && currentMonth) {
      fetchTrainingPlan(currentMonth);
    }
  }, [routines, currentMonth]);

  // Renderizar contenido de cada celda del calendario
  const tileContent = ({ date }: { date: Date }) => {
    const dateKey = date.toLocaleDateString("en-GB");
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
            +
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
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) handleMonthChange(activeStartDate);
        }}
      />

      {/* Modal de selección de rutina */}
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

      {/* Modal de detalle de rutina */}
      {showRoutineDetailModal && selectedRoutine && (
        <div className="modal">
          <div className="modal-content">
            <h3>Detalle de la Rutina</h3>
            <p>
              <strong>Nombre:</strong> {selectedRoutine.nombre}
            </p>
            <p>
              <strong>Descripción:</strong>{" "}
              {selectedRoutine.descripcion || "Sin descripción"}
            </p>
            <p>
              <strong>Descanso entre ejercicios:</strong>{" "}
              {selectedRoutine.descanso_entre_ejercicios} min
            </p>

            <h4>Ejercicios:</h4>
            <ul>
              {selectedRoutine.ejerciciorutina.map((exercise) => (
                <li key={exercise.id}>
                  <p>
                    <strong>Ejercicio:</strong> {exercise.ejercicio.nombre}
                  </p>
                  <p>
                    <strong>Descripción:</strong>{" "}
                    {exercise.ejercicio.descripcion || "Sin descripción"}
                  </p>
                  <p>
                    <strong>Descanso entre series:</strong>{" "}
                    {exercise.descanso_entre_series} min
                  </p>
                  <p>
                    <strong>Intensidad:</strong> {exercise.intensidad}
                  </p>
                  <p>
                    <strong>Series x Repeticiones:</strong>{" "}
                    {exercise.series_x_repeticiones || "No especificado"}
                  </p>
                </li>
              ))}
            </ul>
            <button
              className="close-btn"
              onClick={() => setShowRoutineDetailModal(false)}
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

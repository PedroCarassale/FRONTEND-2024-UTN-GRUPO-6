import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import "./Modal.css";

export interface Exercise {
  nombre: string;
  seriesReps: string;
  intensidad: string;
  descansoSeries: string;
  isEditing?: boolean;
}

interface Routine {
  nombre: string;
  imagen: string | null;
  descansoEntreEjercicios: string;
  ejercicios: Exercise[];
}

interface ModalFormProps {
  closeModal: () => void;
  initialData?: any; // Prop para cargar los datos de una rutina
}

const ModalForm: React.FC<ModalFormProps> = ({ closeModal, initialData }) => {
  const [nombreRutina, setNombreRutina] = useState<string>(
    initialData?.nombre || ""
  );
  const [imagenRutina, setImagenRutina] = useState<string | null>(
    initialData?.imagen || ""
  );
  const [descansoEntreEjercicios, setDescansoEntreEjercicios] =
    useState<string>("");
  const [exercises, setExercises] = useState<Exercise[]>(
    initialData.ejercicios || []
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenRutina(reader.result as string);
      };
      reader.readAsDataURL(file); // Convierte la imagen a base64
    }
  };

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        nombre: "",
        seriesReps: "",
        intensidad: "",
        descansoSeries: "",
        isEditing: true,
      },
    ]);
  };

  const handleInputChange = (
    index: number,
    field: keyof Exercise,
    value: string
  ) => {
    const newExercises = [...exercises];
    newExercises[index] = {
      ...newExercises[index],
      [field]: value,
    };
    setExercises(newExercises);
  };

  const saveExercise = (index: number) => {
    const newExercises = [...exercises];
    newExercises[index].isEditing = false;
    setExercises(newExercises);
  };

  const editExercise = (index: number) => {
    const newExercises = [...exercises];
    newExercises[index].isEditing = true;
    setExercises(newExercises);
  };

  const deleteExercise = (index: number) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };

  // Función para guardar la rutina completa en JSON
  const saveRoutine = async () => {
    const newRoutine: Routine = {
      nombre: nombreRutina,
      imagen: imagenRutina,
      descansoEntreEjercicios,
      ejercicios: exercises.map((exercise) => ({
        nombre: exercise.nombre,
        seriesReps: exercise.seriesReps,
        intensidad: exercise.intensidad,
        descansoSeries: exercise.descansoSeries,
      })),
    };

    // Simula la carga de rutinas del JSON local en una variable
    let routines = JSON.parse(localStorage.getItem("routines") || "[]");

    // Agrega la nueva rutina a la lista
    routines.push(newRoutine);

    // Guarda de nuevo en el localStorage
    localStorage.setItem("routines", JSON.stringify(routines));

    closeModal(); // Cerrar modal

    // try {
    //   // Envía la rutina al backend
    //   const response = await fetch("/api/saveRoutine", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newRoutine),
    //   });

    //   if (response.ok) {
    //     alert("Rutina guardada exitosamente.");
    //     closeModal(); // Cerrar modal
    //   } else {
    //     alert("Hubo un problema al guardar la rutina.");
    //   }
    // } catch (error) {
    //   console.error("Error al guardar la rutina:", error);
    //   alert("Hubo un problema al guardar la rutina.");
    // }
  };

  useEffect(() => {
    if (initialData) {
      setNombreRutina(initialData.nombre);
      // y otros campos...
    }
  }, [initialData]);

  return (
    <div className="modal-overlay">
      <div className="modal-form-content">
        <h2>Creación Rutina</h2>

        <form>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombreRutina}
            onChange={(e) => setNombreRutina(e.target.value)}
          />

          <label htmlFor="imagen">Imagen</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImageUpload}
          />

          <h3>Ejercicios</h3>
          {exercises.map((exercise, index) => (
            <div key={index} className="exercise-section">
              {exercise.isEditing ? (
                <>
                  <label htmlFor={`nombre-ejercicio-${index}`}>
                    Nombre del ejercicio
                  </label>
                  <select
                    id={`nombre-ejercicio-${index}`}
                    name={`nombre-ejercicio-${index}`}
                    value={exercise.nombre}
                    onChange={(e) =>
                      handleInputChange(index, "nombre", e.target.value)
                    }
                  >
                    <option value="">Selecciona un ejercicio</option>
                    <option value="Ejercicio 1">Ejercicio 1</option>
                    <option value="Ejercicio 2">Ejercicio 2</option>
                  </select>

                  <label htmlFor={`series-repeticiones-${index}`}>
                    Series x Repeticiones *
                  </label>
                  <input
                    type="text"
                    id={`series-repeticiones-${index}`}
                    name={`series-repeticiones-${index}`}
                    value={exercise.seriesReps}
                    onChange={(e) =>
                      handleInputChange(index, "seriesReps", e.target.value)
                    }
                  />

                  <label htmlFor={`intensidad-${index}`}>Intensidad</label>
                  <input
                    type="text"
                    id={`intensidad-${index}`}
                    name={`intensidad-${index}`}
                    value={exercise.intensidad}
                    onChange={(e) =>
                      handleInputChange(index, "intensidad", e.target.value)
                    }
                  />

                  <label htmlFor={`descanso-series-${index}`}>
                    Descanso entre series
                  </label>
                  <input
                    type="text"
                    id={`descanso-series-${index}`}
                    name={`descanso-series-${index}`}
                    value={exercise.descansoSeries}
                    onChange={(e) =>
                      handleInputChange(index, "descansoSeries", e.target.value)
                    }
                  />

                  <div className="buttons-group">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => deleteExercise(index)}
                    >
                      Eliminar
                    </button>
                    <button type="button" onClick={() => saveExercise(index)}>
                      Guardar
                    </button>
                  </div>
                </>
              ) : (
                <div className="exercise-view">
                  <span>{exercise.nombre}</span>
                  <button
                    className="exercise-view-button"
                    type="button"
                    onClick={() => editExercise(index)}
                  >
                    <Pencil size={20} />
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            className="add-exercise-button"
            onClick={addExercise}
          >
            +
          </button>

          <label htmlFor="descanso-ejercicios">Descanso entre ejercicios</label>
          <input
            type="text"
            id="descanso-ejercicios"
            name="descanso-ejercicios"
            value={descansoEntreEjercicios}
            onChange={(e) => setDescansoEntreEjercicios(e.target.value)}
          />

          <div className="buttons-group">
            <button type="button" onClick={closeModal}>
              Cancelar
            </button>
            <button type="button" onClick={saveRoutine}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;

import React, { useState, useEffect } from "react";
import { backendUrl } from "../config";
import { useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import "./Modal.css";

export interface Exercise {
  id?: number; // Nuevo campo opcional para el ID del ejercicio
  nombre: string;
  seriesReps: string;
  intensidad: string;
  descansoSeries: number;
  isEditing?: boolean;
}

interface Gym {
  id: number;
  nombre: string;
}

interface Routine {
  nombre: string;
  imagen: string | null;
  descansoEntreEjercicios: string;
  ejercicios: Exercise[];
}

interface ExerciseReq {
  ejercicio_id: number; // Campo requerido para el ID del ejercicio
  seriesxrepeticiones: string;
  intensidad: string;
  descanso_entre_series: number;
}

interface RoutineReq {
  nombre: string;
  imagen_url: string | null;
  descanso_entre_ejercicios: number;
  gimnasio_id: number; // Puede ser un string o número según lo definido
  ejercicios: ExerciseReq[];
}

interface AvailableExercise {
  id: number;
  nombre: string;
}

interface ModalFormProps {
  closeModal: () => void;
  initialData?: Routine; // Prop para cargar los datos de una rutina
}

const ModalForm: React.FC<ModalFormProps> = ({ closeModal, initialData }) => {
  const { id } = useParams<{ id: string }>(); // Obtener nombre del gimnasio de la URL
  const [gimnasioId, setGimnasioId] = useState<number>(0);

  const [nombreRutina, setNombreRutina] = useState<string>(
    initialData?.nombre || ""
  );
  const [imagenRutina, setImagenRutina] = useState<string | null>(
    initialData?.imagen || ""
  );
  const [descansoEntreEjercicios, setDescansoEntreEjercicios] =
    useState<number>(0);
  const [exercises, setExercises] = useState<Exercise[]>(
    initialData?.ejercicios || []
  );
  const [availableExercises, setAvailableExercises] = useState<
    AvailableExercise[]
  >([]); // Estado para ejercicios del backend

  // Obtener ID del gimnasio por nombre
  const fetchGymId = async () => {
    try {
      const response = await fetch(`${backendUrl}/gimnasios`);
      if (response.ok) {
        const gyms: Gym[] = await response.json();
        const gym = gyms.find(
          (g) => g.nombre.toLowerCase() === id?.toLowerCase()
        );
        if (gym) {
          setGimnasioId(gym.id);
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

  // Obtener ejercicios desde el backend
  const fetchExercises = async () => {
    try {
      const response = await fetch(`${backendUrl}/ejercicios`);
      if (response.ok) {
        const data = await response.json();

        // Filtrar solo id y nombre
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filteredExercises = data.map((exercise: any) => ({
          id: exercise.id,
          nombre: exercise.nombre,
        }));

        setAvailableExercises(filteredExercises);
      } else {
        console.error("Error al obtener los ejercicios");
      }
    } catch (error) {
      console.error("Error al hacer fetch de ejercicios:", error);
    }
  };

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
        descansoSeries: 0,
        isEditing: true,
      },
    ]);
  };

  const handleInputChange = (
    index: number,
    field: keyof Exercise,
    value: string | number
  ) => {
    const newExercises = [...exercises];

    // Si el campo es "nombre", buscamos el ejercicio en `availableExercises` para obtener el `id`
    if (field === "nombre") {
      const selectedExercise = availableExercises.find(
        (exercise) => exercise.nombre === value
      );

      if (selectedExercise) {
        newExercises[index] = {
          ...newExercises[index],
          id: selectedExercise.id, // Guardamos también el `id` del ejercicio
          [field]: value,
        };
      }
    } else {
      newExercises[index] = {
        ...newExercises[index],
        [field]: value,
      };
    }

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
    const newRoutine: RoutineReq = {
      nombre: nombreRutina, // Aquí agregamos el nombre de la rutina
      gimnasio_id: gimnasioId, // Utilizar el ID del gimnasio obtenido
      imagen_url: imagenRutina,
      descanso_entre_ejercicios: descansoEntreEjercicios,
      ejercicios: exercises.map((exercise) => ({
        ejercicio_id: exercise.id as number, // Nos aseguramos que el ID está presente
        seriesxrepeticiones: exercise.seriesReps,
        intensidad: exercise.intensidad,
        descanso_entre_series: exercise.descansoSeries,
      })),
    };

    try {
      const response = await fetch(`${backendUrl}/rutinas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoutine),
      });

      if (response.ok) {
        alert("Rutina guardada exitosamente.");
        closeModal();
      } else {
        const errorData = await response.json();
        alert(
          `Error al guardar la rutina: ${errorData.message || "Desconocido"}`
        );
      }
    } catch (error) {
      console.error("Error al guardar la rutina:", error);
      alert("Hubo un problema al guardar la rutina.");
    }
  };

  useEffect(() => {
    fetchExercises(); // Cargar ejercicios al montar el componente
    fetchGymId(); // Obtener el ID del gimnasio al cargar el componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    {availableExercises.map((ejercicio) => (
                      <option key={ejercicio.id} value={ejercicio.nombre}>
                        {ejercicio.nombre}
                      </option>
                    ))}
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
                    Descanso entre series (mins)
                  </label>
                  <input
                    type="number"
                    id={`descanso-series-${index}`}
                    name={`descanso-series-${index}`}
                    value={exercise.descansoSeries}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "descansoSeries",
                        parseInt(e.target.value)
                      )
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

          <label htmlFor="descanso-ejercicios">
            Descanso entre ejercicios (mins)
          </label>
          <input
            type="number"
            id="descanso-ejercicios"
            name="descanso-ejercicios"
            value={descansoEntreEjercicios}
            onChange={(e) =>
              setDescansoEntreEjercicios(parseInt(e.target.value))
            }
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

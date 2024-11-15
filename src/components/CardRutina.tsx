import "./CardRutina.css";
import { Pencil, X } from "lucide-react";

interface CardRutinaProps {
  id: number;
  img: string;
  title: string;
  exercises: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CardRutina = ({
  id,
  img,
  title,
  exercises,
  onEdit,
  onDelete,
}: CardRutinaProps) => {
  const deleteRoutine = async () => {
    try {
      const response = await fetch(`http://localhost:3000/rutinas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Rutina eliminada exitosamente");
        onDelete(); // Llama a onDelete para actualizar la vista si es necesario
      } else {
        console.error("Error al eliminar la rutina");
      }
    } catch (error) {
      console.error("Error de red al intentar eliminar la rutina:", error);
    }
  };

  return (
    <section className="card">
      <div className="card-content">
        <img src={img} className="card-image" alt={title} />
        <strong className="card-title">{title}</strong>
        <div className="exercises-and-buttons">
          <span>{exercises} ejercicios</span>
          <div className="card-buttons">
            <button className="card-edit" onClick={onEdit}>
              <Pencil size={20} />
            </button>
            <button className="card-view" onClick={deleteRoutine}>
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardRutina;

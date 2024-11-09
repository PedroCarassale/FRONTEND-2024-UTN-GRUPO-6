import "./CardRutina.css";
import { Pencil, X } from "lucide-react";

interface CardRutinaProps {
  img: string;
  title: string;
  exercises: string;
  onEdit: () => void;
}
const deleteRoutine = () => {
  console.log("deleting...");
};

const CardRutina = ({ img, title, exercises, onEdit }: CardRutinaProps) => {
  return (
    <section className="card">
      <div className="card-content">
        <img src={img} className="card-image" />
        <strong className="card-title">{title}</strong>
        <div className="exercises-and-buttons">
          <span>{exercises} ejercicios</span>
          <div className="card-buttons">
            <button className="card-edit" onClick={onEdit}>
              <Pencil size={20} /> {/* Ajusta el tamaño según sea necesario */}
            </button>
            <button className="card-view" onClick={deleteRoutine}>
              <X size={20} /> {/* Ajusta el tamaño según sea necesario */}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardRutina;

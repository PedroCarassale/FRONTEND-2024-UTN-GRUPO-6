import "./CardRutina.css";
import { Pencil, Eye } from "lucide-react";

interface CardRutinaProps {
  img: string;
  title: string;
  exercises: string;
}

const CardRutina = ({ img, title, exercises }: CardRutinaProps) => {
  return (
    <section className="card">
      <div className="card-content">
        <img src={img} className="card-image" />
        <strong className="card-title">{title}</strong>
        <div className="exercises-and-buttons">
          <span>{exercises} ejercicios</span>
          <div className="card-buttons">
            <button className="card-view">
              <Eye size={20} /> {/* Ajusta el tamaño según sea necesario */}
            </button>
            <button className="card-edit">
              <Pencil size={20} /> {/* Ajusta el tamaño según sea necesario */}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardRutina;

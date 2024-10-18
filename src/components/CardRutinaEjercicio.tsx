import "./CardRutinaEjercicio.css";

interface CardRutinaEjercicioProps {
  img: string;
  title: string;
}

const CardRutinaEjercicio = ({ img, title }: CardRutinaEjercicioProps) => {
  return (
    <section className="card">
      <div className="card-content">
        <img src={img} className="card-image" />
        <strong className="card-title">{title}</strong>
      </div>
    </section>
  );
};

export default CardRutinaEjercicio;

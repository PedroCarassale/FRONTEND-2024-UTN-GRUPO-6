import "./CardTag.css";

interface CardTagProps {
  color: string;
  name: string;
}

const CardTag = ({ color, name }: CardTagProps) => {
  return (
    <section className="cardtag">
      <div className="cardtag-icon" style={{ background: color }}></div>
      <span className="cardtag-name" style={{ color: color }}>
        {name}
      </span>
    </section>
  );
};

export default CardTag;

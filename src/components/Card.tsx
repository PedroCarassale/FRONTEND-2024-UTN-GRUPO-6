import { Link } from "react-router-dom";
import "./Card.css";
import CardTag from "./CardTag";

interface CardProps {
  img: string;
  title: string;
  description: string;
  tags: string[][];
}

const getTags = (tags: string[][]) => {
  return tags.map((tags, index) => (
    <CardTag key={index} color={tags[0]} name={tags[1]} />
  ));
};

const Card = ({ img, title, description, tags }: CardProps) => {
  return (
    <Link to={`${title}`}>
      <section className="card">
        <div className="card-content">
          <img src={img} className="card-image" />
          <strong className="card-title">{title}</strong>
          <p className="card-description">{description}</p>
          <div className="card-tags">{getTags(tags)}</div>
        </div>
      </section>
    </Link>
  );
};

export default Card;

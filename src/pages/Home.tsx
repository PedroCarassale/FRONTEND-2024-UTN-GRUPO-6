import "./Home.css";
import Card from "../components/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

function getCards(count: number) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {Array.from({ length: count }, (_, index) => (
        <Card
          key={index}
          img="src/assets/gym.jpg"
          title="Gym"
          description="Please add your content here. Keep it short and simple. And smile :)"
          tags={[
            ["#f00", "Title"],
            ["#f00", "Title"],
          ]}
        ></Card>
      ))}
    </div>
  );
}

function Home() {
  return (
    <section className="app">
      {/* Mis Gimnasios */}
      <h2 className="mis-gimnasios">Mis Gimnasios</h2>

      <Carousel>
        <Carousel.Item interval={1000}>{getCards(3)}</Carousel.Item>
        <Carousel.Item interval={1000}>{getCards(3)}</Carousel.Item>
        <Carousel.Item interval={1000}>{getCards(3)}</Carousel.Item>
      </Carousel>

      {/* Explorar Gimnasios */}
      <h2 className="mis-gimnasios">Explorar Gimnasios</h2>
      <div className="app-explorar-gimnasios-cards">{getCards(10)}</div>
    </section>
  );
}

export default Home;

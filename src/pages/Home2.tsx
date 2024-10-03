import "./Home.css";
import Card from "../components/Card";

function getCards(count: number) {
  return Array.from({ length: count }, (_) => (
    <Card
      img="src/assets/gym.jpg"
      title="Gym"
      description="Please add your content here. Keep it short and simple. And smile :)"
      tags={[
        ["#f00", "Title"],
        ["#f00", "Title"],
      ]}
    ></Card>
  ));
}
function Home2() {
  return (
    <section className="app">
      {/* Explorar Gimnasios */}
      <h2 className="mis-gimnasios">Explorar Gimnasios</h2>
      <div className="app-explorar-gimnasios-cards">{getCards(10)}</div>
    </section>
  );
}

export default Home2;

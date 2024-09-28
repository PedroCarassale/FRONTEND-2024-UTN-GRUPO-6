import "./App.css";
import Card from "./components/Card";

function getCards(count: number) {
  return Array.from({ length: count }, (_, index) => (
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

function App() {
  return (
    <section className="app">
      {/* Mis Gimnasios */}
      <h2 className="mis-gimnasios">Mis Gimnasios</h2>
      <div className="app-explorar-gimnasios-cards">{getCards(3)}</div>

      {/* Explorar Gimnasios */}
      <h2 className="mis-gimnasios">Explorar Gimnasios</h2>
      <div className="app-explorar-gimnasios-cards">{getCards(10)}</div>
    </section>
  );
}

export default App;

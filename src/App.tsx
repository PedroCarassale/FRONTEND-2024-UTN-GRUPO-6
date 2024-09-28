import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <section className="app">
      <h2 className="mis-gimnasios">Mis Gimnasios</h2>
      <div className="app-cards">
        <Card
          img="src/assets/gym.jpg"
          title="Gym"
          description="Please add your content here. Keep it short and simple. And smile :)"
          tags={[
            ["#f00", "Title"],
            ["#f00", "Title"],
          ]}
        ></Card>
        <Card
          img="src/assets/gym.jpg"
          title="Gym"
          description="Please add your content here. Keep it short and simple. And smile :)"
          tags={[
            ["#f00", "Title"],
            ["#f00", "Title"],
          ]}
        ></Card>
        <Card
          img="src/assets/gym.jpg"
          title="Gym"
          description="Please add your content here. Keep it short and simple. And smile :)"
          tags={[
            ["#f00", "Title"],
            ["#f00", "Title"],
          ]}
        ></Card>
      </div>
    </section>
  );
}

export default App;

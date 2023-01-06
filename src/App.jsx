import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [list, setList] = useState([]);
  const [next, setNext] = useState("");

  useEffect(() => {
    axios("https://pokeapi.co/api/v2/pokemon").then((res) => {
      setList(res.data.results);
      setNext(res.data.next);
    });
  }, []);

  async function handleNext() {
    await axios(next).then((res) => {
      setNext(res.data.next);
      setList([...list, ...res.data.results]);
    });
  }

  return (
    <>
      <h3>pokémon api</h3>
      <h1>Pokedex</h1>
      {list.map((item, index) => {
        return <ListPokemon data={item} key={index} />;
      })}
      <button onClick={handleNext}>Next 20 pokémons</button>
    </>
  );
}

function ListPokemon({ data }) {
  const [list, setList] = useState(null);

  axios(data.url).then((res) => setList(res.data));
  //console.log(data);

  if (list === null) {
    return <div>-</div>;
  }

  return (
    <div>
      <img src={list.sprites.front_default} alt="" style={{ width: 30 }} />
      <span>
        {data.name} - EXP: {list.base_experience}
      </span>
    </div>
  );
}

export default App;

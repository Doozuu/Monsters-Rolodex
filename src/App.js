import { useState, useEffect } from "react";
import SearchBox from "./components/search-box";
import Card from "./components/card";
import "./App.css";

function App() {
  const [monsters, setMonsters] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filterMonsters, setFilterMonsters] = useState(monsters);

  // Data fetch
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  // search event
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  // search filtering
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />
      <div className="card-list">
        {filterMonsters.map((monster) => {
          return <Card key={monster.id} monster={monster} />;
        })}
      </div>
    </div>
  );
}

export default App;

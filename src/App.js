import React from "react";
import ky from "ky";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import PokemonPageList from "./PokemonPageList";

class App extends React.Component {
  state = { pokemonList: [], pokemonDetails: [], page: 0 };

  componentDidMount() {
    this.loadPokemons();
  }

  loadPokemons = () => {
    (async () => {
      const sleep = m => new Promise(r => setTimeout(r, m));
      await sleep(1000);
      const pokemonList = await ky
        .get(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${this.state.page * 10}`)
        .json();
      this.setState({ pokemonList: pokemonList.results });
      console.log(pokemonList.results);
    })();
  };

  loadDetails = id => {
    (async () => {
      this.setState({ pokemonDetails: [] }); //reset
      console.log("selected id = " + id);
      const sleep = m => new Promise(r => setTimeout(r, m));
      await sleep(1000);
      const pokemonDetails = await ky.get(`https://pokeapi.co/api/v2/pokemon/${id}`).json();
      this.setState({ pokemonDetails: pokemonDetails.abilities });
      this.setState({ message: "" }); //reset
      console.log(pokemonDetails.abilities);
    })();
  };

  render() {
    return (
      <div className="some-page-wrapper">
        <div className="row">
          <div className="column">
            My Pokemon List
            <PokemonPageList
              pageId={this.state.pageId}
              pokemonList={this.state.pokemonList}
              handleClick={this.loadPokemons}
            />
            <button
              onClick={() => {
                this.setState({ page: this.state.page + 1 });
                this.loadPokemons();
              }}
            >
              Next >>
            </button>
            <Router>
              <Link to={"/page/" + this.state.page}>Next ></Link>
              {/* <Route path="/page/:pageId" component={} /> */}
            </Router>
          </div>
          <div className="column">
            Abilities for {this.state.pokemonName}
            <br />
            <ul>
              {this.state.message}
              {this.state.pokemonDetails.map((a, index) => (
                <li key={index}>{a.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

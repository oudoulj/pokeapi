import React, { useState, useEffect } from "react";
import ky from "ky";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import PokemonPageList from "./PokemonPageList";

const App = () => {
  //state = { pokemonList: [], pokemonDetails: [], page: 0 };
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [page, setPage] = useState(1);

  // componentDidMount() {
  //   this.loadPokemons();
  // }

  useEffect(() => {
    loadPokemons();
    // console.log(pokemonList);
  }, []);

  const loadPokemons = pageToLoad => {
    // (async () => {
    // const sleep = m => new Promise(r => setTimeout(r, m));
    // await sleep(1000);
    ky.get(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${(pageToLoad - 1) * 10}`)
      .json()
      .then(pokemonData => {
        setPokemonList(pokemonData.results);
      });
    //this.setState({ pokemonList: pokemonList.results });
    // setPokemonList(pokemonList.results);
    // console.log(pokemonList.results);
    // })();
  };

  const loadDetails = id => {
    // (async () => {
    // this.setState({ pokemonDetails: [] }); //reset

    console.log("selected id = " + id);
    // const sleep = m => new Promise(r => setTimeout(r, m));
    // await sleep(1000);
    ky.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .json()
      .then(pokeDetails => setPokemonDetails(pokeDetails.abilities));
    // this.setState({ pokemonDetails: pokemonDetails.abilities });
    // this.setState({ message: "" }); //reset
    // setPokemonList(pokemonDetails.abilities);

    // console.log(pokemonDetails.abilities);
    // })();
  };

  return (
    <div className="some-page-wrapper">
      <div className="row">
        <div className="column">
          My Pokemon List
          <PokemonPageList
            //pageId={this.state.pageId}
            pokemonList={pokemonList}
            handleClick={loadDetails}
          />
          {page > 1 ? (
            <button
              onClick={() => {
                //this.setState({ page: this.state.page + 1 });
                const nextPage = page - 1;
                setPage(nextPage); //not reliable, maybe useless
                console.log("nextPage", nextPage);
                loadPokemons(nextPage);
              }}
            >
              {"<< Prev"}
            </button>
          ) : null}
          <button
            onClick={() => {
              //this.setState({ page: this.state.page + 1 });
              const nextPage = page + 1;
              setPage(nextPage); //not reliable, maybe useless
              console.log("nextPage", nextPage);
              loadPokemons(nextPage);
            }}
          >
            Next >>
          </button>
          <Router>
            <Link to={"/page/" + page}>Next ></Link>
            {/* <Route path="/page/:pageId" component={} /> */}
          </Router>
        </div>
        <div className="column">
          Abilities for {/* {pokemonName} */}
          <br />
          <ul>
            {/* {message} */}
            {pokemonDetails.map((a, index) => (
              <li key={index}>{a.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;

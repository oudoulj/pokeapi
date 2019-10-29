import React, { useState, useEffect } from "react";
import ky from "ky";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import PokemonPageList from "./PokemonPageList";

const App = () => {
  //state = { pokemonList: [], pokemonDetails: [], page: 0 };
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonPhoto, setPokemonPhoto] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadPokemons();
    // console.log(pokemonList);
  }, []);

  const loadPokemons = pageToLoad => {
    ky.get(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${(pageToLoad - 1) * 10}`)
      .json()
      .then(pokemonData => {
        setPokemonList(pokemonData.results);
      });
  };

  const loadDetails = name => {
    console.log("selected name = " + name);
    setPokemonName(name);

    ky.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .json()
      .then(pokeDetails => {
        setPokemonDetails(pokeDetails.abilities);
        setPokemonPhoto(pokeDetails.sprites["front_default"]);
        console.log("photo", pokeDetails.sprites["front_default"]);
      });
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
            <Route
              path="/page/:pageId"
              render={routeParams => {
                console.log("routeParams", routeParams);
                return (
                  <PokemonPageList
                    //pageId={this.state.pageId}
                    pokemonList={pokemonList}
                    handleClick={loadDetails}
                  />
                );
              }}
            ></Route>
          </Router>
        </div>
        <div className="column">
          Abilities for {pokemonName}
          <div>
            {pokemonPhoto !== null ? <img src={pokemonPhoto} alt="poke" /> : null}
            <ul>
              {/* {message} */}
              {pokemonDetails.map((a, index) => (
                <li key={index}>{a.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

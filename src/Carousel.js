import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ky from "ky";
// import "./slick.css";
// import "./slick-theme.css";

const Carousel = () => {
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemonPhoto, setPokemonPhoto] = useState(null);
  const [pokemonPhotos, setPokemonPhotos] = useState([]);
  const [counter, setCounter] = useState(1);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    lazyLoad: true,
    centerMode: true,
    adaptiveHeight: true,
    fade: true,
    arrows: true,
    autoplaySpeed: 5000
    // className: "slides"
  };

  console.log("pokemonList render", pokemonList);
  console.log("pokemonPhotos toutes urls", pokemonPhotos);

  useEffect(() => {
    console.log("logging from the useEffect");
    // async function loadPokemons() {
    //   //   const sleep = m => new Promise(r => setTimeout(r, m));
    //   //   await sleep(1000);
    //   const response = ky.get(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0`);
    //   const data = await response.json();
    //   const pokemonData = data.results;
    //   console.log("in loadPokemons", pokemonData);
    //   setPokemonList(pokemonData);
    //   console.log("pokemonList in loadPokemons", pokemonList);
    // }
    loadPokemons();
    console.log("pokemonList in useEffect after calling loadPokemons", pokemonList);
  }, [counter]);

  const loadPokemons = async pageToLoad => {
    // (async () => {
    //   const sleep = m => new Promise(r => setTimeout(r, m));
    //   await sleep(1000);
    const pokemonPhotosUrls = [];
    ky.get(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0`)
      .json()
      .then(pokemonData => {
        console.log("in loadPokemons", pokemonData.results);
        // setPokemonList(pokemonData.results);

        // pokemonData.results.forEach(poke => {
        //   let currentPhotoUrl = GetPhotoByName(poke.name);
        //   console.log("photo url returned", currentPhotoUrl);
        //   pokemonPhotosUrls.push(currentPhotoUrl);
        //   console.log("pokemonPhotosUrls", pokemonPhotosUrls);
        //   //   setPokemonPhotos([...pokemonPhotos, currentPhotoUrl]);
        // });
        // setPokemonPhotos(pokemonPhotosUrls);
        return Promise.all(pokemonData.results.map(poke => GetPhotoByName(poke.name)));
      })
      .then(imgs => {
        console.log(imgs);
        setPokemonPhotos(imgs);
      });
    // })();
  };

  const GetPhotoByName = async name => {
    console.log("getting photo for", name);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    const pokemonData = data;
    console.log("in GetPhotoByName, url = ", pokemonData.sprites["front_default"]);
    return pokemonData.sprites["front_default"];
  };

  async function loadDetails(name) {
    console.log("selected name = " + name);
    // setPokemonName(name);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    const pokemonData = data;

    setPokemonPhoto(pokemonData.sprites["front_default"]);
    // photoUrl = pokeDetails.sprites["front_default"];
    // console.log("photo", pokeDetails.sprites["front_default"]);
  }

  return (
    <div className="container">
      {/* <button onClick={() => setCounter(counter + 1)}>{counter}</button> */}
      {/* {pokemonPhotos.length} */}
      <Slider {...settings}>
        {pokemonPhotos !== null
          ? pokemonPhotos.map((pokPhotoUrl, index) => (
              <div key={index}>
                <img src={pokPhotoUrl} alt="front" />
              </div>
            ))
          : null}
        {/* <div>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="kit" />
        </div>
        <div>
          <img src="http://placekitten.com/g/400/200" alt="kit" />
        </div>
        <div>
          <img src="http://placekitten.com/g/100/200" alt="kit" />
        </div>
        <div>
          <img src="http://placekitten.com/g/300/400" alt="kit" />
        </div> */}
      </Slider>
    </div>
  );
};

export default Carousel;

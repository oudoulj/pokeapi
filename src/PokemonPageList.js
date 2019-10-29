import React, { useState } from "react";

const PokemonPageList = ({ pokemonList, pageId, handleClick }) => {
  //   state = {
  //     pokemonName: "",
  //     message: ""
  //   };

  const [pokemonName, setPokemonName] = useState("");
  const [message, setMessage] = useState("");

  //   const { pokemonList, pageId, handleClick } = this.props;
  return (
    <div style={{ background: "lightblue" }}>
      <ul>
        {pokemonList.length === 0
          ? "Loading..."
          : pokemonList.map((p, index) => (
              <li
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log("onClick on li element", index);
                  handleClick(pageId);
                }}
                //   onClick={() => {
                //     this.setState({ message: "chargement des détails..." });
                //     this.setState({ pokemonName: p.name });
                //     this.loadDetails(
                //       p.url
                //         .slice(0, -1)
                //         .split("/")
                //         .pop()
                //     );
                //   }}
              >
                {p.name}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default PokemonPageList;

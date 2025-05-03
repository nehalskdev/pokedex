import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className={`pokemon-card ${pokemon.types[0].type.name}`}>
      <img
        src={
          pokemon.sprites.other["official-artwork"].front_default ||
          pokemon.sprites.front_default
        }
        alt={pokemon.name}
        className="pokemon-image"
      />
      <div className="pokemon-info">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <p className="pokemon-id">#{pokemon.id.toString().padStart(3, "0")}</p>
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <span key={index} className={`type-badge ${type.type.name}`}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

import React from "react";
import "./TypeFilter.css";

const TypeFilter = ({ selectedType, setSelectedType }) => {
  const types = [
    "all",
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "steel",
    "fairy",
  ];

  return (
    <div className="type-filter">
      {types.map((type) => (
        <button
          key={type}
          className={`${type} ${selectedType === type ? "active" : ""}`}
          onClick={() => setSelectedType(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TypeFilter;

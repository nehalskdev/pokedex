import React, { useState, useEffect } from "react";
import { fetchAllPokemonDetails } from "./services/api";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import TypeFilter from "./components/TypeFilter";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllPokemonDetails();
        setPokemonData(data);
        setFilteredPokemon(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = pokemonData;

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
    }

    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonData]);

  if (loading) return <Loading />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokédex</h1>
      </header>
      <div className="controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>
      <div className="pokemon-container">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <div className="no-results">
            <p>No Pokémon found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";

// ATTENTION A RENDRE CE MODULE PLUS GENERIQUE...
function Search({ onSearchSelect }) {

  // champ de recherche.
  const [query, setQuery] = useState("");
  // suggestions suite à la validation de la recherche => simulation du fetch via Nominatim pour le moment (ATTENTION A RESTER GENERIQUE POUR LE SEARCH ET NOMINATIM...)
  const [suggestions, setSuggestions] = useState([
    { name: "Lieusaint 1", lat: 0.01, lon: 0.01 },
    { name: "Lieusaint 2", lat: 0.02, lon: 0.02 },
    { name: "Lieusaint 3", lat: 0.03, lon: 0.03 },
  ]);

  // provisoire, uniquement pour simulation pour le moment.
  const [showSuggestions, setShowSuggestions] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    // simulation de la recherche via Nominatim (le showSuggestions également)
    alert(`En cours de recherche de : ${query}`);
    setShowSuggestions(true);
  }

  function handleSuggestionClick(suggestion) {
    // remonte le résultat de la recherche au MAIN.
    onSearchSelect(suggestion);
    setQuery("");
    setShowSuggestions(false);
  }

  const renderSuggestionList = () => {
    if (!showSuggestions) return null;
    if (suggestions.length === 0) return null;

    return (
      <ul>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.name}
            onClick={() => handleSuggestionClick(suggestion)}
            style={{ cursor: "pointer" }}
          >
            <p>
              <strong>Nom :</strong> {suggestion.name} |{" "}
              <strong>Lat :</strong> {suggestion.lat} |{" "}
              <strong>Lon :</strong> {suggestion.lon}
            </p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h2>SEARCH(recherche de ville)</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Saisissez une ville"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Rechercher</button>
      </form>
      <h3>Liste des suggestions : </h3>
      {renderSuggestionList()}
    </>
  );
}
export default Search;
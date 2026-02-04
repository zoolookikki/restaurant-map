import { useState } from "react";
import { searchCity } from "../services/nominatim";

// AMELIORATION POSSIBLE : rendre ce module plus générique (ne doit pas savoir qu'il cherche des villes et que cela soit fait avec Nominatim(searchCity))
function Search({ onSearchSelect }) {

  // champ de recherche.
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // async car on attend le résulat de searchCity.
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const results = await searchCity(query);

      if (results.length === 0) {
        alert("Aucune correspondance trouvée pour cette recherche.");
      }
      setSuggestions(results);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  function handleSuggestionClick(suggestion) {
    // remonte le résultat de la recherche au MAIN.
    onSearchSelect(suggestion);
    setSuggestions([]);
  }

  const renderSuggestionList = () => {
    return (
      <ul>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
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

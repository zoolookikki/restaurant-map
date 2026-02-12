import { useState } from "react";
import { searchCity } from "../services/searchCityService.js";
import { Button } from "../ui/Button.jsx";

// AMELIORATION POSSIBLE : rendre ce module plus générique (ne doit pas savoir qu'il cherche des villes et que cela soit fait avec Nominatim(searchCity))
function Search({ onSearchSelect, onError }) {

  // champ de recherche.
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // async car on attend le résulat de searchCity.
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const results = await searchCity(query);

      if (results.length === 0) {
        onError("Aucune correspondance trouvée pour cette recherche.");
      }
      setSuggestions(results);
    } catch (error) {
      console.error(error);
      onError(error.message);
    }
  }

  function handleSuggestionClick(suggestion) {
    // remonte le résultat de la recherche au MAIN.
    onSearchSelect(suggestion);
    setSuggestions([]);
  }
  const renderSuggestionList = () => {
    return (
      // space-y-2" : espace entre les li.
      <ul className="px-4 pb-4 space-y-2">
        {suggestions.map((suggestion) => (
          // cursor-pointer : affiche la main au survol pour indiquer que l’élément est cliquable
          <li  className="cursor-pointer rounded-lg border border-black/30 bg-white px-3 py-2 text-sm hover:bg-gray-200 transition"
            key={suggestion.id}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.name}
          </li>
        ))}
      </ul>
    );
  };

  {/* bg-white/70 : fond blanc avec 70% d’opacité pour donner un effet verre */}
  return (
     <div className="rounded-2xl bg-white/70 shadow-md">
        {/* Titre comme la maquette */}
        <div className="px-4 pt-1 text-sm font-semibold">
          Rechercher un restaurant
        </div>

        {/*
        flex utilisé pour aligner l’input et le bouton loupe
        gap-2 espace entre le bouton et la loupe
        */}
        <form className="flex gap-2 px-4 pb-4 pt-2"
          onSubmit={handleSubmit}
        >
          <input className="w-full border border-black/30 bg-white px-3 py-1 rounded-lg"
            placeholder="Saisissez une ville"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            autoFocus
          />
          <Button type="submit" icon="search" addClassName="h-10 w-10"/>
        </form>
        {renderSuggestionList()}
      </div>
  );
}
export default Search;


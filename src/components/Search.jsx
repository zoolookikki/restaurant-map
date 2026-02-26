import { useState, useMemo } from "react";
import { searchCity } from "../services/searchCityService.js";
import { Button } from "../ui/Button.jsx";

/*
Composant Search permettant de rechercher une ville et d'afficher les suggestions :
  - l'utilisateur saisit une ville
  - appel API Nominatim
  - affichage des suggestions
  - sélection d'une ville => remontée au parent
Props :
  - function onSearchSelect : appelée quand une ville est choisie
  - function onError : appelée en cas d'erreur
  - boolean isDisabled : désactive le formulaire
Amélioration possible : rendre ce module plus générique (ne doit pas savoir qu'il cherche des villes et que cela soit fait avec Nominatim(searchCity))
*/
function Search({ onSearchSelect, onError, isDisabled = false }) {
  //console.log("Render Search");
  console.count("Render Search");

  // champ de recherche.
  const [query, setQuery] = useState("");
  // liste de suggestions.
  const [suggestions, setSuggestions] = useState([]);

  // POC API lente : pour griser le formulaire et le bouton pendant l'appel API (si traitement long).
  const [isLoading, setIsLoading] = useState(false);

  // simplification d'écriture.
  const trimmedQuery = query.trim();
  const isValid = trimmedQuery.length > 0;

  /*
  Gestion du submit du formulaire.
  On empêche le comportement par défaut du navigateur, puis on appelle l'API Nominatim pour récupérer les suggestions.
  async car on attend le résulat de searchCity.
  */
  async function handleSubmit(e) {
    e.preventDefault();

    // par protection car impossible (bouton de recherche disabled)
    if (!isValid) {
      onError("La saisie de la ville est obligatoire");
      return;
    }

    setSuggestions([]);
    // POC API lente.
    setIsLoading(true);
    try {
      const results = await searchCity(trimmedQuery);

      if (results.length === 0) {
        onError("Aucune correspondance trouvée pour cette recherche.");
      }
      setSuggestions(results);
    } catch (error) {
      //console.error(error);
      onError(error.message);
    // POC API lente.
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuggestionClick(suggestion) {
    // remonte le résultat de la recherche au MAIN.
    onSearchSelect(suggestion);
    setSuggestions([]);
  }

  // fonction factorisée pour le POC de useMemo
  const buildSuggestionsList = () => {
    console.count("buildSuggestionsList");
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

  // POC useMemo
  // const suggestionsList = buildSuggestionsList();
  /*
  Optimisation : useMemo évite de reconstruire la liste à chaque re-render si les suggestions n'ont pas changé.
  Utile si la liste devient importante.
  */
  const suggestionsList = useMemo(() => {
    return buildSuggestionsList();
  }, [suggestions]);

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
            autoFocus
            disabled={isLoading || isDisabled}
          />
          <Button type="submit" icon="search" addClassName="h-10 w-10" disabled={!isValid || isLoading || isDisabled}/>
        </form>
        {suggestionsList}
      </div>
  );
}
export default Search;

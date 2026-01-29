import Map from "../components/Map";
import Search from "../components/Search";
import Overlay from "../components/Overlay";
import { useState } from "react";

export default function MainPage() {

  // Ville choisie.
  const [currentCity, setCurrentCity] = useState(null);
  // Liste des points d'intérêt (Mcdo dans notre projet) => simulation du fetch via Nominatim pour le moment.
  const [poiList, setPoiList] = useState([
    { id: 1, name: "Mcdo Lieusaint", lat: 11.11, lon: 12.12, adress: "2 avenue Leclerc", description: "Il est beau"},
    { id: 2, name: "Mcdo Combs", lat: 22.22, lon: 23.23, adress: "36 rue de la république", description: "Pas très bon"},
  ]);
  // point d'intérêt choisi (le Mcdo choisi suite au clic sur le marqueur).
  const [currentPOI, setCurrentPOI] = useState(null);

  // on a cliqué sur "Continuer" dans l'overlay.
  function handleContinue() {
    if (currentPOI) {
      alert(`On continue, le choix est : ${currentPOI.name}`);
      // on reset tout.
      setCurrentCity(null);
      setCurrentPOI(null);
    }
  }

  return (
    <main>
      <h1>Hello restaurant-map</h1>

      {/* recherche de la ville => choix de la ville */}
      <Search onSearchSelect={setCurrentCity} />

      {/* reçoit la ville choisie + liste des POI => choix du point d'intérêt */}
      <Map
        currentCity={currentCity}
        poiList={poiList}
        onPOISelect={setCurrentPOI}
      />

      {/* affiche le détail du POI sélectionné */}
      <Overlay
        currentPOI={currentPOI}
        onContinue={handleContinue}
      />
    </main>
  );
}

import Map from "../components/Map";
import Search from "../components/Search";
import Overlay from "../components/Overlay";
import { useState } from "react";
import { getNearbyPOIs } from "../services/nearbyPoiService";

export default function MainPage() {

  // Ville choisie.
  const [currentCity, setCurrentCity] = useState(null);
  // Liste des points d'intérêt.
  const [poiList, setPoiList] = useState([]);
  // point d'intérêt choisi (le Mcdo choisi suite au clic sur le marqueur).
  const [currentPOI, setCurrentPOI] = useState(null);

  async function handleSelect(city) {
    setCurrentCity(city);

    const pois = await getNearbyPOIs(city);
    setPoiList(pois);
  }

  // on a cliqué sur "Continuer" dans l'overlay.
  function handleContinue() {
    if (currentPOI) {
      alert(`On continue, le choix est : ${currentPOI.name}`);
    } else {
      alert('On continue sans choix');
    }
  }

  return (
    <main>
      <h1>Hello restaurant-map</h1>

      {/*
      recherche de la ville => choix de la ville
      */}
      <Search
        onSearchSelect={handleSelect}
      />

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

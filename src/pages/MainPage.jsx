import Map from "../components/Map";
import Search from "../components/Search";
import Overlay from "../components/Overlay";
import { useState, useEffect } from "react";
import { getNearbyPOIs } from "../services/nearbyPoiService.js";

/*
 MODIF TEST CONTEXT
 pour accéder au contexte global
*/
import { useApp } from "../context/AppContext"

export default function MainPage() {

  const ERROR_TIMEOUT_SECONDE = 4;

  /*
  MODIF TEST CONTEXT
  avant l'état était local à MainPage.
  maintenant on récupère cet état depuis le contexte global.
  */
  //const [currentCity, setCurrentCity] = useState(null);
  const { currentCity, setCurrentCity } = useApp();

  // Liste des points d'intérêt.
  const [poiList, setPoiList] = useState([]);
  // point d'intérêt choisi (le Mcdo choisi suite au clic sur le marqueur).
  const [currentPOI, setCurrentPOI] = useState(null);

  // pour l'affichage du message d'erreur.
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    if (!errorMessage) return;
    const t = setTimeout(() => setErrorMessage(null), 1000*ERROR_TIMEOUT_SECONDE);
    return () => clearTimeout(t);
  }, [errorMessage]);

  async function handleSelect(city) {
    // reset POI uniquement si la ville a changé
    if (currentCity?.id !== city.id) {
      setPoiList([]);
      setCurrentPOI(null);
    }    
    // mise à jour après le test précédent, c'est plus clair.
    setCurrentCity(city);

    try {
      const pois = await getNearbyPOIs(city);

      if (pois.length === 0) {
        setErrorMessage("Aucun Macdo trouvé.");
      }
      setPoiList(pois);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  }

  // on a cliqué sur "Continuer" dans l'overlay.
  function handleContinue() {
    // cas normalement impossbible (par protection)
    if (!currentPOI) {
      setErrorMessage("Choix non effectué.");
      return;
    }
    // simulation de la suite avec alert pour distinguer le cas.
    alert(`On continue, le choix est : ${currentPOI.name}`);
  }

  /*
  h-screen : plein écran en hauteur
  w-full : plein écran en largeur
  */
  return (
    <main className="h-screen w-full">

      {/* ---------- SEARCH BAR ---------- */}
      {/* z-25 pour que le search passe au-dessus de la carte (z-index de 10) */}
      <div className="fixed top-2 left-9 right-0 z-25 px-4">
        {/*
        mx-auto : margin automatique pour centrage
        max-w-lg : responsive : boite plus grande
        */}
        <div className="mx-auto w-full max-w-lg">
          <Search
            onSearchSelect={handleSelect}
            onError={setErrorMessage}
          />
        </div>
      </div>

      {/* ---------- MAP ---------- */}
      {/*
      relative pour que le z-index fonctionne et pour que les 2 z-50 passe dessus
      reçoit la ville choisie + liste des POI => choix du point d'intérêt
      */}
      <div className="relative z-10">
        <Map
          /*
          MODIF TEST CONTEXT
          avant currentCity était passé en prop à Map.
          */
          //currentCity={currentCity}
          poiList={poiList}
          onPOISelect={setCurrentPOI}
        />

        {/* ---------- ERROR MESSAGE ---------- */}
        {/*
        absolute (par rapport à la map) top-1/2 left-1/2 (le coin en haut à gauche de la boîte est au centre) -translate-x-1/2 -translate-y-1/2 (on recentre la boite)
        z-9999 : pour être sur que le message passse au dessus de leaflet.
        */}
        {errorMessage && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 max-w-xl z-9999">
            <div className="w-full rounded-2xl bg-red-100 border border-red-300 text-red-700 px-4 py-3 text-center">{errorMessage}</div>
          </div>
        )}

      </div>

      {/* ---------- OVERLAY ---------- */}
      {/*
      affiche le détail du POI sélectionné
      z-25 pour que l'overlay passe au-dessus de la carte (z-index de 10)
      */}
      <div className="fixed bottom-0 left-0 right-0 z-25">
          <Overlay
            currentPOI={currentPOI}
            onContinue={handleContinue}
          />
      </div>

    </main>
  );
}

/*
  MapContainer : pour créer la carte LeafLet.
  TileLayer : pour afficher le fond de la carte avec OpenStreetMap.
  Marker : pour ajouter un marqueur sur la carte.
  Popup : pour afficher une bulle d'information lors du clic sur le marqueur.
*/
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import { Button } from "../ui/Button.jsx";


/*
 MODIF TEST CONTEXT
 pour accéder au contexte global
*/
import { useApp } from "../context/AppContext"

/*
MODIF TEST CONTEXT
avant currentCity était passé en prop par MainPage.
*/
//function Map({ currentCity, poiList, onPOISelect }) {
function Map({ poiList, onPOISelect }) {

  const DEFAULT_CENTER = [48.8566, 2.3522]; // Paris
  const DEFAULT_ZOOM = 13; // 6 = pays, 12 = ville, 15 = quartier
  const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  /*
  MODIF TEST CONTEXT
  avant l'état était passé en prop.
  maintenant on récupère cet état depuis le contexte global.
  */
  const { currentCity } = useApp();
  //console.log("Map render - currentCity:", currentCity);

  /*
  Leaflet attend des chiffres pour lat et lon.
  On centre sur la ville choisie sinon la ville par défaut.
  */
  const center = currentCity ? [currentCity.lat, currentCity.lon] : DEFAULT_CENTER;

  function CenterMarker({ center }) {
    // décalage sinon le point est sur le nom de la ville.
    const centerOffset = [center[0] + 0.002, center[1]];

    return (
      <>
        <CircleMarker center={centerOffset} radius={6} pathOptions={{ color: "#ff3b3b", fillColor: "#ff3b3b", fillOpacity: 1 }} />
        <CircleMarker center={centerOffset} radius={12} pathOptions={{ color: "#ff3b3b", opacity: 0.3, fillOpacity: 0 }} />
      </>
    );
  }


  function Markers({ poiList, onPOISelect }) {
    return (
      <>
        {/* Marqueur du centre ville */}
        <CenterMarker center={center} />

        {/* Marqueurs indiquant les différents points d'intérêt (Macdo) */}
        {poiList.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.lat, poi.lon]}
          >
            <Popup className="z-30">
              <div className="">
                {/* Adresse */}
                <p className="text-xs">{poi.address}</p>
                <Button addClassName="rounded-lg px-3 py-2 text-xs" onClick={() => onPOISelect(poi)}>choisir</Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </>
    );
  }

  return (
    <>

      {/* ---------- CARTE ---------- */}
      {/* class map : pour que la carte prenne tout l'écran. */}
      <MapContainer className="map"
        center={center}
        // astuce pour que la carte se recentre à chaque changement de currentCity (à priori moins efficace, à voir).
        key={currentCity?.id ?? "default"}
        zoom={DEFAULT_ZOOM}
        // si besoin de supprimer le zoom avec la molette.
        // scrollWheelZoom={false}
      >

        {/* ---------- FOND OPENSTREETMAP ---------- */}
        <TileLayer
          // obligation légale (affichage en bas à droite)
          attribution={TILE_ATTRIBUTION}          
          /*
          Pour charger les images, Leaflet a besoin de savoir chez quel fournisseur récupérer l'image (ici OpenStreetMap).
          Il génère automatiquement ces valeurs :
            {z} = niveau de zoom
            {x} {y} = coordonnées de la tuile
            {s} = serveur (a,b,c)
          */
          url={TILE_URL}
        />

        {/* ---------- MARQUEUR ---------- */}
        <Markers poiList={poiList} onPOISelect={onPOISelect} />
      </MapContainer>
    </>
  );
}

export default Map;

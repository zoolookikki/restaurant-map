/*
  MapContainer : pour créer la carte LeafLet.
  TileLayer : pour afficher le fond de la carte avec OpenStreetMap.
  Marker : pour ajouter un marqueur sur la carte.
  Popup : pour afficher une bulle d'information lors du clic sur le marqueur.
*/
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map({ currentCity, poiList, onPOISelect }) {
  //console.log("Map render - currentCity:", currentCity);
  /*
  Leaflet attend des chiffres pour lat et lon.
  On centre sur la ville choisie sinon Paris par défaut.
  */
  const center = currentCity ? [Number(currentCity.lat), Number(currentCity.lon)] : [48.8566, 2.3522];

  return (
    <>

      {/* ---------- CARTE ---------- */}
      {/* class map : pour que la carte prenne tout l'écran. */}
      <MapContainer className="map"
        center={center}
        // astuce pour que la carte se recentre à chaque changement de currentCity (à priori moins efficace, à voir).
        key={currentCity?.id ?? "default"}
        // 6 = pays, 12 = ville, 15 = quartier
        zoom={13}
        // si besoin de supprimer le zoom avec la molette.
        // scrollWheelZoom={false}
      >

        {/* ---------- FOND OPENSTREETMAP ---------- */}
        <TileLayer
          // obligation légale (affichage en bas à droite)
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          /*
          Pour charger les images, Leaflet a besoin de savoir chez quel fournisseur récupérer l'image (ici OpenStreetMap).
          Il génère automatiquement ces valeurs :
            {z} = niveau de zoom
            {x} {y} = coordonnées de la tuile
            {s} = serveur (a,b,c)
          */
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ---------- MARQUEUR ---------- */}
        {/* Marqueur indiquant la ville choisie ==> non demandé dans la maquette Figma*/}
        {/*
        <Marker position={center}>
          <Popup>
            {currentCity ? currentCity.name : "Paris (défaut)"}
          </Popup>
        </Marker>
        */}
        {/* Marqueurs indiquant les différents points d'intérêt (Macdo) */}
        {poiList.map((poi) => (

          <Marker
            key={poi.id}
            position={[Number(poi.lat), Number(poi.lon)]}
          >
              <Popup className="z-30"
            >
              <div className="">
                {/* Adresse */}
                <p className="text-xs">{poi.address}</p>
                {/*
                Bouton choisir
                flex + items-center + justify-center: utile pour centrer le texte
                */}
                <button className="inline-flex items-center justify-center rounded-lg bg-yellow-400 px-3 py-2 text-xs font-semibold cursor-pointer"
                  onClick={() => onPOISelect(poi)}
                >
                  choisir
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default Map;

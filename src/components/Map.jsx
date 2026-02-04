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
      <h2>MAP(affichage Leaflet)</h2>

      {/* Carte */}
      <MapContainer
        className="map"
        center={center}
        // astuce pour que la carte se recentre à chaque changement de currentCity (à priori moins efficace, à voir).
        key={currentCity?.id ?? "default"}
        /*
        6 = pays
        12 = ville
        15 = quartier
        */
        zoom={13}
        // si besoin de supprimer le zoom avec la molette.
        // scrollWheelZoom={false}
      >

        {/* fond OpenStreetMap */}
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
            <Popup>
              <strong>{poi.name}</strong>
              <br />
              {poi.address}
              <br />
              <button onClick={() => onPOISelect(poi)}>Choisir</button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default Map;

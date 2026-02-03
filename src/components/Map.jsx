function Map({ currentCity, poiList, onPOISelect }) {

  const renderPOIList = () => {
    if (poiList.length === 0) return null;

    return (
      <ul>
        {poiList.map((poi) => (
          <li
            key={poi.id}
            onClick={() => onPOISelect(poi)}
            style={{
              cursor: "pointer",
            }}
          >
           <p>
              <strong>Id : </strong>{poi.id} | {" "}
              <strong>Nom :</strong>{poi.name} | {" "}
              <strong>Adresse :</strong>{poi.address} | {" "}
              <strong>Lat :</strong>{poi.lat} | {" "}
              <strong>Lon :</strong>{poi.lon} | {" "}
              <strong>Description :</strong>{poi.description}
            </p>
            <br />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h2>MAP(affichage de la carte)</h2>
      {currentCity ? (
        <>
          <p>centrage à faire sur la ville : {currentCity.name}</p>
          <h3>Liste des points d'intérêts à afficher sous forme de marqeurs : </h3>
          {renderPOIList()}
        </>
      ) : (
        <p>Aucune ville sélectionnée</p>
      )}
    </>
  );
};
export default Map;

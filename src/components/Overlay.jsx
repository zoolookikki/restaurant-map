function Overlay({ currentPOI, onContinue }) {
  return (
    <>
    <h2>OVERLAY(informations détaillées)</h2>
      {currentPOI ? (
        <>
          <p>
            <strong>Id :</strong> {currentPOI.id} |{" "}
            <strong>Nom :</strong> {currentPOI.name} |{" "}
            <strong>Adresse :</strong> {currentPOI.adress} |{" "}
            <strong>Lat :</strong> {currentPOI.lat} |{" "}
            <strong>Lon :</strong> {currentPOI.lon} |{" "}
            <strong>Description :</strong> {currentPOI.description}
          </p>
          <button onClick={() => onContinue()}>Continuer</button>
        </>
      ) : (
        <p>Aucun restaurant sélectionné</p>
      )}
   </>
  );
}
export default Overlay;


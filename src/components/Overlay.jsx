function Overlay({ currentPOI, onContinue }) {
  return (
    // rounded-t-3xl : arrondi du haut uniquement.
    <div className="w-full rounded-t-3xl bg-white p-4">
      {currentPOI ? (
        <>
          <h3 className="text-sm font-semibold">Restaurant sélectionné</h3>
          <p className="text-xs">{currentPOI.address}</p>
          {/* flex + items-center + justify-center: utile pour centrer l'icône */}
          <button className="mt-4 flex items-center justify-center rounded-lg bg-yellow-400 px-3 py-2 text-xs font-semibold cursor-pointer" onClick={() => onContinue()}>Continuer</button>
        </>
      ) : (
        <h3 className="text-sm font-semibold">Aucun restaurant sélectionné</h3>
      )}
   </div>
  );
}
export default Overlay;


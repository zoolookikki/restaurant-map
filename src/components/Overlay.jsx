import { Button } from "../ui/Button.jsx";

function Overlay({ currentPOI, onContinue }) {
  return (
    // rounded-t-3xl : arrondi du haut uniquement.
    <div className="w-full rounded-t-3xl bg-white p-4">
      {currentPOI ? (
        <>
          <h3 className="text-sm font-semibold">Restaurant sélectionné</h3>
          <p className="text-xs">{currentPOI.address}</p>
          <Button onClick={onContinue} addClassName="mt-4 rounded-lg px-3 py-2 text-xs">Continuer</Button>
        </>
      ) : (
        <h3 className="text-sm font-semibold">Aucun restaurant sélectionné</h3>
      )}
   </div>
  );
}
export default Overlay;

import MainPage from "./pages/MainPage";

// MODIF TEST CONTEXT
import { useState } from "react";
import AppContext from "./context/AppContext";

function App() {

  /*
  MODIF TEST CONTEXT
  état stocké ici car partager avec les composants enfants.
  ici, on pourrait avoir d'autres variables globales comme :
  const [lang, setLang] = useState("fr");
  const [theme, setTheme] = useState("light");
  */
  const [currentCity, setCurrentCity] = useState(null); // Ville choisie.

  /*
  MODIF TEST CONTEXT
  on enveloppe MainPage dans un Provider permettant de rendre disponible l'état aux composants enfants.
  */
  // return <MainPage />;
  return (
    <AppContext.Provider value={{ currentCity, setCurrentCity }}>
      <MainPage />
    </AppContext.Provider>
  );
}

export default App

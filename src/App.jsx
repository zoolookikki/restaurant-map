import MainPage from "./pages/MainPage";

// MODIF TEST CONTEXT
import { useState } from "react";
import AppContext from "./context/AppContext";

function App() {

  // MODIF TEST CONTEXT
  // Ville choisie.
  const [currentCity, setCurrentCity] = useState(null);
  /*
  ici, on pourrait avoir d'autres variables globales comme :
  const [lang, setLang] = useState("fr");
  const [theme, setTheme] = useState("light");
  */

  // MODIF TEST CONTEXT
  // return <MainPage />;
  return (
    <AppContext.Provider value={{ currentCity, setCurrentCity }}>
      <MainPage />
    </AppContext.Provider>
  );
}

export default App

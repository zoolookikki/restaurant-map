// MODIF TEST CONTEXT
/*
Cette modification a été ajoutée pour répondre à la mise en place d'un état global partagé via le Context API (POC).
Le contexte permet de partager la ville sélectionnée entre plusieurs composants sans passer par les props.
D'autres états globaux plus adaptés pourrait être :
- la langue.
- le thème.
*/

// import des fonctions React nécessaires pour créer et utiliser un contexte
import { createContext, useContext } from "react";

// création du canal permettant de partager les données.
const AppContext = createContext();

/*
Pour simplfier l'écriture dans les modules utilisant le context.
Sans :
  import { useContext } from "react";
  import AppContext from "../context/AppContext";
  const { currentCity, setCurrentCity } = useContext(AppContext);
Avec :
  import { useApp } from "../context/AppContext";
  const { currentCity, setCurrentCity } = useApp();
*/
export function useApp() {
  return useContext(AppContext);
}

export default AppContext;

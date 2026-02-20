/*
Composant Button générique réutilisable dans toute l'application :
  - icône de type Material Icons
  - classes CSS personnalisables
  - gestion état disabled

Props :
  - children : texte du bouton
  - function onClick : callback au clic
  - type : type HTML (button, submit)
  - icon : nom de l'icône Material Icons
  - addClassName : classes CSS supplémentaires
  - boolean disabled : état désactivé
*/
export function Button({
  children,
  onClick,
  type = "button",
  icon,
  addClassName = "",
  disabled = false
}) {
  //console.log("Render Button");
  console.count("Render Button");

  /*
  style de base commun à tous les boutons
  flex + items-center + justify-center: utile pour centrer l'icône 
  */
  const className = "inline-flex items-center justify-center font-semibold cursor-pointer";
  
  const enabledClass = "bg-yellow-400 hover:bg-yellow-500 cursor-pointer";
  const disabledClass = "bg-yellow-200 text-gray-400 opacity-40 cursor-not-allowed";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${addClassName} ${disabled ? disabledClass : enabledClass}`}
    >
      {/* 
      si icône
      material-icons : classe fournie par Google Material Icons => <span class="material-icons">search</span> affiche la loupe 
      */}
      {icon && (
        <span className="material-icons">{icon}</span>
      )}

      {/* si texte */}
      {children}
    </button>
  );
}


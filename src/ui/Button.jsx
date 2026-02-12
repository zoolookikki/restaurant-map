export function Button({
  children,
  onClick,
  type = "button",
  icon,
  addClassName = ""
}) {

  /*
  style de base commun à tous les boutons
  flex + items-center + justify-center: utile pour centrer l'icône 
  */
  const className = "inline-flex items-center justify-center bg-yellow-400 font-semibold cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${addClassName}`}
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


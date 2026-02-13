import axios from "axios";

const DEFAULT_LIMIT = 10;

export async function getNearbyPOIs(city, limit = DEFAULT_LIMIT) {
  //console.log("getNearbyPOIs=", city);

  const NOMINATIM_SEARCH_URL = "https://nominatim.openstreetmap.org/search";
  const POI_QUERY = "McDonald's";
  const VIEWBOX_MARGIN = 0.10; // environ 10 km.

  /*
  ATTENTION : city doit contenir boundingbox car on en a besoin pour définir la viewbox (rectangle de recherche)
  Il est possible de faire autrement : Overpass pour trouver les POIs dans un rayon autour de la ville + Nominatim pour trouver les adresses exactes.
  */
  if (!city || (city.boundingbox == null)) {
    return [];
  }

  // transformation de chaque point du rectangle en numérique (ajout de la marge)
  const [south, north, west, east] = city.boundingbox.map(Number);
  // marge ajoutée pour avoir un rectangle de recherche plus large et retransformation en string pour Nominatim.
  const margin = 0.10; // environ 10 km.
  const viewbox = [
    west  - VIEWBOX_MARGIN, // diminution de la longitude pour agrandir vers la gauche.
    north + VIEWBOX_MARGIN, // augmentation de la latitude pour agrandir vers le haut.
    east  + VIEWBOX_MARGIN, // augmentation de la latitude pour agrandire vers la droite.
    south - VIEWBOX_MARGIN  //  diminution de la longitude pour agrandir vers le bas.
  ].join(",");

  try {
    const response = await axios.get(NOMINATIM_SEARCH_URL, {
      params: {
        format: "json",
        q: POI_QUERY,
        limit,
        viewbox,
        // Limite les résultats à l’intérieur de la viewbox.
        bounded: 1,
        // Ajoute les détails d’adresse.
        addressdetails: 1,
      },
    });

    return response.data.map((result) => ({
      id: result.place_id,
      name: result.display_name,
      lat: Number(result.lat),
      lon: Number(result.lon),
      address: result.display_name,
      description: "",
    }));
  } catch (error) {
    //console.error("Erreur getNearbyPOIs:", error);
    throw new Error("Impossible de récupérer la liste des points d'intérêt.");
  }
}

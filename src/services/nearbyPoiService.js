import axios from "axios";

export async function getNearbyPOIs(city, limit = 10) {
  //console.log("getNearbyPOIs=", city);

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
    west  - margin, // diminution de la longitude pour agrandir vers la gauche.
    north + margin, // augmentation de la latitude pour agrandir vers le haut.
    east  + margin, // augmentation de la latitude pour agrandire vers la droite.
    south - margin  //  diminution de la longitude pour agrandir vers le bas.
  ].join(",");

  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        format: "json",
        q: "McDonald's",
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

// SIMULATION.
/*
export async function getNearbyPOIs(city) {
  // Nomatim renvoi des strings.
  const lat = Number(city.lat);
  const lon = Number(city.lon);

  // distance de 1km entre chaque points pour retourner 4 restaurants Macdo placés en carré autour du centre de la ville.
  const offset = 0.01;

  return [
    {
      id: 1,
      name: "McDonald's Nord-Est",
      lat: lat + offset,
      lon: lon + offset,
      address: "Son adresse se situe au Nord-Est",
      description: "Point d’intérêt simulé placé au Nord-Est de la ville.",
    },
    {
      id: 2,
      name: "McDonald's Nord-Ouest",
      lat: lat + offset,
      lon: lon - offset,
      address: "Son adresse se situe au Nord-Ouest",
      description: "Point d’intérêt simulé placé au Nord-Ouest de la ville.",
    },
    {
      id: 3,
      name: "McDonald's Sud-Est",
      lat: lat - offset,
      lon: lon + offset,
      address: "Son adresse se situe au Sud-Est",
      description: "Point d’intérêt simulé placé au Sud-Ouest de la ville.",
    },
    {
      id: 4,
      name: "McDonald's Sud-Ouest",
      lat: lat - offset,
      lon: lon - offset,
      address: "Son adresse se situe au Sud-Ouest",
      description: "Point d’intérêt simulé placé au Sud-Est de la ville.",
    },
  ];
}
*/

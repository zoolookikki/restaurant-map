import axios from "axios";
import { delay } from "../utils/times";

export async function searchCity(query) {

  const NOMINATIM_SEARCH_URL = "https://nominatim.openstreetmap.org/search";
  const DEFAULT_LIMIT = 10;

  // null, undefined, "" OR "  "
  if (!query || !query.trim()) throw new Error("Query invalide");

  /*
  simulation lenteur :
  delay(...) : je déclenche le minuteur.
  await : j'attends que le minuteur se termine.
  */
  //await delay(3000);

  try {
    const response = await axios.get(NOMINATIM_SEARCH_URL, {
      params: {
        format: "json",
        q: query,
        limit: DEFAULT_LIMIT,
      }
    });

    console.log(response);
    return response.data.map((result) => ({
      // clef unique nécessaire à l'affichage de la liste.
      id: result.place_id,
      name: result.display_name,
      lat: Number(result.lat),
      lon: Number(result.lon),
      // ATTENTION : le POI retournée doit contenir boundingbox car on en a besoin pour définir la viewbox (rectangle de recherche) => voir getNearbyPOIs.
      boundingbox: result.boundingbox,
    }));
  } catch (error) {
    throw new Error("Impossible d’effectuer la recherche pour le moment.");
  }
}

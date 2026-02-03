import axios from "axios";

export async function searchCity(query) {
  // null, undefined, "" OR "  "
  if (!query || !query.trim()) throw new Error("Query invalide");

  const url = "https://nominatim.openstreetmap.org/search";

  try {
    const response = await axios.get(url, {
      params: {
        format: "json",
        q: query,
        limit: 10,
      }
    });

    console.log(response);
    return response.data.map((result) => ({
      // clef unique nécessaire à l'affichage de la liste.
      id: result.place_id,
      name: result.display_name,
      lat: result.lat,
      lon: result.lon,
    }));
  } catch (error) {
    throw new Error("Impossible d’effectuer la recherche pour le moment.");
  }
}

/* simulation de cette future implémentation :
export async function getNearbyPOIs(city) {
  const response = await axios.get(...);
  return response.data;
}
*/
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


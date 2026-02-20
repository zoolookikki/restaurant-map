import { render, screen } from "@testing-library/react";
import Search from "../components/Search";
import userEvent from "@testing-library/user-event";
/*
On remplace le vrai service par un faux.
Cela permet de tester le comportement sans dépendre de l'API réelle.
*/
vi.mock("../services/searchCityService.js", () => ({
  searchCity: vi.fn(),
}));
// on importe ce faux service
import { searchCity } from "../services/searchCityService.js";

describe("Search", () => {

  test("Le bouton est désactivé si la saisie est vide", () => {
    // mock.
    const onSearchSelect = vi.fn();
    const onError = vi.fn();

    render(<Search onSearchSelect={onSearchSelect} onError={onError} />);

    const button = screen.getByRole("button", { name: /search/i });
    expect(button).toBeDisabled();
  });

  test("Le bouton est activé si la saisie n'est pas vide", async () => {
    const user = userEvent.setup();
    // mock.
    const onSearchSelect = vi.fn();
    const onError = vi.fn();

    render(<Search onSearchSelect={onSearchSelect} onError={onError} />);

    const input = screen.getByPlaceholderText(/saisissez une ville/i);
    const button = screen.getByRole("button", { name: /search/i });

    // avant la saisie => désactivé
    expect(button).toBeDisabled();

    // saisie 
    await user.type(input, "paris");

    // après la saisie => activé
    expect(button).not.toBeDisabled();
  });

  test("si isDisabled=true, l'input et le bouton sont désactivés", () => {
    // mock.
    const onSearchSelect = vi.fn();
    const onError = vi.fn();

    render(<Search onSearchSelect={onSearchSelect} onError={onError} isDisabled={true} />);

    expect(screen.getByPlaceholderText(/saisissez une ville/i)).toBeDisabled();
    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
  });

  test("rechercher une ville, afficher les suggestions, puis sélectionner une suggestion", async () => {
    const user = userEvent.setup();
    // mock.
    const onSearchSelect = vi.fn();
    const onError = vi.fn();

    // simulation de la réponse du service.
    searchCity.mockResolvedValue([
      { id: "1", name: "Paris 1", lat: 1, lon: 1, boundingbox: [] },
      { id: "2", name: "Paris 2", lat: 2, lon: 2, boundingbox: [] },
    ]);

    render(<Search onSearchSelect={onSearchSelect} onError={onError} />);

    // saisie 
    await user.type(screen.getByPlaceholderText(/saisissez une ville/i), "paris");
    // click sur bouton search.
    await user.click(screen.getByRole("button", { name: /search/i }));

    // await ici car on doit attendre le résultat du click sur le bouton search sinon cela ne fonctionne pas.
    expect(await screen.findByText("Paris 1")).toBeInTheDocument();
    expect(await screen.findByText("Paris 2")).toBeInTheDocument();

    // on choisi la 2 ème suggestion.
    await user.click(screen.getByText("Paris 2"));

    // callback de sélection du choix appelé une fois avec le bon objet.
    expect(onSearchSelect).toHaveBeenCalledTimes(1);
    expect(onSearchSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "2" })
    );

    // la liste est vidée => les suggestions disparaissent
    expect(screen.queryByText("Paris 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Paris 2")).not.toBeInTheDocument();    

    // ce callback n'a pas été appelé car pas d'erreur.
    expect(onError).not.toHaveBeenCalled();
  });

  test("si aucune correspondance, onError est appelé et aucune suggestion n'est affichée", async () => {
    const user = userEvent.setup();
    const onSearchSelect = vi.fn();
    const onError = vi.fn();

    // simulation du service : aucn résultat.
    searchCity.mockResolvedValue([]); 

    render(<Search onSearchSelect={onSearchSelect} onError={onError} />);

    // saisie 
    await user.type(screen.getByPlaceholderText(/saisissez une ville/i), "paris");
    // click sur bouton search.
    await user.click(screen.getByRole("button", { name: /search/i }));

    // callback d'erreur appelé une fois avec le bon message.
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(
      "Aucune correspondance trouvée pour cette recherche."
    );

    // pas de suggestions (ni Paris 1 ni Paris 2)
    expect(screen.queryByText(/Paris/i)).not.toBeInTheDocument();
    // ce callback n'a pas été appelé car pas de choix de suggestion.
    expect(onSearchSelect).not.toHaveBeenCalled();
  });

  test("si le service échoue, onError affiche le message et aucune suggestion n'est affichée", async () => {
    const user = userEvent.setup();
    const onSearchSelect = vi.fn();
    const onError = vi.fn();

    // simulation du service : une erreur est apparue dans le service (voir les différents cas d'erreur dans searchCityService).
    searchCity.mockRejectedValue(new Error("error"));

    render(<Search onSearchSelect={onSearchSelect} onError={onError} />);

    // saisie 
    await user.type(screen.getByPlaceholderText(/saisissez une ville/i), "paris");
    // click sur bouton search.
    await user.click(screen.getByRole("button", { name: /search/i }));

    // callback d'erreur appelé une fois avec le bon message.
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith("error");
    // ce callback n'a pas été appelé car pas de choix de suggestion.
    expect(onSearchSelect).not.toHaveBeenCalled();
  });

});

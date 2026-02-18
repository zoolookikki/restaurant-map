import { render, screen } from "@testing-library/react";
import Overlay from "../components/Overlay";
import userEvent from "@testing-library/user-event";

describe("Overlay", () => {

  test("affiche juste un message quand aucun restaurant n'est sélectionné", () => {
    // mock.
    const onContinue = vi.fn();

    render(<Overlay currentPOI={null} onContinue={onContinue} />);

    expect(screen.getByText(/aucun/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /continuer/i })).not.toBeInTheDocument();
  });

  test("affiche l'adresse et le bouton continuer", async () => {
    const user = userEvent.setup();
    // fonction permettant d'enregistrer combien de fois elle a été appelée.
    const onContinue = vi.fn();

    render(
        <Overlay
          currentPOI={{ address: "Paris" }}
          onContinue={onContinue}
        />
    );

    expect(screen.queryByText(/aucun/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    // await avec userEvent (asynchrone) pour être sûr que le clic et ses effets sont terminés avant de vérifier.
    await user.click(screen.getByRole("button", { name: /continuer/i }));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

});

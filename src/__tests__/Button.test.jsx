//import { fireEvent } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { Button } from "../ui/Button";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  // c'est mieux d'utiliser userEvent : simule un vrai utilisateur, se rapproche du comportement du navigateur (ordre des évènements : mousedown / mouseup etc...)
  /*
  test("click bouton", () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>OK</Button>);

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
  */
  test("appelle onClick au clic", async () => {
    const user = userEvent.setup();
    // fonction permettant d'enregistrer combien de fois elle a été appelée.
    const onClick = vi.fn();

    render(<Button onClick={onClick}>OK</Button>);

    // await avec userEvent (asynchrone) pour être sûr que le clic et ses effets sont terminés avant de vérifier.
    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("affiche une icône si icon est fourni", () => {
    render(<Button icon="icon_name" />);

    expect(screen.getByText("icon_name")).toBeInTheDocument();
  });

  test("désactive le bouton quand disabled=true", () => {
    render(<Button disabled></Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("ajoute les classes personnalisées via addClassName", () => {
    render(<Button addClassName="classe_personalise">OK</Button>);

    expect(screen.getByRole("button")).toHaveClass("classe_personalise");
  });
});



import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Pour forcer le nettoyage du DOM après chaque test.
afterEach(() => cleanup());

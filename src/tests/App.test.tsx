import { render, screen } from "@testing-library/react";
import App from "../App";

it("Should render the logo", () => {
  render(<App />);

  // Adjust "logo" to the actual alt text of your logo image
  const logo = screen.getByAltText("Investment Calculator App Logo");

  expect(logo).toBeVisible();
});

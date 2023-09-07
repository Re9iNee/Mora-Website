import { render, screen } from "@testing-library/react";
import Footer from "../src/app/Frames/Footer/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Footer />);

    const heading = screen.getByRole("heading", {
      name: /MORA/i,
    });

    expect(heading).toBeInTheDocument();
    expect(2).toBe(2);
  });
});

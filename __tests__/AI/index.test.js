import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import AiList from "../../src/app/dashboard/admin/ai/list";
import AiForm from "../../src/app/dashboard/admin/ai/form";
import AIs from "../../__mocks__/AIs.json";

describe("AI", () => {
  it("renders a list of AIs", () => {
    render(<AiList AIs={AIs} />);

    // --- TODO: Loading is Visible
    // NOTE: Couldn't find a way to actually notice if we are making a request or not.
    // --- TODO: a get request would be sent to /api/ai
    // --- TODO: a fetch request wil return an Array of AIs
    // --- TODO: Loading gone

    // The table will render given data s.
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    // The table will render each given AIs title
    const tableRows = table.querySelectorAll("tbody > tr");
    const AIsTitle = AIs.map((ai) => ai.title);
    tableRows.forEach((row, i) => {
      expect(row.textContent).toContain(AIsTitle[i]);
    });
  });

  it("creates a new AI", () => {
    const { container } = render(<AiForm />);

    // TODO if clicks on new button, it will navigate to ../new
    // TODO Loading state visible

    // there should be a form visible
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();

    // TODO User fill all the information
    // TODO User fill out the mandatory fields
    const title = container.querySelector("input[name=title]");
    title.textContent = 32;
    expect(title).toBeInTheDocument();
    // TODO User submits, clicks on submit button
    //  -> 1. A Post request should be sent
    //  -> 2. Button gets disabled and goes into loading
    // TODO request returns a json with a status code of 201 (Created) or 400 (Bad Request)
    // TODO A toast message will appear
    //  -> showing success msg if 201 - containing a link to navigate to edit the created AI
    //  -> showing error msg if 400
    // TODO The submit button should re enable and its loading gone
    // TODO All Form fields should reset
  });
});

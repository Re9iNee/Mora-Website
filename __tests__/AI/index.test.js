import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import AiList from "../../src/app/dashboard/admin/ai/list";
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
});

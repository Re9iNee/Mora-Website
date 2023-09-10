import { faker } from "@faker-js/faker";

describe("AI", () => {
  beforeEach(() => {
    cy.visit("/dashboard/admin/ai");
  });
  it("renders a list of AIs", async () => {
    // TODO: Loading is Visible
    // NOTE: Couldn't find a way to actually notice if we are making a request or not.
    // TODO: a get request would be sent to /api/ai
    // TODO: a fetch request wil return an Array of AIs
    // TODO: Loading gone
    // The table will render given data s.
    // const table = screen.getByRole("table");
    // expect(table).toBeInTheDocument();
    // The table will render each given AIs title
    // const tableRows = table.querySelectorAll("tbody > tr");
    // const AIsTitle = AIs.map((ai) => ai.title);
    // tableRows.forEach((row, i) => {
    //   expect(row.textContent).toContain(AIsTitle[i]);
    // });
  });
  it("creates a new AI", () => {
    // clicks on new button, it should navigate to ../new
    cy.get('[data-cy="create"]').click();
    cy.url().should("include", "/new");

    // TODO Loading state visible
    // there should be a form visible
    const form = cy.get('[data-cy="ai-form"]');
    form.should("be.visible");

    // User fill all the information
    const title = faker.word.words(2);
    cy.get('[data-cy="title"]').type(title);
    cy.get('[data-cy="slug"]').type(title.replace(" ", "-"));
    cy.get('[data-cy="version"]').type(
      faker.number.float({ min: 0, max: 1, precision: 0.01 }).toString()
    );
    cy.get('[data-cy="usage_link"]').type(faker.internet.url());
    cy.get('[data-cy="complexity_level"').click();
    cy.get('[data-cy="level_ADVANCED"]').click();
    cy.get('[data-cy="origin_website"]').type(faker.internet.url());
    cy.get('[data-cy="body"]').type(faker.lorem.paragraphs(3));

    cy.intercept({ method: "POST", url: "/api/ai" }).as("create");
    // User submits, or clicks on submit button
    // form.submit();
    const submitBtn = cy.get('[data-cy="submit-btn"]');
    submitBtn.click();
    //  -> Button gets disabled and goes into loading
    // submitBtn.should("be.disabled").should("have.class", "loading");

    //  -> A Post request should be sent
    // request returns a json with a status code of 201 (Created)
    // NOTE: I don't know whether I should check if the things go wrong. (status 400 and error messages)
    // --- TODO -> or 400 (Bad Request)
    // --- TODO -> showing error msg if 400

    cy.wait("@create").should(({ request, response }) => {
      expect(request.method).to.equal("POST");
      expect(response?.statusCode).to.equal(201);
    });

    //  -> showing success msg if 201
    // --- TODO -> contains a link to navigate to edit the created AI with specific slug
    const toast = cy.get('[data-cy="toast"]');
    // A toast message will appear
    toast.should("be.visible");

    // The submit button should re enable and its loading gone
    submitBtn.should("not.be.disabled").should("not.have.class", "loading");
    // --- TODO -> form should reset itself
  });
});

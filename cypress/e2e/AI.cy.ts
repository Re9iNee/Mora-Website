import { fa, faker } from "@faker-js/faker";

describe("AI", () => {
  beforeEach(() => {
    cy.login(Cypress.env("email"), Cypress.env("password"));

    cy.visit("/dashboard/admin/ai");
  });
  it("creates a new AI", () => {
    cy.get("#create").click();
    cy.url().should("include", "/new");

    cy.get('[data-cy="ai-form"]').should("be.visible");

    const submitBtn = cy.get('[data-cy="submit-btn"]');
    submitBtn.should("be.disabled");

    // User fill all the information
    const title = faker.word.words(2);
    cy.get('[data-cy="title"]').type(title);
    cy.get('[data-cy="slug"]').type(title.toLowerCase().replace(" ", "-"));
    cy.get('[data-cy="version"]').type(
      faker.number.float({ min: 0, max: 1, precision: 0.01 }).toString()
    );
    cy.get('[data-cy="usage_link"]').type(faker.internet.url());
    cy.get('[data-cy="complexity_level"').click();
    cy.get('[data-cy="level_ADVANCED"]').click();
    cy.get('[data-cy="origin_website"]').type(faker.internet.url());
    cy.get('[data-cy="body"]').type(faker.lorem.paragraph(1));
    cy.get("#video-select").click().type("{downArrow}{enter}");
    cy.get("#tag-select")
      .click()
      .type("{downArrow}{enter}")
      .type("{downArrow}{enter}");

    submitBtn.click().should("be.disabled");
    cy.get("#loading").should("be.visible");

    cy.get('[data-cy="toast"]')
      .should("be.visible")
      .should("contain.text", "created", { matchCase: false });

    submitBtn.should("not.be.disabled");
    cy.get("#loading").should("not.exist");
  });

  it("edits created AI", () => {
    cy.get('[data-cy="ai-list"]').should("be.visible");
    cy.get('[data-cy="action-menu"]').first().click();

    cy.get('[data-cy="edit-link"]').click();

    cy.get('[data-cy="ai-form"]').should("be.visible");

    cy.get("[data-cy='submit-btn']").should("exist").and("be.disabled");

    const newTitle = faker.word.noun({ length: { min: 3, max: 50 } });

    cy.get('[data-cy="title"]').clear().type(newTitle);
    cy.get('[data-cy="slug"]').clear().type(newTitle.toLocaleLowerCase());
    cy.get('[data-cy="version"]')
      .clear()
      .type(faker.number.float({ min: 0, max: 1, precision: 0.01 }).toString());
    cy.get('[data-cy="origin_website"]').clear().type(faker.internet.url());

    // when form field values modifies, the update button will gets enabled

    cy.get("[data-cy='submit-btn']").should("not.be.disabled").click();

    cy.get('[data-cy="toast"]')
      .should("be.visible")
      .should("contain.text", "updated", { matchCase: false });
  });

  it("renders a list of AIs", () => {
    cy.get('[data-cy="ai-list"]').should("be.visible");
  });

  it("delete an AI", () => {
    cy.get('[data-cy="action-menu"]').first().click();
    cy.get('[data-cy="delete-btn"]').first().click();

    cy.get('[data-cy="toast"]')
      .should("be.visible")
      .should("not.contain.text", "Error");
  });
});

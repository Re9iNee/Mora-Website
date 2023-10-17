import { faker } from "@faker-js/faker";

describe("Tag", () => {
  beforeEach(() => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
  });
  it("creates a new Tag", () => {
    cy.visit("/dashboard/admin/tag/new");

    cy.get('[data-cy="tag-form"]').should("be.visible");

    cy.get('[data-cy="name"]').type(
      faker.word.noun({ length: { min: 3, max: 50 } })
    );
    cy.get('[data-cy="submit-btn"]').click().should("be.disabled");

    cy.get('[data-cy="toast"]').should("be.visible");
    cy.get('[data-cy="submit-btn"]').should("not.be.disabled");
  });

  it("edits created Tag", () => {
    cy.visit("/dashboard/admin/tag");

    cy.get('[data-cy="tag-list"]').should("be.visible");

    cy.get('[data-cy="edit-btn"]').first().click();

    cy.get('[data-cy="tag-form"]').should("be.visible");

    cy.get('[data-cy="name"]')
      .clear()
      .type(faker.word.noun({ length: { min: 3, max: 50 } }));
    cy.get('[data-cy="submit-btn"]').click().should("be.disabled");

    cy.get('[data-cy="toast"]').should("be.visible");

    cy.get('[data-cy="submit-btn"]').should("not.be.disabled");
  });
  it("loads tag list", () => {
    cy.visit("/dashboard/admin/tag");

    cy.get('[data-cy="tag-list"]').should("be.visible");
  });
  it("deletes created Tag", () => {
    cy.visit("/dashboard/admin/tag");

    cy.get('[data-cy="tag-list"]').should("be.visible");

    cy.get('[data-cy="delete-btn"]').first().click();

    cy.get('[data-cy="toast"]').should("be.visible");
  });
});

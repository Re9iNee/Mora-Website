import { faker } from "@faker-js/faker";

describe("Video", () => {
  beforeEach(() => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
  });
  it("creates a new Video", () => {
    cy.visit("/dashboard/admin/video/new");

    cy.get('[data-cy="video-form"]').should("be.visible");

    cy.get('[data-cy="name"]').type(
      faker.word.noun({ length: { min: 3, max: 50 } })
    );
    cy.get('[data-cy="url"]').type(faker.internet.url());
    cy.get('[data-cy="description"]').type(faker.lorem.sentence());
    cy.get('[data-cy="submit-btn"]').click().should("be.disabled");

    cy.get('[data-cy="toast"]').should("be.visible");
    cy.get('[data-cy="submit-btn"]').should("not.be.disabled");
  });

  it("edits created Video", () => {
    cy.visit("/dashboard/admin/video");

    cy.get('[data-cy="video-list"]').should("be.visible");

    cy.get('[data-cy="action-menu"]').first().click();

    cy.get('[data-cy="edit-link"]').click();

    cy.get('[data-cy="video-form"]').should("be.visible");

    cy.get('[data-cy="name"]')
      .clear()
      .type(faker.word.noun({ length: { min: 3, max: 50 } }));
    cy.get('[data-cy="url"]').clear().type(faker.internet.url());
    cy.get('[data-cy="description"]').clear().type(faker.lorem.sentence());

    cy.get('[data-cy="submit-btn"]').click().should("be.disabled");

    cy.get('[data-cy="toast"]').should("be.visible");

    cy.get('[data-cy="submit-btn"]').should("not.be.disabled");
  });

  it("loads video list", () => {
    cy.visit("/dashboard/admin/video");

    cy.get('[data-cy="video-list"]').should("be.visible");
  });

  it("deletes created Video", () => {
    cy.visit("/dashboard/admin/video");

    cy.get('[data-cy="video-list"]').should("be.visible");

    cy.get('[data-cy="action-menu"]').first().click();
    cy.get('[data-cy="delete-btn"]').first().click();

    cy.get('[data-cy="toast"]')
      .should("be.visible")
      .should("not.contain.text", "Error");
  });
});

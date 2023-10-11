describe("The Login Page", () => {
  it("sets auth cookie when logging in via form submission", function () {
    const username = Cypress.env("username");
    const password = Cypress.env("password");
    console.log({ username, password });

    cy.visit("/dashboard/admin");
    cy.visit("/api/auth/signin");

    cy.get("#input-email-for-credentials-provider").type(username);
    cy.get("#input-password-for-credentials-provider").type(
      `${password}{enter}`
    );

    cy.getCookie("next-auth.csrf-token").should("exist");
    cy.getCookie("next-auth.session-token").should("exist");

    cy.get("h1").should("contain", "Admin Dashboard");
  });
});

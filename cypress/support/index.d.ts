/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to ... add your description here
     * @example cy.login()
     */
    login(email: string, password: string): Chainable<any>;
  }
}

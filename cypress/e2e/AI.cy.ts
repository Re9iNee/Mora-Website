// NOTE: On your refactoring, think about "is there another way to do this?"

import { AiSchema } from "@/app/dashboard/admin/ai/data/schema";
import AiMockData from "../fixtures/AI.json";
import { faker } from "@faker-js/faker";

describe("AI", () => {
  it("renders a list of AIs", () => {
    cy.intercept({ method: "GET", url: "/api/ai" }).as("getAll");
    cy.visit("/dashboard/admin/ai");

    // TODO: Loading is Visible
    // a get request would be sent to /api/ai
    cy.wait("@getAll").should(({ request, response }) => {
      expect(request.method).to.equal("GET");
      expect(response?.statusCode).to.equal(200);
      // a fetch request wil return an Array of AIs
      expect(response?.body).to.be.an("array");
    });
    // TODO: Loading gone

    // The table will render given data s.
    const table = cy.get("table");
    table.should("be.visible");

    // TODO: The table will render each given AIs title
    // const tableRows = table.querySelectorAll("tbody > tr");
    // const AIsTitle = AIs.map((ai) => ai.title);
    // tableRows.forEach((row, i) => {
    //   expect(row.textContent).toContain(AIsTitle[i]);
    // });

    // clicks on new button, it should navigate to ../new
    cy.get('[data-cy="create"]').click();
    cy.url().should("include", "/new");

    cy.pause();
  });

  it("creates a new AI", () => {
    cy.visit("/dashboard/admin/ai/new");

    // TODO Loading state visible
    // there should be a form visible
    const form = cy.get('[data-cy="ai-form"]');
    form.should("be.visible");

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

  it("updates an AI", () => {
    // TODO: if ai not found, redirect to /404
    // TODO: if ai found, render ai page

    cy.intercept({ method: "UPDATE", url: "/api/ai" }).as("update");
    cy.intercept(
      { method: "GET", url: "/api/ai/*" },
      { statusCode: 200, body: AiMockData }
    ).as("getSingle");

    // TODO: user finds the created AI in a list and click on editing that AI

    // user navigate to dashboard/admin/ai/[slug]
    cy.visit("/dashboard/admin/ai/runaway");

    // a get request will sent and its response should contain the AI Object
    cy.wait("@getSingle").should(({ request, response }) => {
      expect(request.method).to.equal("GET");
      expect(response?.statusCode).to.equal(200);

      const body = response?.body;
      expect(body).to.be.an("object");
    });

    // a form would be visible and the given object data will fill the inputs and form fields
    const form = cy.get('[data-cy="ai-form"]');
    form.should("be.visible");
    cy.get('[data-cy="title"]').should("have.value", "Runaway");
    cy.get('[data-cy="slug"]').should("have.value", "runaway");
    cy.get('[data-cy="version"]').should("have.value", "0.1");
    cy.get('[data-cy="usage_link"]').should(
      "have.a.value",
      "https://example.com"
    );
    cy.get('[data-cy="complexity_level"').should("have.value", "NORMAL");
    cy.get('[data-cy="origin_website"]').should(
      "have.a.value",
      "https://example.com"
    );
    cy.get('[data-cy="body"]').should(
      "have.a.value",
      "This AI is good and Normal"
    );

    // there should be an update button visible
    const updateBtn = cy.get("[data-cy='submit-btn']");
    updateBtn.should("be.visible");

    // update button would be disabled by default (because form fields have not changed)
    updateBtn.should("be.disabled");

    // when form field values modifies, the update button will gets enabled
    cy.get('[data-cy="origin_website"]').type(faker.internet.url());
    updateBtn.should("not.be.disabled");

    // by clicking on update button an update request should be sent to /api/ai containing new datas
    updateBtn.click();
    cy.wait("@update").should(({ request, response }) => {
      expect(request.method).to.equal("UPDATE");
      expect(response?.statusCode).to.equal(200);
    });

    // a success message toast should be displayed (if in a mood show what changed!!)
    const toast = cy.get('[data-cy="toast"]');
    // A toast message will appear
    toast.should("be.visible");
  });
});

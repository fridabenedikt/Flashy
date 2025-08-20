/// <reference types="cypress" />

Cypress.Commands.add("home", () => {
  cy.visit("localhost:3000/");
});

const email = "cypress@test.com";
const password = "password";

Cypress.Commands.add("createUser", () => {
  cy.get("#logInBtn").click();
  cy.get("a[href='/signup']").click();
  cy.get("input[type=email]").type(email);
  cy.get("input[type=password]").type(password);
  cy.get("#signUpBtn").click();

  cy.url().should("eq", "http://localhost:3000/");
  cy.get("#logOutBtn").should("exist");
});

Cypress.Commands.add("login", () => {
  cy.get("#logInBtn").first().click();
  cy.get("input[type=email]").type(email);
  cy.get("input[type=password]").type(password);
  cy.get("#signUpBtn").click();
});

Cypress.Commands.add("deleteUser", () => {
  cy.get("a[href='/user']").click();
  cy.get("#editBtn").click();
  cy.get("button").contains("DELETE").click();

  cy.url().should("eq", "http://localhost:3000/");
});

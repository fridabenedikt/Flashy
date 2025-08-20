describe("User authentication", () => {
  beforeEach(() => {
    cy.home();
  });

  it("Logs in & out", () => {
    // Create user
    cy.createUser();

    // Log out
    cy.get("#logOutBtn").click();
    cy.get("#logOutBtn").should("not.exist");
  });

  it("Log in & delete", () => {
    cy.login();
    cy.get("#logOutBtn").should("exist");

    // Delete
    cy.deleteUser();
  });
});

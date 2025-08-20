describe("Create a set", () => {
  beforeEach(() => {
    cy.home();
    cy.createUser();
  });

  afterEach(() => {
    cy.home();
    cy.deleteUser();
  });

  it("creates a new set", () => {
    cy.get("a[href='/new']").first().click();
    cy.url().should("eq", "http://localhost:3000/new");

    cy.get("input[name='title']").type("Test sett");
    cy.get("select[name='subject']").select("TDT4120");
    cy.get("[name='description']").type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere lobortis sagittis.",
    );
    cy.get("button").contains("Add Card").click();
    cy.get("input[name='cards[0].front']").type("Test question 1");
    cy.get("input[name='cards[0].back']").type("Test answer 1");
    cy.get("button[type='submit']").click();

    cy.url().should("eq", "http://localhost:3000/");
    cy.get("#setList").within(() => {
      cy.contains("h3", "Test sett").should("exist");
    });
  });
});

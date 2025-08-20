describe("Tests for homepage", () => {
  it("Vists Flashy homepage", () => {
    cy.visit("localhost:3000/");

    cy.get("h1").should("contain", "FLASHY");
  });
});

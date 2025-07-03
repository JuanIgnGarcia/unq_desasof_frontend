describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/login");

    cy.get('input[type="text"]').type("buyer1");
    cy.get('input[type="password"]').type("buyer1pass");

    cy.contains("Ingresar").click();

    cy.url().should("not.include", "/login");
  });

  it("should show the favorites title", () => {
    cy.contains("Lista de favoritos").should("be.visible");
  });

  it("should render at least one favorite product card", () => {
    cy.get("h2").first().should("exist").and("not.be.empty");
    cy.get("textarea").should("exist");
    cy.get("button").contains("Buy").should("exist");
  });

  it("should open and close the purchase modal", () => {
    cy.get("button").contains("Buy").first().click();

    cy.get("button").contains("Cancelar").should("be.visible");

    cy.get("button").contains("Cancelar").click();

    cy.contains("Confirmar compra").should("not.exist");
  });

  it("should confirm a purchase from the modal", () => {
    cy.get("button").contains("Buy").first().click();

    cy.get("button").contains("Confirmar").should("be.visible");

    cy.get("button").contains("Confirmar").click();

    cy.contains("Compra realizada exitosamente", { timeout: 6000 }).should(
      "be.visible"
    );
  });
});

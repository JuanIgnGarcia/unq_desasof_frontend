describe("Admin Register Page", () => {
  beforeEach(() => {
    cy.visit("/registerAdmin");
  });

  it("should redirect to login", () => {
    cy.contains("Iniciá sesión").click();
    cy.url().should("include", "/login");
  });

  /* it("should register successfully with mocked response", () => {
    cy.intercept("POST", "http://localhost:8000/user/buyer", {
      statusCode: 200,
      body: {
        token: "fake-jwt-token",
      },
    }).as("mockAdminRegister");

    cy.get('input[type="text"]').eq(0).type("user1");
    cy.get('input[type="text"]').eq(1).type("admin");
    cy.get('input[type="password"]').eq(0).type("password1");
    cy.get('input[type="password"]').eq(1).type("password1");

    cy.contains("Registrar").click();

    cy.wait("@mockAdminRegister");

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.contains("Registrado exitosamente");
  });
*/
});

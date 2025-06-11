describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should redirect to login", () => {
    cy.contains("Iniciá sesión").click();
    cy.url().should("include", "/login");
  });

  it("should show error on register with diferent passwords", () => {
    cy.get('input[type="text"]').type("user1");
    cy.get('input[type="password"]').eq(0).type("password1"); // password
    cy.get('input[type="password"]').eq(1).type("pass1"); // confirm password

    cy.contains("Registrar").click();

    cy.url().should("include", "/register");

    cy.contains("Las contraseñas no coinciden");
  });
  /*
  it("should register successfully with mocked response", () => {
    cy.intercept("POST", "http://localhost:8000/user/buyer", {
      statusCode: 200,
      body: {
        token: "fake-jwt-token",
      },
    }).as("mockRegister");

    cy.get('input[type="text"]').type("user1");
    cy.get('input[type="password"]').eq(0).type("password1");
    cy.get('input[type="password"]').eq(1).type("password1");

    cy.contains("Registrar").click();

    cy.wait("@mockRegister");

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.contains("Registrado exitosamente");
  });
*/
});

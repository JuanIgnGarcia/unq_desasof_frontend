describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should login as user successfully", () => {
    cy.get('input[type="text"]').type("buyer1");
    cy.get('input[type="password"]').type("buyer1pass");

    cy.contains("Ingresar").click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.contains("Logeado exitosamente");
  });

  it("should login as admin succesfully", () => {
    cy.get('input[type="text"]').type("admin1");
    cy.get('input[type="password"]').type("admin1pass");

    cy.contains("Ingresar").click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/users`);
    cy.contains("Logeado exitosamente");
  });

  it("should show error on login attempt without username", () => {
    cy.intercept("POST", "http://localhost:8000/user/login", {
      statusCode: 400,
      body: {
        message: "Username is required",
      },
    }).as("mockLogin");

    cy.get('input[type="password"]').type("password1");
    cy.contains("Ingresar").click();

    cy.wait("@mockLogin");

    cy.url().should("include", "/login");

    cy.contains("Error del cliente.");
  });

  it("should show error on login attempt without password", () => {
    cy.intercept("POST", "http://localhost:8000/user/login", {
      statusCode: 400,
      body: {
        message: "Username is required",
      },
    }).as("mockLogin");

    cy.get('input[type="text"]').type("user1");
    cy.contains("Ingresar").click();

    cy.wait("@mockLogin");

    cy.url().should("include", "/login");

    cy.contains("Error del cliente.");
  });

  it("should redirect to register", () => {
    cy.contains("Regístrate").click();

    cy.url().should("include", "/register");
  });
});

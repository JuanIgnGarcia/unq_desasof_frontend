describe("Admin Register Page", () => {
  beforeEach(() => {
    cy.visit("/registerAdmin");
  });

  it("should redirect to login", () => {
    cy.contains("Iniciá sesión").click();
    cy.url().should("include", "/login");
  });

  it("should register successfully with mocked response", () => {
    cy.intercept("POST", "http://localhost:8000/user/admin", {
      statusCode: 200,
      body: {
        token: "fake-jwt-token",
      },
    }).as("mockAdminRegister");

    cy.get('input[type="text"]').eq(0).type("user1");
    cy.get('input[type="text"]').eq(1).type("admin");
    cy.get('input[type="password"]').eq(0).type("password1");
    cy.get('input[type="password"]').eq(1).type("password1");

    cy.get("button").contains("Registrar").click({ force: true });

    cy.wait("@mockAdminRegister");

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.contains("Registrado exitosamente");
  });

  it("should show error on register without username", () => {
    cy.intercept("POST", "http://localhost:8000/user/admin", {
      statusCode: 400,
      body: {
        message: "Username is required",
      },
    }).as("mockAdminRegister");

    cy.get('input[type="text"]').eq(1).type("admin");
    cy.get('input[type="password"]').eq(0).type("password1");
    cy.get('input[type="password"]').eq(1).type("password1");

    cy.get("button").contains("Registrar").click({ force: true });

    cy.wait("@mockAdminRegister");

    cy.url().should("include", "/registerAdmin");

    cy.contains("Error del cliente.");
  });

  it("should show error on register without password", () => {
    cy.intercept("POST", "http://localhost:8000/user/admin", {
      statusCode: 400,
      body: {
        message: "Username is required",
      },
    }).as("mockAdminRegister");

    cy.get('input[type="text"]').eq(0).type("user1");
    cy.get('input[type="text"]').eq(1).type("admin");

    cy.get("button").contains("Registrar").click({ force: true });

    cy.wait("@mockAdminRegister");

    cy.url().should("include", "/registerAdmin");

    cy.contains("Error del cliente.");
  });

  it("should show error on register without confirm password", () => {
    cy.intercept("POST", "http://localhost:8000/user/admin", {
      statusCode: 400,
      body: {
        message: "Username is required",
      },
    }).as("mockAdminRegister");

    cy.get('input[type="text"]').eq(0).type("user1");
    cy.get('input[type="text"]').eq(1).type("admin");
    cy.get('input[type="password"]').eq(0).type("password1");

    cy.get("button").contains("Registrar").click({ force: true });

    cy.contains("Las contraseñas no coinciden");
  });

  it("should show error on register without password but with confirm password", () => {
    cy.intercept("POST", "http://localhost:8000/user/admin", {
      statusCode: 400,
      body: {
        message: "Username is required",
      },
    }).as("mockAdminRegister");

    cy.get('input[type="text"]').eq(0).type("user1");
    cy.get('input[type="text"]').eq(1).type("admin");
    cy.get('input[type="password"]').eq(1).type("password1");

    cy.get("button").contains("Registrar").click({ force: true });

    cy.contains("Las contraseñas no coinciden");
  });

  it("should show error on register without special code", () => {
    cy.intercept("POST", "http://localhost:8000/user/admin", {
      statusCode: 400,
      body: {
        message: "Username is required",
      },
    }).as("mockAdminRegister");

    cy.get('input[type="text"]').eq(0).type("user1");
    cy.get('input[type="password"]').eq(0).type("password1");
    cy.get('input[type="password"]').eq(1).type("password1");

    cy.get("button").contains("Registrar").click({ force: true });

    cy.contains("El codigo es invalido");
  });
});

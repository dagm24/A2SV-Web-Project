describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.mockApiResponses();
  });

  it("should load the home page", () => {
    cy.visit("/");
    cy.contains("Job Opportunities").should("be.visible");
    cy.contains("Sign In").should("be.visible");
  });

  it("should show login form", () => {
    cy.visit("/");
    
    // Check if login form is visible
    cy.get('input[type="email"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("should have Sign up button visible", () => {
    cy.visit("/");
    
    // Check if the Sign up button is visible
    cy.contains("Sign up").should("be.visible");
  });

  it("should protect routes when not authenticated", () => {
    // Try to access dashboard without login
    cy.visit("/dashboard");

    // Wait for any redirects to happen
    cy.wait(2000);

    // Should either be redirected to login or show login form
    // Check if we're on the home page with login form
    cy.contains("Sign In").should("be.visible");
    cy.contains("Job Opportunities").should("be.visible");
  });
});

// Custom commands for authentication and common actions

Cypress.Commands.add(
  "login",
  (email = "test@example.com", password = "password123") => {
    cy.visit("/");

    // Wait for page to load
    cy.get('input[type="email"]', { timeout: 10000 }).should("be.visible");

    // Fill in login form
    cy.get('input[type="email"]').clear().type(email);
    cy.get('input[type="password"]').clear().type(password);

    // Submit form
    cy.get('button[type="submit"]').contains("Sign In").click();

    // Wait for either dashboard or verification page
    cy.url({ timeout: 10000 }).should("satisfy", (url) => {
      return url.includes("/dashboard") || url.includes("/verify-email");
    });
  }
);

Cypress.Commands.add(
  "loginWithVerification",
  (email = "test@example.com", password = "password123", otp = "1234") => {
    const cy = Cypress.cy; // Declare the cy variable
    cy.visit("/");

    // Fill in login form
    cy.get('input[type="email"]').clear().type(email);
    cy.get('input[type="password"]').clear().type(password);
    cy.get('button[type="submit"]').contains("Sign In").click();

    // If redirected to verification, handle it
    cy.url().then((url) => {
      if (url.includes("/verify-email")) {
        // Fill in OTP
        cy.get('input[maxlength="1"]').each(($input, index) => {
          cy.wrap($input).type(otp[index]);
        });
        cy.get('button[type="submit"]').contains("Verify").click();
        cy.url().should("include", "/dashboard");
      }
    });
  }
);

Cypress.Commands.add(
  "register",
  (
    name = "Test User",
    email = "test@example.com",
    password = "password123"
  ) => {
    const cy = Cypress.cy; // Declare the cy variable
    cy.visit("/");
    cy.contains("Sign up").click();

    // Fill registration form
    cy.get('input[placeholder*="full name"]').type(name);
    cy.get('input[type="email"]').type(email);
    cy.get('input[placeholder*="Create a password"]').type(password);
    cy.get('input[placeholder*="Confirm your password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Should redirect to verification page
    cy.url().should("include", "/verify-email");
  }
);

Cypress.Commands.add("mockApiResponses", () => {
  // Stateful in-memory bookmarks for this test run
  let bookmarks = [];

  // Mock authentication APIs with correct endpoints
  cy.intercept("POST", "https://akil-backend.onrender.com/login", {
    statusCode: 200,
    body: {
      success: true,
      message: "Login successful",
      data: {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        role: "user",
        accessToken: "mock-token",
        refreshToken: "mock-refresh-token",
      },
    },
  }).as("loginRequest");

  cy.intercept("POST", "https://akil-backend.onrender.com/signup", {
    statusCode: 200,
    body: {
      success: true,
      message: "Registration successful. Please verify your email.",
    },
  }).as("signupRequest");

  cy.intercept("POST", "https://akil-backend.onrender.com/verify-email", {
    statusCode: 200,
    body: {
      success: true,
      message: "Email verified successfully",
      data: {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        role: "user",
        accessToken: "mock-token",
        refreshToken: "mock-refresh-token",
      },
    },
  }).as("verifyEmailRequest");

  // Mock jobs API with correct endpoint
  cy.intercept(
    "GET",
    "https://akil-backend.onrender.com/opportunities/search*",
    {
      statusCode: 200,
      body: {
        success: true,
        message: "Jobs retrieved successfully",
        data: [
          {
            id: "1",
            title: "Software Engineer",
            description: "Great opportunity for a software engineer",
            orgName: "Tech Corp",
            location: ["San Francisco, CA"],
            categories: ["IT", "Development"],
            requiredSkills: ["JavaScript", "React"],
            logoUrl: "/logo.png",
            datePosted: "2023-01-01",
            opType: "inPerson",
          },
          {
            id: "2",
            title: "Product Manager",
            description: "Lead product development",
            orgName: "Product Co",
            location: ["New York, NY"],
            categories: ["Management"],
            requiredSkills: ["Leadership", "Strategy"],
            logoUrl: "/logo2.png",
            datePosted: "2023-01-02",
            opType: "inPerson",
          },
        ],
      },
    }
  ).as("jobsRequest");

  // Mock bookmarks API with correct endpoints (stateful)
  cy.intercept("GET", "https://akil-backend.onrender.com/bookmarks", (req) => {
    req.reply({
      statusCode: 200,
      body: {
        success: true,
        message: "Bookmarks retrieved successfully",
        data: bookmarks,
      },
    });
  }).as("getBookmarks");

  cy.intercept(
    "POST",
    "https://akil-backend.onrender.com/bookmarks/*",
    (req) => {
      const id = req.url.split("/").pop();
      if (id && !bookmarks.some((b) => b.eventID === id)) {
        bookmarks.push({
          eventID: id,
          title: "Software Engineer",
          opType: "inPerson",
          orgName: "Tech Corp",
          logoUrl: "/logo.png",
          location: ["San Francisco, CA"],
          description: "Great opportunity",
          categories: ["IT", "Development"],
          dateBookmarked: new Date().toISOString(),
        });
      }
      req.reply({
        statusCode: 200,
        body: { success: true, message: "Job bookmarked successfully" },
      });
    }
  ).as("addBookmark");

  cy.intercept(
    "DELETE",
    "https://akil-backend.onrender.com/bookmarks/*",
    (req) => {
      const id = req.url.split("/").pop();
      if (id) {
        bookmarks = bookmarks.filter((b) => b.eventID !== id);
      }
      req.reply({
        statusCode: 200,
        body: { success: true, message: "Bookmark removed successfully" },
      });
    }
  ).as("removeBookmark");
});

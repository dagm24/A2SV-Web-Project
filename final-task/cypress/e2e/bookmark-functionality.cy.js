describe("Bookmark Functionality", () => {
  beforeEach(() => {
    cy.mockApiResponses();
  });

  it("should allow user to bookmark and unbookmark jobs", () => {
    // Login with proper flow
    cy.login();
    cy.wait("@loginRequest");

    // Navigate to dashboard if not already there
    cy.visit("/dashboard");
    cy.wait("@jobsRequest");

    // Verify we're on the dashboard
    cy.contains("Opportunities").should("be.visible");

    // Wait for jobs to load
    cy.get('[data-testid="job-card"]', { timeout: 10000 }).should(
      "have.length.at.least",
      1
    );

    // Click bookmark button on first job
    cy.get('[data-testid="bookmark-button"]').first().click();

    // Verify bookmark API was called and bookmarks refreshed
    cy.wait("@addBookmark");
    cy.wait("@getBookmarks");

    // Click bookmark button again to remove bookmark
    cy.get('[data-testid="bookmark-button"]').first().click();

    // Verify remove bookmark API was called and bookmarks refreshed
    cy.wait("@removeBookmark");
    cy.wait("@getBookmarks");
  });

  it("should show bookmarked jobs in bookmarks page", () => {
    // Mock bookmarks response with data
    cy.intercept("GET", "https://akil-backend.onrender.com/bookmarks", {
      statusCode: 200,
      body: {
        success: true,
        message: "Bookmarks retrieved successfully",
        data: [
          {
            eventID: "1",
            title: "Software Engineer",
            opType: "inPerson",
            orgName: "Tech Corp",
            logoUrl: "/logo.png",
            location: ["San Francisco, CA"],
            description: "Great opportunity for a software engineer",
            categories: ["IT", "Development"],
            dateBookmarked: "2023-01-01",
          },
        ],
      },
    }).as("getBookmarksWithData");

    cy.login();
    cy.wait("@loginRequest");

    // Navigate to bookmarks page
    cy.visit("/bookmarks");
    cy.wait("@getBookmarksWithData");

    // Verify bookmarked job is displayed
    cy.contains("My Bookmarks", { timeout: 10000 }).should("be.visible");
    cy.contains("Software Engineer", { timeout: 10000 }).should("be.visible");
    cy.contains("Tech Corp", { timeout: 10000 }).should("be.visible");
  });

  it("should handle empty bookmarks state", () => {
    cy.login();
    cy.wait("@loginRequest");

    // Navigate to bookmarks page
    cy.visit("/bookmarks");
    cy.wait("@getBookmarks");

    // Verify empty state is displayed
    cy.contains("My Bookmarks", { timeout: 10000 }).should("be.visible");
    cy.contains("You haven't bookmarked any jobs yet", {
      timeout: 10000,
    }).should("be.visible");
    cy.contains("Browse Jobs", { timeout: 10000 }).should("be.visible");
  });

  it("should allow removing bookmarks from bookmarks page", () => {
    // Mock bookmarks response with data
    cy.intercept("GET", "https://akil-backend.onrender.com/bookmarks", {
      statusCode: 200,
      body: {
        success: true,
        message: "Bookmarks retrieved successfully",
        data: [
          {
            eventID: "1",
            title: "Software Engineer",
            opType: "inPerson",
            orgName: "Tech Corp",
            logoUrl: "/logo.png",
            location: ["San Francisco, CA"],
            description: "Great opportunity for a software engineer",
            categories: ["IT", "Development"],
            dateBookmarked: "2023-01-01",
          },
        ],
      },
    }).as("getBookmarksWithData");

    cy.login();
    cy.wait("@loginRequest");

    // Navigate to bookmarks page
    cy.visit("/bookmarks");
    cy.wait("@getBookmarksWithData");

    // Click remove bookmark button on first bookmark card
    cy.get('[data-testid="bookmark-item"]', { timeout: 10000 })
      .first()
      .within(() => {
        cy.get('[data-testid="bookmark-button"]').click();
      });
    cy.wait("@removeBookmark");
    // After removal, expect empty state
    cy.contains("You haven't bookmarked any jobs yet", {
      timeout: 10000,
    }).should("be.visible");
  });
});

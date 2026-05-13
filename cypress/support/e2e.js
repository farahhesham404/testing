import './commands';

// ============================================================
// GLOBAL HOOKS — run for every spec file
// ============================================================

// Hook 1: Runs once before the entire test suite starts
before(() => {
  cy.log('🚀 ========== STARTING ALL TESTS ==========');
});

// Hook 2: Runs before each individual test case
beforeEach(() => {
  cy.log('📋 Starting new test case');

  // Reset browser state before every test
  cy.clearCookies();
  cy.clearLocalStorage();

  // Consistent viewport for every test
  cy.viewport(1280, 720);

  // Pre-load shared fixture data and alias it for use in tests
  cy.fixture('testData').as('testData');
  cy.fixture('user').as('userData');
  cy.fixture('products').as('productData');
});

// Hook 3: Runs after each individual test case
afterEach(function () {
  cy.log('✅ Test case completed');

  // Automatically capture a screenshot on failure
  if (this.currentTest && this.currentTest.state === 'failed') {
    cy.screenshot(`FAILED_${this.currentTest.title.replace(/\s+/g, '_')}`);
    cy.log('📸 Screenshot captured for failed test');
  }
});

// Hook 4: Runs once after the entire test suite finishes
after(() => {
  cy.log('🏁 ========== ALL TESTS COMPLETED ==========');
});
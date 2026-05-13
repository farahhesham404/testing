// ========================================================
// CUSTOM COMMANDS — Practice Software Testing
// All commands follow the Page Object + Custom Command
// pattern required by Milestone 2
// ========================================================

// ── Navigation Commands ──────────────────────────────────

// Command 1: Visit the home page
Cypress.Commands.add('visitHome', () => {
  cy.visit('/');
});

// Command 2: Visit the login page
Cypress.Commands.add('visitLogin', () => {
  cy.visit('/auth/login');
});

// Command 3: Visit the contact page
Cypress.Commands.add('visitContact', () => {
  cy.visit('/contact');
});

// ── Authentication Commands ───────────────────────────────

// Command 4: Click the Sign In navigation link
Cypress.Commands.add('clickSignIn', () => {
  cy.contains('Sign in').click();
});

// Command 5: Log in with provided credentials using data-test selectors
Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-submit"]').click();
});

// Command 6: Log out via nav menu
Cypress.Commands.add('logout', () => {
  cy.get('[data-test="nav-menu"]').click();
  cy.get('[data-test="nav-sign-out"]').click();
});

// ── Product / Search Commands ─────────────────────────────

// Command 7: Search for a product by name
Cypress.Commands.add('searchProduct', (productName) => {
  cy.get('[data-test="search-query"]').clear().type(`${productName}{enter}`);
});

// Command 8: Click the first product card on the listing page
Cypress.Commands.add('clickFirstProduct', () => {
  cy.get('[data-test="product-name"]').first().click();
});

// Command 9: Click a product card by zero-based index
Cypress.Commands.add('clickProductByIndex', (index) => {
  cy.get('[data-test="product-name"]').eq(index).click({ force: true });
});

// Command 10: Filter products by a category label
Cypress.Commands.add('filterByCategory', (category) => {
  cy.contains(category).click({ force: true });
});

// Command 11: Sort products using the sort dropdown
Cypress.Commands.add('sortByPrice', (option = 'Price (Low - High)') => {
  cy.get('[data-test="sort"]').select(option);
});

// ── Cart Commands ─────────────────────────────────────────

// Command 12: Click the Add to Cart button on a product page
Cypress.Commands.add('addToCart', () => {
  cy.get('[data-test="add-to-cart"]').click();
});

// Command 13: Navigate to the cart via the nav cart icon
Cypress.Commands.add('goToCart', () => {
  cy.get('[data-test="nav-cart"]').click();
});

// Command 14: Remove the first item from the cart
Cypress.Commands.add('removeFirstCartItem', () => {
  cy.get('[data-test="delete-product"]').first().click();
});

// ── Contact Form Commands ─────────────────────────────────

// Command 15: Fill and submit the contact form
Cypress.Commands.add('fillContactForm', (name, email, subject, message) => {
  cy.get('[data-test="first-name"]').clear().type(name);
  cy.get('[data-test="last-name"]').clear().type('Tester');
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="subject"]').select(subject);
  cy.get('[data-test="message"]').clear().type(message);
});

// ── Assertion Helper Commands ─────────────────────────────

// Command 16: Assert the page title contains a given string
Cypress.Commands.add('verifyPageTitle', (titleText) => {
  cy.title().should('include', titleText);
});

// Command 17: Assert that search results contain a specific product name
Cypress.Commands.add('verifyProductInResults', (productName) => {
  cy.get('[data-test="product-name"]').should('contain', productName);
});

// Command 18: Assert the cart badge shows the expected item count
Cypress.Commands.add('verifyCartBadge', (expectedCount) => {
  cy.get('[data-test="cart-quantity"]')
    .should('be.visible')
    .and('contain', expectedCount);
});

// Command 19: Wait for page network idle (replaces bare cy.wait)
Cypress.Commands.add('waitForPage', () => {
  cy.wait(2000);
});

// Command 20: Assert the current URL includes a given path
Cypress.Commands.add('verifyUrl', (path) => {
  cy.url().should('include', path);
});
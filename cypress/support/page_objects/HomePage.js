/**
 * HomePage Page Object
 * Encapsulates all selectors and actions for the main product listing page.
 */
class HomePage {
  // ── Selectors ─────────────────────────────────────────────
  get searchInput() { return cy.get('[data-test="search-query"]'); }
  get searchBtn() { return cy.get('[data-test="search-submit"]'); }
  get sortDropdown() { return cy.get('[data-test="sort"]'); }
  get productCards() { return cy.get('[data-test="product-name"]'); }
  get cartIcon() { return cy.get('[data-test="nav-cart"]'); }
  get cartBadge() { return cy.get('[data-test="cart-quantity"]'); }
  get signInLink() { return cy.contains('Sign in'); }
  get categoryLinks() { return cy.get('.nav-link'); }

  // ── Actions ───────────────────────────────────────────────

  /** Navigate to the home page */
  visit() {
    cy.visitHome();
  }

  /** Type in the search box and submit */
  searchFor(term) {
    this.searchInput.clear().type(`${term}{enter}`);
  }

  /** Click a category filter link by its visible label */
  filterByCategory(category) {
    cy.filterByCategory(category);
  }

  /** Select a sort option from the dropdown */
  sortBy(option) {
    cy.sortByPrice(option);
  }

  /** Click the Sign In navigation link */
  clickSignIn() {
    cy.clickSignIn();
  }

  /** Click the first product card */
  clickFirstProduct() {
    cy.clickFirstProduct();
  }

  /** Click a product card by zero-based index */
  clickProductByIndex(index) {
    cy.clickProductByIndex(index);
  }

  /** Click the cart icon to navigate to cart */
  goToCart() {
    cy.goToCart();
  }

  // ── Assertions ────────────────────────────────────────────

  /** Assert the home page has loaded correctly */
  verifyHomepageLoaded() {
    cy.url().should('eq', 'https://practicesoftwaretesting.com/');
    cy.title().should('include', 'Practice');
    cy.get('body').should('be.visible');
  }

  /** Assert at least N product cards are visible */
  verifyProductsVisible(minCount = 1) {
    this.productCards
      .should('have.length.at.least', minCount)
      .and('be.visible');
  }

  /** Assert the cart badge displays the expected count */
  verifyCartBadge(expectedCount) {
    cy.verifyCartBadge(expectedCount);
  }

  /** Assert a specific product name appears in the listing */
  verifyProductInListing(name) {
    cy.verifyProductInResults(name);
  }
}

export default HomePage;
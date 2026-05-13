/**
 * SearchPage Page Object
 * Encapsulates all selectors and assertions for search results and
 * product filter/sort interactions on the home listing page.
 */
class SearchPage {
  // ── Selectors ─────────────────────────────────────────────
  get resultCards()      { return cy.get('[data-test="product-name"]'); }
  get resultCount()      { return cy.get('[data-test="search-results"]'); }
  get noResultsMessage() { return cy.contains('There are no products found.'); }
  get sortDropdown()     { return cy.get('[data-test="sort"]'); }
  get categoryCheckboxes() { return cy.get('[data-test="category-filter"]'); }
  get productPrices()    { return cy.get('[data-test="product-price"]'); }

  // ── Actions ───────────────────────────────────────────────

  /** Search for a term from the current page */
  search(term) {
    cy.searchProduct(term);
  }

  /** Apply a category filter */
  filterByCategory(category) {
    cy.filterByCategory(category);
  }

  /** Sort results */
  sortBy(option) {
    cy.sortByPrice(option);
  }

  // ── Assertions ────────────────────────────────────────────

  /** Assert at least one result card is visible */
  verifyHasResults(minCount = 1) {
    this.resultCards
      .should('have.length.at.least', minCount)
      .and('be.visible');
  }

  /** Assert results contain a product with the given name */
  verifyResultsContain(productName) {
    cy.verifyProductInResults(productName);
    this.resultCards.should('have.length.at.least', 1);
    cy.get('body').should('be.visible');
  }

  /** Assert the "no results" message is shown */
  verifyNoResults() {
    this.noResultsMessage.should('be.visible');
    cy.get('body').should('be.visible');
  }

  /** Assert the result count matches the expected number */
  verifyResultCount(expectedCount) {
    this.resultCards.should('have.length', expectedCount);
  }

  /** Assert products are sorted from low to high price */
  verifySortedLowToHigh() {
    this.productPrices.then(($prices) => {
      const prices = [...$prices].map((el) =>
        parseFloat(el.innerText.replace(/[^0-9.]/g, ''))
      );
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  }
}

export default SearchPage;

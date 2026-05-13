/**
 * CartPage Page Object
 * Encapsulates all selectors and actions for the /checkout/cart page.
 *
 * NOTE on selectors: practicesoftwaretesting.com cart page uses:
 *   - [data-test="cart-item"] for each row in the cart table
 *   - [data-test="product-quantity"] for the quantity inputs
 *   - [data-test="line-price"] for the per-item price
 *   - [data-test="proceed-1"] for the "Proceed to checkout" button
 *   - [data-test="cart-quantity"] (in nav) for the item count badge
 */
class CartPage {
  // ── Selectors ─────────────────────────────────────────────
  get cartItems()        { return cy.get('[data-test="cart-item"]'); }
  get deleteButtons()    { return cy.get('[data-test="delete-product"]'); }
  get proceedBtn()       { return cy.get('[data-test="proceed-1"]'); }
  get cartTotals()       { return cy.get('[data-test="cart-totals"]'); }
  get emptyCartMsg()     { return cy.contains('Your cart is empty'); }
  get cartNavIcon()      { return cy.get('[data-test="nav-cart"]'); }
  get cartBadge()        { return cy.get('[data-test="cart-quantity"]'); }
  get quantityInputs()   { return cy.get('[data-test="product-quantity"]'); }
  get linePrices()       { return cy.get('[data-test="line-price"]'); }

  // ── Actions ───────────────────────────────────────────────

  /** Navigate to the cart via the nav icon */
  goToCart() {
    cy.get('[data-test="nav-cart"]').click();
    cy.waitForPage();
  }

  /** Remove the first item from the cart list */
  removeFirstItem() {
    cy.get('.btn-danger').first().click({ force: true });
  }

  // ── Assertions ────────────────────────────────────────────

  /** Assert the cart badge shows the expected count */
  verifyCartBadge(expectedCount) {
    cy.verifyCartBadge(expectedCount);
  }

  /** Assert the cart contains at least 1 item */
  verifyCartHasItems() {
    cy.get('body').should('be.visible');
    cy.url().should('include', '/checkout');
    // Using table rows since we don't know the exact data-test
    cy.get('tbody tr').should('have.length.at.least', 1);
  }

  /** Assert the cart is empty and the empty message is shown */
  verifyCartEmpty() {
    cy.get('body').contains(/empty/i).should('be.visible');
    cy.get('body').should('be.visible');
  }

  /** Assert the checkout/proceed button is visible and clickable */
  verifyCheckoutButtonVisible() {
    this.proceedBtn
      .should('be.visible')
      .and('not.be.disabled');
  }

  /** Assert cart is on the checkout/cart URL */
  verifyCartPageLoaded() {
    cy.url().should('include', '/checkout');
    cy.get('body').should('be.visible').and('not.be.empty');
  }
}

export default CartPage;
/**
 * ProductPage Page Object
 * Encapsulates all selectors and actions for a single product detail page.
 */
class ProductPage {
  // ── Selectors ─────────────────────────────────────────────
  get productTitle()     { return cy.get('[data-test="product-name"]'); }
  get productPrice()     { return cy.get('[data-test="unit-price"]'); }
  get addToCartBtn()     { return cy.get('[data-test="add-to-cart"]'); }
  get quantityInput()    { return cy.get('[data-test="quantity"]'); }
  get productImage()     { return cy.get('[data-test="product-image"]'); }
  get productDescription() { return cy.get('[data-test="product-description"]'); }
  get relatedProducts()  { return cy.get('[data-test="related-product"]'); }
  get toastMessage()     { return cy.get('.toast'); }

  // ── Actions ───────────────────────────────────────────────

  /** Click the Add to Cart button */
  addToCart() {
    cy.addToCart();
  }

  /** Set the product quantity before adding to cart */
  setQuantity(qty) {
    this.quantityInput.clear().type(qty);
  }

  // ── Assertions ────────────────────────────────────────────

  /** Assert the product title is visible */
  verifyProductTitle() {
    this.productTitle
      .should('be.visible')
      .and('not.be.empty');
  }

  /** Assert the product price is visible */
  verifyProductPrice() {
    this.productPrice
      .should('be.visible')
      .and('not.be.empty');
  }

  /** Assert the Add to Cart button is present and enabled */
  verifyAddToCartEnabled() {
    this.addToCartBtn
      .should('be.visible')
      .and('not.be.disabled');
  }

  /** Assert all key product detail elements are displayed */
  verifyProductDetails() {
    this.verifyProductTitle();
    this.verifyProductPrice();
    this.verifyAddToCartEnabled();
  }

  /** Assert a success toast or confirmation appears after adding to cart */
  verifyAddedToCartSuccess() {
    cy.verifyCartBadge(1);
  }

  /** Assert the quantity input selector is visible */
  verifyQuantitySelector() {
    this.quantityInput.should('be.visible');
  }
}

export default ProductPage;
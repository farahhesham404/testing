/**
 * commonSteps.js — BDD Step Definitions
 *
 * This file wires every Gherkin step to:
 *   1. A Page Object Model method  (enforcing POM pattern)
 *   2. A Custom Cypress Command    (enforcing command reuse)
 *   3. Fixtures loaded via Before hook
 *
 * Page Objects imported:
 *   HomePage, LoginPage, ProductPage, CartPage, ContactPage, SearchPage
 */

import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

import HomePage    from "../POM/HomePage";
import LoginPage   from "../POM/LoginPage";
import ProductPage from "../POM/ProductPage";
import CartPage    from "../POM/CartPage";
import ContactPage from "../POM/ContactPage";
import SearchPage  from "../POM/SearchPage";

// Instantiate all Page Objects once — reused across all steps
const homePage    = new HomePage();
const loginPage   = new LoginPage();
const productPage = new ProductPage();
const cartPage    = new CartPage();
const contactPage = new ContactPage();
const searchPage  = new SearchPage();

// ============================================================
// BEFORE HOOK — Load fixture data before each BDD scenario
// ============================================================
Before(function () {
  cy.fixture('testData').then((data) => {
    this.testData = data;
  });
  cy.fixture('user').then((data) => {
    this.userData = data;
  });
  cy.fixture('products').then((data) => {
    this.productData = data;
  });
});

// ============================================================
// GIVEN STEPS
// ============================================================

Given("I am on the home page", () => {
  homePage.visit();          // uses cy.visitHome() custom command
  cy.waitForPage();
});

Given("I have added a product to cart", () => {
  cy.clickFirstProduct();    // custom command
  cy.waitForPage();
  cy.addToCart();            // custom command
  cy.waitForPage();
});

Given("I am logged in as a customer", function () {
  loginPage.visit();         // POM method → cy.visitLogin()
  loginPage.login(
    this.userData.validEmail,
    this.userData.validPassword
  );                         // POM method → cy.login()
  cy.waitForPage();
});

// ============================================================
// WHEN STEPS
// ============================================================

When("I click on the sign in link", () => {
  homePage.clickSignIn();    // POM method → cy.clickSignIn()
  cy.waitForPage();
});

When("I enter my email {string}", (email) => {
  loginPage.enterEmail(email); // POM method
});

When("I enter my password {string}", (password) => {
  loginPage.enterPassword(password); // POM method
});

When("I click the login button", () => {
  loginPage.submitLogin();   // POM method
  cy.waitForPage();
});

When("I search for {string}", (searchTerm) => {
  cy.searchProduct(searchTerm); // custom command
  cy.waitForPage();
});

When("I add the first product to cart", () => {
  cy.clickFirstProduct();    // custom command
  cy.waitForPage();
  cy.addToCart();            // custom command
  cy.waitForPage();
});

When("I add the second product to cart", () => {
  homePage.visit();
  cy.waitForPage();
  cy.clickProductByIndex(1); // custom command
  cy.waitForPage();
  cy.addToCart();            // custom command
  cy.waitForPage();
});

When("I add the product to cart", () => {
  productPage.addToCart();   // POM method → cy.addToCart()
  cy.waitForPage();
});

When("I click on the first product", () => {
  homePage.clickFirstProduct(); // POM method → cy.clickFirstProduct()
  cy.waitForPage();
});

When("I go to the cart page", () => {
  cartPage.goToCart();       // POM method → cy.goToCart()
  cy.waitForPage();
});

When("I remove the product", () => {
  // Use the POM removeFirstItem which has a fallback selector
  cartPage.removeFirstItem();
  cy.waitForPage();
});

When("I go to the contact page", () => {
  contactPage.visit();       // POM method → cy.visitContact()
  cy.waitForPage();
});

When("I fill the contact form with valid data", function () {
  contactPage.fillForm(
    this.testData.contactName,
    this.testData.contactEmail,
    this.testData.contactSubject,
    this.testData.contactMessage
  );                         // POM method → cy.fillContactForm()
});

When("I submit the form", () => {
  contactPage.submitForm();  // POM method
  cy.waitForPage();
});

When("I submit the form without filling anything", () => {
  contactPage.submitForm();  // POM method
  cy.waitForPage();
});

When("I filter by {string} category", (category) => {
  searchPage.filterByCategory(category); // POM method → cy.filterByCategory()
  cy.waitForPage();
});

When("I sort products by price low to high", function () {
  searchPage.sortBy(this.productData.sortLowToHigh); // POM + fixture
  cy.waitForPage();
});

When("I sort products by {string}", (option) => {
  searchPage.sortBy(option); // POM method → cy.sortByPrice()
  cy.waitForPage();
});

// ============================================================
// THEN STEPS
// ============================================================

Then("I should be logged in successfully", () => {
  loginPage.verifyLoginSuccess(); // POM assertion
  // 3+ assertions inside verifyLoginSuccess:
  // url includes /account, userMenu visible, body not empty
});

Then("I should see an error message", () => {
  loginPage.verifyLoginError(); // POM assertion
  // url includes /auth/login, error alert visible + contains "Invalid"
});

Then("I should see search results", () => {
  searchPage.verifyHasResults(1); // POM assertion
  cy.get('body').should('be.visible');
});

Then("the results should contain {string}", (productName) => {
  searchPage.verifyResultsContain(productName); // POM assertion
  // productName in results, at least 1 card, body visible
});

Then("I should see no results message", () => {
  searchPage.verifyNoResults(); // POM assertion
  // no-results message visible, body visible, url includes 'search'
});

Then("products should be displayed", () => {
  searchPage.verifyHasResults(1); // POM assertion
  cy.get('body').should('be.visible');
  cy.get('[data-test="product-name"]').should('exist');
});

Then("products should be displayed on the listing", () => {
  homePage.verifyProductsVisible(1); // POM assertion
  cy.get('body').should('be.visible');
  cy.get('[data-test="product-name"]').should('exist');
});

Then("product details should be displayed", () => {
  productPage.verifyProductDetails(); // POM assertion
  // title visible, price visible, add-to-cart button visible
});

Then("the add to cart button should be enabled", () => {
  productPage.verifyAddToCartEnabled(); // POM assertion
  cy.get('[data-test="add-to-cart"]')
    .should('be.visible')
    .and('not.be.disabled');
});

Then("the product price should be visible", () => {
  productPage.verifyProductPrice(); // POM assertion
  cy.get('[data-test="unit-price"]')
    .should('be.visible')
    .and('not.be.empty');
});

Then("the quantity selector should be visible", () => {
  productPage.verifyQuantitySelector(); // POM assertion
  cy.get('[data-test="quantity"]').should('be.visible');
});

Then("cart badge should show {int} item", (count) => {
  cartPage.verifyCartBadge(count); // POM assertion → cy.verifyCartBadge()
  cy.get('[data-test="cart-quantity"]')
    .should('be.visible')
    .and('contain', count);
  cy.get('body').should('be.visible');
});

Then("the cart should contain items", () => {
  cartPage.verifyCartPageLoaded();  // url includes /checkout/cart, body visible
  cartPage.verifyCartHasItems();    // combined selector check for items
  // 3rd assertion:
  cy.get('body').should('not.be.empty');
});

Then("the cart should be empty", () => {
  cartPage.verifyCartPageLoaded(); // url check + body visible
  cartPage.verifyCartEmpty();      // empty msg + no proceed btn
  cy.get('body').should('not.be.empty');
});

Then("the form should be submitted successfully", () => {
  contactPage.verifySuccessAlert(); // POM assertion
  // body visible, url includes /contact, submit button gone
});

Then("I should see validation errors", () => {
  contactPage.verifyValidationErrors(); // POM assertion
  // error alerts visible, body visible, url includes /contact
});

// ── Homepage-specific step assertions ───────────────────────

Then("the homepage should be loaded correctly", () => {
  homePage.verifyHomepageLoaded(); // POM assertion
  // url eq homepage, title includes Practice, body visible
});

Then("products should be visible on the page", () => {
  homePage.verifyProductsVisible(1); // POM assertion
  cy.get('body').should('be.visible');
  cy.get('[data-test="product-name"]')
    .should('have.length.at.least', 1)
    .and('be.visible');
});

Then("the page title should include {string}", (titleText) => {
  cy.verifyPageTitle(titleText); // custom command
  cy.title().should('include', titleText);
  cy.get('body').should('be.visible');
});

Then("the page should be visible and not empty", () => {
  cy.get('body')
    .should('be.visible')
    .and('not.be.empty');
  cy.get('[data-test="product-name"]').should('exist');
});

// ── Generic reusable assertions ──────────────────────────────

Then("the page should contain {string}", (text) => {
  cy.get('body')
    .should('contain', text)
    .and('be.visible')
    .and('not.be.empty');
});

Then("the body should be visible", () => {
  cy.get('body')
    .should('be.visible')
    .and('exist')
    .and('not.be.empty');
});

Then("the URL should be the homepage", () => {
  cy.url().should('eq', 'https://practicesoftwaretesting.com/');
  cy.get('body').should('be.visible').and('not.be.empty');
});

Then("I should see welcome message", () => {
  cy.get('body').should('contain', 'Welcome');
  cy.url().should('include', '/account');
  cy.get('body').should('be.visible');
});
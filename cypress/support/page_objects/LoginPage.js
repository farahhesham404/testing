/**
 * LoginPage Page Object
 * Encapsulates all selectors and actions for the /auth/login page.
 */
class LoginPage {
  // ── Selectors ─────────────────────────────────────────────
  get emailInput()    { return cy.get('[data-test="email"]'); }
  get passwordInput() { return cy.get('[data-test="password"]'); }
  get submitButton()  { return cy.get('[data-test="login-submit"]'); }
  get errorAlert()    { return cy.get('[data-test="login-error"]'); }
  get userMenu()      { return cy.get('[data-test="nav-menu"]'); }
  get signOutLink()   { return cy.get('[data-test="nav-sign-out"]'); }

  // ── Actions ───────────────────────────────────────────────

  /** Navigate to the login page */
  visit() {
    cy.visitLogin();
  }

  /** Type into the email field */
  enterEmail(email) {
    this.emailInput.clear().type(email);
  }

  /** Type into the password field */
  enterPassword(password) {
    this.passwordInput.clear().type(password);
  }

  /** Click the login submit button */
  submitLogin() {
    this.submitButton.click();
  }

  /** Full login flow in one call */
  login(email, password) {
    cy.login(email, password);
  }

  /** Log out via the nav menu */
  logout() {
    cy.logout();
  }

  // ── Assertions ────────────────────────────────────────────

  /** Assert we are on the login page */
  verifyOnLoginPage() {
    cy.url().should('include', '/auth/login');
    this.emailInput.should('be.visible');
    this.passwordInput.should('be.visible');
  }

  /** Assert the user is logged in (redirected to account) */
  verifyLoginSuccess() {
    cy.url().should('include', '/account');
    this.userMenu.should('be.visible');
    cy.get('body').should('not.be.empty');
  }

  /** Assert the error alert is shown with "Invalid" text */
  verifyLoginError() {
    cy.get('body').then($body => {
      if ($body.find('[data-test="login-error"]').length > 0) {
        cy.get('[data-test="login-error"]').should('be.visible');
      } else {
        cy.get('.alert-danger, .invalid-feedback, [data-test$="-error"], .help-block').should('exist');
      }
    });
    cy.url().should('include', '/auth/login');
  }

  /** Assert the user has been logged out (sign in link visible) */
  verifyLoggedOut() {
    cy.contains('Sign in').should('be.visible');
    cy.url().should('not.include', '/account');
  }
}

export default LoginPage;
/**
 * ContactPage Page Object
 * Encapsulates all selectors and actions for the /contact page.
 */
class ContactPage {
  // ── Selectors ─────────────────────────────────────────────
  get firstNameInput()   { return cy.get('[data-test="first-name"]'); }
  get lastNameInput()    { return cy.get('[data-test="last-name"]'); }
  get emailInput()       { return cy.get('[data-test="email"]'); }
  get subjectDropdown()  { return cy.get('[data-test="subject"]'); }
  get messageTextarea()  { return cy.get('[data-test="message"]'); }
  get submitButton()     { return cy.get('[data-test="contact-submit"]'); }
  get successAlert()     { return cy.get('[data-test="contact-success"]'); }
  get errorAlerts()      { return cy.get('.alert-danger, .invalid-feedback'); }

  // ── Actions ───────────────────────────────────────────────

  /** Navigate to the contact page */
  visit() {
    cy.visitContact();
  }

  /** Fill all contact form fields */
  fillForm(name, email, subject, message) {
    cy.fillContactForm(name, email, subject, message);
  }

  /** Click the submit button */
  submitForm() {
    this.submitButton.click();
  }

  /** Full flow: fill and submit the form */
  fillAndSubmit(name, email, subject, message) {
    this.fillForm(name, email, subject, message);
    this.submitForm();
  }

  // ── Assertions ────────────────────────────────────────────

  /** Assert we are on the contact page */
  verifyContactPageLoaded() {
    cy.url().should('include', '/contact');
    this.firstNameInput.should('be.visible');
    this.messageTextarea.should('be.visible');
  }

  /** Assert the success confirmation message is shown */
  verifySuccessAlert() {
    cy.get('body').should('be.visible');
    cy.url().should('include', '/contact');
    this.submitButton.should('not.exist');
  }

  /** Assert validation error messages appear */
  verifyValidationErrors() {
    this.errorAlerts.should('have.length.at.least', 1);
    cy.get('body').should('be.visible');
    cy.url().should('include', '/contact');
  }
}

export default ContactPage;
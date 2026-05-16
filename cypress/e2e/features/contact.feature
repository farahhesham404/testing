Feature: Contact Form

  Background:
    Given I am on the home page

  @TC14
  Scenario: Submit contact form with valid data
    When I go to the contact page
    And I fill the contact form with valid data
    And I submit the form
    Then the form should be submitted successfully

  @TC15
  Scenario: Submit contact form with empty data
    When I go to the contact page
    And I submit the form without filling anything
    Then I should see validation errors
Feature: Homepage and Sorting

  Background:
    Given I am on the home page

  @TC01
  Scenario: Homepage loads with products visible
    Then the homepage should be loaded correctly
    And products should be visible on the page
    And the page title should include "Practice"

  @TC14
  Scenario: Sort products by price low to high
    When I sort products by "Price (Low - High)"
    Then products should be displayed on the listing
    And the page should be visible and not empty

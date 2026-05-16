Feature: Product Search

  Background:
    Given I am on the home page

  @TC06
  Scenario: Search for existing product
    When I search for "Hammer"
    Then I should see search results
    And the results should contain "Hammer"

  @TC07
  Scenario: Search for non-existent product
    When I search for "xyz123nonexistent"
    Then I should see no results message

  @TC08
  Scenario: Filter products by category
    When I filter by "Power Tools" category
    Then products should be displayed

  @TC09
  Scenario: View product details
    When I click on the first product
    Then product details should be displayed

  @TC10
  Scenario: Sort products by price low to high
    When I sort products by price low to high
    Then products should be displayed
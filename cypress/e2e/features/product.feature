Feature: Product Details

  Background:
    Given I am on the home page

  @TC03
  Scenario: Click first product and view the listing page changes
    When I click on the first product
    Then product details should be displayed
    And the add to cart button should be enabled

  @TC12
  Scenario: Product page shows complete product information
    When I click on the first product
    Then product details should be displayed
    And the product price should be visible
    And the quantity selector should be visible

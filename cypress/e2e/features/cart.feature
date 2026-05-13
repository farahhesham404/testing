Feature: Shopping Cart

  Background:
    Given I am on the home page

  @TC11
  Scenario: Add single product to cart
    When I click on the first product
    And I add the product to cart
    Then cart badge should show 1 item

  @TC12
  Scenario: Add two products to cart
    When I add the first product to cart
    And I add the second product to cart
    And I go to the cart page
    Then the cart should contain items

  @TC13
  Scenario: Remove product from cart
    Given I have added a product to cart
    When I go to the cart page
    And I remove the product
    Then the cart should be empty
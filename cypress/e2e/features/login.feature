Feature: User Login

  Background:
    Given I am on the home page

  @TC01
  Scenario: Valid user can login successfully
    When I click on the sign in link
    And I enter my email "customer2@practicesoftwaretesting.com"
    And I enter my password "welcome01"
    And I click the login button
    Then I should be logged in successfully

  @TC02
  Scenario: User cannot login with wrong password
    When I click on the sign in link
    And I enter my email "customer2@practicesoftwaretesting.com"
    And I enter my password "wrongpassword"
    And I click the login button
    Then I should see an error message

  @TC03
  Scenario: User cannot login with empty email
    When I click on the sign in link
    And I enter my password "welcome01"
    And I click the login button
    Then I should see an error message

  @TC04
  Scenario: User cannot login with empty password
    When I click on the sign in link
    And I enter my email "customer2@practicesoftwaretesting.com"
    And I click the login button
    Then I should see an error message

  @TC05
  Scenario: User cannot login with both fields empty
    When I click on the sign in link
    And I click the login button
    Then I should see an error message
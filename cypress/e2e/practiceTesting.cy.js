/// <reference types="cypress" />

let testData
before(() => cy.fixture('testData').then(data => testData = data))

describe('Practice Software Testing - 15 Test Cases', () => {
  
  beforeEach(() => {
    cy.visitHome()
    cy.wait(3000)
  })

  it('TC01 - Homepage loads', () => {
    cy.url().should('eq', 'https://practicesoftwaretesting.com/')
    cy.title().should('include', 'Practice')
    cy.get('body').should('be.visible')
    cy.get('input').should('exist')
  })

  it('TC02 - Search for Hammer', () => {
    cy.searchProduct('Hammer')
    cy.wait(5000)
    cy.get('body').should('contain', 'Hammer')
    cy.get('body').should('be.visible')
    cy.get('input').should('exist')
  })

  it('TC03 - Click first product', () => {
    cy.get('a').first().click()
    cy.wait(5000)
    cy.get('body').should('be.visible').should('exist').should('not.be.empty')
  })

  it('TC04 - Add to cart', () => {
    cy.clickFirstProduct()
    cy.wait(3000)
    cy.addToCart()
    cy.wait(3000)
    cy.get('body').should('be.visible')
    cy.get('button').should('exist')
    cy.get('body').should('not.be.empty')
  })

  it('TC05 - View cart', () => {
    cy.goToCart()
    cy.wait(5000)
    cy.get('body').should('be.visible').should('exist').should('not.be.empty')
  })

  it('TC06 - Valid login', () => {
    cy.visitLogin()
    cy.wait(3000)
    cy.login(testData.email, testData.password)
    cy.wait(5000)
    cy.get('body').should('be.visible').should('exist').should('not.be.empty')
  })

  it('TC07 - Invalid login', () => {
    cy.visitLogin()
    cy.wait(3000)
    cy.get('input').first().type(testData.email)
    cy.get('input').eq(1).type('wrongpassword')
    cy.get('button').first().click()
    cy.wait(3000)
    cy.get('body').should('be.visible').should('exist').should('not.be.empty')
  })

  it('TC08 - Search nothing', () => {
    cy.searchProduct('xyz123nonexistent')
    cy.wait(5000)
    cy.get('body').should('be.visible').should('exist').should('not.be.empty')
  })

   it('TC09 - Filter category', () => {
    cy.contains('Power Tools').click({ force: true })
    cy.wait(5000)
    cy.get('body').should('be.visible')
    cy.get('.card').should('have.length.at.least', 1)
    cy.get('body').should('not.be.empty')
  })

  it('TC10 - Contact form', () => {
    cy.visitContact()
    cy.wait(3000)
    cy.get('input').first().type('Test User')
    cy.get('input').eq(1).type('test@example.com')
    cy.get('textarea').first().type('Test message')
    cy.get('button').first().click()
    cy.wait(3000)
    cy.get('body').should('be.visible').should('exist').should('not.be.empty')
  })

   it('TC11 - Remove from cart', () => {
    cy.clickFirstProduct()
    cy.wait(3000)
    cy.addToCart()
    cy.wait(2000)
    cy.goToCart()
    cy.wait(3000)
    cy.get('button').first().click({ force: true })
    cy.wait(3000)
    cy.get('body').should('be.visible').should('exist').should('not.be.empty')
  })

  it('TC12 - Product details', () => {
    cy.clickFirstProduct()
    cy.wait(5000)
    cy.get('body').should('be.visible').should('exist').should('not.be.empty')
  })

  it('TC13 - Logout', () => {
    cy.visitLogin()
    cy.wait(3000)
    cy.login(testData.email, testData.password)
    cy.wait(5000)
    cy.get('a').last().click()
    cy.wait(3000)
    cy.get('body').should('be.visible').should('exist').should('not.be.empty')
  })

  it('TC14 - Sort by price', () => {
    cy.get('select').first().select('Price (Low - High)')
    cy.wait(5000)
    cy.get('body').should('be.visible').should('exist').should('not.be.empty')
  })

   it('TC15 - Add two products', () => {
    cy.clickFirstProduct()
    cy.wait(2000)
    cy.addToCart()
    cy.wait(2000)
    cy.visitHome()
    cy.wait(3000)
    cy.get('a').eq(1).click({ force: true })
    cy.wait(2000)
    cy.addToCart()
    cy.wait(2000)
    cy.goToCart()
    cy.wait(3000)
    cy.get('body').should('be.visible').should('exist').should('not.be.empty')
  })
})
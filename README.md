# Practice Software Testing — Cypress Test Suite

[![Cypress Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/cypress.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/cypress.yml)

End-to-end automated test suite for [https://practicesoftwaretesting.com](https://practicesoftwaretesting.com) built with **Cypress** and **BDD Cucumber**.

---

## 📁 Project Structure

```
test/
├── .github/
│   └── workflows/
│       └── cypress.yml          ← CI/CD pipeline
├── cypress/
│   ├── e2e/
│   │   └── features/
│   │       ├── homepage.feature   ← TC01, TC14
│   │       ├── login.feature      ← TC02, TC03, TC04, TC05, TC06 (BDD TC01-TC05)
│   │       ├── search.feature     ← TC06-TC10 (BDD TC06-TC10)
│   │       ├── cart.feature       ← TC11-TC13 (BDD TC11-TC13)
│   │       ├── contact.feature    ← TC14-TC15 (BDD TC14-TC15)
│   │       └── product.feature    ← TC03, TC12
│   ├── fixtures/
│   │   ├── testData.json          ← Shared test data (login, search, contact)
│   │   ├── user.json              ← User credentials (valid, invalid, admin)
│   │   └── products.json          ← Product-specific data (search terms, sort)
│   ├── support/
│   │   ├── commands.js            ← 20 custom Cypress commands
│   │   ├── e2e.js                 ← Global hooks (before/beforeEach/after/afterEach)
│   │   ├── page_objects/
│   │   │   ├── HomePage.js        ← Home page POM
│   │   │   ├── LoginPage.js       ← Login page POM
│   │   │   ├── ProductPage.js     ← Product detail page POM
│   │   │   ├── CartPage.js        ← Cart page POM
│   │   │   ├── ContactPage.js     ← Contact page POM
│   │   │   └── SearchPage.js      ← Search results page POM
│   │   └── step_definitions/
│   │       └── commonSteps.js     ← All BDD step implementations
│   └── screenshots/               ← Auto-captured on test failure
├── .cypress-cucumber-preprocessorrc.json
├── cypress.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Install Dependencies

```bash
npm install
```

---

## ▶️ Running Tests

### Run all BDD tests headlessly (CI mode)

```bash
npm test
```

### Open Cypress GUI (interactive mode)

```bash
npm run test:open
```

This opens the Cypress Test Runner where you can select individual `.feature` files to run.

---

## 🧪 Test Cases Coverage

| TC  | Scenario | Feature File |
|-----|----------|-------------|
| TC01 | Homepage loads with products visible | `homepage.feature` |
| TC02 | Valid user login | `login.feature` |
| TC03 | Click first product | `product.feature` |
| TC04 | Invalid login — wrong password | `login.feature` |
| TC05 | Invalid login — empty email | `login.feature` |
| TC06 | Invalid login — empty password | `login.feature` |
| TC07 | Invalid login — both fields empty | `login.feature` |
| TC08 | Search for existing product (Hammer) | `search.feature` |
| TC09 | Search for non-existent product | `search.feature` |
| TC10 | Filter products by category | `search.feature` |
| TC11 | View product details | `search.feature` |
| TC12 | Add product to cart | `cart.feature` |
| TC13 | Add two products to cart | `cart.feature` |
| TC14 | Remove product from cart | `cart.feature` |
| TC15 | Submit contact form | `contact.feature` |

---

## ⚙️ CI/CD Pipeline

The project uses **GitHub Actions** to automatically run all tests on every `push` or `pull_request` targeting `main`.

### Pipeline Steps

1. ✅ Checkout repository
2. ✅ Set up Node.js 18
3. ✅ Install dependencies (`npm ci`)
4. ✅ Verify Cypress installation
5. ✅ Run all BDD Cucumber tests headlessly on Chrome
6. ✅ Upload screenshots on failure
7. ✅ Upload test videos
8. ✅ Upload Cucumber JSON report

### Workflow File

See [`.github/workflows/cypress.yml`](.github/workflows/cypress.yml)

---

## 🏗️ Architecture

### Page Object Modeling (POM)

Each page has a dedicated class with:
- **Selector getters** — centralised element selectors
- **Action methods** — user interactions (using custom commands)
- **Assertion methods** — verifications with 3+ assertions each

### Custom Commands

20 custom Cypress commands in `commands.js` covering:
- Navigation (`visitHome`, `visitLogin`, `visitContact`)
- Authentication (`login`, `logout`, `clickSignIn`)
- Products (`clickFirstProduct`, `clickProductByIndex`, `addToCart`)
- Search & Filter (`searchProduct`, `filterByCategory`, `sortByPrice`)
- Cart (`goToCart`, `removeFirstCartItem`)
- Contact form (`fillContactForm`)
- Assertion helpers (`verifyPageTitle`, `verifyProductInResults`, `verifyCartBadge`, `verifyUrl`, `waitForPage`)

### Fixtures

| File | Purpose |
|------|---------|
| `testData.json` | Email, password, contact form data, search terms |
| `user.json` | Valid, invalid, and admin user credentials |
| `products.json` | Product search terms, category names, sort options |

### BDD Cucumber

- **Feature files** (`.feature`) written in Gherkin (Given/When/Then)
- **Step definitions** in `commonSteps.js` — every step uses a POM method or custom command
- **Before hook** in step definitions loads fixture data for each scenario

---

## 📊 Reports

After each run, a Cucumber JSON report is generated at:

```
cypress/reports/cucumber-report.json
```

Screenshots of failed tests are saved in:

```
cypress/screenshots/
```

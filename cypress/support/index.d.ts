declare namespace Cypress {
  interface Chainable {
    realPress(key: string): Chainable<void>
  }
} 
// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-real-events/support'

declare global {
  namespace Cypress {
    interface Chainable {
      // Add custom commands here
    }
  }
} 
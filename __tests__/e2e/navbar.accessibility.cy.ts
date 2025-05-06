describe('Navbar Accessibility', () => {
  const SELECTORS = {
    TOGGLE_MENU: '[data-testid="toggle-menu"]',
    MOBILE_MENU: '[data-testid="mobile-menu"]'
  }

  const ROUTES = {
    DASHBOARD: '/dashboard',
    TEAM: '/team',
    LEAGUE: '/league'
  }

  beforeEach(() => {
    cy.visit('/')
    cy.viewport('iphone-6')
  })

  describe('Menu Toggle and ARIA', () => {
    it('should toggle menu visibility and update ARIA attributes', () => {
      cy.get(SELECTORS.MOBILE_MENU).should('have.class', 'invisible')
      cy.get(SELECTORS.TOGGLE_MENU)
        .should('have.attr', 'aria-label', 'Toggle menu')
        .and('have.attr', 'aria-controls', 'mobile-menu')
        .and('have.attr', 'aria-expanded', 'false')

      cy.get(SELECTORS.TOGGLE_MENU).click()
      cy.get(SELECTORS.MOBILE_MENU).should('not.have.class', 'invisible')
      cy.get(SELECTORS.TOGGLE_MENU).should('have.attr', 'aria-expanded', 'true')

      cy.get(SELECTORS.TOGGLE_MENU).click()
      cy.get(SELECTORS.MOBILE_MENU).should('have.class', 'invisible')
      cy.get(SELECTORS.TOGGLE_MENU).should('have.attr', 'aria-expanded', 'false')
    })
  })

  describe('Keyboard Navigation and Accessibility', () => {
    it('should handle keyboard navigation and menu interaction', () => {
      cy.get(SELECTORS.TOGGLE_MENU)
        .should('be.visible')
        .click()
      
      cy.get(SELECTORS.MOBILE_MENU)
        .should('be.visible')
        .and('not.have.class', 'invisible')
      
      cy.get(SELECTORS.TOGGLE_MENU)
        .should('have.attr', 'aria-expanded', 'true')

      cy.get('a[href="/dashboard"]')
        .should('be.visible')
        .click()
      
      cy.url().should('include', ROUTES.DASHBOARD)
    })

    it('should close menu with Escape key', () => {
      cy.get(SELECTORS.TOGGLE_MENU).click()
      cy.get(SELECTORS.MOBILE_MENU).should('not.have.class', 'invisible')

      cy.get('body').type('{esc}')
      cy.get(SELECTORS.MOBILE_MENU).should('have.class', 'invisible')
      cy.get(SELECTORS.TOGGLE_MENU).should('have.attr', 'aria-expanded', 'false')
    })
  })

  describe('Navigation and Structure', () => {
    it('should navigate to different pages', () => {
      cy.get(SELECTORS.TOGGLE_MENU).click()
      cy.get(SELECTORS.MOBILE_MENU).should('not.have.class', 'invisible')
      cy.contains('Ligas').click()
      cy.url().should('include', ROUTES.LEAGUE)
    })

    it('should have correct semantic structure', () => {
      cy.get('header').should('exist')
      cy.get('nav').should('exist')
      cy.get('h1').should('contain', 'Fantasy FC')
      cy.get(`${SELECTORS.MOBILE_MENU} a`).should('have.length', 3)
    })
  })
})

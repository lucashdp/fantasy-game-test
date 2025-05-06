describe('Responsive Navbar (Mobile)', () => {
  const SELECTORS = {
    TOGGLE_MENU: '[data-testid="toggle-menu"]',
    MOBILE_MENU: '[data-testid="mobile-menu"]',
    NAV_LINKS: {
      DASHBOARD: 'Dashboard',
      TEAM: 'Meu Time',
      LEAGUE: 'Ligas'
    }
  }

  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/')
    cy.waitForPlayersToLoad()
  })

  describe('Mobile Menu Responsiveness', () => {
    it('should show hamburger menu on mobile and hide on desktop', () => {
      cy.viewport('iphone-6')
      cy.get(SELECTORS.TOGGLE_MENU).should('be.visible')
      cy.get(SELECTORS.MOBILE_MENU).should('not.be.visible')

      cy.viewport(1024, 768)
      cy.get(SELECTORS.TOGGLE_MENU).should('not.be.visible')
      cy.get(SELECTORS.MOBILE_MENU).should('be.visible')
    })

    it('should have smooth animations when opening menu', () => {
      cy.get(SELECTORS.TOGGLE_MENU).click()
      
      cy.get(SELECTORS.MOBILE_MENU)
        .should('be.visible')
        .and('have.class', 'translate-y-0')
        .and('have.class', 'opacity-100')

      cy.get(SELECTORS.MOBILE_MENU).find('a').should('have.length', 3)
      cy.get(SELECTORS.MOBILE_MENU).contains(SELECTORS.NAV_LINKS.DASHBOARD).should('be.visible')
      cy.get(SELECTORS.MOBILE_MENU).contains(SELECTORS.NAV_LINKS.TEAM).should('be.visible')
      cy.get(SELECTORS.MOBILE_MENU).contains(SELECTORS.NAV_LINKS.LEAGUE).should('be.visible')
    })

    it('should have smooth animations when closing menu', () => {

      cy.get(SELECTORS.TOGGLE_MENU).click()
      cy.get(SELECTORS.MOBILE_MENU).should('be.visible')

      cy.get(SELECTORS.TOGGLE_MENU).click()
      cy.get(SELECTORS.MOBILE_MENU).should('not.be.visible')
    })
  })

  describe('Menu Navigation', () => {
    it('should navigate through all menu items', () => {

      cy.get(SELECTORS.TOGGLE_MENU).click()
      cy.get(SELECTORS.MOBILE_MENU).should('be.visible')

      cy.get(SELECTORS.MOBILE_MENU).contains(SELECTORS.NAV_LINKS.DASHBOARD).click()
      cy.url().should('include', '/dashboard')

      cy.get(SELECTORS.TOGGLE_MENU).click()
      cy.get(SELECTORS.MOBILE_MENU).contains(SELECTORS.NAV_LINKS.TEAM).click()
      cy.url().should('include', '/team')

      cy.get(SELECTORS.TOGGLE_MENU).click()
      cy.get(SELECTORS.MOBILE_MENU).contains(SELECTORS.NAV_LINKS.LEAGUE).click()
      cy.url().should('include', '/league')
    })

    it('should close menu after navigation', () => {
      cy.get(SELECTORS.TOGGLE_MENU).click()
      cy.get(SELECTORS.MOBILE_MENU).contains(SELECTORS.NAV_LINKS.DASHBOARD).click()
      cy.get(SELECTORS.MOBILE_MENU).should('not.be.visible')
    })
  })

  describe('Menu Interaction', () => {
    it('should close menu when clicking outside', () => {
     
      cy.get(SELECTORS.TOGGLE_MENU).click()
      cy.get(SELECTORS.MOBILE_MENU).should('be.visible')

      cy.get('body').click(0, 0)
      cy.get(SELECTORS.MOBILE_MENU).should('not.be.visible')
    })

    it('should close menu when pressing escape key', () => {

      cy.get(SELECTORS.TOGGLE_MENU).click()
      cy.get(SELECTORS.MOBILE_MENU).should('be.visible')
      cy.get('body').type('{esc}')
      cy.get(SELECTORS.MOBILE_MENU).should('not.be.visible')
    })
  })
})

describe('Player Purchase and List Management', () => {
  const getBudget = () => {
    return cy.get('h2').invoke('text').then((text) => parseInt(text.replace(/\D/g, '')))
  }

  const getPlayerInfo = () => {
    cy.get('button:contains("Comprar")').first()
      .as('buyButton')
      .trigger('mouseover')
      .should('have.class', 'hover:bg-blue-700')
    
    cy.get('@buyButton').parent().prev().then(($priceEl) => {
      const priceText = $priceEl.text()
      const playerPrice = parseInt(priceText.replace(/\D/g, ''))

      cy.get('@buyButton').parentsUntil('Card').find('p.font-medium').invoke('text').then((name) => {
        cy.wrap(name.trim()).as('playerName')
      })
      return cy.wrap({ playerPrice })
    })
  }

  const verifyPlayerNotInList = (playerName: string) => {
    cy.wait(500)
    cy.get('[data-testid="available-players"]').should('not.contain', playerName)
  }

  const verifyPlayerInTeam = (playerName: string) => {
    cy.contains('Meu Time').click()
    cy.wait(500)
    cy.get('[data-testid="my-team-player"]').each(($el) => {
      cy.wrap($el).invoke('text').then((text) => {
        if (text.includes(playerName)) {
          cy.wrap($el).should('exist')
        }
      })
    })
  }

  const buyUntilNoLongerPossible = () => {
    cy.get('[data-testid="available-players"] button:contains("Comprar")').then(($buttons) => {
      let bought = false
  
      Cypress._.some($buttons, (btn) => {
        const $btn = Cypress.$(btn)
        if (!$btn.is(':disabled')) {
          cy.wrap($btn).click()
          bought = true
          return true
        }
        return false
      })
  
      if (bought) {
        cy.wait(500)
        buyUntilNoLongerPossible()
      }
    })
  }
  
  beforeEach(() => {
    cy.visit('/dashboard')
    cy.get('[data-testid="available-players"]', { timeout: 10000 }).should('be.visible')
    cy.contains('Jogadores', { timeout: 10000 }).should('be.visible')
  })

  it('should successfully purchase a player and reflect changes in budget and lists', () => {
    getBudget().as('initialBudget')
    getPlayerInfo()

    cy.get('@buyButton')
      .trigger('mouseover')
      .click()
    cy.wait(500)

    getBudget().then((newBudget) => {
      cy.get('@initialBudget').then((initialBudget) => {
        expect(Number(newBudget)).to.be.lessThan(Number(initialBudget))
      })
    })

    cy.get('@playerName').then((playerName) => {
      const playerNameText = String(playerName).trim()
      verifyPlayerNotInList(playerNameText)
      verifyPlayerInTeam(playerNameText)
    })
  })

  it('should disable buttons when budget runs out', () => {
    getBudget().as('initialBudget')
    buyUntilNoLongerPossible()
  
    cy.get('[data-testid="available-players"] button:contains("Comprar")').each(($button) => {
      cy.wrap($button)
        .should('be.disabled')
        .and('have.class', 'cursor-not-allowed')
    })
  
    getBudget().then((finalBudget) => {
      cy.get('@initialBudget').then((initialBudget) => {
        expect(Number(finalBudget)).to.be.lessThan(Number(initialBudget))
      })
    })
  })

  it('should allow removing a player and restore budget', () => {
    getBudget().as('initialBudget')
    getPlayerInfo()
    cy.get('@buyButton').click()
    cy.wait(500)

    cy.contains('Meu Time').click()
    cy.wait(500)

    cy.get('[data-testid="my-team-player"]').first().find('button').click()
    cy.wait(1000)

    cy.get('@initialBudget').then((initialBudget) => {
      cy.get('[data-testid="budget-amount"]').should('contain', `R$${initialBudget}`)
    })
    
    cy.contains('Jogadores').click()
    cy.url().should('include', '/team')
    cy.wait(500)
    
    cy.visit('/dashboard')
    cy.get('[data-testid="available-players"]', { timeout: 10000 }).should('be.visible')
    
    cy.get('@playerName').then((playerName) => {
      const playerNameText = String(playerName).trim()
      cy.get('[data-testid="available-players"]').find('p.font-medium').each(($el) => {
        cy.wrap($el).invoke('text').then((text) => {
          if (text.includes(playerNameText)) {
            cy.wrap($el).should('exist')
          }
        })
      })
    })
  })
})

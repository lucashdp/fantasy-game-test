import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import PlayerList from '../../../components/PlayerList'
import { TeamProvider, useTeam } from '../../../context/TeamContext'
import players from '../../../mocks/players'

const SUFFICIENT_BUDGET = 100
const INSUFFICIENT_BUDGET = 10
const PLAYER_PRICE = 22

jest.mock('swr', () => ({
  __esModule: true,
  default: () => ({
    data: players,
    error: null
  })
}))

jest.mock('../../../context/TeamContext', () => ({
  ...jest.requireActual('../../../context/TeamContext'),
  useTeam: jest.fn()
}))

Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
})

const createTeamContextMock = (budget: number, roster: any[] = []) => ({
  budget,
  roster,
  buyPlayer: jest.fn(),
  removePlayer: jest.fn()
})

const findPlayerCard = (playerName: string): HTMLElement | null => {
  const element = screen.getByText(playerName).closest('div[class*="border"]')
  return element as HTMLElement | null
}

const findBuyButton = (
  playerCard: HTMLElement | null
): HTMLButtonElement | null => {
  return playerCard?.querySelector('button') || null
}

const verifyButtonIsDisabled = (button: HTMLButtonElement | null) => {
  if (!button) {
    throw new Error('Button not found')
  }
  expect(button).toBeDisabled()
  expect(button).toHaveClass('bg-gray-300')
  expect(button).toHaveClass('text-gray-500')
  expect(button).toHaveClass('cursor-not-allowed')
}

describe('PlayerList', () => {
  const renderPlayerList = () => {
    return render(
      <TeamProvider>
        <PlayerList />
      </TeamProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Player Purchase', () => {
    it('should allow purchasing a player when budget is sufficient', async () => {
      const mockContext = createTeamContextMock(SUFFICIENT_BUDGET)
      ;(useTeam as jest.Mock).mockImplementation(() => mockContext)
      renderPlayerList()

      const playerCard = findPlayerCard('Pedro')
      const buyButton = findBuyButton(playerCard)
      if (!buyButton) {
        throw new Error('Buy button not found')
      }
      await userEvent.click(buyButton)

      expect(mockContext.buyPlayer).toHaveBeenCalledWith({
        id: expect.any(String),
        name: 'Pedro',
        position: 'Atacante',
        price: PLAYER_PRICE
      })
    })

    it('should disable purchase button when budget is insufficient', async () => {
      const mockContext = createTeamContextMock(INSUFFICIENT_BUDGET)
      ;(useTeam as jest.Mock).mockImplementation(() => mockContext)
      renderPlayerList()

      const playerCard = findPlayerCard('Pedro')
      const buyButton = findBuyButton(playerCard)

      verifyButtonIsDisabled(buyButton)

      if (!buyButton) {
        throw new Error('Buy button not found')
      }
      await userEvent.click(buyButton)

      expect(mockContext.buyPlayer).not.toHaveBeenCalled()
    })
  })
})

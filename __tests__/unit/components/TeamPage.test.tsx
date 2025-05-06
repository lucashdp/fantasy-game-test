import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import TeamPage from '../../../app/team/page'
import { TeamProvider, useTeam } from '../../../context/TeamContext'

jest.mock('../../../context/TeamContext', () => ({
  TeamProvider: ({ children }: { children: React.ReactNode }) => children,
  useTeam: jest.fn()
}))

describe('TeamPage', () => {
  const mockTeamData = {
    budget: 100,
    roster: [{ id: '1', name: 'Player 1', position: 'Forward', price: 50 }],
    removePlayer: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useTeam as jest.Mock).mockImplementation(() => mockTeamData)
  })

  const renderTeamPage = () => {
    return render(
      <TeamProvider>
        <TeamPage />
      </TeamProvider>
    )
  }

  describe('Budget Display', () => {
    it('should display the current budget correctly', () => {
      renderTeamPage()

      const budgetText = screen.getByText('Orçamento sobrando:')
      expect(budgetText).toBeInTheDocument()
      expect(budgetText.parentElement).toHaveTextContent(
        'Orçamento sobrando: R$100'
      )
    })

    it('should update budget when it changes', () => {
      const newBudget = 200
      ;(useTeam as jest.Mock).mockImplementation(() => ({
        ...mockTeamData,
        budget: newBudget
      }))

      renderTeamPage()
      const budgetText = screen.getByText('Orçamento sobrando:')
      expect(budgetText.parentElement).toHaveTextContent(
        `Orçamento sobrando: R$${newBudget}`
      )
    })

    it('should handle zero budget correctly', () => {
      ;(useTeam as jest.Mock).mockImplementation(() => ({
        ...mockTeamData,
        budget: 0
      }))

      renderTeamPage()
      const budgetText = screen.getByText('Orçamento sobrando:')
      expect(budgetText.parentElement).toHaveTextContent(
        'Orçamento sobrando: R$0'
      )
    })
  })

  describe('Player Management', () => {
    it('should display player details correctly', () => {
      renderTeamPage()

      const playerText = 'Player 1 (Forward) — R$50'
      expect(screen.getByText(playerText)).toBeInTheDocument()
    })

    it('should remove player when remove button is clicked', async () => {
      renderTeamPage()
      const playerText = 'Player 1 (Forward) — R$50'
      expect(screen.getByText(playerText)).toBeInTheDocument()

      const removeButton = screen.getByText('Remover')
      await userEvent.click(removeButton)

      expect(mockTeamData.removePlayer).toHaveBeenCalledWith('1')
    })

    it('should show empty message when roster is empty', () => {
      ;(useTeam as jest.Mock).mockImplementation(() => ({
        ...mockTeamData,
        roster: []
      }))

      renderTeamPage()
      expect(
        screen.getByText('Nenhum jogador adicionado ainda.')
      ).toBeInTheDocument()
    })

    it('should handle multiple players correctly', () => {
      const multiplePlayers = [
        { id: '1', name: 'Player 1', position: 'Forward', price: 50 },
        { id: '2', name: 'Player 2', position: 'Midfielder', price: 30 }
      ]

      ;(useTeam as jest.Mock).mockImplementation(() => ({
        ...mockTeamData,
        roster: multiplePlayers
      }))

      renderTeamPage()

      multiplePlayers.forEach((player) => {
        const playerText = `${player.name} (${player.position}) — R$${player.price}`
        expect(screen.getByText(playerText)).toBeInTheDocument()
      })
    })
  })
})

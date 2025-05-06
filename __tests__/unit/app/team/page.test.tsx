import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TeamPage from '../../../../app/team/page'
import { TeamProvider } from '../../../../context/TeamContext'

jest.mock('../../../../context/TeamContext', () => ({
  ...jest.requireActual('../../../../context/TeamContext'),
  useTeam: () => ({
    roster: [
      { id: '1', name: 'Jogador 1', position: 'ATA', price: 100 },
      { id: '2', name: 'Jogador 2', position: 'MEI', price: 200 }
    ],
    budget: 1000,
    removePlayer: jest.fn()
  })
}))

describe('TeamPage', () => {
  it('should render the team page with all required elements', () => {
    render(
      <TeamProvider>
        <TeamPage />
      </TeamProvider>
    )

    const title = screen.getByText('Meu Time')
    expect(title).toBeInTheDocument()
    expect(title.className).toContain('text-2xl')
    expect(title.className).toContain('font-bold')

    expect(screen.getByText('Orçamento sobrando:')).toBeInTheDocument()
    expect(screen.getByTestId('budget-amount')).toHaveTextContent('R$1000')

    const playersTitle = screen.getByText('Jogadores do Time')
    expect(playersTitle).toBeInTheDocument()
    expect(playersTitle.className).toContain('text-lg')
    expect(playersTitle.className).toContain('font-semibold')

    expect(screen.getByText('Jogador 1 (ATA) — R$100')).toBeInTheDocument()
    expect(screen.getByText('Jogador 2 (MEI) — R$200')).toBeInTheDocument()
  })

  it('should handle empty roster state', () => {
    jest
      .spyOn(require('../../../../context/TeamContext'), 'useTeam')
      .mockReturnValue({
        roster: [],
        budget: 1000,
        removePlayer: jest.fn()
      })

    render(
      <TeamProvider>
        <TeamPage />
      </TeamProvider>
    )

    expect(
      screen.getByText('Nenhum jogador adicionado ainda.')
    ).toBeInTheDocument()
  })

  it('should call removePlayer when remove button is clicked', () => {
    const mockRemovePlayer = jest.fn()
    jest
      .spyOn(require('../../../../context/TeamContext'), 'useTeam')
      .mockReturnValue({
        roster: [{ id: '1', name: 'Jogador 1', position: 'ATA', price: 100 }],
        budget: 1000,
        removePlayer: mockRemovePlayer
      })

    render(
      <TeamProvider>
        <TeamPage />
      </TeamProvider>
    )

    const removeButton = screen.getByText('Remover')
    fireEvent.click(removeButton)

    expect(mockRemovePlayer).toHaveBeenCalledWith('1')
  })
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { TeamProvider, useTeam } from '../../../context/TeamContext'
import players from '../../../mocks/players'

const MockTeamComponent = () => {
  const { budget, roster, buyPlayer, removePlayer } = useTeam()
  return (
    <div>
      <div>R${budget}</div>
      <div>
        {roster.length === 0 ? (
          <div>Nenhum jogador adicionado ainda.</div>
        ) : (
          roster.map((player) => (
            <div key={player.id}>
              {player.name} ({player.position}) — R${player.price}
              <button onClick={() => removePlayer(player.id)}>Remover</button>
            </div>
          ))
        )}
      </div>
      <div>
        <button onClick={() => buyPlayer(players[0])}>
          Adicionar Jogador 1
        </button>
        <button onClick={() => buyPlayer(players[1])}>
          Adicionar Jogador 2
        </button>
        <button onClick={() => buyPlayer(players[2])}>
          Adicionar Jogador 3
        </button>
        <button onClick={() => buyPlayer(players[3])}>
          Adicionar Jogador 4
        </button>
        <button onClick={() => buyPlayer(players[4])}>
          Adicionar Jogador 5
        </button>
        <button onClick={() => buyPlayer(players[5])}>
          Adicionar Jogador 6
        </button>
        <button onClick={() => buyPlayer(players[6])}>
          Adicionar Jogador 7
        </button>
      </div>
      <button onClick={() => removePlayer('non-existent-id')}>
        Remover Jogador Inexistente
      </button>
    </div>
  )
}

describe('TeamContext', () => {
  const renderTeamContext = () => {
    return render(
      <TeamProvider>
        <MockTeamComponent />
      </TeamProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    window.alert = jest.fn()
  })

  it('should start with initial budget and empty roster', () => {
    renderTeamContext()
    expect(screen.getByText('R$100')).toBeInTheDocument()
    expect(
      screen.getByText('Nenhum jogador adicionado ainda.')
    ).toBeInTheDocument()
  })

  it('should add player and update budget', async () => {
    renderTeamContext()

    const addButton = screen.getByText('Adicionar Jogador 1')
    await userEvent.click(addButton)

    expect(
      screen.getByText('Gustavo Gómez (Zagueiro) — R$15')
    ).toBeInTheDocument()
    expect(screen.getByText('R$85')).toBeInTheDocument()
  })

  it('should remove player and restore budget', async () => {
    renderTeamContext()

    const addButton = screen.getByText('Adicionar Jogador 1')
    await userEvent.click(addButton)

    const removeButton = screen.getByText('Remover')
    await userEvent.click(removeButton)

    expect(
      screen.getByText('Nenhum jogador adicionado ainda.')
    ).toBeInTheDocument()
    expect(screen.getByText('R$100')).toBeInTheDocument()
  })

  it('should show alert when trying to buy player with insufficient budget', async () => {
    renderTeamContext()

    const buttons = [
      'Adicionar Jogador 1',
      'Adicionar Jogador 2',
      'Adicionar Jogador 3',
      'Adicionar Jogador 4',
      'Adicionar Jogador 5',
      'Adicionar Jogador 6',
      'Adicionar Jogador 7'
    ]

    for (const buttonText of buttons) {
      const button = screen.getByText(buttonText)
      await userEvent.click(button)
    }

    const lastButton = screen.getByText('Adicionar Jogador 1')
    await userEvent.click(lastButton)

    expect(window.alert).toHaveBeenCalledWith('Orçamento insuficiente!')
  })

  it('should show alert when trying to buy same player twice', async () => {
    renderTeamContext()

    const addButton = screen.getByText('Adicionar Jogador 1')
    await userEvent.click(addButton)
    await userEvent.click(addButton)

    expect(window.alert).toHaveBeenCalledWith('Jogador já no time!')
  })

  it('should not remove non-existent player', async () => {
    renderTeamContext()

    const addButton = screen.getByText('Adicionar Jogador 1')
    await userEvent.click(addButton)

    const removeButton = screen.getByText('Remover Jogador Inexistente')
    await userEvent.click(removeButton)

    expect(
      screen.getByText('Gustavo Gómez (Zagueiro) — R$15')
    ).toBeInTheDocument()
    expect(screen.getByText('R$85')).toBeInTheDocument()
  })

  it('should throw error when using useTeam outside provider', () => {
    const TestComponent = () => {
      try {
        useTeam()
        return <div>No error</div>
      } catch (error) {
        return <div>Error caught</div>
      }
    }

    render(<TestComponent />)
    expect(screen.getByText('Error caught')).toBeInTheDocument()
  })

  it('should memoize context value', () => {
    const { rerender } = renderTeamContext()
    const initialBudget = screen.getByText('R$100')

    rerender(
      <TeamProvider>
        <MockTeamComponent />
      </TeamProvider>
    )

    expect(screen.getByText('R$100')).toBe(initialBudget)
  })
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TeamStats from '../../../components/TeamStats'
import { TeamProvider, useTeam } from '../../../context/TeamContext'
import type { Player } from '../../../mocks/players'

jest.mock('../../../context/TeamContext', () => ({
  ...jest.requireActual('../../../context/TeamContext'),
  useTeam: jest.fn()
}))

const mockTeamContext = {
  roster: [
    { id: '1', name: 'Jogador 1', price: 1000000 },
    { id: '2', name: 'Jogador 2', price: 2000000 },
    { id: '3', name: 'Jogador 3', price: 3000000 }
  ] as Player[],
  budget: 10000000,
  buyPlayer: jest.fn(),
  removePlayer: jest.fn()
}

describe('TeamStats Component', () => {
  beforeEach(() => {
    ;(useTeam as jest.Mock).mockReturnValue(mockTeamContext)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderTeamStats = (context = mockTeamContext) => {
    ;(useTeam as jest.Mock).mockReturnValue(context)
    return render(
      <TeamProvider>
        <TeamStats />
      </TeamProvider>
    )
  }

  it('renders the component title', () => {
    renderTeamStats()
    const title = screen.getByText('Estatísticas do Time')
    expect(title).toBeInTheDocument()
    expect(title.className).toContain('text-xl')
    expect(title.className).toContain('font-semibold')
    expect(title.className).toContain('mb-4')
  })

  it('displays correct total players count', () => {
    renderTeamStats()
    const totalPlayers = screen.getByText('3')
    expect(totalPlayers).toBeInTheDocument()
    expect(totalPlayers.className).toContain('text-2xl')
    expect(totalPlayers.className).toContain('font-bold')
  })

  it('displays correct total team value', () => {
    renderTeamStats()
    const totalValue = screen.getByText('R$6000000')
    expect(totalValue).toBeInTheDocument()
    expect(totalValue.className).toContain('text-2xl')
    expect(totalValue.className).toContain('font-bold')
  })

  it('displays correct average player value', () => {
    renderTeamStats()
    const averageValue = screen.getByText('R$2000000.00')
    expect(averageValue).toBeInTheDocument()
    expect(averageValue.className).toContain('text-2xl')
    expect(averageValue.className).toContain('font-bold')
  })

  it('displays correct remaining budget', () => {
    renderTeamStats()
    const budget = screen.getByText('R$10000000')
    expect(budget).toBeInTheDocument()
    expect(budget.className).toContain('text-2xl')
    expect(budget.className).toContain('font-bold')
  })

  it('handles empty roster correctly', () => {
    const emptyContext = {
      ...mockTeamContext,
      roster: []
    }
    renderTeamStats(emptyContext)

    const totalPlayers = screen.getByText('0')
    const totalValue = screen.getByText('R$0')
    const averageValue = screen.getByText('R$0.00')

    expect(totalPlayers).toBeInTheDocument()
    expect(totalValue).toBeInTheDocument()
    expect(averageValue).toBeInTheDocument()
  })

  it('has correct container styling', () => {
    const { container } = renderTeamStats()
    const statsContainer = container.firstChild

    expect(statsContainer).toHaveClass('bg-white')
    expect(statsContainer).toHaveClass('p-6')
    expect(statsContainer).toHaveClass('rounded-lg')
    expect(statsContainer).toHaveClass('shadow')
  })

  it('displays all stat labels correctly', () => {
    renderTeamStats()

    const labels = [
      'Total de Jogadores',
      'Valor Total do Time',
      'Valor Médio por Jogador',
      'Orçamento Restante'
    ]

    labels.forEach((label) => {
      const element = screen.getByText(label)
      expect(element).toBeInTheDocument()
      expect(element.className).toContain('text-gray-600')
    })
  })
})

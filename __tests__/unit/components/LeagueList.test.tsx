import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import LeagueList from '../../../components/LeagueList'
import useSWR from 'swr'

jest.mock('swr')

const mockLeagues = [
  {
    id: '1',
    name: 'Liga Brasileira',
    teams: [
      { id: '1', name: 'Time A' },
      { id: '2', name: 'Time B' }
    ]
  },
  {
    id: '2',
    name: 'Liga Europeia',
    teams: [
      { id: '3', name: 'Time C' },
      { id: '4', name: 'Time D' },
      { id: '5', name: 'Time E' }
    ]
  }
]

describe('LeagueList Component', () => {
  beforeEach(() => {
    ;(useSWR as jest.Mock).mockReturnValue({
      data: mockLeagues,
      error: null
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state correctly', () => {
    ;(useSWR as jest.Mock).mockReturnValue({
      data: null,
      error: null
    })

    render(<LeagueList />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders error state correctly', () => {
    ;(useSWR as jest.Mock).mockReturnValue({
      data: null,
      error: new Error('Erro na requisição')
    })

    render(<LeagueList />)
    expect(screen.getByText('Erro ao carregar ligas.')).toBeInTheDocument()
  })

  it('renders empty state correctly', () => {
    ;(useSWR as jest.Mock).mockReturnValue({
      data: [],
      error: null
    })

    render(<LeagueList />)
    expect(screen.queryByText('Liga')).not.toBeInTheDocument()
  })

  it('renders all leagues correctly', () => {
    render(<LeagueList />)

    mockLeagues.forEach((league) => {
      expect(screen.getByText(league.name)).toBeInTheDocument()
    })
  })

  it('displays correct team count for each league', () => {
    render(<LeagueList />)

    expect(screen.getByText('2 times')).toBeInTheDocument()
    expect(screen.getByText('3 times')).toBeInTheDocument()
  })

  it('displays singular form for one team', () => {
    ;(useSWR as jest.Mock).mockReturnValue({
      data: [
        {
          id: '1',
          name: 'Liga Teste',
          teams: [{ id: '1', name: 'Time A' }]
        }
      ],
      error: null
    })

    render(<LeagueList />)
    const card = screen.getByRole('article')
    const teamCount = within(card).getByText(/1/)
    expect(teamCount).toBeInTheDocument()
  })

  it('renders join buttons for each league', () => {
    render(<LeagueList />)

    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(mockLeagues.length)

    cards.forEach((card: HTMLElement) => {
      const button = within(card).getByRole('button')
      expect(button).toHaveClass('px-3')
      expect(button).toHaveClass('py-1')
      expect(button).toHaveClass('bg-purple-600')
      expect(button).toHaveClass('text-white')
      expect(button).toHaveClass('rounded')
      expect(button).toHaveClass('hover:bg-purple-700')
    })
  })

  it('shows alert when join button is clicked', () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})

    render(<LeagueList />)

    const firstCard = screen.getAllByRole('article')[0]
    const firstJoinButton = within(firstCard).getByRole('button')
    fireEvent.click(firstJoinButton)

    expect(mockAlert).toHaveBeenCalledWith('Entrou na liga "Liga Brasileira"')

    mockAlert.mockRestore()
  })

  it('handles multiple join button clicks', () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})

    render(<LeagueList />)

    const cards = screen.getAllByRole('article')
    cards.forEach((card: HTMLElement) => {
      const button = within(card).getByRole('button')
      fireEvent.click(button)
    })

    expect(mockAlert).toHaveBeenCalledTimes(mockLeagues.length)

    mockAlert.mockRestore()
  })

  it('renders league cards with correct styling', () => {
    const { container } = render(<LeagueList />)

    const cards = container.querySelectorAll(
      '.flex.justify-between.items-center'
    )
    expect(cards).toHaveLength(mockLeagues.length)

    cards.forEach((card: Element) => {
      expect(card).toHaveClass('flex')
      expect(card).toHaveClass('justify-between')
      expect(card).toHaveClass('items-center')
    })
  })

  it('displays league names with correct styling', () => {
    render(<LeagueList />)

    const cards = screen.getAllByRole('article')
    cards.forEach((card: HTMLElement) => {
      const name = within(card).getByText(/Liga/)
      expect(name).toHaveClass('font-medium')
    })
  })

  it('displays team counts with correct styling', () => {
    render(<LeagueList />)

    const cards = screen.getAllByRole('article')
    cards.forEach((card: HTMLElement) => {
      const count = within(card).getByText(/times/)
      expect(count).toHaveClass('text-sm')
      expect(count).toHaveClass('text-gray-600')
    })
  })

  it('handles network error gracefully', () => {
    ;(useSWR as jest.Mock).mockReturnValue({
      data: null,
      error: new Error('Network Error')
    })

    render(<LeagueList />)
    expect(screen.getByText('Erro ao carregar ligas.')).toBeInTheDocument()
  })
})

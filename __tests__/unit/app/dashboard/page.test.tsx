import { render, screen } from '@testing-library/react'
import DashboardPage from '../../../../app/dashboard/page'

jest.mock('../../../../components/PlayerList', () => {
  return function MockPlayerList() {
    return <div data-testid='mock-player-list'>Player List</div>
  }
})

describe('DashboardPage', () => {
  it('should render the dashboard title', () => {
    render(<DashboardPage />)

    const title = screen.getByText('Dashboard')
    expect(title).toBeInTheDocument()
    expect(title.className).toContain('text-2xl')
    expect(title.className).toContain('font-bold')
    expect(title.className).toContain('mb-4')
  })

  it('should render the PlayerList component', () => {
    render(<DashboardPage />)

    const playerList = screen.getByText('Player List')
    expect(playerList).toBeInTheDocument()
  })

  it('should have the correct container class', () => {
    render(<DashboardPage />)

    const container = screen.getByText('Dashboard').parentElement
    expect(container).toHaveClass('p-8')
  })
})

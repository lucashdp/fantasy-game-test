import { render, screen } from '@testing-library/react'
import LeaguePage from '../../../../app/league/page'

jest.mock('../../../../components/LeagueList', () => () => (
  <div>LeagueList Mock</div>
))

describe('LeaguePage', () => {
  it('should render the league page with all required elements', () => {
    render(<LeaguePage />)

    const title = screen.getByText('Ligas')
    expect(title).toBeInTheDocument()
    expect(title.className).toContain('text-2xl')
    expect(title.className).toContain('font-bold')
    expect(title.className).toContain('mb-4')

    expect(screen.getByText('LeagueList Mock')).toBeInTheDocument()

    const mainContainer = title.parentElement
    expect(mainContainer?.className).toContain('p-8')
  })
})

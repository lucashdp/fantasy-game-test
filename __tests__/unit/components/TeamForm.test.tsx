import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TeamForm from '../../../components/TeamForm'

jest.mock('../../../lib/api', () => ({
  createTeam: jest.fn()
}))

describe('TeamForm', () => {
  const mockTeamResponse = {
    id: '123',
    name: 'Test Team',
    players: []
  }

  let input: HTMLElement
  let button: HTMLElement
  let createTeam: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    render(<TeamForm />)
    input = screen.getByRole('textbox')
    button = screen.getByRole('button')
    createTeam = require('../../../lib/api').createTeam
  })

  const fillAndSubmitForm = (teamName: string) => {
    fireEvent.change(input, { target: { value: teamName } })
    fireEvent.click(button)
  }

  it('should render the form with initial state', () => {
    expect(screen.getByRole('heading')).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should update input value when typing', () => {
    fireEvent.change(input, { target: { value: 'New Team' } })
    expect(input).toHaveValue('New Team')
  })

  it('should show success message when team is created', async () => {
    createTeam.mockResolvedValueOnce(mockTeamResponse)
    fillAndSubmitForm('Test Team')

    await waitFor(() => {
      expect(
        screen.getByText(`Time "Test Team" criado (ID 123)`)
      ).toBeInTheDocument()
    })
    expect(input).toHaveValue('')
  })

  it('should show error message when team creation fails', async () => {
    createTeam.mockRejectedValueOnce(new Error('Failed to create team'))
    fillAndSubmitForm('Test Team')

    await waitFor(() => {
      expect(screen.getByText('Erro ao criar time.')).toBeInTheDocument()
    })
  })
})

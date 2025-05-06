import { fetcher, createTeam } from '../../../lib/api'
import players from '../../../mocks/players'
import teams from '../../../mocks/teams'
import leagues from '../../../mocks/leagues'

describe('API Functions', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe('fetcher', () => {
    it('should fetch players data', async () => {
      const promise = fetcher('/api/players')
      jest.runAllTimers()
      const result = await promise
      expect(result).toEqual(players)
    })

    it('should fetch teams data', async () => {
      const promise = fetcher('/api/teams')
      jest.runAllTimers()
      const result = await promise
      expect(result).toEqual(teams)
    })

    it('should fetch leagues data', async () => {
      const promise = fetcher('/api/leagues')
      jest.runAllTimers()
      const result = await promise
      expect(result).toEqual(leagues)
    })
  })

  describe('createTeam', () => {
    it('should create a team with the given name', async () => {
      const teamData = { name: 'New Team' }
      const promise = createTeam(teamData)
      jest.runAllTimers()
      const result = await promise
      
      expect(result).toEqual({
        id: expect.any(String),
        name: 'New Team',
        players: []
      })
    })
  })
}) 
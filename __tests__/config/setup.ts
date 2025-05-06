import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})


jest.setTimeout(10000)

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  })
}))

jest.mock('../context/TeamContext', () => ({
  useTeam: () => ({
    roster: [],
    budget: 1000,
    addPlayer: jest.fn(),
    removePlayer: jest.fn()
  })
})) 

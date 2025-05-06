import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'

// Limpa o ambiente após cada teste
afterEach(() => {
  cleanup()
})

// Configurações globais do Jest
jest.setTimeout(10000) // 10 segundos de timeout para testes

// Mock de componentes comuns
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  })
}))

// Mock do contexto do time
jest.mock('../context/TeamContext', () => ({
  useTeam: () => ({
    roster: [],
    budget: 1000,
    addPlayer: jest.fn(),
    removePlayer: jest.fn()
  })
})) 
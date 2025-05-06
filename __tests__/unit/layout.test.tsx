import { render } from '@testing-library/react'
import RootLayout, { metadata } from '../../app/layout'

describe('metadata', () => {
  it('should contain correct title and description', () => {
    expect(metadata.title).toBe('Fantasy FC')
    expect(metadata.description).toBe('Gerencie seu time de futebol fantástico')
  })

  it('should render layout without crashing', () => {
    expect(typeof RootLayout).toBe('function')
    RootLayout({ children: <div>teste</div> })
  })
})

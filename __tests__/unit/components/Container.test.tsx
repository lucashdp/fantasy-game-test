import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Container from '../../../components/Container'

describe('Container Component', () => {
  const renderContainer = (children: React.ReactNode) => {
    return render(<Container>{children}</Container>)
  }

  it('renders children correctly', () => {
    const { getByText } = renderContainer(<p>Test Content</p>)
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    const { container } = renderContainer(<div>Content</div>)
    const containerDiv = container.firstChild as HTMLElement
    expect(containerDiv).toHaveClass('max-w-4xl')
    expect(containerDiv).toHaveClass('mx-auto')
    expect(containerDiv).toHaveClass('w-full')
    expect(containerDiv).toHaveClass('p-6')
    expect(containerDiv).toHaveClass('bg-white')
    expect(containerDiv).toHaveClass('shadow-md')
    expect(containerDiv).toHaveClass('rounded-lg')
  })

  it('renders multiple children', () => {
    const { getByText } = renderContainer(
      <>
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </>
    )

    expect(getByText('First Child')).toBeInTheDocument()
    expect(getByText('Second Child')).toBeInTheDocument()
    expect(getByText('Third Child')).toBeInTheDocument()
  })

  it('maintains semantic HTML structure', () => {
    const { container } = renderContainer(<div>Content</div>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('handles undefined children gracefully', () => {
    const { container } = renderContainer(undefined)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('handles null children gracefully', () => {
    const { container } = renderContainer(null)
    expect(container.firstChild).toBeInTheDocument()
  })
})

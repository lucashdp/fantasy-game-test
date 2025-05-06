import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../../../components/Button'

describe('Button Component', () => {
  it('checks a snapshot', () => {
    const { container } = render(<Button>Text of Form Button</Button>)
    expect(container).toMatchSnapshot()
  })

  it('checks a disable attribute', async () => {
    const { getByTestId } = render(<Button disabled>Disabled</Button>)
    expect(getByTestId('button')).toHaveAttribute('disabled')
  })
})

import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { SWRConfig } from 'swr'

function render(ui: React.ReactElement, options = {}) {
  return rtlRender(
    <SWRConfig value={{ provider: () => new Map() }}>{ui}</SWRConfig>,
    options
  )
}

export * from '@testing-library/react'
export { render }

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { redirect } from 'next/navigation'
import Page from '../../../app/page'

jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}))

describe('Root Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirects to dashboard', () => {
    Page()
    expect(redirect).toHaveBeenCalledWith('/dashboard')
  })
})

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'
import Navbar from '../../../components/Navbar'

declare global {
  namespace jest {
    interface Matchers<R> extends TestingLibraryMatchers<R, void> {}
  }
}

const mockUsePathname = jest.fn()
jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname()
  }
}))

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true })

describe('Navbar Component', () => {
  const renderNavbar = (pathname = '/dashboard') => {
    ;(mockUsePathname as jest.Mock).mockReturnValue(pathname)
    const result = render(<Navbar />)
    return result
  }

  const NAV_LINKS = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/team', label: 'Meu Time' },
    { href: '/league', label: 'Ligas' }
  ]

  afterEach(() => {
    jest.clearAllMocks()
    document.body.innerHTML = ''
  })

  it('renders all navigation links', () => {
    renderNavbar()
    NAV_LINKS.forEach(({ label }) => {
      const link = screen.getByText(label)
      expect(link).toBeInTheDocument()
    })
  })

  it('highlights active link for each route', () => {
    NAV_LINKS.forEach(({ href, label }) => {
      const { container } = renderNavbar(href)
      const nav = container.querySelector('nav')
      const link = nav?.querySelector(`a[href="${href}"]`)
      expect(link).toHaveClass('bg-blue-600')
      expect(link).toHaveClass('text-white')
      document.body.innerHTML = ''
    })
  })

  it('applies correct hover styles to inactive links', () => {
    NAV_LINKS.forEach(({ href, label }) => {
      const inactivePath = href === '/dashboard' ? '/team' : '/dashboard'
      const { container } = renderNavbar(inactivePath)
      const nav = container.querySelector('nav')
      const link = nav?.querySelector(`a[href="${href}"]`)
      expect(link).toHaveClass('text-gray-700')
      expect(link).toHaveClass('hover:text-blue-600')
      expect(link).toHaveClass('hover:bg-gray-100')
      document.body.innerHTML = ''
    })
  })

  it('toggles mobile menu when hamburger button is clicked', () => {
    renderNavbar()
    const menuButton = screen.getByRole('button')
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('invisible')
    fireEvent.click(menuButton)
    expect(nav).toHaveClass('flex-col')
    expect(nav).toHaveClass('md:flex-row')
    expect(nav).toHaveClass('md:flex')
    fireEvent.click(menuButton)
    expect(nav).toHaveClass('invisible')
  })

  it('shows menu by default on desktop view', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true
    })

    renderNavbar()
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('md:flex')
  })

  it('hides menu by default on mobile view', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 600,
      writable: true
    })

    renderNavbar()
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('invisible')
  })

  it('has basic accessibility with aria-label on menu button', () => {
    renderNavbar()
    const menuButton = screen.getByRole('button')
    expect(menuButton).toHaveAttribute('aria-label', 'Toggle menu')
  })

  it('renders logo with correct text', () => {
    renderNavbar()
    const logo = screen.getByText('Fantasy FC')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveClass('text-2xl')
    expect(logo).toHaveClass('font-bold')
    expect(logo).toHaveClass('text-blue-600')
  })

  it('should have correct container classes', () => {
    renderNavbar()

    const header = screen.getByRole('banner')
    expect(header.className).toContain('bg-white')
    expect(header.className).toContain('shadow')

    const container = header.firstElementChild
    expect(container?.className).toContain('max-w-4xl')
    expect(container?.className).toContain('mx-auto')
    expect(container?.className).toContain('px-6')
    expect(container?.className).toContain('py-4')
  })

  it('closes the menu when clicking outside', () => {
    renderNavbar()
    const menuButton = screen.getByTestId('toggle-menu')
    fireEvent.click(menuButton) // open menu

    fireEvent.mouseDown(document.body) // click outside
    const nav = screen.getByTestId('mobile-menu')
    expect(nav).toHaveClass('invisible')
  })

  it('closes the menu when pressing Escape', () => {
    renderNavbar()
    const menuButton = screen.getByTestId('toggle-menu')
    fireEvent.click(menuButton) // open menu

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    const nav = screen.getByTestId('mobile-menu')
    expect(nav).toHaveClass('invisible')
  })

  it('closes the menu when clicking a link', () => {
    renderNavbar()
    const menuButton = screen.getByTestId('toggle-menu')
    fireEvent.click(menuButton)

    const link = screen.getByText('Dashboard')
    fireEvent.click(link)
    const nav = screen.getByTestId('mobile-menu')
    expect(nav).toHaveClass('invisible')
  })
})

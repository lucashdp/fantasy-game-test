'use client'

import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/team', label: 'Meu Time' },
    { href: '/league', label: 'Ligas' }
  ]
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <header className='bg-white shadow sticky top-0 z-50'>
      <div className='max-w-4xl mx-auto flex items-center justify-between px-6 py-4'>
        <h1 className='text-2xl font-bold text-blue-600'>Fantasy FC</h1>
        {/* Botão hambúrguer só no mobile */}
        <button
          data-testid='toggle-menu'
          className='md:hidden text-gray-700 focus:outline-none'
          onClick={() => setOpen(!open)}
          aria-label='Toggle menu'
          aria-controls='mobile-menu'
          aria-expanded={open}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            {open ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            )}
          </svg>
        </button>
        {/* Menu responsivo */}
        <nav
          data-testid='mobile-menu'
          id='mobile-menu'
          ref={menuRef}
          className={`
            flex-col md:flex-row md:flex md:items-center space-y-2 md:space-y-0 md:space-x-4
            fixed md:static top-16 left-0 right-0 bg-white md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 z-20
            transition-all duration-500 ease-in-out
            ${
              open
                ? 'translate-y-0 opacity-100 visible'
                : '-translate-y-4 opacity-0 invisible md:visible md:translate-y-0 md:opacity-100'
            }
          `}
        >
          {links.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-1 rounded transition-colors font-medium
                  ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

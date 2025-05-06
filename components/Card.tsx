'use client'
import { ReactNode } from 'react'

export default function Card({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div
      role='article'
      data-testid='player-card'
      className='p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow mb-4'
    >
      {children}
    </div>
  )
}

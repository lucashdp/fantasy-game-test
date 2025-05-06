import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false
}) => {
  return (
    <button
      data-testid='button'
      onClick={onClick}
      disabled={disabled}
      className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'
    >
      {children}
    </button>
  )
}

export default Button

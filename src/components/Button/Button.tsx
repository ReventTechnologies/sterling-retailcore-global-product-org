import React, { ReactNode } from 'react'

interface Props {
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  children?: ReactNode
  onClick?: () => void
}

export const Button = ({ children, className, disabled, type, onClick }: Props) => {
  return (
    <button
      type={type}
      className={`font-bold leading-5 cursor-pointer h-full w-fit px-10 py-1 rounded-lg ${
        disabled ? 'cursor-not-allowed bg-[#AAAAAA]' : 'hover:bg-button-hover-background text-[white]'
      } ${className}`}
      disabled={disabled}
      style={{
        cursor: disabled ? 'cursor-not-allowed' : 'pointer',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  disabled: false,
  type: 'button',
}

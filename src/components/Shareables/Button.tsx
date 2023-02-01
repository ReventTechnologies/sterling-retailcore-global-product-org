import React from 'react'

type Props = {
  text?: string
  className?: string
  disabled?: boolean
  onClick?: () => void
}

const Button = ({ text = 'Proceed', disabled, onClick, className }: Props) => {
  return (
    <button
      className={`font-bold leading-5 text-white bg-button-background  cursor-pointer h-full w-fit px-10 py-1 rounded-lg ${disabled ? 'cursor-not-allowed' : 'hover:bg-button-hover-background bg-[#CF2A2A]'
        } ${className}`}
      disabled={disabled}
      style={{
        cursor: disabled ? 'cursor-not-allowed' : 'pointer',
      }}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

// Button.defaultProps = {
//   text: "Proceed"
// }
export default Button

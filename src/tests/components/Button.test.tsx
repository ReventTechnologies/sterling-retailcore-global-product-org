import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // For additional matchers
import { Button } from '../../components/Button/index'

describe('Button component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Button>Click me</Button>)
    expect(getByText('Click me')).toBeInTheDocument()
  })

  it('has the correct default props', () => {
    const { getByRole } = render(<Button>Click me</Button>)
    const button = getByRole('button')

    expect(button).toHaveAttribute('type', 'button')
    expect(button).not.toBeDisabled()
    expect(button).toHaveStyle('cursor: pointer')
  })

  it('renders with custom props', () => {
    const onClickMock = jest.fn()
    const { getByRole } = render(
      <Button className='custom-class' disabled={true} type='submit' onClick={onClickMock}>
        Click me
      </Button>
    )
    const button = getByRole('button')

    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('custom-class')
    expect(button).toHaveStyle('cursor: cursor-not-allowed')
  })

  it('calls onClick callback when clicked', () => {
    const onClickMock = jest.fn()
    const { getByRole } = render(<Button onClick={onClickMock}>Click me</Button>)
    const button = getByRole('button')

    fireEvent.click(button)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})

import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { ProductType } from '../../../components/ProductType/ProductType'

// Mocking the useProductType hook to isolate the component

const mockOnSaveChange = jest.fn()
jest.mock('Components/ProductType/useProductType.hook', () => ({
  __esModule: true,
  default: () => ({
    drag: jest.fn(),
    name: 'Test Product',
    onNameChange: jest.fn(),
    onblur: jest.fn(),
    onkeyup: jest.fn(),
    saveProductTypeNameLoading: false,
    saveButtonRef: { current: null },
    onSaveChange: mockOnSaveChange,
  }),
}))

describe('ProductType component', () => {
  const mockProduct = {
    product_type_id: '123',
    name: 'Test Product',
  }

  const mockProps = {
    product: mockProduct,
    index: 0,
    currentEditId: '123',
    productIndex: 0,
    setCurrentEditId: jest.fn(),
  }

  it('renders the component with correct name when not in edit mode', () => {
    render(<ProductType product={mockProduct} index={0} currentEditId='' productIndex={0} setCurrentEditId={jest.fn()} />)

    const productNameElement = screen.getByText('Test Product')
    expect(productNameElement).toBeInTheDocument()
  })

  it('renders the component with an input field in edit mode', () => {
    // Setting currentEditId to null to simulate not being in edit mode
    const { rerender } = render(<ProductType product={mockProduct} index={0} currentEditId='' productIndex={0} setCurrentEditId={jest.fn()} />)

    const productNameElement = screen.getByText('Test Product')
    expect(productNameElement).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('edit-button0'))

    rerender(<ProductType product={mockProduct} index={0} currentEditId='123' productIndex={0} setCurrentEditId={jest.fn()} />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue('Test Product')
  })

  it('renders the component with Save button in edit mode', () => {
    const { rerender } = render(<ProductType product={mockProduct} index={0} currentEditId='' productIndex={0} setCurrentEditId={jest.fn()} />)

    fireEvent.click(screen.getByTestId('edit-button0'))

    rerender(<ProductType product={mockProduct} index={0} currentEditId='123' productIndex={0} setCurrentEditId={jest.fn()} />)

    const saveButton = screen.getByText('Save')
    expect(saveButton).toBeInTheDocument()
  })

  it('calls onSaveChange when Save button is clicked', () => {
    render(<ProductType {...mockProps} />)

    fireEvent.click(screen.getByText('Save'))

    expect(mockOnSaveChange).toHaveBeenCalled()
  })
})

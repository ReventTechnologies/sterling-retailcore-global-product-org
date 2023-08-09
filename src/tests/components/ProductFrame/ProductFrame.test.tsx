import { render } from '@testing-library/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ProductFrame, ProductFrameProps } from '../../../components/ProductFrame/ProductFrame'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('ProductFrame', () => {
  // Define mock data for the props
  const mockProps: ProductFrameProps = {
    data: {
      id: 'product-1',
      product_category: 'Category 1',
      product_types: [
        { product_type_id: 'type-1' /* Add any required properties for the ProductType objects here */ },
        // Add more product types if needed
      ],
    },
    productIndex: 0,
    dragLeave: jest.fn(),
    currentEditId: '',
    setCurrentEditId: jest.fn(),
    drop: jest.fn(),
    allowDrop: jest.fn(),
  }

  const mockDispatch = jest.fn()

  beforeEach(() => {
    ;(useDispatch as jest.Mock).mockReturnValue(mockDispatch)
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue({
      data: {},
      loading: false,
    })

    // Reset the mock implementation before each test
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const { container } = render(<ProductFrame {...mockProps} />)
    expect(container).toBeInTheDocument()
  })
})

import { renderHook } from '@testing-library/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import useMain from '../../../pages/Main/useMain.hook'
import { getProductAllCategories, getProductCategories, saveGPO } from '../../../redux/actions/ProductCategories/ProductCategories'
// Mock the required dependencies
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

jest.mock('Redux/actions/ProductCategories/ProductCategories', () => ({
  getProductAllCategories: jest.fn(),
  getProductCategories: jest.fn(),
  saveGPO: jest.fn(),
}))

describe('useMain', () => {
  const mockDispatch = jest.fn()

  beforeEach(() => {
    ;(useDispatch as jest.Mock).mockReturnValue(mockDispatch)

    // Reset the mock implementation before each test
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return product data from useSelector', () => {
    // Mock the useSelector behavior
    const mockProductData = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ]
    const mockUseSelector = useSelector as jest.Mock<any>
    const fetchProductData = {
      loading: false,
      productCategories: mockProductData,
    }

    mockUseSelector.mockImplementation((selectorFn) => {
      if (selectorFn({ productData: fetchProductData }) === fetchProductData) {
        return fetchProductData
      }

      return {} // Default return for other cases
    })

    // Render the component that uses the hook
    const { result } = renderHook(() => useMain())

    // Assert the returned product data
    expect(result.current.productData).toEqual(mockProductData)
  })

  it('should call getProductCategories and getProductAllCategories on mount', () => {
    // Render the hook
    renderHook(() => useMain())

    // Assert that the necessary actions are called
    expect(mockDispatch).toHaveBeenCalledWith(getProductCategories())
    expect(mockDispatch).toHaveBeenCalledWith(getProductAllCategories())
  })

  it('should update dataToSave when calling onSaveGPO', () => {
    // Render the hook
    const { result } = renderHook(() => useMain())

    // Trigger the onSaveGPO function
    result.current.onSaveGPO()

    // Assert that the necessary actions are called
    expect(mockDispatch).toHaveBeenCalledWith(saveGPO(expect.any(Object)))
  })
})

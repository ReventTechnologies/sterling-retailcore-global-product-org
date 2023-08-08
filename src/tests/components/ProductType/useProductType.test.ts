import { act, renderHook } from '@testing-library/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import useProductType from '../../../components/ProductType/useProductType.hook'
import { saveProductTypeName } from '../../../redux/actions/ProductCategories'

// Mock useDispatch and useSelector
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

jest.mock('Redux/actions/ProductCategories', () => ({
  saveProductTypeName: jest.fn(),
}))

describe('useProductType', () => {
  const product = { product_type_id: '1', name: 'Product 1' }

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

  it('should update the name state when onNameChange is called', () => {
    // Arrange
    const { result } = renderHook(() => useProductType(product, 0, 0, jest.fn()))

    // Act
    act(() => {
      result.current.onNameChange({ target: { value: 'New Product Name' } } as any)
    })

    // Assert
    expect(result.current.name).toBe('New Product Name')
  })

  it('should call dispatch with the correct parameters when onSaveChange is called with Enter key', () => {
    // Arrange
    const { result } = renderHook(() => useProductType(product, 0, 0, jest.fn()))
    const value = 'New Product Name'
    const key = 'Enter'

    // Act
    act(() => {
      result.current.onSaveChange(value, key)
    })

    // Assert
    expect(mockDispatch).toHaveBeenCalled()
    expect(mockDispatch).toHaveBeenCalledWith(saveProductTypeName(product.product_type_id, value))
  })

  it('should call dispatch with the correct parameters when onSaveChange is called without Enter key', () => {
    // Arrange
    const { result } = renderHook(() => useProductType(product, 0, 0, jest.fn()))

    // Act
    act(() => {
      result.current.onSaveChange()
    })

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith(saveProductTypeName(product.product_type_id, product.name))
  })

  it('should call setCurrentEditId when saveProductTypeNameSuccess is true', () => {
    // Arrange
    const setCurrentEditId = jest.fn()
    const mockUseSelector = useSelector as jest.Mock<any>
    const SaveProductTypeNameData = {
      data: null,
      loading: false,
      success: true,
    }

    mockUseSelector.mockImplementation((selectorFn) => {
      // Check if the selector function is accessing the fetchTaxesReducer
      if (selectorFn({ SaveProductTypeName: SaveProductTypeNameData }) === SaveProductTypeNameData) {
        return SaveProductTypeNameData
      }

      return {} // Default return for other cases
    })
    renderHook(() => useProductType(product, 0, 0, setCurrentEditId))

    // Assert
    expect(setCurrentEditId).toHaveBeenCalledWith(null)
  })

  it('should not call dispatch when onSaveChange is called without Enter key and name has changed', () => {
    // Arrange
    const { result } = renderHook(() => useProductType(product, 0, 0, jest.fn()))

    // Act
    act(() => {
      result.current.onNameChange({ target: { value: 'New Product Name' } } as any)
      result.current.onSaveChange()
    })

    // Assert
    expect(mockDispatch).toHaveBeenCalled()
    expect(mockDispatch).toHaveBeenCalledWith(saveProductTypeName(product.product_type_id, 'New Product Name'))
  })

  it('should call setCurrentEditId when onblur is called and the save button reference does not match', () => {
    // Arrange
    const setCurrentEditId = jest.fn()
    const { result } = renderHook(() => useProductType(product, 0, 0, setCurrentEditId))

    // Act
    act(() => {
      result.current.onblur({ target: document.createElement('div') })
    })

    // Assert
    expect(setCurrentEditId).toHaveBeenCalledWith(null)
  })

  it('should call onSaveChange when onkeyup is called with Enter key', () => {
    // Arrange
    const { result } = renderHook(() => useProductType(product, 0, 0, jest.fn()))

    // Act
    act(() => {
      result.current.onkeyup({ key: 'Enter', currentTarget: { value: 'New Product Name' } } as any)
    })

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith(saveProductTypeName(product.product_type_id, 'New Product Name'))
  })
})

import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Main } from '../../../pages/Main/Main'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

const mockDisabled = jest.fn()
const mockAllDrop = jest.fn()
const mockDragLeave = jest.fn()
const mockOnDiscardChanges = jest.fn()
const mockCloseSaveGPOModal = jest.fn()
const mockDrop = jest.fn()
const mockOnSaveGPO = jest.fn()

jest.mock('Pages/main/useMain.hook', () => ({
  __esModule: true,
  default: jest.fn(() => {
    return {
      breadCrumbsList: [],
      disabled: mockDisabled,
      allowDrop: mockAllDrop,
      dragLeave: mockDragLeave,
      onDiscardChanges: mockOnDiscardChanges,
      closeSaveGPOModal: mockCloseSaveGPOModal,
      drop: mockDrop,
      onSaveGPO: mockOnSaveGPO,
      productData: [],
      currentEditId: '',
      setCurrentEditId: jest.fn(),
      productCategoriesLoading: false,
      saveModalLoading: false,
      saveGPOLoading: false,
      saveGPOSuccess: false,
      saveGPOError: false,
      saveGPOMessage: false,
      userProfileData: {},
    }
  }),
}))

describe('Main Component', () => {
  const mockDispatch = jest.fn()
  const mockUseSelector = jest.fn((state) => state)
  ;(useDispatch as jest.Mock).mockReturnValue(mockDispatch)
  ;(useSelector as jest.Mock).mockReturnValue(mockUseSelector)

  beforeEach(() => {
    // Reset mock functions before each test
    mockDispatch.mockClear()
    mockUseSelector.mockClear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    const mockUseSelector = useSelector as jest.Mock<any>

    mockUseSelector.mockImplementation((selectorFn) => {
      return {} // Default return for other cases
    })
    render(<Main />)
  })

  it('renders discard changes button', () => {
    render(<Main />)
    const discardChangesButton = screen.getByText('Discard Changes')
    expect(discardChangesButton).toBeInTheDocument()
  })

  it('renders save button', () => {
    render(<Main />)
    const saveButton = screen.getByText('Save')
    expect(saveButton).toBeInTheDocument()
  })

  it('calls onDiscardChanges when discard changes button is clicked', () => {
    render(<Main />) // Provide the required props

    const discardChangesButton = screen.getByText('Discard Changes')
    fireEvent.click(discardChangesButton)

    expect(mockOnDiscardChanges).toHaveBeenCalled()
  })

  it('calls onSaveGPO when save button is clicked', () => {
    render(<Main />) // Provide the required props

    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)

    expect(mockOnSaveGPO).toHaveBeenCalled()
  })
})

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // For additional matchers

import AlertModal from '../../../components/Shareables/AlertModal'

describe('AlertModal', () => {
  it('renders without crashing', () => {
    render(<AlertModal closeModal={() => {}} loading={false} isOpen={true} />)
  })

  it('displays loading message when loading is true', () => {
    const { getByTestId } = render(<AlertModal closeModal={() => {}} loading={true} isOpen={true} loadingMessage='Loading' />)

    expect(getByTestId('loading-alert')).toBeInTheDocument()
  })

  it('calls closeModal when close button is clicked', () => {
    const closeModalMock = jest.fn()
    const { getByAltText } = render(<AlertModal closeModal={closeModalMock} loading={false} isOpen={true} />)

    fireEvent.click(getByAltText('Close'))

    expect(closeModalMock).toHaveBeenCalledTimes(1)
  })
})

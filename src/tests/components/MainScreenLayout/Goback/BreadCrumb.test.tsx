import React from 'react'
import { render } from '@testing-library/react'
import BreadCrumb from '../../../../components/MainScreenLayout/Goback/BreadCrumb'

// Mock the SVG import
jest.mock('Assets/svgs', () => ({
  greaterThan: 'mocked-greaterThan-svg',
}))

describe('BreadCrumb', () => {
  it('should render the text when isLastItem is true', () => {
    const props = {
      isLastItem: true,
      link: '/some-link',
      text: 'Home',
    }

    const { getByText } = render(<BreadCrumb {...props} />)
    expect(getByText('Home')).toBeInTheDocument()
  })

  it('should render the text and the greaterThan icon when isLastItem is false', () => {
    const props = {
      isLastItem: false,
      link: '/some-link',
      text: 'About',
    }

    const { getByText, getByAltText } = render(<BreadCrumb {...props} />)
    expect(getByText('About')).toBeInTheDocument()

    // Ensure the greaterThan icon is rendered
    const greaterThanIcon = getByAltText('greaterThan')
    expect(greaterThanIcon).toBeInTheDocument()
    expect(greaterThanIcon).toHaveAttribute('src', 'mocked-greaterThan-svg')
  })
})

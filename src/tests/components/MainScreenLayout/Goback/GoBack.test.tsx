import { render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import GoBack, { BreadCrumbsListItemType } from '../../../../components/MainScreenLayout/Goback/GoBack'

const mockBreadCrumbs: BreadCrumbsListItemType[] = [
  {
    text: 'Sample Crumb 1',
    link: '/sample1',
  },
  {
    text: 'Sample Crumb 2',
    link: '/sample2',
  },
]

describe('GoBack component', () => {
  const headerText = 'Sample Header'

  it('renders headerText and breadcrumbs correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        {' '}
        {/* Wrap the component with MemoryRouter */}
        <GoBack headerText={headerText} breadCrumbsList={mockBreadCrumbs} />
      </MemoryRouter>
    )
    // Check if headerText is rendered
    expect(getByText(headerText)).toBeInTheDocument()

    // Check if breadcrumbs text is rendered
    mockBreadCrumbs.forEach((crumb) => {
      expect(getByText(crumb.text)).toBeInTheDocument()
    })
  })

  it('renders the correct number of breadcrumbs', () => {
    const { container } = render(
      <MemoryRouter>
        <GoBack headerText={headerText} breadCrumbsList={mockBreadCrumbs} />
      </MemoryRouter>
    )
    // Check if the correct number of breadcrumb items are rendered
    const breadcrumbItems = container.querySelectorAll('.flex.gap-3.items-center')
    expect(breadcrumbItems.length).toBe(mockBreadCrumbs.length)
  })
})

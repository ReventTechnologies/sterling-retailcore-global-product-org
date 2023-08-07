import React from 'react'
import { render, screen } from '@testing-library/react'
import { Loader, BlockLoader, InlineLoader } from '../../components/Loader/Loader'

describe('Loader', () => {
  it('should render a loader with the correct class name', () => {
    render(<Loader />)
    const loaderElement = screen.getByTestId('loader-spinner')
    expect(loaderElement).toHaveClass('spinner')
  })
})

describe('BlockLoader', () => {
  it('should render a block loader with the correct class names', () => {
    render(<BlockLoader />)
    const loaderElement = screen.getByTestId('loader-spinner')
    expect(loaderElement).toHaveClass('spinner')
    const blockLoaderElement = screen.getByTestId('block-loader')
    expect(blockLoaderElement).toHaveClass('flex', 'justify-center', 'mt-10', 'w-full')
  })
})

describe('InlineLoader', () => {
  it('should render an inline loader with the correct class name', () => {
    render(<InlineLoader />)
    const loaderElement = screen.getByTestId('loader-inline')
    expect(loaderElement).toHaveClass('inline-loader')
  })
})

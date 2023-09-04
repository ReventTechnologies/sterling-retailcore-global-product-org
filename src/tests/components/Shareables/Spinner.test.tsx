import React from 'react';
import { render } from '@testing-library/react';
import Spinner from '../../../components/Shareables/Spinner'

describe('Spinner component', () => {
  it('renders with default medium size', () => {
    const { container } = render(<Spinner size='medium' />);
    const spinnerElement = container.querySelector('.w-8.h-8'); // Assuming 'w-8 h-8' is the class for medium size

    expect(spinnerElement).toBeInTheDocument();
  });

  it('renders with small size', () => {
    const { container } = render(<Spinner size="small" />);
    const spinnerElement = container.querySelector('.w-4.h-4');

    expect(spinnerElement).toBeInTheDocument();
  });

  it('renders with large size', () => {
    const { container } = render(<Spinner size="large" />);
    const spinnerElement = container.querySelector('.w-16.h-16');

    expect(spinnerElement).toBeInTheDocument();
  });

  it('renders with a role attribute', () => {
    const { container } = render(<Spinner size='small' />);
    const spinnerElement = container.querySelector('[role="status"]');

    expect(spinnerElement).toBeInTheDocument();
  });

  it('renders with a "Loading..." label', () => {
    const { getByText } = render(<Spinner size='medium' />);
    const loadingLabel = getByText('Loading...');

    expect(loadingLabel).toBeInTheDocument();
  });
});

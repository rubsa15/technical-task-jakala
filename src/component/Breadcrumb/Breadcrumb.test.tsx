import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Breadcrumb from './Breadcrumb';
import * as ProductHook from '../../hooks/useProduct';
import { useLocation } from 'react-router';
import '@testing-library/jest-dom';

vi.mock('react-router', () => ({
  useLocation: vi.fn(),
}));

describe('Breadcrumb component', () => {
  it('renders breadcrumb paths based on the current URL', () => {
    const useLocationMock = vi.fn().mockReturnValue({ pathname: '/home/shop' });
    vi.mocked(useLocation).mockImplementation(useLocationMock);
    vi.spyOn(ProductHook, 'useProduct').mockReturnValue({
      productSelected: undefined,
      isLoading: false,
    });

    render(<Breadcrumb />);

    const breadcrumbs = screen.getAllByText(/home|shop/);
    expect(breadcrumbs).toHaveLength(2);

    expect(breadcrumbs[0]).toHaveTextContent('home');
    expect(breadcrumbs[1]).toHaveTextContent('> shop');
  });

  it('displays the product name when the path contains "product"', () => {
    const useLocationMock = vi
      .fn()
      .mockReturnValue({ pathname: '/product/123' });
    vi.mocked(useLocation).mockImplementation(useLocationMock);
    vi.spyOn(ProductHook, 'useProduct').mockReturnValue({
      productSelected: { name: 'Test Product' },
      isLoading: false,
    });

    render(<Breadcrumb />);

    const productBreadcrumb = screen.getByText('> Test Product');
    expect(productBreadcrumb).toBeInTheDocument();
  });

  it('does not display anything if the path is empty', () => {
    const useLocationMock = vi.fn().mockReturnValue({ pathname: '/' });
    vi.mocked(useLocation).mockImplementation(useLocationMock);
    vi.spyOn(ProductHook, 'useProduct').mockReturnValue({
      productSelected: undefined,
      isLoading: false,
    });

    render(<Breadcrumb />);

    const breadcrumbContainer = screen.queryByTestId('breadcrumb-0');
    expect(breadcrumbContainer).toBeNull();
  });
});

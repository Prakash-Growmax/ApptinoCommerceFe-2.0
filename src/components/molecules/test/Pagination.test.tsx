import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../Pagination/Pagination';
import { vi } from 'vitest';

describe('Pagination', () => {
  const mockHandlePageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render pagination component', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockHandlePageChange}
      />
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  it('should display current page information', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockHandlePageChange}
      />
    );

    expect(screen.getByText('Page 3 of 10')).toBeInTheDocument();
    expect(screen.getByRole('button', { current: 'page' })).toHaveTextContent('3');
  });

  it('should call onPageChange when next button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockHandlePageChange}
      />
    );

    const nextButton = screen.getByLabelText('Go to next page');
    await user.click(nextButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange when page number is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockHandlePageChange}
      />
    );

    const pageButton = screen.getByLabelText('Go to page 3');
    await user.click(pageButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(3);
  });

  it('should disable previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockHandlePageChange}
      />
    );

    const prevButton = screen.getByLabelText('Go to previous page');
    expect(prevButton).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockHandlePageChange}
      />
    );

    const nextButton = screen.getByLabelText('Go to next page');
    expect(nextButton).toBeDisabled();
  });

  it('should call onPageChange when previous button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockHandlePageChange}
      />
    );

    const prevButton = screen.getByLabelText('Go to previous page');
    await user.click(prevButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(2);
  });

  it('should not render when totalPages is 1 or less', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockHandlePageChange}
      />
    );

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('should show ellipsis for large page counts', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={20}
        onPageChange={mockHandlePageChange}
      />
    );

    // Should show ellipsis (there may be multiple)
    const ellipsisElements = screen.getAllByText('...');
    expect(ellipsisElements.length).toBeGreaterThan(0);
  });
});
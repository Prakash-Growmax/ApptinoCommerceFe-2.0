import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import SearchBox from '../SearchBox/SearchBox'; // Fixed default import

// Mock react-device-detect since it's used in the component
vi.mock('react-device-detect', () => ({
  isMobile: false,
}));

// Mock the UI components if they're not available in test environment
vi.mock('@/components/ui/button', () => ({
  ShadCnButton: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

vi.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input {...props} />,
}));

vi.mock('@/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Search: () => <span data-testid="search-icon">Search</span>,
  X: () => <span data-testid="x-icon">X</span>,
}));

describe('SearchBox', () => {
  const defaultProps = {
    searchTextValue: '',
    handleSearch: vi.fn(),
    handleSearchClear: vi.fn(),
    searchPlaceholder: 'Search',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search input', () => {
    render(<SearchBox {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('should call handleSearch when input changes', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();
    
    render(
      <SearchBox 
        {...defaultProps}
        searchTextValue=""
        handleSearch={handleSearch}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search');
    
    // Simulate user typing - this will call handleSearch for each keystroke
    await user.type(searchInput, 'a');
    
    // Verify handleSearch was called
    expect(handleSearch).toHaveBeenCalledWith('a');
    expect(handleSearch).toHaveBeenCalledTimes(1);
    
    // Test with multiple characters - each will be a separate call
    handleSearch.mockClear();
    await user.type(searchInput, 'bc');
    
    expect(handleSearch).toHaveBeenCalledTimes(2);
    expect(handleSearch).toHaveBeenNthCalledWith(1, 'b');
    expect(handleSearch).toHaveBeenNthCalledWith(2, 'c');
  });

  it('should show clear button when has value', () => {
    render(
      <SearchBox 
        {...defaultProps}
        searchTextValue="test"
      />
    );
    
    // The clear button should be present when there's a value
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();
  });

  it('should show search icon when no value', () => {
    render(
      <SearchBox 
        {...defaultProps}
        searchTextValue=""
      />
    );
    
    // Should show search icon when no value
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('should call handleSearchClear on clear button click', async () => {
    const user = userEvent.setup();
    const handleSearchClear = vi.fn();
    
    render(
      <SearchBox 
        {...defaultProps}
        searchTextValue="test"
        handleSearchClear={handleSearchClear}
      />
    );
    
    const clearButton = screen.getByRole('button');
    await user.click(clearButton);
    
    expect(handleSearchClear).toHaveBeenCalled();
  });

  it('should use custom placeholder', () => {
    render(
      <SearchBox 
        {...defaultProps}
        searchPlaceholder="Custom search placeholder"
      />
    );
    
    expect(screen.getByPlaceholderText('Custom search placeholder')).toBeInTheDocument();
  });
});
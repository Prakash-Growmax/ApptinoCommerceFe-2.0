# 🧪 Testing Roadmap for Junior Intern

## Overview
This roadmap provides a structured approach to implement comprehensive testing for our React commerce application. Each test case is designed to be a micro-task that can be completed in 2-4 hours, helping you learn testing concepts while improving application quality.

## 🎯 Learning Objectives
- Master unit testing with Vitest and Testing Library
- Understand mocking strategies for APIs and browser features
- Learn component testing with user interactions
- Practice TDD (Test-Driven Development) approach
- Build confidence in writing maintainable tests

## 📋 Testing Commands Reference
```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run tests with coverage
pnpm test:coverage

# Run tests with UI
pnpm test:ui

# Type check
pnpm type-check
```

---

## 🏆 Week 1: Foundation Testing (5 Test Cases)

### Test Case 1.1: useCopyToClipboard Hook
**File**: `src/hooks/__tests__/useCopyToClipboard.test.ts`

**Learning Goal**: Basic hook testing with async operations and mocking

**Test Implementation**:
```typescript
import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from '../useCopyToClipboard';

describe('useCopyToClipboard', () => {
  const mockWriteText = vi.fn();
  
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should copy text successfully', async () => {
    mockWriteText.mockResolvedValue(undefined);
    
    const { result } = renderHook(() => useCopyToClipboard());
    const [copiedText, copy] = result.current;
    
    expect(copiedText).toBeNull();
    
    await act(async () => {
      const success = await copy('test text');
      expect(success).toBe(true);
    });
    
    expect(mockWriteText).toHaveBeenCalledWith('test text');
    expect(result.current[0]).toBe('test text');
  });

  it('should handle clipboard API failure', async () => {
    mockWriteText.mockRejectedValue(new Error('Clipboard not available'));
    
    const { result } = renderHook(() => useCopyToClipboard());
    const [, copy] = result.current;
    
    await act(async () => {
      const success = await copy('test text');
      expect(success).toBe(false);
    });
    
    expect(result.current[0]).toBeNull();
  });

  it('should handle missing clipboard API', async () => {
    Object.assign(navigator, { clipboard: undefined });
    
    const { result } = renderHook(() => useCopyToClipboard());
    const [, copy] = result.current;
    
    await act(async () => {
      const success = await copy('test text');
      expect(success).toBe(false);
    });
  });
});
```

**Expected Results**: 
- ✅ All 3 tests pass
- ✅ 100% coverage for useCopyToClipboard hook
- ✅ Understanding of async testing and mocking navigator API

---

### Test Case 1.2: useDebounce Hook
**File**: `src/hooks/__tests__/useDebounce.test.ts`

**Learning Goal**: Testing hooks with timers and fake timers

**Test Implementation**:
```typescript
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current).toBe('initial');

    // Update value
    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast-forward time by 250ms
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast-forward time by remaining 250ms
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe('updated'); // Should now be updated
  });

  it('should cancel previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 500 } }
    );

    expect(result.current).toBe('first');

    // Rapid changes
    rerender({ value: 'second', delay: 500 });
    act(() => vi.advanceTimersByTime(300));
    
    rerender({ value: 'third', delay: 500 });
    act(() => vi.advanceTimersByTime(300));
    
    expect(result.current).toBe('first'); // Should still be first
    
    // Complete the timeout
    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe('third'); // Should be the latest value
  });
});
```

**Expected Results**: 
- ✅ Tests pass with fake timers
- ✅ Understanding of timer-based testing
- ✅ Knowledge of debounce behavior

---

### Test Case 1.3: useLocalStorage Hook
**File**: `src/hooks/__tests__/useLocalStorage.test.ts`

**Learning Goal**: Testing hooks with localStorage and error handling

**Test Implementation**:
```typescript
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    expect(result.current[0]).toBe('default');
  });

  it('should return stored value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    expect(result.current[0]).toBe('stored-value');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('should handle localStorage errors gracefully', () => {
    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem');
    mockSetItem.mockImplementation(() => {
      throw new Error('localStorage is full');
    });
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    // Should still update state even if localStorage fails
    expect(result.current[0]).toBe('new-value');
    
    mockSetItem.mockRestore();
  });
});
```

**Expected Results**: 
- ✅ Tests pass with localStorage mocking
- ✅ Understanding of storage testing
- ✅ Error handling verification

---

### Test Case 1.4: Button Component
**File**: `src/components/ui/__tests__/Button.test.tsx`

**Learning Goal**: Basic component testing with props and interactions

**Test Implementation**:
```typescript
import { render, screen } from '@/test/utils/render';
import { Button } from '../Button';

describe('Button', () => {
  it('should render with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('should render different variants', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary');
    
    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border');
    
    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-accent');
  });

  it('should handle click events', async () => {
    const handleClick = vi.fn();
    const { user } = render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('should render loading state', () => {
    render(<Button loading>Loading</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
```

**Expected Results**: 
- ✅ Component renders correctly
- ✅ Props work as expected
- ✅ User interactions handled properly

---

### Test Case 1.5: Input Component
**File**: `src/components/ui/__tests__/Input.test.tsx`

**Learning Goal**: Form component testing with validation states

**Test Implementation**:
```typescript
import { render, screen } from '@/test/utils/render';
import { Input } from '../Input';

describe('Input', () => {
  it('should render with placeholder', () => {
    render(<Input placeholder="Enter your name" />);
    
    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
  });

  it('should handle value changes', async () => {
    const handleChange = vi.fn();
    const { user } = render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test value');
    
    expect(handleChange).toHaveBeenCalledTimes(10); // 'test value' = 10 characters
  });

  it('should show error state', () => {
    render(<Input error="This field is required" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-destructive');
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<Input size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-8');
    
    rerender(<Input size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-12');
  });
});
```

**Expected Results**: 
- ✅ Input component works correctly
- ✅ Validation states display properly
- ✅ User input handling verified

---

## 🚀 Week 2: Component & Form Testing (8 Test Cases)

### Test Case 2.1: UserPreferences Component
**File**: `src/features/settings/components/__tests__/UserPreferences.test.tsx`

**Learning Goal**: Testing complex components with state management

**Test Implementation**:
```typescript
import { render, screen, waitFor } from '@/test/utils/render';
import { UserPreferences } from '../UserPreferences';

describe('UserPreferences', () => {
  it('should render all preference options', () => {
    render(<UserPreferences />);
    
    expect(screen.getByText('Theme')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Date Format')).toBeInTheDocument();
  });

  it('should toggle theme preference', async () => {
    const { user } = render(<UserPreferences />);
    
    const themeToggle = screen.getByRole('switch', { name: /dark mode/i });
    expect(themeToggle).not.toBeChecked();
    
    await user.click(themeToggle);
    expect(themeToggle).toBeChecked();
  });

  it('should change language preference', async () => {
    const { user } = render(<UserPreferences />);
    
    const languageSelect = screen.getByRole('combobox', { name: /language/i });
    await user.click(languageSelect);
    
    const spanishOption = screen.getByRole('option', { name: /spanish/i });
    await user.click(spanishOption);
    
    expect(screen.getByDisplayValue('Spanish')).toBeInTheDocument();
  });

  it('should save preferences when form is submitted', async () => {
    const { user } = render(<UserPreferences />);
    
    const saveButton = screen.getByRole('button', { name: /save preferences/i });
    await user.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText('Preferences saved successfully')).toBeInTheDocument();
    });
  });
});
```

**Expected Results**: 
- ✅ Component renders all preference options
- ✅ User interactions work correctly
- ✅ Form submission handled properly

---

### Test Case 2.2: Company Details Form
**File**: `src/features/settings/components/__tests__/CompanyDetailsEdit.test.tsx`

**Learning Goal**: Form validation and submission testing

**Test Implementation**:
```typescript
import { render, screen, waitFor } from '@/test/utils/render';
import { CompanyDetailsEdit } from '../CompanyDetailsEdit';

describe('CompanyDetailsEdit', () => {
  it('should render all form fields', () => {
    render(<CompanyDetailsEdit />);
    
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
  });

  it('should show validation errors for required fields', async () => {
    const { user } = render(<CompanyDetailsEdit />);
    
    const submitButton = screen.getByRole('button', { name: /save/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Company name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('should validate email format', async () => {
    const { user } = render(<CompanyDetailsEdit />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /save/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const { user } = render(<CompanyDetailsEdit />);
    
    await user.type(screen.getByLabelText(/company name/i), 'Test Company');
    await user.type(screen.getByLabelText(/email/i), 'test@company.com');
    await user.type(screen.getByLabelText(/phone/i), '+1234567890');
    
    const submitButton = screen.getByRole('button', { name: /save/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Company details updated successfully')).toBeInTheDocument();
    });
  });
});
```

**Expected Results**: 
- ✅ Form renders correctly
- ✅ Validation works as expected
- ✅ Successful submission handled

---

### Test Case 2.3: DashboardTable Component
**File**: `src/components/organisms/__tests__/DashboardTable.test.tsx`

**Learning Goal**: Testing complex table component with data and interactions

**Test Implementation**:
```typescript
import { render, screen } from '@/test/utils/render';
import { DashboardTable } from '../DashboardTable';

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
];

const mockColumns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'status', header: 'Status' },
];

describe('DashboardTable', () => {
  it('should render table with data', () => {
    render(
      <DashboardTable
        data={mockData}
        columns={mockColumns}
        loading={false}
        totalDataCount={2}
      />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    render(
      <DashboardTable
        data={[]}
        columns={mockColumns}
        loading={true}
        totalDataCount={0}
      />
    );
    
    expect(screen.getByTestId('table-loading')).toBeInTheDocument();
  });

  it('should handle row click', async () => {
    const handleRowClick = vi.fn();
    const { user } = render(
      <DashboardTable
        data={mockData}
        columns={mockColumns}
        loading={false}
        totalDataCount={2}
        onRowClick={handleRowClick}
      />
    );
    
    const firstRow = screen.getByText('John Doe').closest('tr');
    await user.click(firstRow!);
    
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('should handle pagination', async () => {
    const handlePageChange = vi.fn();
    const { user } = render(
      <DashboardTable
        data={mockData}
        columns={mockColumns}
        loading={false}
        totalDataCount={50}
        page={1}
        setPage={handlePageChange}
      />
    );
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
});
```

**Expected Results**: 
- ✅ Table renders with correct data
- ✅ Loading states work
- ✅ Pagination and row clicks handled

---

### Test Case 2.4: Support Filters Component
**File**: `src/features/support/components/__tests__/SupportFilters.test.tsx`

**Learning Goal**: Testing filter components with state management

**Test Implementation**:
```typescript
import { render, screen } from '@/test/utils/render';
import { SupportFilters } from '../SupportFilters';

describe('SupportFilters', () => {
  it('should render all filter options', () => {
    render(<SupportFilters />);
    
    expect(screen.getByPlaceholderText(/search tickets/i)).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Priority')).toBeInTheDocument();
    expect(screen.getByText('Date Range')).toBeInTheDocument();
  });

  it('should handle search input', async () => {
    const { user } = render(<SupportFilters />);
    
    const searchInput = screen.getByPlaceholderText(/search tickets/i);
    await user.type(searchInput, 'test search');
    
    expect(searchInput).toHaveValue('test search');
  });

  it('should filter by status', async () => {
    const { user } = render(<SupportFilters />);
    
    const statusFilter = screen.getByRole('combobox', { name: /status/i });
    await user.click(statusFilter);
    
    const openOption = screen.getByRole('option', { name: /open/i });
    await user.click(openOption);
    
    expect(screen.getByDisplayValue('Open')).toBeInTheDocument();
  });

  it('should clear all filters', async () => {
    const { user } = render(<SupportFilters />);
    
    // Apply some filters first
    const searchInput = screen.getByPlaceholderText(/search tickets/i);
    await user.type(searchInput, 'test');
    
    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    await user.click(clearButton);
    
    expect(searchInput).toHaveValue('');
  });
});
```

**Expected Results**: 
- ✅ All filter options render
- ✅ Filter interactions work
- ✅ Clear functionality works

---

### Test Case 2.5: Authentication Form
**File**: `src/features/auth/components/__tests__/LoginForm.test.tsx`

**Learning Goal**: Testing authentication flows and error handling

**Test Implementation**:
```typescript
import { render, screen, waitFor } from '@/test/utils/render';
import { LoginForm } from '../LoginForm';

describe('LoginForm', () => {
  it('should render login form', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    const { user } = render(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('should handle successful login', async () => {
    const { user } = render(<LoginForm />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Login successful')).toBeInTheDocument();
    });
  });

  it('should handle login error', async () => {
    const { user } = render(<LoginForm />);
    
    await user.type(screen.getByLabelText(/email/i), 'wrong@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword');
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});
```

**Expected Results**: 
- ✅ Form validation works
- ✅ Successful login handled
- ✅ Error states displayed

---

### Test Case 2.6: Modal Components
**File**: `src/components/organisms/__tests__/Modal.test.tsx`

**Learning Goal**: Testing modal behavior and accessibility

**Test Implementation**:
```typescript
import { render, screen } from '@/test/utils/render';
import { Modal } from '../Modal';

describe('Modal', () => {
  it('should render modal when open', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>Modal content</div>
      </Modal>
    );
    
    expect(screen.getByText('Modal content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should not render modal when closed', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <div>Modal content</div>
      </Modal>
    );
    
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('should call onClose when clicking outside', async () => {
    const handleClose = vi.fn();
    const { user } = render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal content</div>
      </Modal>
    );
    
    const overlay = screen.getByTestId('modal-overlay');
    await user.click(overlay);
    
    expect(handleClose).toHaveBeenCalled();
  });

  it('should close on escape key', async () => {
    const handleClose = vi.fn();
    const { user } = render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal content</div>
      </Modal>
    );
    
    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalled();
  });
});
```

**Expected Results**: 
- ✅ Modal opens and closes correctly
- ✅ Keyboard navigation works
- ✅ Click outside handling

---

### Test Case 2.7: Pagination Component
**File**: `src/components/molecules/__tests__/Pagination.test.tsx`

**Learning Goal**: Testing pagination logic and edge cases

**Test Implementation**:
```typescript
import { render, screen } from '@/test/utils/render';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  it('should render pagination controls', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
      />
    );
    
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should disable previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
      />
    );
    
    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={vi.fn()}
      />
    );
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('should handle page change', async () => {
    const handlePageChange = vi.fn();
    const { user } = render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    );
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
});
```

**Expected Results**: 
- ✅ Pagination renders correctly
- ✅ Button states work properly
- ✅ Page changes handled

---

### Test Case 2.8: Search Component
**File**: `src/components/molecules/__tests__/SearchBox.test.tsx`

**Learning Goal**: Testing search functionality with debouncing

**Test Implementation**:
```typescript
import { render, screen, waitFor } from '@/test/utils/render';
import { SearchBox } from '../SearchBox';

describe('SearchBox', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render search input', () => {
    render(<SearchBox onSearch={vi.fn()} />);
    
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('should debounce search calls', async () => {
    const handleSearch = vi.fn();
    const { user } = render(<SearchBox onSearch={handleSearch} delay={500} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    await user.type(searchInput, 'test');
    
    // Should not call immediately
    expect(handleSearch).not.toHaveBeenCalled();
    
    // Fast-forward time
    vi.advanceTimersByTime(500);
    
    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledWith('test');
    });
  });

  it('should show clear button when has value', async () => {
    const { user } = render(<SearchBox onSearch={vi.fn()} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    await user.type(searchInput, 'test');
    
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('should clear search on clear button click', async () => {
    const handleSearch = vi.fn();
    const { user } = render(<SearchBox onSearch={handleSearch} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    await user.type(searchInput, 'test');
    
    const clearButton = screen.getByRole('button', { name: /clear/i });
    await user.click(clearButton);
    
    expect(searchInput).toHaveValue('');
    expect(handleSearch).toHaveBeenCalledWith('');
  });
});
```

**Expected Results**: 
- ✅ Search input works correctly
- ✅ Debouncing functions properly
- ✅ Clear functionality works

---

## 🔗 Week 3: API Integration Testing (10 Test Cases)

### Test Case 3.1: useUserPreferences Hook
**File**: `src/features/settings/hooks/__tests__/useUserPreferences.test.ts`

**Learning Goal**: Testing custom hooks with TanStack Query and MSW

**Test Implementation**:
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/test/mocks/server';
import { TestQueryClientProvider } from '@/test/utils/test-providers';
import { useUserPreferences } from '../useUserPreferences';

describe('useUserPreferences', () => {
  it('should fetch user preferences successfully', async () => {
    server.use(
      rest.get('/api/user/preferences', (req, res, ctx) => {
        return res(ctx.json({
          success: true,
          data: {
            theme: 'dark',
            language: 'en',
            notifications: true
          }
        }));
      })
    );

    const { result } = renderHook(() => useUserPreferences(), {
      wrapper: TestQueryClientProvider
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      theme: 'dark',
      language: 'en',
      notifications: true
    });
  });

  it('should handle fetch error', async () => {
    server.use(
      rest.get('/api/user/preferences', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({
          success: false,
          message: 'Internal server error'
        }));
      })
    );

    const { result } = renderHook(() => useUserPreferences(), {
      wrapper: TestQueryClientProvider
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeTruthy();
  });

  it('should retry on failure', async () => {
    let callCount = 0;
    server.use(
      rest.get('/api/user/preferences', (req, res, ctx) => {
        callCount++;
        if (callCount === 1) {
          return res(ctx.status(500));
        }
        return res(ctx.json({
          success: true,
          data: { theme: 'light' }
        }));
      })
    );

    const { result } = renderHook(() => useUserPreferences(), {
      wrapper: TestQueryClientProvider
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(callCount).toBe(2);
  });
});
```

**Expected Results**: 
- ✅ Successful API calls handled
- ✅ Error states managed properly
- ✅ Retry logic works

---

### Test Case 3.2: useUpdateUserPreferences Hook
**File**: `src/features/settings/hooks/__tests__/useUpdateUserPreferences.test.ts`

**Learning Goal**: Testing mutation hooks with optimistic updates

**Test Implementation**:
```typescript
import { renderHook, waitFor, act } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '@/test/mocks/server';
import { TestQueryClientProvider } from '@/test/utils/test-providers';
import { useUpdateUserPreferences } from '../useUserPreferences';

describe('useUpdateUserPreferences', () => {
  it('should update user preferences successfully', async () => {
    server.use(
      rest.put('/api/user/preferences', (req, res, ctx) => {
        return res(ctx.json({
          success: true,
          data: { theme: 'dark', language: 'en' }
        }));
      })
    );

    const { result } = renderHook(() => useUpdateUserPreferences(), {
      wrapper: TestQueryClientProvider
    });

    await act(async () => {
      result.current.mutate({
        theme: 'dark',
        language: 'en'
      });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      theme: 'dark',
      language: 'en'
    });
  });

  it('should handle update error', async () => {
    server.use(
      rest.put('/api/user/preferences', (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({
          success: false,
          message: 'Invalid preferences data'
        }));
      })
    );

    const { result } = renderHook(() => useUpdateUserPreferences(), {
      wrapper: TestQueryClientProvider
    });

    await act(async () => {
      result.current.mutate({
        theme: 'invalid-theme'
      });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe('Invalid preferences data');
  });

  it('should show success toast on successful update', async () => {
    const mockToast = vi.fn();
    vi.mock('sonner', () => ({
      toast: {
        success: mockToast
      }
    }));

    server.use(
      rest.put('/api/user/preferences', (req, res, ctx) => {
        return res(ctx.json({
          success: true,
          data: { theme: 'dark' }
        }));
      })
    );

    const { result } = renderHook(() => useUpdateUserPreferences(), {
      wrapper: TestQueryClientProvider
    });

    await act(async () => {
      result.current.mutate({ theme: 'dark' });
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith('Preferences updated successfully');
    });
  });
});
```

**Expected Results**: 
- ✅ Mutation works correctly
- ✅ Error handling functions
- ✅ Success notifications shown

---

### Test Case 3.3: API Client Error Handling
**File**: `src/lib/api/__tests__/client.test.ts`

**Learning Goal**: Testing API client interceptors and error handling

**Test Implementation**:
```typescript
import { rest } from 'msw';
import { server } from '@/test/mocks/server';
import { apiClient } from '../client';

describe('API Client', () => {
  it('should add authorization header for authenticated requests', async () => {
    localStorage.setItem('token', 'test-token');

    server.use(
      rest.get('/api/test', (req, res, ctx) => {
        const authHeader = req.headers.get('Authorization');
        return res(ctx.json({ 
          hasAuth: authHeader === 'Bearer test-token' 
        }));
      })
    );

    const response = await apiClient.get('/api/test');
    expect(response.data.hasAuth).toBe(true);
  });

  it('should handle 401 unauthorized errors', async () => {
    server.use(
      rest.get('/api/protected', (req, res, ctx) => {
        return res(ctx.status(401), ctx.json({
          message: 'Unauthorized'
        }));
      })
    );

    await expect(apiClient.get('/api/protected')).rejects.toThrow('Unauthorized');
  });

  it('should handle network errors', async () => {
    server.use(
      rest.get('/api/test', (req, res, ctx) => {
        return res.networkError('Network error');
      })
    );

    await expect(apiClient.get('/api/test')).rejects.toThrow();
  });

  it('should retry failed requests', async () => {
    let callCount = 0;
    server.use(
      rest.get('/api/retry-test', (req, res, ctx) => {
        callCount++;
        if (callCount === 1) {
          return res(ctx.status(500));
        }
        return res(ctx.json({ success: true }));
      })
    );

    const response = await apiClient.get('/api/retry-test');
    expect(response.data.success).toBe(true);
    expect(callCount).toBe(2);
  });
});
```

**Expected Results**: 
- ✅ Authorization headers added
- ✅ Error responses handled
- ✅ Retry logic functions

---

### Test Case 3.4: Support API Functions
**File**: `src/features/support/api/__tests__/supportApi.test.ts`

**Learning Goal**: Testing API functions with different response scenarios

**Test Implementation**:
```typescript
import { rest } from 'msw';
import { server } from '@/test/mocks/server';
import { supportApi } from '../supportApi';

describe('Support API', () => {
  it('should fetch support tickets successfully', async () => {
    const mockTickets = [
      { id: 1, title: 'Test Ticket', status: 'open' },
      { id: 2, title: 'Another Ticket', status: 'closed' }
    ];

    server.use(
      rest.get('/api/support/tickets', (req, res, ctx) => {
        return res(ctx.json({
          success: true,
          data: mockTickets,
          total: 2
        }));
      })
    );

    const response = await supportApi.getTickets();
    expect(response.success).toBe(true);
    expect(response.data).toEqual(mockTickets);
    expect(response.total).toBe(2);
  });

  it('should handle pagination parameters', async () => {
    server.use(
      rest.get('/api/support/tickets', (req, res, ctx) => {
        const page = req.url.searchParams.get('page');
        const limit = req.url.searchParams.get('limit');
        
        return res(ctx.json({
          success: true,
          data: [],
          pagination: { page: parseInt(page || '1'), limit: parseInt(limit || '20') }
        }));
      })
    );

    const response = await supportApi.getTickets({ page: 2, limit: 10 });
    expect(response.pagination.page).toBe(2);
    expect(response.pagination.limit).toBe(10);
  });

  it('should create new support ticket', async () => {
    const newTicket = {
      title: 'New Issue',
      description: 'Ticket description',
      priority: 'high'
    };

    server.use(
      rest.post('/api/support/tickets', (req, res, ctx) => {
        return res(ctx.json({
          success: true,
          data: { id: 3, ...newTicket }
        }));
      })
    );

    const response = await supportApi.createTicket(newTicket);
    expect(response.success).toBe(true);
    expect(response.data.title).toBe('New Issue');
  });

  it('should update ticket status', async () => {
    server.use(
      rest.patch('/api/support/tickets/1', (req, res, ctx) => {
        return res(ctx.json({
          success: true,
          data: { id: 1, status: 'resolved' }
        }));
      })
    );

    const response = await supportApi.updateTicketStatus(1, 'resolved');
    expect(response.success).toBe(true);
    expect(response.data.status).toBe('resolved');
  });
});
```

**Expected Results**: 
- ✅ API functions work correctly
- ✅ Parameters passed properly
- ✅ Different HTTP methods handled

---

### Test Case 3.5: Customer API Functions
**File**: `src/features/customer/api/__tests__/customerApi.test.ts`

**Learning Goal**: Testing CRUD operations with proper error handling

**Test Implementation**:
```typescript
import { rest } from 'msw';
import { server } from '@/test/mocks/server';
import { customerApi } from '../customerApi';

describe('Customer API', () => {
  it('should fetch customers with search', async () => {
    server.use(
      rest.get('/api/customers', (req, res, ctx) => {
        const search = req.url.searchParams.get('search');
        
        return res(ctx.json({
          success: true,
          data: search ? [{ id: 1, name: 'John Doe' }] : [],
          total: search ? 1 : 0
        }));
      })
    );

    const response = await customerApi.getCustomers({ search: 'John' });
    expect(response.data).toHaveLength(1);
    expect(response.data[0].name).toBe('John Doe');
  });

  it('should handle customer creation validation errors', async () => {
    server.use(
      rest.post('/api/customers', (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({
          success: false,
          message: 'Email already exists',
          errors: { email: 'This email is already registered' }
        }));
      })
    );

    await expect(customerApi.createCustomer({
      name: 'John Doe',
      email: 'existing@example.com'
    })).rejects.toThrow('Email already exists');
  });

  it('should fetch customer by ID', async () => {
    const customer = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890'
    };

    server.use(
      rest.get('/api/customers/1', (req, res, ctx) => {
        return res(ctx.json({
          success: true,
          data: customer
        }));
      })
    );

    const response = await customerApi.getCustomerById(1);
    expect(response.data).toEqual(customer);
  });

  it('should handle 404 for non-existent customer', async () => {
    server.use(
      rest.get('/api/customers/999', (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({
          success: false,
          message: 'Customer not found'
        }));
      })
    );

    await expect(customerApi.getCustomerById(999)).rejects.toThrow('Customer not found');
  });
});
```

**Expected Results**: 
- ✅ CRUD operations work
- ✅ Search functionality tested
- ✅ Error cases handled

---

### Test Case 3.6: Authentication API
**File**: `src/features/auth/api/__tests__/authApi.test.ts`

**Learning Goal**: Testing authentication flows and token management

**Test Implementation**:
```typescript
import { rest } from 'msw';
import { server } from '@/test/mocks/server';
import { authApi } from '../authApi';

describe('Auth API', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should login successfully', async () => {
    server.use(
      rest.post('/api/auth/login', (req, res, ctx) => {
        return res(ctx.json({
          success: true,
          data: {
            token: 'jwt-token',
            user: { id: 1, email: 'test@example.com' }
          }
        }));
      })
    );

    const response = await authApi.login({
      email: 'test@example.com',
      password: 'password123'
    });

    expect(response.success).toBe(true);
    expect(response.data.token).toBe('jwt-token');
    expect(localStorage.getItem('token')).toBe('jwt-token');
  });

  it('should handle login failure', async () => {
    server.use(
      rest.post('/api/auth/login', (req, res, ctx) => {
        return res(ctx.status(401), ctx.json({
          success: false,
          message: 'Invalid credentials'
        }));
      })
    );

    await expect(authApi.login({
      email: 'wrong@example.com',
      password: 'wrongpassword'
    })).rejects.toThrow('Invalid credentials');
  });

  it('should refresh token', async () => {
    localStorage.setItem('token', 'old-token');

    server.use(
      rest.post('/api/auth/refresh', (req, res, ctx) => {
        return res(ctx.json({
          success: true,
          data: { token: 'new-token' }
        }));
      })
    );

    const response = await authApi.refreshToken();
    expect(response.data.token).toBe('new-token');
    expect(localStorage.getItem('token')).toBe('new-token');
  });

  it('should logout and clear token', async () => {
    localStorage.setItem('token', 'test-token');

    server.use(
      rest.post('/api/auth/logout', (req, res, ctx) => {
        return res(ctx.json({ success: true }));
      })
    );

    await authApi.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
```

**Expected Results**: 
- ✅ Login/logout flows work
- ✅ Token management correct
- ✅ Error handling proper

---

### Test Case 3.7: Data Validation with Zod
**File**: `src/features/settings/schema/__tests__/company.schema.test.ts`

**Learning Goal**: Testing data validation schemas

**Test Implementation**:
```typescript
import { companySchema, updateCompanySchema } from '../company.schema';

describe('Company Schema', () => {
  it('should validate correct company data', () => {
    const validData = {
      name: 'Test Company',
      email: 'test@company.com',
      phone: '+1234567890',
      address: '123 Test Street'
    };

    const result = companySchema.safeParse(validData);
    expect(result.success).toBe(true);
    
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it('should reject invalid email format', () => {
    const invalidData = {
      name: 'Test Company',
      email: 'invalid-email',
      phone: '+1234567890',
      address: '123 Test Street'
    };

    const result = companySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email');
    }
  });

  it('should require mandatory fields', () => {
    const incompleteData = {
      name: 'Test Company'
      // Missing required fields
    };

    const result = companySchema.safeParse(incompleteData);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      const errorPaths = result.error.issues.map(issue => issue.path[0]);
      expect(errorPaths).toContain('email');
    }
  });

  it('should validate partial updates', () => {
    const partialData = {
      name: 'Updated Company Name'
    };

    const result = updateCompanySchema.safeParse(partialData);
    expect(result.success).toBe(true);
  });

  it('should validate phone number format', () => {
    const invalidPhone = {
      name: 'Test Company',
      email: 'test@company.com',
      phone: 'invalid-phone',
      address: '123 Test Street'
    };

    const result = companySchema.safeParse(invalidPhone);
    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('phone');
    }
  });
});
```

**Expected Results**: 
- ✅ Valid data passes validation
- ✅ Invalid data rejected properly
- ✅ Error messages correct

---

### Test Case 3.8: Local Storage Utilities
**File**: `src/lib/storage/__tests__/localStorage.test.ts`

**Learning Goal**: Testing utility functions with error handling

**Test Implementation**:
```typescript
import { localStorage } from '../localStorage';

describe('Local Storage Utils', () => {
  beforeEach(() => {
    global.localStorage.clear();
  });

  it('should store and retrieve data', () => {
    const testData = { name: 'John', age: 30 };
    
    localStorage.setItem('user', testData);
    const retrieved = localStorage.getItem('user');
    
    expect(retrieved).toEqual(testData);
  });

  it('should return null for non-existent key', () => {
    const result = localStorage.getItem('non-existent');
    expect(result).toBeNull();
  });

  it('should handle JSON parsing errors', () => {
    global.localStorage.setItem('invalid-json', 'invalid json string');
    
    const result = localStorage.getItem('invalid-json');
    expect(result).toBeNull();
  });

  it('should remove items', () => {
    localStorage.setItem('test', { data: 'value' });
    expect(localStorage.getItem('test')).toBeTruthy();
    
    localStorage.removeItem('test');
    expect(localStorage.getItem('test')).toBeNull();
  });

  it('should handle storage quota exceeded', () => {
    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem');
    mockSetItem.mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    const result = localStorage.setItem('test', { large: 'data' });
    expect(result).toBe(false);
    
    mockSetItem.mockRestore();
  });

  it('should clear all storage', () => {
    localStorage.setItem('item1', { data: 1 });
    localStorage.setItem('item2', { data: 2 });
    
    localStorage.clear();
    
    expect(localStorage.getItem('item1')).toBeNull();
    expect(localStorage.getItem('item2')).toBeNull();
  });
});
```

**Expected Results**: 
- ✅ Storage operations work
- ✅ Error handling functions
- ✅ Edge cases covered

---

### Test Case 3.9: Date Utilities
**File**: `src/lib/utils/__tests__/date.test.ts`

**Learning Goal**: Testing utility functions with edge cases

**Test Implementation**:
```typescript
import { 
  formatDate, 
  isDateInRange, 
  getDaysDifference,
  getRelativeTime 
} from '../date';

describe('Date Utils', () => {
  it('should format date correctly', () => {
    const date = new Date('2023-12-25T10:30:00');
    
    expect(formatDate(date, 'MM/dd/yyyy')).toBe('12/25/2023');
    expect(formatDate(date, 'yyyy-MM-dd')).toBe('2023-12-25');
    expect(formatDate(date, 'dd MMM yyyy')).toBe('25 Dec 2023');
  });

  it('should handle invalid dates', () => {
    const invalidDate = new Date('invalid');
    
    expect(formatDate(invalidDate)).toBe('Invalid Date');
  });

  it('should check if date is in range', () => {
    const date = new Date('2023-12-25');
    const startDate = new Date('2023-12-20');
    const endDate = new Date('2023-12-30');
    
    expect(isDateInRange(date, startDate, endDate)).toBe(true);
    
    const outsideDate = new Date('2023-12-31');
    expect(isDateInRange(outsideDate, startDate, endDate)).toBe(false);
  });

  it('should calculate days difference', () => {
    const date1 = new Date('2023-12-25');
    const date2 = new Date('2023-12-20');
    
    expect(getDaysDifference(date1, date2)).toBe(5);
    expect(getDaysDifference(date2, date1)).toBe(-5);
  });

  it('should get relative time', () => {
    const now = new Date();
    const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    expect(getRelativeTime(hourAgo)).toBe('1 hour ago');
    expect(getRelativeTime(dayAgo)).toBe('1 day ago');
  });

  it('should handle timezone differences', () => {
    const utcDate = new Date('2023-12-25T00:00:00Z');
    const localDate = new Date('2023-12-25T00:00:00');
    
    expect(formatDate(utcDate, 'yyyy-MM-dd')).toBeTruthy();
    expect(formatDate(localDate, 'yyyy-MM-dd')).toBeTruthy();
  });
});
```

**Expected Results**: 
- ✅ Date formatting works
- ✅ Date calculations correct
- ✅ Edge cases handled

---

### Test Case 3.10: Error Handling Utilities
**File**: `src/lib/utils/__tests__/error.test.ts`

**Learning Goal**: Testing error handling and logging

**Test Implementation**:
```typescript
import { handleApiError, isNetworkError, formatErrorMessage } from '../error';

describe('Error Utils', () => {
  it('should handle API errors correctly', () => {
    const apiError = {
      response: {
        status: 400,
        data: {
          message: 'Validation failed',
          errors: { email: 'Invalid email' }
        }
      }
    };

    const result = handleApiError(apiError);
    expect(result.message).toBe('Validation failed');
    expect(result.status).toBe(400);
    expect(result.details).toEqual({ email: 'Invalid email' });
  });

  it('should detect network errors', () => {
    const networkError = { code: 'NETWORK_ERROR' };
    const apiError = { response: { status: 500 } };

    expect(isNetworkError(networkError)).toBe(true);
    expect(isNetworkError(apiError)).toBe(false);
  });

  it('should format error messages', () => {
    const simpleError = new Error('Simple error');
    const validationError = {
      message: 'Validation failed',
      details: { email: 'Required', name: 'Too short' }
    };

    expect(formatErrorMessage(simpleError)).toBe('Simple error');
    expect(formatErrorMessage(validationError)).toBe('Validation failed: email (Required), name (Too short)');
  });

  it('should handle unknown error types', () => {
    const unknownError = { weird: 'object' };
    const nullError = null;

    expect(formatErrorMessage(unknownError)).toBe('An unknown error occurred');
    expect(formatErrorMessage(nullError)).toBe('An unknown error occurred');
  });

  it('should log errors appropriately', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const error = new Error('Test error');
    handleApiError(error);
    
    expect(consoleSpy).toHaveBeenCalledWith('API Error:', error);
    
    consoleSpy.mockRestore();
  });
});
```

**Expected Results**: 
- ✅ Error handling works correctly
- ✅ Different error types handled
- ✅ Logging functions properly

---

## 🎭 Week 4: End-to-End Testing (7 Test Cases)

### Test Case 4.1: Login Flow E2E
**File**: `tests/e2e/auth.spec.ts`

**Learning Goal**: End-to-end testing with Playwright

**Test Implementation**:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    
    await page.click('[data-testid="login-button"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email-input"]', 'wrong@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid credentials');
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    // Then logout
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout-button"]');
    
    await expect(page).toHaveURL('/login');
  });
});
```

**Expected Results**: 
- ✅ Login flow works end-to-end
- ✅ Error handling visible
- ✅ Logout functionality works

---

### Test Case 4.2: Support Ticket Management E2E
**File**: `tests/e2e/support.spec.ts`

**Learning Goal**: Testing complex user workflows

**Test Implementation**:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Support Ticket Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
  });

  test('should view support tickets list', async ({ page }) => {
    await page.goto('/support');
    
    await expect(page.locator('[data-testid="support-table"]')).toBeVisible();
    await expect(page.locator('[data-testid="ticket-row"]')).toHaveCount(10);
  });

  test('should filter tickets by status', async ({ page }) => {
    await page.goto('/support');
    
    await page.click('[data-testid="status-filter"]');
    await page.click('[data-testid="status-option-open"]');
    
    await expect(page.locator('[data-testid="ticket-row"]')).toHaveCount(5);
  });

  test('should view ticket details', async ({ page }) => {
    await page.goto('/support');
    
    await page.click('[data-testid="ticket-row"]:first-child');
    
    await expect(page.locator('[data-testid="ticket-details"]')).toBeVisible();
    await expect(page.locator('[data-testid="ticket-title"]')).toContainText('Test Ticket');
  });

  test('should search tickets', async ({ page }) => {
    await page.goto('/support');
    
    await page.fill('[data-testid="search-input"]', 'urgent');
    await page.waitForTimeout(500); // Wait for debounce
    
    await expect(page.locator('[data-testid="ticket-row"]')).toHaveCount(2);
  });

  test('should update ticket status', async ({ page }) => {
    await page.goto('/support');
    
    await page.click('[data-testid="ticket-row"]:first-child');
    await page.click('[data-testid="status-dropdown"]');
    await page.click('[data-testid="status-resolved"]');
    
    await expect(page.locator('[data-testid="success-toast"]')).toContainText('Ticket updated');
  });
});
```

**Expected Results**: 
- ✅ Ticket listing works
- ✅ Filtering and search function
- ✅ Status updates work

---

### Test Case 4.3: Settings Management E2E
**File**: `tests/e2e/settings.spec.ts`

**Learning Goal**: Testing form workflows and preferences

**Test Implementation**:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Settings Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
  });

  test('should update company details', async ({ page }) => {
    await page.goto('/settings');
    
    await page.click('[data-testid="company-tab"]');
    await page.click('[data-testid="edit-company-button"]');
    
    await page.fill('[data-testid="company-name-input"]', 'Updated Company');
    await page.fill('[data-testid="company-email-input"]', 'updated@company.com');
    
    await page.click('[data-testid="save-button"]');
    
    await expect(page.locator('[data-testid="success-toast"]')).toContainText('Company details updated');
  });

  test('should update user preferences', async ({ page }) => {
    await page.goto('/settings');
    
    await page.click('[data-testid="preferences-tab"]');
    await page.click('[data-testid="theme-toggle"]');
    
    await page.selectOption('[data-testid="language-select"]', 'es');
    
    await page.click('[data-testid="save-preferences-button"]');
    
    await expect(page.locator('[data-testid="success-toast"]')).toContainText('Preferences updated');
  });

  test('should validate form inputs', async ({ page }) => {
    await page.goto('/settings');
    
    await page.click('[data-testid="company-tab"]');
    await page.click('[data-testid="edit-company-button"]');
    
    await page.fill('[data-testid="company-name-input"]', '');
    await page.fill('[data-testid="company-email-input"]', 'invalid-email');
    
    await page.click('[data-testid="save-button"]');
    
    await expect(page.locator('[data-testid="name-error"]')).toContainText('Company name is required');
    await expect(page.locator('[data-testid="email-error"]')).toContainText('Please enter a valid email');
  });
});
```

**Expected Results**: 
- ✅ Settings forms work properly
- ✅ Validation displays correctly
- ✅ Updates persist properly

---

### Test Case 4.4: Customer Management E2E
**File**: `tests/e2e/customers.spec.ts`

**Learning Goal**: Testing CRUD operations in UI

**Test Implementation**:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Customer Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
  });

  test('should view customers list', async ({ page }) => {
    await page.goto('/customers');
    
    await expect(page.locator('[data-testid="customers-table"]')).toBeVisible();
    await expect(page.locator('[data-testid="customer-row"]')).toHaveCount(20);
  });

  test('should search customers', async ({ page }) => {
    await page.goto('/customers');
    
    await page.fill('[data-testid="search-input"]', 'John');
    await page.waitForTimeout(500);
    
    await expect(page.locator('[data-testid="customer-row"]')).toHaveCount(3);
  });

  test('should view customer details', async ({ page }) => {
    await page.goto('/customers');
    
    await page.click('[data-testid="customer-row"]:first-child');
    
    await expect(page.locator('[data-testid="customer-details"]')).toBeVisible();
    await expect(page.locator('[data-testid="customer-name"]')).toContainText('John Doe');
  });

  test('should handle pagination', async ({ page }) => {
    await page.goto('/customers');
    
    await page.click('[data-testid="next-page-button"]');
    
    await expect(page.locator('[data-testid="page-indicator"]')).toContainText('Page 2');
  });
});
```

**Expected Results**: 
- ✅ Customer listing works
- ✅ Search functionality works
- ✅ Pagination functions correctly

---

### Test Case 4.5: Responsive Design E2E
**File**: `tests/e2e/responsive.spec.ts`

**Learning Goal**: Testing responsive behavior across devices

**Test Implementation**:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="desktop-sidebar"]')).not.toBeVisible();
  });

  test('should work on tablet devices', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="tablet-layout"]')).toBeVisible();
  });

  test('should toggle mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    
    await page.click('[data-testid="mobile-menu-overlay"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).not.toBeVisible();
  });
});
```

**Expected Results**: 
- ✅ Mobile layout works
- ✅ Tablet layout functions
- ✅ Menu toggles correctly

---

### Test Case 4.6: Error Handling E2E
**File**: `tests/e2e/error-handling.spec.ts`

**Learning Goal**: Testing error states and recovery

**Test Implementation**:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
  test('should handle network errors gracefully', async ({ page }) => {
    await page.route('**/api/**', route => route.abort());
    
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Network error');
  });

  test('should retry failed requests', async ({ page }) => {
    let callCount = 0;
    await page.route('**/api/auth/login', route => {
      callCount++;
      if (callCount === 1) {
        route.fulfill({ status: 500 });
      } else {
        route.fulfill({ 
          status: 200, 
          body: JSON.stringify({ success: true, token: 'test-token' })
        });
      }
    });
    
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    await expect(page).toHaveURL('/dashboard');
  });

  test('should handle session expiration', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    // Mock session expiration
    await page.route('**/api/**', route => {
      route.fulfill({ status: 401, body: JSON.stringify({ message: 'Unauthorized' }) });
    });
    
    await page.goto('/support');
    
    await expect(page).toHaveURL('/login');
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Session expired');
  });
});
```

**Expected Results**: 
- ✅ Network errors handled
- ✅ Retry logic works
- ✅ Session expiration handled

---

### Test Case 4.7: Performance Testing E2E
**File**: `tests/e2e/performance.spec.ts`

**Learning Goal**: Testing performance and loading times

**Test Implementation**:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should load pages within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // Less than 3 seconds
  });

  test('should handle large datasets efficiently', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    await page.goto('/customers');
    
    // Wait for table to load
    await page.waitForSelector('[data-testid="customers-table"]');
    
    // Test scrolling performance
    await page.evaluate(() => {
      const table = document.querySelector('[data-testid="customers-table"]');
      table?.scrollBy(0, 1000);
    });
    
    // Should remain responsive
    await expect(page.locator('[data-testid="customers-table"]')).toBeVisible();
  });

  test('should optimize image loading', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check that images are lazy loaded
    const images = await page.locator('img').count();
    const loadedImages = await page.locator('img[src]:not([src=""])').count();
    
    expect(loadedImages).toBeLessThanOrEqual(images);
  });
});
```

**Expected Results**: 
- ✅ Load times acceptable
- ✅ Large datasets handled
- ✅ Images optimized

---

## 📊 Success Metrics & Assessment

### Daily Progress Tracking
- [ ] **Day 1**: Complete 2 utility tests
- [ ] **Day 2**: Complete 3 component tests
- [ ] **Day 3**: Complete 2 form tests
- [ ] **Day 4**: Complete 3 API tests
- [ ] **Day 5**: Complete 2 integration tests
- [ ] **Week 2**: Achieve 60% code coverage
- [ ] **Week 3**: Achieve 75% code coverage
- [ ] **Week 4**: Achieve 85% code coverage

### Learning Milestones
- [ ] **Week 1**: Understands basic testing concepts
- [ ] **Week 2**: Can write component tests independently
- [ ] **Week 3**: Masters API testing with mocks
- [ ] **Week 4**: Can write E2E tests confidently

### Quality Gates
- [ ] All tests pass consistently
- [ ] Coverage thresholds met
- [ ] Tests are maintainable and readable
- [ ] No false positives or flaky tests
- [ ] Proper use of testing best practices

### Code Review Checklist
- [ ] Test describes behavior, not implementation
- [ ] Proper use of mocks and stubs
- [ ] Good test isolation and cleanup
- [ ] Meaningful assertions
- [ ] Proper error case coverage

---

## 🎓 Final Assessment Project

### Capstone Test Suite
**Create a comprehensive test suite for a new feature: "Bulk Ticket Operations"**

**Requirements:**
1. **Unit Tests**: Test utility functions for bulk operations
2. **Component Tests**: Test bulk selection UI components
3. **API Tests**: Test bulk update endpoints
4. **Integration Tests**: Test complete bulk workflows
5. **E2E Tests**: Test user journey from selection to completion

**Success Criteria:**
- [ ] 100% test coverage for the feature
- [ ] All edge cases covered
- [ ] Proper error handling tested
- [ ] Performance implications considered
- [ ] Accessibility testing included

This capstone project will demonstrate mastery of all testing concepts learned throughout the roadmap.

---

## 🔧 Tools & Resources

### Testing Stack
- **Vitest**: Unit and integration testing
- **Testing Library**: Component testing
- **Playwright**: End-to-end testing
- **MSW**: API mocking
- **Faker.js**: Test data generation

### Helpful Commands
```bash
# Run specific test file
pnpm test src/hooks/__tests__/useCopyToClipboard.test.ts

# Run tests in watch mode for a pattern
pnpm test --watch useCopyToClipboard

# Generate coverage report
pnpm test:coverage

# Run E2E tests
pnpm test:e2e

# Debug tests
pnpm test:ui
```

### Resources
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Playwright Guide](https://playwright.dev/)
- [MSW Documentation](https://mswjs.io/)

---

**Remember**: The goal is not just to write tests, but to understand why we test and how testing improves our application's reliability and maintainability. Each test should tell a story about how the application behaves!
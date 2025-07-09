import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import DashboardTable from '../DashboardTable/DashboardTable';

// If you have a custom render utility, make sure it exports screen
// import { render } from '@/test/utils/render';
// import { screen } from '@testing-library/react';

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
];

const mockColumns = [
  { 
    accessorKey: 'name', 
    header: 'Name',
    cell: ({ getValue }: any) => getValue()
  },
  { 
    accessorKey: 'email', 
    header: 'Email',
    cell: ({ getValue }: any) => getValue()
  },
  { 
    accessorKey: 'status', 
    header: 'Status',
    cell: ({ getValue }: any) => getValue()
  },
];

// Mock functions for required props
const mockSetPage = vi.fn();
const mockHandlePrevious = vi.fn();
const mockHandleNext = vi.fn();
const mockSetRowPerPage = vi.fn();

const defaultProps = {
  data: mockData,
  columns: mockColumns,
  loading: false,
  totalDataCount: 2,
  setPage: mockSetPage,
  pageOptions: [10, 25, 50, 100],
  handlePrevious: mockHandlePrevious,
  handleNext: mockHandleNext,
  page: 0,
  rowPerPage: 10,
  setRowPerPage: mockSetRowPerPage,
};

describe('DashboardTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render table with data', () => {
    render(<DashboardTable {...defaultProps} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    render(
      <DashboardTable
        {...defaultProps}
        data={[]}
        loading={true}
        totalDataCount={0}
      />
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should handle row click', async () => {
    const user = userEvent.setup();
    const handleRowClick = vi.fn();
    
    render(
      <DashboardTable
        {...defaultProps}
        onRowClick={handleRowClick}
      />
    );
    
    const firstRow = screen.getByText('John Doe').closest('tr');
    if (firstRow) {
      await user.click(firstRow);
    }
    
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('should handle pagination', async () => {
    const user = userEvent.setup();
    
    render(
      <DashboardTable
        {...defaultProps}
        totalDataCount={50}
        page={0}
      />
    );
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    
    expect(mockHandleNext).toHaveBeenCalled();
  });

  it('should show no data message when empty', () => {
    render(
      <DashboardTable
        {...defaultProps}
        data={[]}
        totalDataCount={0}
      />
    );
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should handle page size change', async () => {
    const user = userEvent.setup();
    
    render(<DashboardTable {...defaultProps} />);
    
    const select = screen.getByDisplayValue('10'); // Find by current value instead of role
    await user.selectOptions(select, '25');
    
    expect(mockSetPage).toHaveBeenCalledWith(0);
    expect(mockSetRowPerPage).toHaveBeenCalledWith('25');
  });
});
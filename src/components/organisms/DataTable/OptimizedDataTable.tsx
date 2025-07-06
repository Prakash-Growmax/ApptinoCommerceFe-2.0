import React, { memo, useCallback, useMemo } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { ShadCnButton } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { debounce, useMemoryLeakDetector } from '@/utils/performance';

interface OptimizedDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  searchPlaceholder?: string;
  onRowClick?: (row: TData) => void;
  className?: string;
}

// Memoized table row component
const TableRowMemo = memo(({ row, onRowClick }: any) => {
  const handleClick = useCallback(() => {
    if (onRowClick) {
      onRowClick(row.original);
    }
  }, [onRowClick, row.original]);

  return (
    <TableRow
      onClick={handleClick}
      className={onRowClick ? 'cursor-pointer hover:bg-muted/50' : undefined}
    >
      {row.getVisibleCells().map((cell: any) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
});

TableRowMemo.displayName = 'TableRowMemo';

function OptimizedDataTableComponent<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  searchPlaceholder = 'Search...',
  onRowClick,
  className,
}: OptimizedDataTableProps<TData, TValue>) {
  const { checkIfMounted } = useMemoryLeakDetector('OptimizedDataTable');

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState('');

  // Memoize the table instance
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / pageSize),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  // Debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (checkIfMounted()) {
          setGlobalFilter(value);
        }
      }, 300),
    [checkIfMounted]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  // Memoize pagination info
  const paginationInfo = useMemo(() => {
    const { pageIndex, pageSize } = table.getState().pagination;
    const totalRows = table.getFilteredRowModel().rows.length;
    const startRow = pageIndex * pageSize + 1;
    const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

    return {
      startRow,
      endRow,
      totalRows,
      currentPage: pageIndex + 1,
      totalPages: table.getPageCount(),
    };
  }, [
    table.getState().pagination,
    table.getFilteredRowModel().rows.length,
    table.getPageCount(),
  ]);

  return (
    <div className={className}>
      {/* Search Input */}
      <div className="mb-4">
        <Input
          placeholder={searchPlaceholder}
          onChange={handleSearchChange}
          className="max-w-sm"
          aria-label="Search table"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map(row => (
                  <TableRowMemo
                    key={row.id}
                    row={row}
                    columns={columns}
                    onRowClick={onRowClick}
                  />
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {paginationInfo.startRow} to {paginationInfo.endRow} of{' '}
          {paginationInfo.totalRows} results
        </div>
        <div className="flex items-center space-x-2">
          <ShadCnButton
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </ShadCnButton>
          <ShadCnButton
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </ShadCnButton>
          <span className="text-sm">
            Page {paginationInfo.currentPage} of {paginationInfo.totalPages}
          </span>
          <ShadCnButton
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </ShadCnButton>
          <ShadCnButton
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            aria-label="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </ShadCnButton>
        </div>
      </div>
    </div>
  );
}

// Export memoized component
export const OptimizedDataTable = memo(
  OptimizedDataTableComponent
) as typeof OptimizedDataTableComponent;

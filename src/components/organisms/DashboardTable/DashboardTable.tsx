import React, { useMemo } from 'react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { ShadCnButton } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  loading: boolean;
  totalDataCount: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  pageOptions: number[];
  handlePrevious: () => void;
  handleNext: () => void;
  page: number;
  rowPerPage: number;
  setRowPerPage: (rowPerPage: number | string) => void;
  onRowClick?: (row: T) => void;
  tableHeight?: string;
};

const DashboardTable = <T,>({
  data,
  columns,
  loading,
  totalDataCount,
  setPage,
  pageOptions,
  handlePrevious,
  handleNext,
  page,
  rowPerPage,
  setRowPerPage,
  onRowClick,
  tableHeight = 'h-[calc(100vh-250px)]',
}: TableProps<T>) => {
  const pageCount = useMemo(() => Math.ceil(totalDataCount / rowPerPage), [totalDataCount, rowPerPage]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
  });

  const handlePageSizeChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(0);
    setRowPerPage(e.target.value);
  }, [setPage, setRowPerPage]);

  const memoizedTableBody = useMemo(() => {
    if (loading) return null;
    
    return table.getRowModel().rows.length > 0 ? (
      table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          className="hover:bg-muted/50 cursor-pointer transition-colors"
          onClick={() => onRowClick?.(row.original)}
        >
          {row.getVisibleCells().map(cell => (
            <TableCell key={cell.id} className="px-4 py-3 text-sm">
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}
            </TableCell>
          ))}
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell
          colSpan={columns.length}
          className="text-center py-4 text-xs sm:text-sm text-muted-foreground"
        >
          No data available
        </TableCell>
      </TableRow>
    );
  }, [table, loading, onRowClick, columns.length]);

  return (
    <div
      className={`rounded-md border shadow-sm overflow-hidden flex flex-col ${tableHeight} w-full`}
    >
      <div className="flex-1 overflow-x-auto overflow-y-auto relative scrollbar-thin scrollbar-thumb-muted scrollbar-track-muted/20">
        {/* Loading overlay - covers table content for both initial load and filter changes */}
        {loading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-30 flex items-center justify-center">
            <div className="bg-background border shadow-lg rounded-lg p-6 flex flex-col items-center gap-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </div>
        )}
        <Table className="min-w-full">
          <TableHeader className="bg-muted/50 sticky top-0 z-10">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="text-left px-3 py-2">
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
            {memoizedTableBody}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between p-4 border-t bg-background">
        <div className="flex items-center gap-3">
          <span className=" text-xs lg:text-sm text-muted-foreground">
            Page {page + 1} of {pageCount}
          </span>
          <label className="text-xs lg:text-sm text-muted-foreground">
            Rows per page:{' '}
            <select
              className="border rounded px-2 py-1 ml-1"
              value={rowPerPage}
              onChange={handlePageSizeChange}
            >
              {pageOptions.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex gap-2">
          <ShadCnButton
            variant="outline"
            size="sm"
            className="text-xs lg:text-sm"
            onClick={handlePrevious}
            disabled={page === 0}
          >
            Previous
          </ShadCnButton>
          <ShadCnButton
            variant="outline"
            size="sm"
            className="text-xs lg:text-sm"
            onClick={handleNext}
            disabled={page >= pageCount - 1}
          >
            Next
          </ShadCnButton>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashboardTable) as typeof DashboardTable;

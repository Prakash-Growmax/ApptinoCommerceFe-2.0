import React from 'react';

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

type TablePagination = {
  pageIndex: number;
  pageSize: number;
};

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  loading: boolean;
  totalDataCount: number;
  pagination: TablePagination;
  setPagination: React.Dispatch<React.SetStateAction<TablePagination>>;
  setPage: (page: number | ((prev: number) => number)) => void;
  pageOptions: number[];
  handlePrevious: () => void;
  handleNext: () => void;
  page: number;
  rowPerPage: number;
  setRowPerPage: (rowPerPage: number | string) => void;
  onRowClick?: (row: T) => void;
};

const DashboardTable = <T,>({
  data,
  columns,
  loading,
  totalDataCount,
  pagination,
  setPagination,
  setPage,
  pageOptions,
  handlePrevious,
  handleNext,
  page,
  rowPerPage,
  setRowPerPage,
  onRowClick,
}: TableProps<T>) => {
  const pageCount = Math.ceil(totalDataCount / rowPerPage);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
  });

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(0);
    setRowPerPage(e.target.value);
  };

  return (
    <div className="rounded-md border shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
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
          {loading ? (
            [...Array(pagination.pageSize)].map((_, rowIndex) => (
              <TableRow key={`skeleton-${rowIndex}`}>
                {columns.map((_, colIndex) => (
                  <TableCell
                    key={`skeleton-cell-${colIndex}`}
                    className="px-3 py-2"
                  >
                    <div className="h-4 bg-muted rounded animate-pulse w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                className="hover:bg-muted/20 cursor-pointer"
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className="px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-4 text-sm text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between p-4">
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

export default DashboardTable;

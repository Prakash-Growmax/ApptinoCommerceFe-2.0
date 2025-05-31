import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
type TablePagination = {
  pageIndex: number
  pageSize: number
}

type TableProps<T> = {
  data: T[]
  columns: ColumnDef<T, any>[]
  pageCount: number
  pagination: TablePagination
  setPagination: React.Dispatch<React.SetStateAction<TablePagination>>
}
const DashboardTable=<T,>(
    {
     data,
  columns,
  pageCount,
  pagination,
  setPagination,
}: TableProps<T>
)=>{
     const table = useReactTable({
    columns,
    data,
    pageCount,
    state: {
      pagination,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
    return(
        <div className="flex flex-col">
             <Table>
             <TableHeader>
                   <TableRow>
                          {table.getHeaderGroups().map((headerGroup) => (
            <TableHead key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border px-2 py-1">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </TableHead>
          ))}
                   </TableRow>
             </TableHeader>
            <TableBody>
                  {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="border px-2 py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
            </TableBody>
        </Table>
       

        </div>
       
    )

}
export default DashboardTable;
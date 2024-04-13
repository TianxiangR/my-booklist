'use client';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FaAngleLeft , FaAngleRight,FaPlus  } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import { removeBook } from '@/app/redux/slices/bookSlice';
import { useAppDispatch } from '@/app/redux/store';
import { Book } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import useBookTableColumns from './useBookTableColumns';

type PageSize = '10' | '25' | '50';

export function BookTable({ data }: { data: Book[]}) {
  const columns = useBookTableColumns();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [pageSize, setPageSize] = React.useState<PageSize>('10');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const { pagination } = table.getState();

  const deleteSelectedRows = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    selectedRows.forEach((row) => {
      dispatch(removeBook(row.original));
    });
    table.resetRowSelection();
  };

  React.useEffect(() => {
    console.log(pageSize);
  }, [pageSize]);

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex items-center mb-2 gap-5">
          <Input
            placeholder="Filter emails..."
            className="max-w-sm"
          />
          {
            table.getFilteredSelectedRowModel().rows.length > 0 && (
              <Button className='' variant='destructive' size='icon' onClick={deleteSelectedRows}>
                <MdDeleteForever className="h-5 w-5" />
              </Button>
            )
          }
        </div>
        <div>
          <Button>
            <FaPlus className="mr-2 size-4 -translate-x-1"/>
            Create a new book
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table className="w-full h-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className=''
                  onClick={() => {
                    router.push(`/${row.original.id}`);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex flex-row gap-4 items-center">          
          <div className="flex flex-row items-center">
            <span className="mr-1">Rows per page:</span>
            <div className="w-fit">
              <Select value={pageSize} onValueChange={(value: string) => {
                setPageSize(value as PageSize);
              }}>
                <SelectTrigger>
                  <SelectValue className="w-fit">{pageSize}</SelectValue>
                </SelectTrigger>
                <SelectContent className="w-fit">
                  <SelectGroup>
                    <SelectItem value={'10'}>10</SelectItem>
                    <SelectItem value={'25'}>25</SelectItem>
                    <SelectItem value={'50'}>50</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="">
            {pagination.pageIndex * pagination.pageSize + 1} - {Math.min((pagination.pageIndex + 1) * pagination.pageSize, data.length)} of {data.length}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant='secondary'
              size='icon'
              disabled={!table.getCanPreviousPage()}
              onClick={() => {
                table.previousPage();
              }}
            >
              <FaAngleLeft className="h-5 w-5" />
            </Button>
            <Button
              variant='secondary'
              size='icon'
              disabled={!table.getCanNextPage()}
              onClick={() => {
                table.nextPage();
              }}
            >
              <FaAngleRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookTable;
'use client';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { usePathname, useRouter,useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FaAngleLeft , FaAngleRight,FaPlus  } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import { removeBook, selectBooks } from '@/app/redux/slices/bookSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { Book } from '@/app/types';
import useBookTableColumns from '@/components/home/useBookTableColumns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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

export default function Home() {
  const searchParams = useSearchParams();
  const size = searchParams.get('pageSize') || '5';
  const index = searchParams.get('pageIndex') || '0';
  const pathname = usePathname();
  const books = useAppSelector(selectBooks);
  const columns = useBookTableColumns();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Number(index),
    pageSize: Number(size),
  });
  const { pageIndex, pageSize } = pagination;
  const [sorting, setSorting] = useState<SortingState>([{'desc': false, 'id': 'title'}]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams({
      pageSize: pageSize.toString(),
      pageIndex: pageIndex.toString(),
    });
    router.push(`${pathname}?${searchParams.toString()}`);
  }, [pageSize, pageIndex]);

  const table = useReactTable({
    data: books,
    columns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
    },
  });

  const deleteSelectedRows = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    selectedRows.forEach((row) => {
      dispatch(removeBook(row.original));
    });
    table.resetRowSelection();
  };

  const createHandleRowClick = (row: Book) => () => {
    if (window?.getSelection()?.toString()) {
      return;
    }

    router.push(`/${row.id}`);
  };

  return (
    <main className="page">
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center mb-2 gap-5">
            <Input
              placeholder="Filter emails..."
              className="max-w-sm"
            />
            {
              table.getFilteredSelectedRowModel().rows.length > 0 && (
                <Button variant='destructive' onClick={deleteSelectedRows}>
                  <MdDeleteForever className="size-5 ml-2 -translate-x-2" />
                  Delete selected
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
                    className='cursor-pointer'
                    onClick={createHandleRowClick(row.original)}
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
                <Select value={pagination.pageSize.toString()} onValueChange={(value: string) => {
                  setPagination((prev) => ({...prev, pageSize: Number(value)}));
                }}>
                  <SelectTrigger>
                    <SelectValue className="w-fit">{pagination.pageSize}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="w-fit">
                    <SelectGroup>
                      <SelectItem value={'5'}>5</SelectItem>
                      <SelectItem value={'10'}>10</SelectItem>
                      <SelectItem value={'25'}>25</SelectItem>
                      <SelectItem value={'50'}>50</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="">
              {pageIndex * pageSize + 1} - {Math.min((pageIndex + 1) * pageSize, books.length)} of {books.length}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant='outline'
                size='icon'
                disabled={!table.getCanPreviousPage()}
                onClick={() => {
                  table.previousPage();
                }}
              >
                <FaAngleLeft className="h-5 w-5" />
              </Button>
              <Button
                variant='outline'
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
    </main>
  );
}

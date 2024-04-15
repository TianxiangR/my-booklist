'use client';
import {
  rankItem,
} from '@tanstack/match-sorter-utils';
import {
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter} from 'next/navigation';
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
import { useToast } from '@/components/ui/use-toast';
import useDebouncedState from '@/hooks/useDebouncedState';
import useSearchParamsState from '@/hooks/useSearchParamsState';


export default function Home() {
  const [searchParams, setSearchParams] = useSearchParamsState();
  const availablePageSizes = [10, 25, 50, 100];
  const size = Number(searchParams.get('pageSize')) > 0 ? Number(searchParams.get('pageSize')) : availablePageSizes[0];
  const index = Number(searchParams.get('pageIndex')) > 0 ? Number(searchParams.get('pageIndex')) : 0;
  const books = useAppSelector(selectBooks);
  const columns = useBookTableColumns();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: index,
    pageSize: size,
  });
  const { pageIndex, pageSize } = pagination;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [debouncdedSeach, actualSearch, setSearch] = useDebouncedState('', 300);
  const {toast} = useToast();

  
  const fuzzyFilter: FilterFn<Book> = (row, id, value) => rankItem(row.getValue(id), value).passed;

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
    onGlobalFilterChange: setSearch,
    globalFilterFn: fuzzyFilter,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
      globalFilter: debouncdedSeach,
    },
  });

  const deleteSelectedRows = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    selectedRows.forEach((row) => {
      dispatch(removeBook(row.original));
    });
    table.resetRowSelection();
    toast({
      description: (
        <p>
          <span className="font-semibold">{selectedRows.length}</span> book(s) have been removed.
        </p>
      ),
    });
  };

  const createHandleRowClick = (row: Book) => () => {
    if (window?.getSelection()?.toString()) {
      return;
    }

    router.push(`/${row.id}`);
  };

  const navigateToCreatePage = () => {
    router.push('/create');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredRowLength = table.getFilteredRowModel().rows.length;

  useEffect(() => {
    const size  = Number(searchParams.get('pageSize')) > 0 ? Number(searchParams.get('pageSize')) : 10;
    const index = Number(searchParams.get('pageIndex')) > 0 ? Number(searchParams.get('pageIndex')) : 0;
    setPagination({pageIndex: index, pageSize: size});

  }, [searchParams]);

  useEffect(() => {
    const paramRecord: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      paramRecord[key] = value;
    });

    paramRecord['pageSize'] = pagination.pageSize.toString();
    paramRecord['pageIndex'] = pagination.pageIndex.toString();

    setSearchParams(paramRecord);
  }, [pagination]);

  return (
    <main className="page h-screen flex flex-col">
      {/* Top: search bar, create button */}
      <div className="flex justify-between">
        <div className="flex items-center mb-2 gap-5">
          <Input
            placeholder="Search all columns..."
            className="max-w-lg"
            value={actualSearch}
            onChange={handleSearchChange}
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
          <Button onClick={navigateToCreatePage}>
            <FaPlus className="mr-2 size-4 -translate-x-1"/>
              Create a new book
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-auto relative flex-1">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="sticky top-0 bg-white border-b-2 hover:bg-muted shadow-md">
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
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className='cursor-pointer'
                  onClick={createHandleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (<TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>);
                  })}
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
            <TableRow>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Bottom: pagination, selected rows */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {filteredRowLength} row(s) selected.
        </div>
        <div className="flex flex-row gap-4 items-center">          
          <div className="flex flex-row items-center">
            <span className="mr-1">Rows per page:</span>
            <div className="w-fit">
              <Select value={pagination.pageSize.toString()} onValueChange={(value: string) => {
                table.setPageSize(Number(value));
              }}>
                <SelectTrigger>
                  <SelectValue className="w-fit">{pagination.pageSize}</SelectValue>
                </SelectTrigger>
                <SelectContent className="w-fit">
                  <SelectGroup>
                    {
                      availablePageSizes.map((size) => (
                        <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="">
            {pageIndex * pageSize + 1} - {Math.min((pageIndex + 1) * pageSize, filteredRowLength)} of {filteredRowLength}
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
    </main>
  );
}

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
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
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

export interface BookTableProps {
  books: Book[];
  defaultPageSize?: number;
  defaultPageIndex?: number;
}

export function BookTable({ books, defaultPageIndex = 0, defaultPageSize = 10 }: BookTableProps) {

}

export default BookTable;
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';

import { removeBook } from '@/app/redux/slices/bookSlice';
import { useAppDispatch } from '@/app/redux/store';
import { Book } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

function useBookTableColumns() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleDeleteClick = (book: Book) => (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeBook(book));
  };
  const handleEditClick = (book: Book) => (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/${book.id}/edit`);
  };

  const columns: ColumnDef<Book>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="ml-4">
          {row.getValue('title')}
        </div>
      ),
    },
    {
      accessorKey: 'author',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
          Author
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="truncate ml-4">
        {row.getValue('author')}
      </div>,
    },
    {
      accessorKey: 'category',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
          Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="ml-4">{row.getValue('category')}</div>,
    },
    {
      accessorKey: 'price',
      header: ({ column }) => {
        return (
          <div className="w-full flex justify-end">
            <Button
              variant="link"
              className="mr-0"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
            Price
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        // Format the amount as a dollar amount
        const formattedPrice = new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD',
        }).format(row.getValue('price'));

        return <div className="text-right font-medium mr-5">{formattedPrice}</div>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-gray-200"
            onClick={handleEditClick(row.original)}
          >
            <FiEdit className="size-4"/>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full group text-destructive hover:bg-red-100"
            onClick={handleDeleteClick(row.original)}
          >
            <MdDeleteForever className="size-6 group-hover:text-destructive"/>
          </Button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }
  ];

  return columns;
}

export default useBookTableColumns;
import { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowDownWideShort , FaArrowUpShortWide } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';

import { removeBook } from '@/app/redux/slices/bookSlice';
import { useAppDispatch } from '@/app/redux/store';
import { Book } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { clipOfText,  stopPropagation } from '@/lib/utils';

import { useToast } from '../ui/use-toast';

function useBookTableColumns() {
  const dispatch = useAppDispatch(); 
  const {toast} = useToast();
  const router = useRouter();
  const handleDeleteClick = (book: Book) => (e: React.MouseEvent) => stopPropagation(e, () => {
    dispatch(removeBook(book));
    toast({
      description: <p><span className="font-semibold italic">&quot;{book.title}&ldquo;</span> has been removed.</p>,
    });
  });
  const handleEditClick = (book: Book) => (e: React.MouseEvent) => stopPropagation(e, () => {
    router.push(`/${book.id}/edit`);
  });
 

  const sortIcons: Record<string, JSX.Element> = {
    'asc': <FaArrowUpShortWide className="ml-2 h-4 w-4" />,
    'desc': <FaArrowDownWideShort className="ml-2 h-4 w-4" />,
    'false': <ArrowUpDown className="ml-2 h-4 w-4" />, 
  };

  const renderSortingHeader = (column: Column<Book>) => {
    return (
      <Button
        variant="link"
        onClick={column.getToggleSortingHandler()}
        className="capitalize"
      >
        {column.id}
        {
          sortIcons[String(column.getIsSorted())]
        }
      </Button>
    );
  };

  const renderClippedText = (text: string, maxLength: number) => {
    const clippedText = clipOfText(text, maxLength);

    if (clippedText !== text) {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger>
              <div className="ml-4 text-left">
                {clippedText}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {text}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    return <div className="ml-4 text-left">{clippedText}</div>;
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
          onClick={stopPropagation}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          onClick={stopPropagation}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({column}) => renderSortingHeader(column),
      cell: ({ row, column }) => renderClippedText(row.getValue(column.id), 80),
    },
    {
      accessorKey: 'author',
      header: ({column}) => renderSortingHeader(column),
      cell: ({ row, column }) => renderClippedText(row.getValue(column.id), 30),
    },
    {
      accessorKey: 'category',
      header: ({column}) => renderSortingHeader(column),
      cell: ({ row, column }) => renderClippedText(row.getValue(column.id), 20),
    },
    {
      accessorKey: 'price',
      header: ({ column }) => {
        return renderSortingHeader(column);
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
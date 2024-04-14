'use client';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MdDeleteForever } from 'react-icons/md';

import { removeBook, selectBooks } from '@/app/redux/slices/bookSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function BookDetailPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const bookId = useParams().bookId;
  const currentBook = books.find((book) => book.id === bookId);

  if (!currentBook) {
    return <div>Book not found</div>;
  }

  const handleDeleteClick = () => {
    dispatch(removeBook(currentBook));
    router.push('/');
  };

  const handleEditClick = () => {
    router.push(`/${bookId}/edit`);
  };
  
  return (
    <main className="px-10 py-5 flex flex-col gap-5 w-full">
      <Card className="p-5">
        <div className="w-full flex flex-row items-center justify-between">
          <h1 className="text-2xl font-semibold">{currentBook.title}</h1>
          <div>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <HiOutlineDotsHorizontal className="size-5"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={handleEditClick}
                >
                  <FiEdit className="mr-2 size-5" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:bg-red-50 focus:text-destructive"
                  onClick={handleDeleteClick}
                >
                  <MdDeleteForever className="mr-2 size-5 -translate-x-[2px]"/>
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-gray-600">written by {currentBook.author}</p>
        <p className="text-gray-600">category: {currentBook.category}</p>
        <p className="font-semibold text-lg text-orange-700">price: $ {currentBook.price}</p>
      </Card>
      <Card className="p-5">
        <h1 className="text-2xl font-semibold">Description</h1>
        <p className="text-gray-600">{currentBook.description}</p>
      </Card>
    </main>
  );
}

export default BookDetailPage;

'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MdDeleteForever } from 'react-icons/md';

import { Book } from '@/app/types';
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
import useNavigateBack from '@/hooks/useNavigateBack';
import { deleteBookById, revalidateBooks } from '@/lib/actions';

export interface BookDetailPageProps {
  book: Book;
}

function BookDetail({ book }:BookDetailPageProps ) {
  const router = useRouter();
  const bookId = book.id;
  const navigateBack = useNavigateBack();

  const handleDeleteClick = async () => {
    await deleteBookById(bookId);
    navigateBack();
  };

  const handleEditClick = async () => {
    await revalidateBooks();
    router.push(`/${bookId}/edit`);
  };
  
  return (
    <main className="px-10 py-5 flex flex-col gap-5 w-full centered-container-lg">
      <Button onClick={navigateBack} className="self-start">Back</Button>
      <Card className="p-5">
        <div className="w-full flex flex-row items-center justify-between">
          <h1 className="text-2xl font-semibold">{book.title}</h1>
          <div>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
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
        <p className="text-gray-600">written by {book.author}</p>
        <p className="text-gray-600">category: {book.category}</p>
        <p className="font-semibold text-lg text-orange-700">price: $ {book.price}</p>
      </Card>
      <Card className="p-5">
        <h1 className="text-2xl font-semibold">Description</h1>
        <p className="text-gray-600">{book.description}</p>
      </Card>
    </main>
  );
}

export default BookDetail;

'use client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import { selectBooks, updateBook } from '@/app/redux/slices/bookSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { Book } from '@/app/types';
import BookNotFound from '@/components/book/BookNotFound';
import CreateBookForm from '@/components/book/CreateBookForm';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { createNavigateBack } from '@/lib/utils';

function EditBookPage() {
  const { bookId } = useParams();
  const {toast} = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const currentBook = books.find(book => book.id === bookId);
  const navigateBack = createNavigateBack(router);
  const handleSaveBook = (book: Book) => {
    dispatch(updateBook(book));
    toast({
      description: (
        <p>
          Book updated successfully. <Link href={`${book.id}`} className="hover:underline font-semibold">View</Link>
        </p>
      ),
    });
    navigateBack();
  };


  if (!currentBook) {
    return (
      <BookNotFound />
    );
  }

  return (
    <main className="page w-full">
      <Card className='centered-container-lg'>
        <CreateBookForm 
          mode="edit" 
          defaultValues={currentBook} 
          onSubmit={handleSaveBook}
          onCancel={navigateBack}
        />
      </Card>
    </main>
  );
}

export default EditBookPage;
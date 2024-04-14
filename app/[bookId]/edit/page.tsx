'use client';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import { selectBooks, updateBook } from '@/app/redux/slices/bookSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { Book } from '@/app/types';
import CreateBookForm from '@/components/book/CreateBookForm';
import { Card } from '@/components/ui/card';

function EditBookPage() {
  const { bookId } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const currentBook = books.find(book => book.id === bookId);

  const handleSaveBook = (book: Book) => {
    dispatch(updateBook(book));
  };

  const handleCancel = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  if (!currentBook) {
    return (
      <main className="page w-full">
        <Card className='p-10 max-w-[800px] ml-auto mr-auto'>
          <p className="text-center">Book not found</p>
        </Card>
      </main>
    );
  }

  return (
    <main className="page w-full">
      <Card className='p-10 max-w-[800px] ml-auto mr-auto'>
        <CreateBookForm 
          mode="edit" 
          defaultValues={currentBook} 
          onSubmit={handleSaveBook}
          onCancel={handleCancel}
        />
      </Card>
    </main>
  );
}

export default EditBookPage;
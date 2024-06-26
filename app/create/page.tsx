'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import CreateBookForm from '@/components/book/CreateBookForm';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { createNavigateBack } from '@/lib/utils';

import { addBook } from '../redux/slices/bookSlice';
import { useAppDispatch } from '../redux/store';
import { Book } from '../types';

function CreateBookPage() {
  const {toast} = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const navigateBack = createNavigateBack(router);
  const handleCreateBook = (book: Book) => {
    dispatch(addBook(book));
    toast({
      description: (
        <p>
          Book created successfully. <Link href={`${book.id}`} className="hover:underline font-semibold">View</Link>
        </p>
      ),
    });
    navigateBack();
  };

  return (
    <main className='page'>
      <Card className='centered-container-lg'>
        <CreateBookForm onSubmit={handleCreateBook} onCancel={navigateBack} />
      </Card>
    </main>
  );
}

export default CreateBookPage;
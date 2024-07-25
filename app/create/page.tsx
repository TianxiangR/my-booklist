'use client';
import Link from 'next/link';
import React from 'react';

import CreateBookForm from '@/components/book/CreateBookForm';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import useNavigateBack from '@/hooks/useNavigateBack';
import { createBook } from '@/lib/actions';

import { Book } from '../types';

function CreateBookPage() {
  const {toast} = useToast();
  const navigateBack = useNavigateBack();
  const handleCreateBook = async (book: Book) => {
    await createBook(book);
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
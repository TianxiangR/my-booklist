'use client';
import Link from 'next/link';
import {  useRouter } from 'next/navigation';
import React from 'react';

import { Book } from '@/app/types';
import CreateBookForm from '@/components/book/CreateBookForm';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { updateBook } from '@/lib/actions';
import { createNavigateBack } from '@/lib/utils';

export interface EditBookPageProps {
  book: Book;
}

function EditBook({book }:EditBookPageProps ) {
  const {toast} = useToast();
  const router = useRouter();
  const navigateBack = createNavigateBack(router);
  const handleSaveBook = async (book: Book) => {
    await updateBook(book);
    toast({
      description: (
        <p>
          Book updated successfully. <Link href={`${book.id}`} className="hover:underline font-semibold">View</Link>
        </p>
      ),
    });
    navigateBack();
  };
  
  return (
    <main className="page w-full">
      <Card className='centered-container-lg'>
        <CreateBookForm 
          mode="edit" 
          defaultValues={book} 
          onSubmit={handleSaveBook}
          onCancel={navigateBack}
        />
      </Card>
    </main>
  );
}

export default EditBook;
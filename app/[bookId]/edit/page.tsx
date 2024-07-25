import { notFound } from 'next/navigation';
import React from 'react';

import EditBook from '@/components/book-edit/EditBook';
import { getBookById } from '@/lib/actions';


async function EditBookPage({ params }: { params: { bookId: string } }) {
  const {bookId} = params;
  const book = await getBookById(bookId);

  if (!book) {
    notFound();
  }
  return (
    <EditBook book={book} />
  );
}

export default EditBookPage;
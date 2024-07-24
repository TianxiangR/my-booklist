import React from 'react';

import BookNotFound from '@/components/book/BookNotFound';
import EditBook from '@/components/book-edit/EditBook';
import { getBookById } from '@/lib/actions';


async function EditBookPage({ params }: { params: { bookId: string } }) {
  const {bookId} = params;
  const book = await getBookById(bookId);

  if (!book) {
    return <BookNotFound />;
  }

  return (
    <EditBook book={book} />
  );
}

export default EditBookPage;
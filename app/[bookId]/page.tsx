import React from 'react';

import BookNotFound from '@/components/book/BookNotFound';
import BookDetail from '@/components/book-detail/BookDetail';
import { getBookById } from '@/lib/actions';

async function BookDetailPage({ params }: { params: { bookId: string } }) {
  const { bookId } = params;
  const book = await getBookById(bookId);

  if (!book) {
    return <BookNotFound />;
  }

  return (
    <BookDetail book={book} />
  );
}

export default BookDetailPage;
import { notFound } from 'next/navigation';
import React from 'react';

import BookDetail from '@/components/book-detail/BookDetail';
import { getBookById } from '@/lib/actions';

async function BookDetailPage({ params }: { params: { bookId: string } }) {
  const { bookId } = params;
  const book = await getBookById(bookId);

  if (!book) {
    notFound();
  }

  return (
    <BookDetail book={book} />
  );
}

export default BookDetailPage;
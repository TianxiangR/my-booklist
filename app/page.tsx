'use client';
import React from 'react';

import BookTable from '@/components/home/BookTable';

import { selectBooks } from './redux/slices/bookSlice';
import { useAppSelector } from './redux/store';

export default function Home() {
  const books = useAppSelector(selectBooks);
  console.log(books);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between page">
      <BookTable data={books} />
    </main>
  );
}

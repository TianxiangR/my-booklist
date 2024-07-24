'use server';
import { revalidateTag } from 'next/cache';

import { Book, BookApi } from '@/app/types';

const base_url = 'https://66a04a0ab132e2c136006c53.mockapi.io';

const getBooksTag = 'getBooks';

export const revalidateBooks = async () => {
  revalidateTag(getBooksTag);
};

export const revalidateBookById = async (id: string) => {
  revalidateTag(`getBookById-${id}`);
};

export const getBooks = async (): Promise<Book[]> => {
  const response = await fetch(`${base_url}/books`, {
    cache: 'no-store',
    next: {
      tags: [getBooksTag],
    }
  });
  const data: BookApi[] = await response.json();
  return data.map((book) => ({
    ...book,
    price: Number(book.price),
  }));
};

export const createBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
  const bookApi: Omit<BookApi, 'id'> = {
    ...book,
    price: String(book.price),
  };
  const response = await fetch(`${base_url}/books`, {
    method: 'POST',
    body: JSON.stringify(bookApi),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: BookApi = await response.json();
  await revalidateBooks();
  return {
    ...data,
    price: Number(data.price),
  };
};

export const getBookById = async (id: string): Promise<Book | null> => {
  const response = await fetch(`${base_url}/books/${id}`, {
    cache: 'no-store',
    next: {
      tags: [`getBookById-${id}`],
    }
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Api error');
  }

  const data: BookApi = await response.json();
  return {
    ...data,
    price: Number(data.price),
  };
};

export const updateBook = async (book: Book): Promise<Book> => {
  const bookApi: BookApi = {
    ...book,
    price: String(book.price),
  };
  const response = await fetch(`${base_url}/books/${book.id}`, {
    method: 'PUT',
    body: JSON.stringify(bookApi),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: BookApi = await response.json();
  await revalidateBooks();
  await revalidateBookById(book.id);
  return {
    ...data,
    price: Number(data.price),
  };
};

export const deleteBookById = async (id: string): Promise<void> => {
  await fetch(`${base_url}/books/${id}`, {
    method: 'DELETE',
  });
  await revalidateBooks();
  await revalidateBookById(id);
};

export const batchDeleteBooks = async (ids: string[]): Promise<void> => {
  await Promise.all(ids.map((id) => deleteBookById(id)));
  await Promise.all(ids.map((id) => revalidateBookById(id)));
  await revalidateBooks();
};


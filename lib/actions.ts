'use server';
import https from 'https';
import { revalidateTag , unstable_cache as cache, unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';

import { Book, BookApi } from '@/app/types';

const base_url = 'https://66a04a0ab132e2c136006c53.mockapi.io';

const getBooksTag = 'getBooks';

export const revalidateBooks = async () => {
  revalidateTag(getBooksTag);
};

export const revalidateBookById = async (id: string) => {
  revalidateTag(`getBookById-${id}`);
};

export const getBooks = cache(async (): Promise<Book[]> => {
  return new Promise((resolve, reject) => {
    try {
      https.get(`${base_url}/books`, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error('Api error'));
        }
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const books: BookApi[] = JSON.parse(data);
          resolve(books.map((book) => ({
            ...book,
            price: Number(book.price),
          })));
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}, [getBooksTag], {
  tags: [getBooksTag],
});

export const createBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
  const bookApi: Omit<BookApi, 'id'> = {
    ...book,
    price: String(book.price),
  };
  return new Promise((resolve, reject) => {
    try {
      const req = https.request(
        `${base_url}/books`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        (res) => {
          if (res.statusCode !== 201) {
            reject(new Error('Api error'));
          }
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            const book: BookApi = JSON.parse(data);
            revalidateBooks();
            resolve({
              ...book,
              price: Number(book.price),
            });
          });
        },
      );
      req.write(JSON.stringify(bookApi));
      req.end();
    } catch (error) {
      reject(error);
    }
  });
};

export const getBookById = async (id: string) => cache(async (id: string): Promise<Book | null> => {
  return new Promise((resolve, reject) => {
    try {
      https.get(`${base_url}/books/${id}`, (res) => {
        if (res.statusCode === 404) {
          resolve(null);
        }
        if (res.statusCode !== 200) {
          reject(new Error('Api error'));
        }
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const book: BookApi = JSON.parse(data);
          resolve({
            ...book,
            price: Number(book.price),
          });
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}, [`getBookById-${id}`], { 
  tags: [`getBookById-${id}`],
  revalidate: 1,
})(id);

export const updateBook = async (book: Book): Promise<Book> => {
  const bookApi: BookApi = {
    ...book,
    price: String(book.price),
  };
  return new Promise((resolve, reject) => {
    try {
      const req = https.request(
        `${base_url}/books/${book.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        (res) => {
          if (res.statusCode !== 200) {
            reject(new Error('Api error'));
          }
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            const book: BookApi = JSON.parse(data);
            revalidateBooks();
            revalidateBookById(book.id);
            resolve({
              ...book,
              price: Number(book.price),
            });
          });
        },
      );
      req.write(JSON.stringify(bookApi));
      req.end();
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteBookById = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const req = https.request(
        `${base_url}/books/${id}`,
        {
          method: 'DELETE',
        },
        (res) => {
          if (res.statusCode !== 200) {
            reject(new Error('Api error'));
          }
          revalidateBooks();
          revalidateBookById(id);
          resolve();
        },
      );
      req.end();
    } catch (error) {
      reject(error);
    }
  });
};

export const batchDeleteBooks = async (ids: string[]): Promise<void> => {
  await Promise.all(ids.map((id) => deleteBookById(id)));
  await Promise.all(ids.map((id) => revalidateBookById(id)));
  await revalidateBooks();
};


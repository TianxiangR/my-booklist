import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { Book } from '@/app/types';
import books from '@/lib/data';

import { RootState } from '../store';

const initialState = books;

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state: Book[], action: PayloadAction<Omit<Book, 'id'>>) => {
      return [...state, {...action.payload, id: uuidv4()}];
    },
    removeBook: (state: Book[], action: PayloadAction<Book>) => {
      return state.filter(book => book.id !== action.payload.id);
    },
    updateBook:(state: Book[], action: PayloadAction<Book>) => {
      return state.map(book => book.id === action.payload.id ? action.payload : book);
    }
  },
});

export const { addBook, removeBook, updateBook } = bookSlice.actions;
export const selectBooks = (state: RootState) => state.books;
export default bookSlice.reducer;
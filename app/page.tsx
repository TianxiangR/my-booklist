import * as React from 'react';

import Home from '@/components/home/Home';
import { getBooks } from '@/lib/actions';


async function HomePage() {
  const books = await getBooks();

  return <Home books={books} />;
}


export default HomePage;
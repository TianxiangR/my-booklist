export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
}

export type BookApi = Omit<Book, 'price'> & {
  price: string;
}
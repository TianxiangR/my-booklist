import { LoremIpsum } from 'lorem-ipsum';

import { Book } from '../types';
import { getRandomNumberInRange } from './utils';

const books: Book[] = [];

const minTitleLength = 3;
const maxTitleLength = 10;
const minPrice = 10;
const maxPrice = 100;
const categories = ['fiction', 'non-fiction', 'fantasy', 'mystery', 'thriller', 'romance'];
const minDescriptionLength = 50;
const maxDescriptionLength = 100;
const numberOfBooks = 200;

function createRandomBook(): Book {
  const lorem = new LoremIpsum();
  const title = lorem.generateWords(getRandomNumberInRange(minTitleLength, maxTitleLength));
  const author = lorem.generateWords(2);
  const price = getRandomNumberInRange(minPrice, maxPrice) - 0.01;
  const description = lorem.generateSentences(getRandomNumberInRange(minDescriptionLength, maxDescriptionLength));
  const category = categories[getRandomNumberInRange(0, categories.length - 1)];
  const id = books.length + 1;

  return { id, title, author, price, description, category };
}

for (let i = 0; i < numberOfBooks; i++) {
  books.push(createRandomBook());
}

export default books;
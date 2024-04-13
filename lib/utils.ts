import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Book } from '@/app/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomNumberInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
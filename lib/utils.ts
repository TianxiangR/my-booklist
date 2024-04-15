import { type ClassValue, clsx } from 'clsx';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createNavigateBack(router: AppRouterInstance, fallbackPath = '/') {
  return () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackPath);
    }
  };
}

export function preventDefault(event: React.SyntheticEvent, callback?: (e: React.SyntheticEvent) => void){
  event.preventDefault();
  callback?.(event);
}

export function stopPropagation(event: React.SyntheticEvent, callback?: (e: React.SyntheticEvent) => void){
  event.stopPropagation();
  callback?.(event);
}

export function createLoggedFunction<T, U>(fn: (...args: T[]) => U): (...args: T[]) => U{
  const loggedFn = (...args: T[]) => {
    const ret = fn(...args);
    const record = {
      args,
      ret,
    };
    console.log(record);
    return ret;
  };

  return loggedFn;
}

export function clipOfText(text: string, maxLength: number){
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
}
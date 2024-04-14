'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Book } from '@/app/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Textarea } from '../ui/textarea';

type CreateBookFormProps = {
  defaultValues?: Partial<Omit<Book, 'id'>>;
  mode?: 'create';
};

type EditBookFormProps = {
  defaultValues: Book;
  mode: 'edit';
};

type BookFormProps = (CreateBookFormProps | EditBookFormProps) & {
  onSubmit?: (values: Book) => void;
  onCancel?: () => void;
};

const formSchema = z.object({
  title: z.string().min(1).max(100),
  author: z.string().min(1).max(100),
  price: z.number().min(0).max(99999),
  category: z.string().min(1).max(100),
  description: z.string().min(1).max(5000),
});

function CreateBookForm({ defaultValues = {}, mode = 'create', onSubmit, onCancel }: BookFormProps) {
  const unifiedDefaultValues = {
    title: '',
    author: '',
    price: 0,
    category: '',
    description: '',
    ...defaultValues,
  };

  const form = useForm<Book>({
    resolver: zodResolver(formSchema),
    defaultValues: unifiedDefaultValues,
  });

  const formTitle = mode === 'create' ? 'Create Book' : 'Edit Book';
  const submitButtonText = mode === 'create' ? 'Create' : 'Save';

  const handleCancel = () => {
    form.reset();
    onCancel?.();
  };

  return (
    <Form {...form}>
      <h1 className='text-2xl font-semibold mb-8'>{formTitle}</h1>
      <form onSubmit={form.handleSubmit((value) => onSubmit?.(value))} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="title"
          render={({field}) => {
            return (
              <FormItem>
                <FormLabel htmlFor={field.name}>Title<span className="text-red-600">*</span></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter the title of the book</FormDescription>
                <FormMessage/>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="author"
          render={({field}) => {
            return (
              <FormItem>
                <FormLabel htmlFor={field.name}>Author<span className="text-red-600">*</span></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter the author of the book</FormDescription>
                <FormMessage/>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => {
            return (
              <FormItem>
                <FormLabel htmlFor={field.name}>Description<span className="text-red-600">*</span></FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  {5000 - field.value.length} character(s) remaining
                </FormDescription>
                <FormMessage/>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="price"
          render={({field}) => {
            return (
              <FormItem>
                <FormLabel htmlFor={field.name}>Price<span className="text-red-600">*</span></FormLabel>
                <FormControl>
                  <Input {...field} type="number"/>
                </FormControl>
                <FormDescription>Enter the price of the book</FormDescription>
                <FormMessage/>
              </FormItem>
            );
          }}
        />
        <div className="flex ml-auto">
          <Button type="submit" className="">
            {submitButtonText}
          </Button>
          <Button type="button" variant="outline" className="ml-2" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateBookForm;
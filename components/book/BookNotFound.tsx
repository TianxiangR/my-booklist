'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdError } from 'react-icons/md';

import { revalidateBooks } from '@/lib/actions';
import { createNavigateBack } from '@/lib/utils';

import { Button } from '../ui/button';
import { Card } from '../ui/card';

function BookNotFound() {
  const router = useRouter();
  const navigateBack = createNavigateBack(router);
  const handleGoBack = async () => {
    await revalidateBooks();
    navigateBack();
  };

  return (
    <main className="w-full h-screen flex">
      <Card className='p-10 max-w-[800px] ml-auto mr-auto mt-auto mb-auto w-full flex flex-col justify-center items-center'>
        <div className="flex justify-center items-center">
          <MdError className="size-7 text-red-500 mr-2" />
          <p className="text-center">Book not found</p>
        </div>

        <Button className='w-fit' variant='link'>
          <span onClick={handleGoBack}>Go back</span>
        </Button>
      </Card>
    </main>
  );
}

export default BookNotFound;
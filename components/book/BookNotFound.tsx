'use server';
import Link from 'next/link';
import React from 'react';
import { MdError } from 'react-icons/md';

import { Button } from '../ui/button';
import { Card } from '../ui/card';

function NotFoundPage() {

  return (
    <main className="w-full h-screen flex">
      <Card className='p-10 max-w-[800px] ml-auto mr-auto mt-auto mb-auto w-full flex flex-col justify-center items-center'>
        <div className="flex justify-center items-center">
          <MdError className="size-7 text-red-500 mr-2" />
          <p className="text-center">Content not found</p>
        </div>

        <Button className='w-fit' variant='link'>
          <Link href='/'>Back to lobby</Link>
        </Button>
      </Card>
    </main>
  );
}

export default NotFoundPage;
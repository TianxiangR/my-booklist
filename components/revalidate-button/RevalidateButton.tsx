'use client';
import React from 'react';

import { revalidateBooks } from '@/lib/actions';

function RevalidateButton() {
  return (
    <button onClick={revalidateBooks} className="btn btn-primary">
      Revalidate
    </button>
  );
}

export default RevalidateButton;
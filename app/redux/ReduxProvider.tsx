'use client';
import React from 'react';
import { Provider } from 'react-redux';

import store from '@/app/redux/store';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
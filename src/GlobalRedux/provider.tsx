'use client'
import { Provider } from "react-redux";
import { store } from './store'

import React from 'react'
import { Toaster } from "react-hot-toast";

export function StoreProviders({ children }: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

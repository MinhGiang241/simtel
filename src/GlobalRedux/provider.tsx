'use client'
import { Provider } from "react-redux";
import { store } from './store'

import React from 'react'
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export function StoreProviders({ children }: {
  children: React.ReactNode
}) {
  return (
    <SWRConfig value={{
      refreshInterval: 3000,
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}>
      <Provider store={store}>
        {children}
      </Provider>
    </SWRConfig>
  )
}

'use client'

import { configureStore } from '@reduxjs/toolkit'
import pathReducer from './path/pathSlice'
import simPackReducer from './SimPack/SimPackSlice'

export const store = configureStore({
  reducer: {
    path: pathReducer,
    simPack: simPackReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

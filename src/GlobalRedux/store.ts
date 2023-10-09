'use client'

import { configureStore } from '@reduxjs/toolkit'
import pathReducer from './path/pathSlice'
import simPackReducer from './SimPack/SimPackSlice'
import phoneCardReducer from './PhoneCard/PhoneCardSlice'

export const store = configureStore({
  reducer: {
    path: pathReducer,
    simPack: simPackReducer,
    phoneCard: phoneCardReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

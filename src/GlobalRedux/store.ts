'use client'

import { configureStore } from '@reduxjs/toolkit'
import pathReducer from './path/pathSlice'
import simPackReducer from './SimPack/SimPackSlice'
import phoneCardReducer from './PhoneCard/PhoneCardSlice'
import authReducer from './Auth/authSlice'
import simReducer from './Sim/SimSlice'

export const store = configureStore({
  reducer: {
    path: pathReducer,
    simPack: simPackReducer,
    phoneCard: phoneCardReducer,
    auth: authReducer,
    sim: simReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

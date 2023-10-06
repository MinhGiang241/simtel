'use client'

import { SimPack } from '@/interfaces/data'
import { createSlice } from '@reduxjs/toolkit'

export interface SimPackState {
  value: Array<SimPack>
}

const initialState: SimPackState = {
  value: []
}

export const simPackSlice = createSlice({
  name: 'simPack',
  initialState,
  reducers: {
    getList: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { getList } = simPackSlice.actions

export default simPackSlice.reducer

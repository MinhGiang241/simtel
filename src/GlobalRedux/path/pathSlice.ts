'use client'

import { createSlice } from '@reduxjs/toolkit'

export interface PathState {
  value: string
}

const initialState: PathState = {
  value: '/'
}

export const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPath: (_, action) => {
      return { value: action.payload }
    }
  }
})

export const { setPath } = pathSlice.actions

export default pathSlice.reducer

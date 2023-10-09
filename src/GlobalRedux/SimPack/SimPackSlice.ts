'use client'

import { SimPack } from '@/interfaces/data'
import { createSlice } from '@reduxjs/toolkit'

export interface SimPackState {
  value: Array<SimPack>,
  count: number,
  page: number
  loading: Boolean,
  telco?: string,
  sortBy?: string,
  type?: string,
}

const initialState: SimPackState = {
  value: [],
  count: 0,
  page: 1,
  loading: false,
}

export const simPackSlice = createSlice({
  name: 'simPack',
  initialState,
  reducers: {
    getList: (state, action) => {
      state.value = action.payload
    },
    setCount: (state, action) => {
      state.count = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setTelco: (state, action) => {
      state.telco = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setType: (state, action) => {
      state.type = action.payload
    }
  }
})

export const { getList, setCount, setPage, setLoading, setType, setTelco, setSortBy } = simPackSlice.actions

export default simPackSlice.reducer

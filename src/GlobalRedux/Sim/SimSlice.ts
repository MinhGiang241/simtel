import { Sim } from '@/interfaces/data'
import { createSlice } from '@reduxjs/toolkit'

export interface SimState {
  values: Sim[],
  count: number,
  page: number,
  loading: Boolean,
  not: string[],
  telco?: string,
  price?: number,
  type?: string,
}

const initialState: SimState = {
  values: [],
  count: 0,
  page: 1,
  not: [],
  loading: true,
}

export const simSlice = createSlice({
  name: 'sim',
  initialState,
  reducers: {
    getSimList: (state, action) => {
      state.values = action.payload
    },
    setSimCount: (state, action) => {
      state.count = action.payload
    },
    setSimPage: (state, action) => {
      state.page = action.payload
    },
    setSimTelco: (state, action) => {
      state.telco = action.payload
    },
    setSimPrice: (state, action) => {
      state.price = action.payload
    },
    setSimType: (state, action) => {
      state.type = action.payload
    },
    setSimLoading: (state, action) => {
      state.loading = action.payload
    }

  }
})

export const { getSimList, setSimCount, setSimPage, setSimTelco, setSimPrice, setSimType, setSimLoading } = simSlice.actions

export default simSlice.reducer

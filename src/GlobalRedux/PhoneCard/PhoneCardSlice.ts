import { CardType, PhoneCard } from "@/interfaces/data";
import { createSlice } from "@reduxjs/toolkit";


export interface PhoneCardState {
  value: Array<CardType>
  count: number,
  page: number,
  loading: Boolean
  telco?: string,
  selected?: CardType
}

const initialState: PhoneCardState = {
  value: [],
  count: 0,
  page: 1,
  loading: false,
}

export const phoneCardSlice = createSlice({
  name: 'phoneCard',
  initialState,
  reducers: {
    getListCard: (state, action) => {
      state.value = action.payload
    },
    setCountCard: (state, action) => {
      state.count = action.payload
    },
    setPageCard: (state, action) => {
      state.page = action.payload
    },
    setLoadingCard: (state, action) => {
      state.loading = action.payload
    },
    setTelcoCard: (state, action) => {
      return { ...state, telco: action.payload }
    },
    setSelectedCard: (state, action) => {
      return { ...state, selected: action.payload }
    }
  }
})

export const { getListCard, setCountCard, setPageCard, setLoadingCard, setTelcoCard, setSelectedCard } = phoneCardSlice.actions

export default phoneCardSlice.reducer

"use client";

import { ActiveTelco, Config } from "@/interfaces/config";
import { createSlice } from "@reduxjs/toolkit";

export interface ConfigState {
  telcos: ActiveTelco[];
  loadingTelcos: boolean;
  config?: Config;
}

const initialState: ConfigState = {
  telcos: [],
  loadingTelcos: false,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTelcos: (state, action) => {
      return { ...state, telcos: action.payload };
    },
    setLoadingTelcos: (state, action) => {
      return { ...state, loadingTelocs: action.payload };
    },
    setConfig: (state, action) => {
      return { ...state, config: action.payload };
    },
  },
});

export const { setTelcos, setLoadingTelcos, setConfig } = configSlice.actions;

export default configSlice.reducer;

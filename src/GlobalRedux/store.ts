"use client";

import { configureStore } from "@reduxjs/toolkit";
import pathReducer from "./path/pathSlice";
import simPackReducer from "./SimPack/SimPackSlice";
import phoneCardReducer from "./PhoneCard/PhoneCardSlice";
import authReducer from "./Auth/authSlice";
import simReducer from "./Sim/SimSlice";
import configReducer from "./config/ConfigSlice";

export const store = configureStore({
  reducer: {
    path: pathReducer,
    simPack: simPackReducer,
    phoneCard: phoneCardReducer,
    auth: authReducer,
    sim: simReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

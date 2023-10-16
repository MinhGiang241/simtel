import { User } from '@/interfaces/data'
import { createSlice } from '@reduxjs/toolkit'

export enum AuthState {
  LOGGED, NOT_LOGGED, CHECKING
}

export interface UserState {
  user?: User,
  accessToken?: string,
  expiredAt?: string,
  authState: AuthState,
}

const initialState: UserState = {
  authState: AuthState.CHECKING,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.authState = action.payload
    },
    setUserData: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken
      state.expiredAt = action.payload.expiredAt
      state.authState = AuthState.LOGGED
    },
    userLogout: (state, _) => {
      state.user = undefined;
      state.accessToken = undefined;
      state.expiredAt = undefined;
      state.authState = AuthState.NOT_LOGGED
      localStorage.removeItem('access_token')
    }
  }
})

export const { setUserData, userLogout, setAuthState } = userSlice.actions

export default userSlice.reducer

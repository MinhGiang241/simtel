'use client'
import { AuthState, setAuthState, setUserData } from '@/GlobalRedux/Auth/authSlice'
import { getAccountInfo } from '@/services/api/authApi'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  useEffect(() => {
    var token = localStorage.getItem('access_token')
    var expiredAt = localStorage.getItem('expired_at')

    if (token) {
      dispatch(setAuthState(AuthState.CHECKING))
      getAccountInfo().then((v) => {
        if (v) {
          dispatch(setUserData({
            user: v?.user,
            accessToken: token,
            expiredAt: expiredAt,
          }))
        } else {
          dispatch(setAuthState(AuthState.NOT_LOGGED))
        }
      }).catch((_) => {
        dispatch(setAuthState(AuthState.NOT_LOGGED))
      })
    } else {
      dispatch(setAuthState(AuthState.NOT_LOGGED))
    }
  }, [])
  return (
    <>
      {children}
    </>
  )
}

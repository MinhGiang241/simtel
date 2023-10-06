'use client'

// import { useEffect } from "react"
// import { useRouter } from "next/router"
//import authService from "auth-service" //imaginary auth service

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  //const router = useRouter()

  //useEffect(() => {
  //const authUser = authService.getUser()

  // if there is no authenticated user, redirect to login page_
  //   if (!authUser) {
  //     router.push("/login")
  //   }
  // }, [])

  return (
    <>
      {children}
    </>
  )
}

'use client'
import React from 'react'
import { IntlProvider } from 'react-intl'

// import { setPath } from "@/GlobalRedux/path/pathSlice";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";

// const dispatch = useDispatch();
// const router = useRouter()

// export const pushPath = (route: string) => {
//   router.push(route)
//   dispatch(setPath(location.pathname))
// }

export default function IntlWrapper({ children }: { children: React.ReactNode }) {

  return (

    <IntlProvider locale='vi' defaultLocale='en'>
      {children}
    </IntlProvider>

  )
}

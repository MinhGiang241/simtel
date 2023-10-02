'use client'
import React from 'react'
import { IntlProvider } from 'react-intl'

export default function IntlWrapper({ children }: { children: React.ReactNode }) {
  const formats = {
    number: {
      VND: {
        style: 'currency',
        currency: 'VND',
      }
    }
  }

  return (

    <IntlProvider locale='vi' defaultLocale='en'>
      {children}
    </IntlProvider>

  )
}

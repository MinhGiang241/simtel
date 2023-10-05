'use client'
import { GraphQLClient } from 'graphql-request';
import React from 'react'
import { SWRConfig } from 'swr'


export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const client = new GraphQLClient(`https://api.simtel.demego.vn/graphql`)
  return (
    <SWRConfig value={{
      refreshInterval: 3000,
      fetcher: (query, variable) => client.request(query, variable)
    }}>
      {children}
    </SWRConfig>
  )
}

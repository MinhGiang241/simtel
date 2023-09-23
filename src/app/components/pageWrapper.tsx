import React from 'react'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col items-center'>
      <div className='w-full h-20' />
      <div className='max-w-7xl w-full' >
        {children}
      </div>
    </div>
  )
}

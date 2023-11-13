import React from 'react'
import SupportWidget from './SupportWidget'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col items-center min-h-max'>
      <div className='w-full h-20' />
      <div className='max-w-[1140px] w-full relative' >
        {children}
      </div>

    </div>
  )
}

import React from 'react'
import SupportWidget from './SupportWidget'

interface Props {
  isTopPadding?: boolean,
  children: React.ReactNode,
}

export default function PageWrapper({ children, isTopPadding = true }: Props) {
  return (
    <div className='flex flex-col items-center min-h-max'>
      {isTopPadding && (<div className='w-full h-[88px]' />)}
      <div className='max-w-[1140px] w-full relative' >
        {children}
      </div>
    </div>
  )
}

import React from 'react'

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-96 flex flex-col h-20 r'>
      {children}
    </div>
  )
}

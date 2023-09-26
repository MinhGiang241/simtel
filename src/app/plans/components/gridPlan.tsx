import React from 'react'
import PlanCard from './planCard'

export default function GridPlan() {
  return (
    <div className='flex flex-wrap mt-4 justify-between'>
      {Array.from({ length: 9 }).map((item, index) => <PlanCard key={index} />)}
    </div>
  )
}

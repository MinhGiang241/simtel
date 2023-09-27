'use client'
import React from 'react'
import PageWrapper from '../components/pageWrapper'
import FilterPlan from '../plans/components/filterPlan'
import SelectNumber from '../components/selectNumber'
import SelectSimTitle from '../components/selectSimTitle'

export default function Sim() {
  return (
    <PageWrapper>
      <SelectSimTitle />
      <FilterPlan />
      <div className='w-full h-6' />
      <SelectNumber hideFilter />
      <div className='w-full h-10' />
    </PageWrapper>
  )
}

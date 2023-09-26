import React from 'react'
import PlanButton from '../components/planButton'
import PageWrapper from '../components/pageWrapper'
import FilterPlan from './components/filterPlan'
import GridPlan from './components/gridPlan'

export default function Plan() {
  return (
    <PageWrapper>
      <PlanButton />
      <FilterPlan />
      <GridPlan />
    </PageWrapper>
  )
}

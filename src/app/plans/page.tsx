"use client"
import React from 'react'
import PlanButton from '../components/planButton'
import PageWrapper from '../components/pageWrapper'
import FilterPlan from './components/filterPlan'
import GridPlan from './components/gridPlan'
import BannerCarousel from "../components/bannerCarousel";

export default function Plan() {
  return (
    <>
      <div className='w-full h-20' />
      <BannerCarousel />
      <PageWrapper isTopPadding={false}>
        <PlanButton />
        <FilterPlan />
        <div className='lg:h-7 hidden' />
        <GridPlan />
      </PageWrapper>
    </>
  )
}

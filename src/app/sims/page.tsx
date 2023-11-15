'use client'
import React, { Dispatch, useEffect } from 'react'
import PageWrapper from '../components/pageWrapper'
import FilterPlan from '../plans/components/filterPlan'
import SelectNumber from '../components/selectNumber'
import SelectSimTitle from '../components/selectSimTitle'
import { getAllSim } from '@/services/api/simApi'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '@/GlobalRedux/store'
import { getSimList, setSimCount, setSimLoading } from '@/GlobalRedux/Sim/SimSlice'
import { error } from '../components/modals/CustomToast'
import { AnyAction } from '@reduxjs/toolkit'

export default function Sim() {
  return (
    <>
      <div className='w-full h-20' />
      <SelectSimTitle />
      <div className='w-full h-6' />
      <SelectNumber hideFilter />
      <PageWrapper>
        {/* <FilterPlan /> */}
        <div className='w-full h-10' />
      </PageWrapper>
    </>
  )
}


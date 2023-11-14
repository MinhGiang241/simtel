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

export function getSimFunction(dispatch: Dispatch<AnyAction>, page: number, type: string | undefined, telco: string | undefined) {
  dispatch(setSimLoading(true))
  getAllSim({ skip: (page - 1) * 4, limit: 4, type, telco }).then(v => {
    console.log('sim', v);
    dispatch(getSimList(v['list']))
    dispatch(setSimCount(v['count']))
    dispatch(setSimLoading(false))
  }).catch(err => {
    dispatch(setSimLoading(false))
    error("Lỗi", err)
  })
}

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

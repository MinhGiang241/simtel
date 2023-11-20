'use client'
import { RootState } from '@/GlobalRedux/store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useRouter, redirect, useSearchParams } from 'next/navigation'

import PlanNoSim from './components/PlanNoSim'
import PlanWithSim from './components/PlanWithSim'
import { setPath } from '@/GlobalRedux/path/pathSlice'
import { MoonLoader } from 'react-spinners'

export default function SimpackPayment() {
  const dispatch = useDispatch()
  const router = useRouter()
  const type = useSelector((state: RootState) => state.simPack.selectedType)
  const phone = useSelector((state: RootState) => state.simPack.phone)
  const simpack = useSelector((state: RootState) => state.simPack.selected)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')

  useEffect(() => {
    if (!simpack && !orderId) {
      dispatch(setPath('/plans/'))
      redirect('/plans/')

    } else {
      setLoading(false)
    }
  }, [])

  return (
    <div className='w-full bg-m_backgound  flex flex-col items-center min-h-[70rem]'>
      <div className='w-full h-[88px]' />
      <div className='max-w-[1140px] w-full'>
        <div className='h-full mt-10 mb-10'>
          <p className='text-base'>{'Mua sim >'} <span className='font-semibold'>Thanh toán</span></p>
        </div>
        {loading ? <div className='w-full flex justify-center items-center h-96'><MoonLoader color='#E50914' /></div> : type === 0 ? <PlanNoSim /> : <PlanWithSim />}
      </div>
    </div>
  )
}

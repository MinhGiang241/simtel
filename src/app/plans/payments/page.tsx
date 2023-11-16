'use client'
import { RootState } from '@/GlobalRedux/store'
import MInput from '@/app/components/config/MInput'
import { Button, Divider, Input, Radio, RadioChangeEvent } from 'antd'
import React, { useEffect, useState } from 'react'
import { FormattedNumber } from 'react-intl'
import { useSelector } from 'react-redux'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { pushPathName } from '@/services/routes'
import { useDispatch } from 'react-redux'
import { useRouter, redirect } from 'next/navigation'
import { setPath } from '@/GlobalRedux/path/pathSlice'
import { error, success } from '@/app/components/modals/CustomToast'
import { Order } from '@/interfaces/data'
import { createOrder, } from '@/services/api/simPackApi'
import PlanNoSim from './components/PlanNoSim'
import PlanWithSim from './components/PlanWithSim'

export default function SimpackPayment() {
  const dispatch = useDispatch()
  const router = useRouter()
  const type = useSelector((state: RootState) => state.simPack.selectedType)
  const phone = useSelector((state: RootState) => state.simPack.phone)
  const simpack = useSelector((state: RootState) => state.simPack.selected)

  useEffect(() => {
    if (!simpack) {
      dispatch(setPath('/plans/'))
      redirect('/plans/')
    }
  }, [])

  return (
    <div className='w-full bg-m_backgound  flex flex-col items-center min-h-[70rem]'>
      <div className='w-full h-[88px]' />
      <div className='max-w-[1140px] w-full'>
        <div className='h-full mt-10 mb-10'>
          <p className='text-base'>{'Mua sim >'} <span className='font-semibold'>Thanh toán</span></p>
        </div>
        {type === 0 ? <PlanNoSim /> : <PlanWithSim />}
      </div>
    </div>
  )
}

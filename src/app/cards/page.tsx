'use client'
import React, { useEffect, useState } from 'react'
import PageWrapper from '../components/pageWrapper'
import { Dropdown, Input, MenuProps } from 'antd'
import Image from 'next/image'
import PaymentSelect from './components/paymentSelect'
import CardList from './components/CardList'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '@/GlobalRedux/store'
import { getListCard, setCountCard, setLoadingCard, setPageCard, setTelcoCard } from '@/GlobalRedux/PhoneCard/PhoneCardSlice'
import { error } from '../components/modals/CustomToast'
import { getAllPhoneCard } from '@/services/api/simPackApi'
import Viettel from "./logo/viettel.svg"
import Vinaphone from './logo/vinaphone.svg'
import Mobifone from './logo/mobifone.svg'
import Wintel from './logo/wintel.svg'
import Vietnamobile from './logo/vietnamobile.svg'
import Mobile from './logo/mobile.svg'

const items: MenuProps['items'] = [
  { key: 'Vietel', label: (<div className='text-base'>Vietel</div>) },
  { key: 'Vinaphone', label: (<div className='text-base'>Vinaphone</div>) },
  { key: 'Mobiphone', label: (<div className='text-base'>Mobiphone</div>) },
  { key: 'Itelecom', label: (<div className='text-base'>Itelecom</div>) },
  { key: 'Gmobile', label: (<div className='text-base'>Gmobile</div>) },
  { key: 'Vietnamobile', label: (<div className='text-base'>Vietnamobile</div>) },
  { key: 'Wintel', label: (<div className='text-base'>Wintel</div>) },
  { key: '', label: (<div className='text-base'>Tất cả</div>) },
]

const getImageTelco = (telco: string) => {
  switch (telco) {
    case 'Vietel':
      return ((<Viettel width={119} height={24} />))
    case 'Vinaphone':
      return ((<Vinaphone width={117} height={26} />))
    case 'Mobiphone':
      return ((<Mobifone width={131} height={27} />))
    case 'Itelecom':
      return ((<img src="/images/itelecom.png" alt="#" width={60} height={20} />))
    case 'Gmobile':
      return ((<Mobile width={97} height={34} />))
    case 'Vietnamobile':
      return ((<Vietnamobile width={89} height={38} />))
    case 'Wintel':
      return ((<Wintel width={119} height={24} />))
    default:
      return (<div>Tất cả</div>)
  }
}

var telcoImages = ["Vietel", "Vinaphone", "Mobiphone", "Itelecom", "Gmobile", "Vietnamobile", "Wintel", '']

export default function CardPage() {
  const [image, setImage] = useState<any>((<div>Tất cả</div>))
  const dispatch = useDispatch()
  const telco = useSelector((state: RootState) => state.phoneCard.telco)
  //const page = useSelector((state: RootState) => state.phoneCard.page)
  useEffect(() => {
    dispatch(setLoadingCard(true))
    getAllPhoneCard(telco, 8, 1).then((v) => {
      dispatch(setLoadingCard(false))
      if (v && v.list.length > 0) {
        dispatch(getListCard(v.list))
        dispatch(setCountCard(v.count))
      } else {
        dispatch(getListCard([]))
        dispatch(setCountCard(0))
      }
    }).catch((e: string) => {
      dispatch(setLoadingCard(false))
      error("Lỗi", e)
    })

  }, [telco])

  const handleDropdownClick = (e: any) => {
    dispatch(setPageCard(1))
    dispatch(setTelcoCard(e.key))
    setImage(getImageTelco(e.key))
  }
  return (
    <PageWrapper>
      <div className='mt-5 flex items-center justify-center w-full flex-wrap h-[152px] '>
        {telcoImages.map((e: string, i: number) => (
          <div key={i} className='w-[261px] h-[76px] border flex items-center justify-center mr-3 mb-3 rounded-lg'>
            {getImageTelco(e)}
          </div>
        ))}
      </div>
      <div className='w-full'>
        <div className='mt-10 mb-6'>
          <span className='text-lg font-bold underline-offset-2 underline'>Chọn mệnh giá</span><span className='text-m_red'> *</span>
        </div>
        <CardList />
      </div>
      <PaymentSelect />
      <div className='h-96' />
    </PageWrapper>
  )
}
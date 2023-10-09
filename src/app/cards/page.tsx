'use client'
import React, { useEffect, useState } from 'react'
import PageWrapper from '../components/pageWrapper'
import { Dropdown, Input, MenuProps, Radio } from 'antd'
import Image from 'next/image'
import PaymentSelect from './components/paymentSelect'
import CardList from './components/CardList'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '@/GlobalRedux/store'
import { getListCard, setCountCard, setLoadingCard, setPageCard, setTelcoCard } from '@/GlobalRedux/PhoneCard/PhoneCardSlice'
import { error } from '../components/modals/CustomToast'
import { getAllPhoneCard } from '@/services/api/simPackApi'

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
      return ((<Image width={70} height={70} src='/images/vietel.png' alt='vietel' />))
    case 'Vinaphone':
      return ((<Image width={70} height={70} src='/images/vinaphone.png' alt='vinaphone' />))
    case 'Mobiphone':
      return ((<Image width={70} height={70} src='/images/mobiphone.png' alt='mobiphone' />))
    case 'Itelecom':
      return ((<Image width={70} height={70} src='/images/itelecom.png' alt='itelecom' />))
    case 'Gmobile':
      return ((<Image width={70} height={70} src='/images/gmobile.png' alt='gmobile' />))
    case 'Vietnamobile':
      return ((<Image width={70} height={70} src='/images/vietnamobile.png' alt='vietnamobile' />))
    case 'Wintel':
      return ((<Image width={70} height={70} src='/images/wintel.png' alt='wintel' />))
    default:
      return (<div>Tất cả</div>)

  }
}

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
      <div className='w-full h-32 bg-m_red mt-12 rounded-tl-2xl rounded-tr-2xl flex justify-center items-center'>
        <h4 className='text-white  mr-6 text-3xl'>Số  điện thoại nạp thẻ</h4>
        <div className='w-[30rem]'>
          <Input placeholder='*********' className='h-14 w-full' style={{ fontSize: '40px' }} allowClear />
        </div>
      </div>
      <div className='flex items-center px-5 w-full h-14 border-black border justify-between'>
        {image}
        <Dropdown
          onOpenChange={(v) => {
            console.log(v);

          }} menu={{ onClick: handleDropdownClick, items }} placement="bottomLeft" arrow={{ pointAtCenter: false }}>
          <button className='h-full w-20 font-semibold'>
            Thay đổi
          </button>
        </Dropdown>
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





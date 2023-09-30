import React from 'react'
import PageWrapper from '../components/pageWrapper'
import { Dropdown, Input, MenuProps, Radio } from 'antd'
import Image from 'next/image'
import { CheckCircleOutlined } from '@ant-design/icons'
import PaymentSelect from './components/paymentSelect'
import CardItem from './components/cardItem'

const items: MenuProps['items'] = [
  { key: '1', label: (<div className='text-base'>Vietel</div>) },
  { key: '2', label: (<div className='text-base'>Vinaphone</div>) },
  { key: '3', label: (<div className='text-base'>Mobiphone</div>) },
  { key: '4', label: (<div className='text-base'>Itelecom</div>) },
  { key: '5', label: (<div className='text-base'>Gmobile</div>) },
  { key: '6', label: (<div className='text-base'>Vietnamobile</div>) },
  { key: '7', label: (<div className='text-base'>Wintel</div>) },
]

export default function CardPage() {
  return (
    <PageWrapper>
      <div className='w-full h-32 bg-m_red mt-12 rounded-tl-2xl rounded-tr-2xl flex justify-center items-center'>
        <h4 className='text-white  mr-6 text-3xl'>Số  điện thoại nạp thẻ</h4>
        <div className='w-[30rem]'>
          <Input placeholder='*********' className='h-14 w-full' style={{ fontSize: '40px' }} allowClear />
        </div>
      </div>
      <div className='flex items-center px-5 w-full h-14 border-black border justify-between'>
        <Image width={70} height={70} src='/images/vietel.png' alt='vietel' />
        <Dropdown menu={{ items }} placement="bottomLeft" arrow={{ pointAtCenter: false }}>
          <button className='h-full w-20 font-semibold'>
            Thay đổi
          </button>
        </Dropdown>
      </div>

      <div className='w-full'>
        <div className='mt-10 mb-6'>
          <span className='text-lg font-bold underline-offset-2 underline'>Chọn mệnh giá</span><span className='text-m_red'> *</span>
        </div>
        <div className='flex flex-wrap justify-between'>
          {Array.from({ length: 8 }).map((items, index) => (<CardItem key={index} />))}
        </div>
      </div>
      <PaymentSelect />
      <div className='h-96' />
    </PageWrapper>
  )
}





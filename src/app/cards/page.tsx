import React from 'react'
import PageWrapper from '../components/pageWrapper'
import { Input } from 'antd'
import Image from 'next/image'

export default function Card() {
  return (
    <PageWrapper>
      <div className='w-full h-32 bg-m_red mt-12 rounded-tl-2xl rounded-tr-2xl flex justify-center items-center'>
        <h4 className='text-white  mr-6 text-4xl'>Số  điện thoại nạp thẻ</h4>
        <div className='w-[30rem]'>
          <Input placeholder='*********' className='h-32 w-full' style={{ fontSize: '40px' }} />
        </div>
      </div>
      <div className='w-full'>
        <Image width={50} height={50} src='/public/images/vietel.png' alt='vietel' />
      </div>

    </PageWrapper>
  )
}

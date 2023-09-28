'use client'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import PageWrapper from '../components/pageWrapper'
import moment from 'moment'
import { Input, Radio, RadioChangeEvent } from 'antd'
import { PhoneFilled } from '@ant-design/icons'
import Image from 'next/image'

export default function OrderPage() {
  const [time, setTime] = useState("8:00")
  const [method, setMethod] = useState('1')

  useEffect(() => {

    if (moment.duration(time, 'minutes').asMinutes() != 0) {
      setTimeout(() => {
        setTime(moment(time, 'mmss').subtract(1, 'seconds').format('mm:ss'))
      }, 1000)
    }
  }, [time])

  return (
    <PageWrapper>
      <div className='mt-2 w-full flex justify-center'>
        Giỏ hàng hết hiệu lực  trong vòng<span className='font-bold'>&nbsp;{time}&nbsp;</span>phút
      </div>

      <div className='w-full flex mt-4'>
        <div className='w-1/2'>
          <div className='flex flex-col justify-between h-80'>


            <h1 className='mb-1 font-bold text-lg'>Thông tin đơn hàng<span className='text-m_red'> *</span></h1>
            <Input className='h-9' placeholder='Họ tên *' />
            <div className='w-full flex '>
              <Input className='h-9' placeholder='Số điện thoại liên hệ *' />
              <div className='w-10' />
              <Input className='h-9' placeholder='Email nhận eSim *' />
            </div>

            <div className='w-full flex'>
              <Input className='h-9' placeholder='Tỉnh/TP *' />
              <div className='w-10' />
              <Input className='h-9' placeholder='Quận/Huyện *' />
              <div className='w-10' />
              <Input className='h-9' placeholder='Xã/Phường *' />
            </div>

            <Input className='h-9' placeholder='Địa chỉ chi tiết *' />
            <Input className='h-9' placeholder='Ghi chú *' />

            <div className='mb-1 relative flex items-center font-bold text-lg'>
              <div className='absolute -left-11 mr-3 rounded-full shadow-black/50 shadow bg-gradient-to-l from-m_red to-red-500 w-8 h-8 flex justify-center items-center'>
                <PhoneFilled style={{ color: '#fff' }} />
              </div>
              Hình thức thanh toán<span className='text-m_red'> *</span>
            </div>
          </div>

          <div className='bg-m_gray rounded-lg flex flex-col justify-center h-32 px-5'>
            <Radio.Group value={method} onChange={(v: RadioChangeEvent) => {
              setMethod(v.target.value)
            }}>
              <div className='w-full'>
                <div className='flex justify-between w-full items-center'>
                  <Radio value={'1'}  >
                    <h1 className='ml-4'>Thanh toán qua VNPAYQR</h1>
                  </Radio>
                  <Image src='/images/vnpay.png' alt='vnpay' height={60} width={90} className='mr-4' />

                </div>
              </div>
              <div className='h-4' />
              <div className='w-full'>
                <Radio value={'2'}>
                  <div>
                    <h1 className='ml-4'>Thanh toán COD</h1>
                    <h4 className='ml-4  text-blue-700 text-xs'>(Thanh toán trực tiếp cho nhân viên giao hàng)</h4>
                  </div>
                </Radio>
              </div>

            </Radio.Group>

          </div>

        </div>
        <div className='w-10' />

        <div className='w-1/2 '>
          <div className=''>
            <h4 className='mb-1 font-bold text-lg'>
              Đơn hàng
            </h4>
            <div>

              <h4 className='mb-1 font-bold text-lg'>
                052 272 719
              </h4>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

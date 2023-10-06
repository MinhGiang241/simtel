'use client'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import PageWrapper from '../components/pageWrapper'
import moment from 'moment'
import { Button, Divider, Input, Radio, RadioChangeEvent } from 'antd'
import { PhoneFilled, RedoOutlined, PlusOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { pushPathName } from '@/services/routes'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

export default function OrderPage() {


  const [time, setTime] = useState("8:00")
  const [method, setMethod] = useState('1')
  const router = useRouter()
  const dispatch = useDispatch()


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
            <Input className='h-9' placeholder='Họ tên *' allowClear />
            <div className='w-full flex '>
              <Input className='h-9' placeholder='Số điện thoại liên hệ *' allowClear />
              <div className='w-10' />
              <Input className='h-9' placeholder='Email nhận eSim *' allowClear />
            </div>

            <div className='w-full flex'>
              <Input className='h-9' placeholder='Tỉnh/TP *' allowClear />
              <div className='w-10' />
              <Input className='h-9' placeholder='Quận/Huyện *' allowClear />
              <div className='w-10' />
              <Input className='h-9' placeholder='Xã/Phường *' allowClear />
            </div>

            <Input className='h-9' placeholder='Địa chỉ chi tiết *' allowClear />
            <Input className='h-9' placeholder='Ghi chú *' allowClear />

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
          <div className='w-full'>
            <h4 className='mb-1 font-bold text-lg'>
              Đơn hàng
            </h4>
            <div className='flex items-center'>

              <h4 className='mb-1 font-bold text-lg mr-8'>
                052 272 719
              </h4>
              <Button icon={<RedoOutlined />} className='rounded-3xl font-semibold' >
                Đổi số
              </Button>
            </div>

            <h4>eSIM - Vietel</h4>
            <div className='flex w-full justify-between'>
              <h4>Phí hòa mạng</h4>
              <h4>50.000 đ</h4>
            </div>
            <div className='flex justify-between w-full'>
              <h4>CK10 -Chu kỳ 30 ngày</h4>
              <h4>100.000 đ</h4>
            </div>

            <Button className='rounded-3xl font-semibold'>
              Đổi gói cước
            </Button>

            <Divider className='my-4' />

            <div className='flex w-full justify-center'>
              <Button onClick={() => pushPathName(router, dispatch, '#')} icon={<PlusOutlined className='text-m_red text-3xl' />} className='rounded-2xl border-m_red flex items-center font-bold text-2xl text-m_red py-6 bg-m_red/10 border-0' >
                Mua thêm
              </Button>
            </div>

            <div className='w-full py-6 bg-m_gray my-4 pl-5 rounded-xl'>
              Nhập mã giãm giá
            </div>

            <div className='w-full flex justify-between'>
              <h4>Tổng tiền hàng</h4>
              <h4>150.000 đ</h4>
            </div>

            <div className='flex w-full justify-between'>
              <h4>Phí vận chuyển</h4>
              <h4>100.000 đ</h4>
            </div>

            <div className='flex w-full justify-between'>
              <h4>Giảm giá</h4>
              <h4>0 đ</h4>
            </div>

            <Divider className='my-4' />

            <div className='flex w-full justify-between text-xl font-semibold'>
              <h4>Tổng</h4>
              <h4>160.000 đ</h4>
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

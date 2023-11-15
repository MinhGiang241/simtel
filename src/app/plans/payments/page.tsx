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

export default function page() {
  const dispatch = useDispatch()
  const router = useRouter()
  const type = useSelector((state: RootState) => state.simPack.selectedType)
  const phone = useSelector((state: RootState) => state.simPack.phone)
  const simpack = useSelector((state: RootState) => state.simPack.selected)

  const [method, setMethod] = useState<number>();

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
        <div className=' flex justify-between mb-28'>

          <div className='bg-white  w-7/12 border-m_gray border-2 rounded-lg p-5'>
            <div className='text-base font-bold mb-3'>Chọn loại gói cước</div>
            <Radio.Group className='flex' disabled value={type} onChange={(v: RadioChangeEvent) => {
            }}>
              <Radio value={0}>
                <h1 className='ml-3'>Gói cước</h1>
              </Radio>
              <div className='w-7' />
              <Radio value={1}>
                <h1 className='ml-3'>Gói cước kèm sim</h1>
              </Radio>
            </Radio.Group>
            <Divider />
            <div className='w-full mt-8 mb-10'>
              <label className='font-semibold text-base' htmlFor='phone'>
                Số điện thoại nạp cước<span className='text-m_red'>*</span>
              </label>
              <Input value={phone} disabled className='h-14 mt-2' />
            </div>
            <Divider />
            <div className='mt-8 w-full flex flex-col items-start' >
              <h4 className='font-semibold text-lg'>Thông tin gói cước</h4>
            </div>

            <div className='flex mt-5'>
              <p className='text-base font-bold'>{simpack ? simpack.telco?.toUpperCase() : 'VIETTEL99'} </p>
              <div className='h-5 w-0.5 bg-gray-300 mx-2 text-base' />
              <p className='text-md'>30 ngày</p>
            </div>
            <div className='text-m_red text-4xl font-bold mt-2 mb-5'>
              <FormattedNumber value={(simpack ? simpack.price ?? 0 : 0)} style='currency' currency='VND' />
            </div>
            <div className='flex mb-3 items-start'>
              <CheckOutlined className='text-xl mr-2' style={{ color: "green" }} />
              <div className='text-base'>Chu kỳ 6 tháng tặng thêm 1 tháng khuyến mãi, gia hạn tự động.</div>
            </div>
            <div className='flex mb-3 items-start'>
              <CheckOutlined className='text-xl mr-2' style={{ color: "green" }} />
              <div className='text-base'>Truy cập Data 4G không giới hạn dung lượng dùng trên Smartphone/Tablet.</div>
            </div>
            <div className='flex mb-3 items-start'>
              <CheckOutlined className='text-xl mr-2' style={{ color: "green" }} />
              <div className='text-base'>Tại thời điểm gia hạn thất bại, gói cước chờ gia hạn 60 ngày.</div>
            </div>
            <div className='flex items-start'>
              <CheckOutlined className='text-xl mr-2' style={{ color: "green" }} />
              <div className='text-base'>Cam kết sử dụng mạng SimTel trong vòng 24 tháng, kể từ khi đăng ký gói cước thành công.</div>
            </div>
            <Divider />
            <Radio.Group value={method} onChange={(e) => setMethod(e.target.value)} className={` w-full`}>
              <Radio value={0} className={`${method === 0 ? `bg-m_gray border-sky-700` : `border-m_gray`}  border-2 pl-3 w-full py-[22px] rounded-xl flex flex-row relative`}>
                <div className='flex justify-between w-full'>
                  <div>Thanh Toán qua VNPAYQR</div>
                  <Image className='absolute right-1 top-1' src='/images/apota.png' alt='apota' loading='lazy' width={100} height={60} />
                </div>


              </Radio>

              <Radio value={1} className={`${method === 1 ? `bg-m_gray border-sky-700` : `border-m_gray`} border-2 pl-3 w-full py-3 rounded-xl flex flex-row relative mt-6 mb-6`}>
                <div>
                  <div className='text-base'>Thanh toán COD</div>
                  <div className='text-sm'>(Thanh toán trực tiếp cho ngân hàng)</div>
                </div>
              </Radio>

              <Radio value={2} className={`${method === 2 ? `bg-m_gray border-sky-700` : `border-m_gray`} border-2 pl-3 w-full py-[22px] rounded-xl flex flex-row relative`}>
                <div className='text-base'>Thanh toán qua tài khoản ngân hàng</div>
              </Radio>
            </Radio.Group>

          </div>

          <div className='bg-white w-2/5 border-m_gray border-2 rounded-lg h-fit '>
            <div className='p-5 h-full'>
              <div className='text-base font-bold mb-3'>Đơn hàng (1)</div>

              <div className='flex w-full justify-between'>
                <p className='font-bold text-lg'>Cước data - {simpack?.telco}</p>
                <CloseOutlined />
              </div>

              <div className='flex w-full justify-between my-4'>
                <p className='text-base'>Tên gói cước</p> <p className='font-bold text-base'>{simpack?.code}</p>
              </div>
              <div className='flex w-full justify-between my-4'>
                <p className='text-base'>CK10 (Chu kỳ 30 ngày)</p>
                <div className='font-bold text-base'>
                  <FormattedNumber value={(simpack ? simpack.price ?? 0 : 0)} style='currency' currency='VND' />
                </div>
              </div>

              <div className='cursor-pointer text-base text-sky-700'>
                Đổi gói cước
              </div>
              <Divider />
              <Input className='h-11 relative' placeholder='Nhập mã giảm giá' suffix={(<button onClick={() => { }} className='font-bold text-sm right-0 absolute h-[42px]   text-m_red bg-[#FFF4F0] w-[86px] rounded-r-md'> Áp dụng</button>)} />
              <Divider />
              <div className='flex w-full justify-between my-4'>
                <p className='text-base'>Tổng tiền hàng</p>
                <div className='font-bold text-base'>
                  <FormattedNumber value={(simpack ? simpack.price ?? 0 : 0)} style='currency' currency='VND' />
                </div>
              </div>

              <div className='flex w-full justify-between my-4'>
                <p className='text-base'>Giảm giá</p>
                <div className='font-bold text-base'>
                  <FormattedNumber value={(0)} style='currency' currency='VND' />
                </div>
              </div>

              <div className='text-base'>
                Bằng việc nhấn thanh toán, Quý khách đồng ý với <span className='text-m_red active:opacity-70 cursor-pointer select-none'>Điều kiện giao dịch chung và Chính sách vận chuyển giao nhận hàng </span>của Simtel
              </div>
            </div>
            <Divider />
            <div className='flex justify-between mx-5 mb-8 items-center'>
              <div className='flex flex-col'>
                <p className='text-base'>Tổng cộng</p>
                <div className='text-2xl font-bold'>
                  <FormattedNumber value={(simpack ? simpack.price ?? 0 : 0)} style='currency' currency='VND' />
                </div>
              </div>
              <Button onClick={(_) => {
                pushPathName(router, dispatch, '/pay')
              }} className='w-[177px] bg-m_red text-white border-m_red text-base font-semibold h-12'>Thanh toán</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

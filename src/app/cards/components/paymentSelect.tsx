'use client'

import { Radio } from "antd"
import Image from 'next/image'

export default function PaymentSelect() {
  return (
    <div className='w-full'>
      <div className='mt-4 mb-6'>
        <span className='text-lg font-bold'>Chọn phương thức thanh toán</span><span className='text-m_red'> *</span>
      </div>
      <div className="w-full flex items-center">
        <Radio.Group >
          <Radio>
            <h4 className='ml-4 font-semibold'>Thanh toán qua VN QR</h4>
          </Radio>
        </Radio.Group>
        <div className="w-10" />
        <Image src={'/images/vnpay.png'} alt='vnpay' width={120} height={80} />
      </div>

      <button className='select-none ml-auto active:opacity-70 bg-m_red text-white rounded-2xl px-6 py-2 flex justify-center items-center'>
        <p className='text-lg text-center pr-1'>Thanh toán</p>
      </button>

    </div>



  )
}

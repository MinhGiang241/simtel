'use client'

import { Radio } from "antd"
import Image from 'next/image'
import { pushPathName } from '@/services/routes';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function PaymentSelect() {
  const router = useRouter()
  const dispatch = useDispatch()
  return (
    <div className='w-full'>
      <div className='mt-4 mb-6'>
        <span className='font-bold text-lg'>Chọn phương thức thanh toán</span><span className='text-m_red'> *</span>
      </div>
      <div className="flex items-center border lg:max-w-[554px] max-w-[343px] h-[68px] rounded-xl bg-m_gray ml-3">
        <Radio.Group >
          <Radio disabled className="ml-4" >
            <h4 className='ml-4 font-semibold text-slate-400 max-w-[188px] h-[24px]'>Thanh toán qua AppotaPay</h4>
          </Radio>
        </Radio.Group>
        {/* <div className="w-10" /> */}
        {/* <Image src={'/images/vnpay.png'} alt='vnpay' width={120} height={80} /> */}
      </div>

      {/* <button className='select-none ml-auto active:opacity-70 bg-m_red text-white rounded-lg px-6 py-2 flex justify-center items-center m-auto mt-10 w-[177px] h-[48px]'> */}
      {/*   <p className='text-lg text-center pr-1' onClick={() => { pushPathName(router, dispatch, '/pay') }}>Thanh toán</p> */}
      {/* </button> */}

    </div>



  )
}

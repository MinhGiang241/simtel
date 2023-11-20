'use client'
import React from 'react'
import Member from './logo/member.svg'
import Calender from './logo/calender.svg'
import Down from './logo/down.svg'

export default function Discount() {
  return (
    <div className='w-full mt-5'>
      <div className="flex justify-center" >
        {/* <h2 className="font-bold text-4xl">, </h2> */}
        <h2 className="px-2 text-m_red font-bold text-3xl mt-10">Tin tức, khuyến mại</h2>
      </div>

      <div className='w-full h-[500px] pt-6'>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 p-4 m-2">
            <Member className="w-full h-[221px]" />
            <div className='flex justify-between mt-4'>
              <div className='flex items-center text-m_red text-base w-[236px] h-[24px]'><Down className="mr-1" />Khuyến mãi</div>
              <div className='flex items-center mr-2 text-slate-400 text-base'><Calender className="mr-1" />19/09/2023</div>
            </div>
            <div className='pt-2 font-bold text-base'>Simtel điều chỉnh chính sách thời hạn sử dụng thuê bao và thời hạn khôi phục số thường từ 22/09/2023</div>
          </div>
          <div className="col-span-1 p-4 m-2">
            <Member className="w-full h-[221px]" />
            <div className='flex justify-between mt-4'>
              <div className='flex items-center text-m_red text-base'><Down className="mr-1" />Khuyến mãi</div>
              <div className='flex items-center mr-2 text-slate-400 text-base'><Calender className="mr-1" />19/09/2023</div>
            </div>
            <div className='pt-2 font-bold text-base'>Simtel điều chỉnh chính sách thời hạn sử dụng thuê bao và thời hạn khôi phục số thường từ 22/09/2023</div>
          </div>
          <div className="col-span-1 p-4 m-2">
            <Member className="w-full h-[221px]" />
            <div className='flex justify-between mt-4'>
              <div className='flex items-center text-m_red text-base'><Down className="mr-1" />Khuyến mãi</div>
              <div className='flex items-center mr-2 text-slate-400 text-base'><Calender className="mr-1" />19/09/2023</div>
            </div>
            <div className='pt-2 font-bold text-base'>Simtel điều chỉnh chính sách thời hạn sử dụng thuê bao và thời hạn khôi phục số thường từ 22/09/2023</div>
          </div>
        </div>
        <button className='border border-m_red rounded-md w-[131px] h-[48px] flex justify-center items-center m-auto text-m_red font-semibold'>Xem thêm</button>
      </div >
    </div >
  )
}

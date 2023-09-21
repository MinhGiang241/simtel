import React from 'react'
import Logo from './logo/logo.svg'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button } from 'antd';


export default function Header() {
  return (
    <div className='w-full h-20 flex justify-center shadow-lg fixed z-50 bg-white'>
      <div className='flex w-[160rem] max-w-7xl  items-center ' >
        <Logo viewBox="0 0 152 60" width={152} height={60} />
        <div className='flex justify-center items-center flex-grow font-bold ' >
          <div className='w-1/4 text-center'>
            <button className='active:opacity-70 select-none'>
              Gói cươc
            </button>
          </div>
          <div className='w-1/4 text-center select-none'>
            <button className='active:opacity-70 select-none'>
              Mua sim
            </button>
          </div>
          <div className='w-1/4 text-center'>
            <button className='active:opacity-70 select-none'>
              Nạp thẻ
            </button>
          </div>
          <div className='w-1/4 text-center'>
            <button className='active:opacity-70 select-none'>
              Khuyến mại
            </button>
          </div>

        </div>
        <div className='h-16 w-[1px] bg-gray-700 ml-6 mr-6' />
        <div className=' w-64 h-full flex justify-between items-center'>
          <button className='border-black border-2 p-1 rounded-md active:opacity-70'>
            <ShoppingCartOutlined style={{ fontSize: '200%' }} />

          </button>
          <button className='bg-m_red h-12 text-white font-bold px-2 rounded-xl active:opacity-70 select-none'>
            Đăng nhập
          </button>
          <button className='border-black border-2 h-12 font-bold px-2 rounded-xl active:opacity-70 select-none'>
            Đăng ký
          </button>

        </div>
      </div>
    </div>
  )
}

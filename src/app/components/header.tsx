import React from 'react'
import Logo from './logo/logo.svg'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button } from 'antd';


export default function Header() {
  return (
    <div className='w-full h-20 flex justify-center shadow-lg fixed'>
      <div className='flex w-[160rem] max-w-7xl  items-center' >
        <Logo viewBox="0 0 152 60" width={152} height={60} />
        <div className='flex justify-center items-center flex-grow font-bold ' >
          <div className='w-1/4 text-center'>Gói cươc</div>
          <div className='w-1/4 text-center'>Mua sim</div>
          <div className='w-1/4 text-center'>Nạp thẻ</div>
          <div className='w-1/4 text-center' >Khuyến mại</div>
        </div>
        <div className='h-16 w-[1px] bg-gray-700 ml-6 mr-6' />
        <div className=' w-64 h-full flex justify-between items-center'>
          <div className='border-black border-2 p-1 rounded-md'>
            <ShoppingCartOutlined style={{ fontSize: '200%' }} />

          </div>
          <Button className='bg-m_red h-12 text-white font-bold'>
            Đăng nhập
          </Button>
          <Button className='border-black border-2 h-12  font-bold'>
            Đăng ký
          </Button>

        </div>
      </div>
    </div>
  )
}

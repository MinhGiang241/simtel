import React from 'react'
import './component.css'
import FacebookSvg from './logo/facebook.svg'
import ZaloSvg from './logo/zalo.svg'
import InstagramSvg from './logo/instagram.svg'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className='bg-m_red h-96 flex justify-center align-bottom footer'>
      <div className='footer w-[160rem] max-w-7xl flex' >
        <div className='w-1/5 mt-16' >
          <ul className='text-white'>
            <li className='font-bold'>DỊCH VỤ DI ĐỘNG</li>
            <li>Mua sim số</li>
            <li>Mua gói cước</li>
          </ul>
        </div>
        <div className='w-1/5  mt-16'>
          <ul className='text-white'>
            <li className='font-bold'>CHÍNH SÁCH</li>
            <li>Chính sách vận chuyển</li>
            <li>Thanh toán</li>
            <li>Điều kiện & Điều khoản giao dịch chung</li>
            <li>Điều khoản cam kết</li>
            <li>Đổi trả</li>
            <li>Chính sách kiểm hàng</li>
          </ul>
        </div>
        <div className='w-1/5 mt-16'>
          <ul className='text-white'>
            <li className='font-bold'>HỖ TRỢ</li>
            <li>Đăng ký TTTB</li>
            <li>Đổi/cấp lại SIM</li>
            <li>Đổi/cấp lại eSIM</li>
            <li>Liên hệ</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className='w-1/5 mt-16'>
          <ul className='text-white'>
            <li className='font-bold'>QUY TRÌNH</li>
            <li>Mua bán</li>
            <li>Quản lý chất lượng dịch vụ</li>
            <li>Giấy phép cung cấp dịch vụ viễn thông</li>
          </ul>
        </div>
        <div className=' text-white w-1/5 mt-16'>
          <h4 className='font-bold pt-[7px] pb-[7px]'>ĐI CÙNG  SIMTELL</h4>

          <Link href={'https://www.facebook.com'} target='_blank' className='flex items-center'>
            <FacebookSvg fill='white' viewBox="0 0 65 55" width={40} height={40} />
            <p>Facebook</p>
          </Link>
          <Link href={'https://zalo.me'} target='_blank' className='flex items-center'>
            <ZaloSvg fill='white' viewBox="0 0 65 55" width={40} height={40} />
            <p>Zalo</p>
          </Link>
          <Link href={'https://www.instagram.com'} target='_blank' className='flex items-center'>
            <InstagramSvg fill='white' viewBox="0 0 65 55" width={40} height={40} />
            <p>Instagram</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

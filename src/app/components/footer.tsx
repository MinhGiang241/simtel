"use client"
import React from 'react'
import './component.css'
import Logo from './logo/logo.svg'

export default function Footer() {
  return (
    <div className='bg-m_gray h-96  '>
      <div className='footer px-24' >
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1 p-4"><Logo className="mt-6 ml-16" style={{ transform: "scale(2)" }} /></div>
          <div className="col-span-1 p-4">
            <div className='font-bold text-lg pb-3'>Dịch vụ di động</div>
            <div className='text-sm pb-2 text-slate-500'>Mua sim số</div>
            <div className='text-sm pb-2 text-slate-500'>Mua gói cước</div>
          </div>
          <div className="col-span-1 p-4">
            <div className='font-bold text-lg pb-3'>Chính sách</div>
            <div className='text-sm pb-2 text-slate-500'>Chính sách vận chuyển</div>
            <div className='text-sm pb-2 text-slate-500'>Thanh toán</div>
            <div className='text-sm pb-2 text-slate-500'>Điều kiện & Điều khoản giao dịch chung</div>
            <div className='text-sm pb-2 text-slate-500'>Điều khoản cam kết</div>
            <div className='text-sm pb-2 text-slate-500'>Đổi trả</div>
            <div className='text-sm pb-2 text-slate-500'>Chính sách kiểm hàng</div>
          </div>
          <div className="col-span-1 p-4">
            <div className='font-bold text-lg pb-3'>Hỗ trợ</div>
            <div className='text-sm pb-2 text-slate-500'>Đăng ký TTTB</div>
            <div className='text-sm pb-2 text-slate-500'>Đổi/cấp lại SIM</div>
            <div className='text-sm pb-2 text-slate-500'>Đổi/cấp lại eSIM</div>
            <div className='text-sm pb-2 text-slate-500'>divên hệ</div>
            <div className='text-sm pb-2 text-slate-500'>FAQs</div>
          </div>
          <div className="col-span-1 p-4">
            <div className='font-bold text-lg pb-3'>Quy trình</div>
            <div className='text-sm pb-2 text-slate-500'>Mua bán</div>
            <div className='text-sm pb-2 text-slate-500'>Quản lý chất lượng dịch vụ</div>
            <div className='text-sm pb-2 text-slate-500'>Giấy phép cung cấp dịch vụ viễn thông</div>
          </div>
        </div>
        {/* <div className='w-1/5 mt-16' >
          <ul className='text-white'>
            <div className='font-bold'>DỊCH VỤ DI ĐỘNG</div>
            <div>Mua sim số</div>
            <div>Mua gói cước</div>
          </ul>
        </div>
        <div className='w-1/5  mt-16'>
          <ul className='text-white'>
            <div className='font-bold'>CHÍNH SÁCH</div>
            <div>Chính sách vận chuyển</div>
            <div>Thanh toán</div>
            <div>Điều kiện & Điều khoản giao dịch chung</div>
            <div>Điều khoản cam kết</div>
            <div>Đổi trả</div>
            <div>Chính sách kiểm hàng</div>
          </ul>
        </div>
        <div className='w-1/5 mt-16'>
          <ul className='text-white'>
            <div className='font-bold'>HỖ TRỢ</div>
            <div>Đăng ký TTTB</div>
            <div>Đổi/cấp lại SIM</div>
            <div>Đổi/cấp lại eSIM</div>
            <div>divên hệ</div>
            <div>FAQs</div>
          </ul>
        </div>
        <div className='w-1/5 mt-16'>
          <ul className='text-white'>
            <div className='font-bold'>QUY TRÌNH</div>
            <div>Mua bán</div>
            <div>Quản lý chất lượng dịch vụ</div>
            <div>Giấy phép cung cấp dịch vụ viễn thông</div>
          </ul>
        </div> */}
        {/* <div className=' text-white w-1/5 mt-16'>
          <h4 className='font-bold pt-[7px] pb-[7px]'>ĐI CÙNG  SIMTELL</h4>

          <divnk href={'https://www.facebook.com'} target='_blank' className='flex items-center'>
            <FacebookSvg fill='white' viewBox="0 0 65 55" width={40} height={40} />
            <p>Facebook</p>
          </divnk>
          <divnk href={'https://zalo.me'} target='_blank' className='flex items-center'>
            <ZaloSvg fill='white' viewBox="0 0 65 55" width={40} height={40} />
            <p>Zalo</p>
          </divnk>
          <divnk href={'https://www.instagram.com'} target='_blank' className='flex items-center'>
            <InstagramSvg fill='white' viewBox="0 0 65 55" width={40} height={40} />
            <p>Instagram</p>
          </divnk>
        </div> */}
      </div>
    </div>
  )
}

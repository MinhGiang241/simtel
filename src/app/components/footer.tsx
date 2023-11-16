"use client"
import React from 'react'
import './component.css'
import Logo from './logo/logo.svg'
import Fb_footer from './logo/fb_footer.svg'
import Twitter_footer from './logo/twitter_footer.svg'
import Mess_footer from './logo/mess_footer.svg'

export default function Footer() {
  return (
    <div className='bg-m_gray h-auto'>
      <div className='footer px-10' >
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1 p-4">
            <Logo className="mt-6 ml-10" style={{ transform: "scale(1.9)" }} />
          </div>
          <div className="col-span-1 p-4">
            <div className='font-bold text-lg pb-3'>CÔNG TY CỔ PHẦN VIỄN THÔNG SMARTEL</div>
            <div className='text-sm pb-2 text-slate-500'>Mã số doanh nghiệp 0110499021 do Sở Kế hoạch và Đầu Tư Thành phố Hà Nội cấp đăng ký lần đầu ngày 05/10/2023</div>
            <div className='text-sm pb-2 text-slate-500'>Trụ sở chính: Xóm Mới, Thôn Đồng Trì, Xã Tứ Hiệp, Huyện Thanh Trì, Thành phố Hà Nội, Việt Nam</div>
            <div className='text-sm pb-2 text-slate-500'>Hotline: 0559.111.666</div>
            <div className='text-sm pb-2 text-slate-500'>Email: simtel.vn@gmail.com</div>
          </div>
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
        </div>
      </div>
      <div className='bg-m_red h-[72px] w-full flex justify-center items-center'>
        <div className='w-[1140px] flex justify-between items-center'>
          <div className='flex'>
            <Fb_footer className="mr-2" />
            <Twitter_footer className="mr-2" />
            <Mess_footer className="mr-2" />
          </div>
          <div className='text-white text-xs'>@Copyright, Masflex 2023. All rights reserved.</div>
        </div>
      </div>
    </div>
  )
}

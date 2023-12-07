"use client"
import React, { useEffect, useState } from 'react'
import './component.css'
import Logo from './logo/logo.svg'
import Fb_footer from './logo/fb_footer.svg'
import Twitter_footer from './logo/twitter_footer.svg'
import Mess_footer from './logo/mess_footer.svg'
import { pushPathName } from '@/services/routes';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { get_article_footer } from '@/services/api/policy'

export default function Footer() {
  const [article, setArticle] = useState<any[]>([])
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    get_article_footer(undefined).then((v) => {
      // console.log('v', v);
      setArticle(v)
    })
  }, [])


  return (
    <div className='bg-m_gray h-auto'>
      <div className='footer px-10' >
        <div className="lg:grid lg:grid-cols-4 lg:gap-4 flex flex-wrap">
          <div className="col-span-1 p-4">
            <Logo className="mt-6 ml-10 mb-4" style={{ transform: "scale(1.9)" }} />
          </div>
          <div className="col-span-1 p-4">
            <div className='font-bold text-lg pb-3'>CÔNG TY CỔ PHẦN VIỄN THÔNG SIMTEL</div>
            <div className='text-sm pb-2 text-slate-500'>Mã số doanh nghiệp 0110499021 do Sở Kế hoạch và Đầu Tư Thành phố Hà Nội cấp đăng ký lần đầu ngày 05/10/2023</div>
            <div className='text-sm pb-2 text-slate-500'>Trụ sở chính: Xóm Mới, Thôn Đồng Trì, Xã Tứ Hiệp, Huyện Thanh Trì, Thành phố Hà Nội, Việt Nam</div>
            <div className='text-sm pb-2 text-slate-500'>Hotline: 0559.111.666</div>
            <div className='text-sm pb-2 text-slate-500'>Email: simtel.vn@gmail.com</div>
          </div>
          <div className="col-span-1 p-4">
            <div className='font-bold text-lg pb-3'>Chính sách</div>
            {article?.map((e, i) => (<div key={i} className='text-sm pb-2 text-slate-500 cursor-pointer' onClick={() => { pushPathName(router, dispatch, `/resolution?id=${e?.article?._id}`) }}>{e?.article?.title}</div>))}
          </div>
          {/* <div className="col-span-1 p-4">
            <div className='font-bold text-lg pb-3'></div>
            <div className='text-lg pb-2 text-slate-500' onClick={() => { pushPathName(router, dispatch, '/') }}>Chính sách vận chuyển</div>
            <div className='text-lg pb-2 text-slate-500' onClick={() => { pushPathName(router, dispatch, '/') }}>Thanh toán</div>
            <div className='text-lg pb-2 text-slate-500' onClick={() => { pushPathName(router, dispatch, '/') }}>Điều kiện & Điều khoản giao dịch chung</div>
            <div className='text-lg pb-2 text-slate-500' onClick={() => { pushPathName(router, dispatch, '/') }}>Điều khoản cam kết</div>
            <div className='text-lg pb-2 text-slate-500' onClick={() => { pushPathName(router, dispatch, '/') }}>Đổi trả</div>
            <div className='text-lg pb-2 text-slate-500' onClick={() => { pushPathName(router, dispatch, '/') }}>Chính sách kiểm hàng</div>
          </div> */}
          <div className="col-span-1 p-4">
            <div className='font-bold text-lg pb-3'>Danh mục</div>
            <div className='text-sm pb-2 text-slate-500 cursor-pointer' onClick={() => { pushPathName(router, dispatch, '/plans') }}>Gói cước</div>
            <div className='text-sm pb-2 text-slate-500 cursor-pointer' onClick={() => { pushPathName(router, dispatch, '/sims') }}>Mua sim</div>
            <div className='text-sm pb-2 text-slate-500 cursor-pointer' onClick={() => { pushPathName(router, dispatch, '/cards') }}>Nạp thẻ</div>
            <div className='text-sm pb-2 text-slate-500 cursor-pointer' onClick={() => { pushPathName(router, dispatch, '/blog') }}>Khuyến mại</div>
          </div>
        </div>
      </div>
      <div className='bg-m_red h-[72px] w-full flex justify-center items-center'>
        <div className='w-[1140px] lg:flex justify-between items-center pl-5'>
          <div className='flex w-[120px] h-[24px] mb-2'>
            <Fb_footer className="mr-2" />
            <Twitter_footer className="mr-2" />
            <Mess_footer className="mr-2" />
          </div>
          <div className='text-white text-xs w-[271px] h-[20px]'>@Copyright, Masflex 2023. All rights reserved.</div>
        </div>
      </div>
    </div>
  )
}

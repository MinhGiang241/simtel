'use client'
import React, { useEffect, useState } from 'react'
import Member from './logo/member.svg'
import Calender from './logo/calender.svg'
import Down from './logo/down.svg'
import { get_blog } from '@/services/api/blog'
import { uploadUrl } from '@/constants/apiConstant'
import { pushPathName } from '@/services/routes';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function Discount() {
  const [blog, setBlog] = useState<any[]>([])
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    get_blog(undefined).then((v) => {
      // console.log(v);
      if (v.length > 3) {
        setBlog(v.slice(0, 3))
      } else {
        setBlog(v)
      }
    })
  }, [])




  return (
    <div className='w-full mt-5'>

      <div className="flex justify-center" >
        {/* <h2 className="font-bold text-4xl">, </h2> */}
        <h2 className="px-2 text-m_red font-bold text-3xl mt-10">Tin tức, khuyến mại</h2>
      </div>
      <div className='w-full h-[500px] pt-6'>
        <div className="grid grid-cols-3 gap-4">
          {blog?.map((x, key) => (
            <div className="col-span-1 p-4 m-2" key={key} >
              <div className='cursor-pointer' onClick={() => {
                pushPathName(router, dispatch, `/detail?id=${x._id}`)
              }}>
                {/* <Member className="w-full h-[221px]" /> */}
                <img className="w-full h-[221px]" src={`${uploadUrl}${x.icon}`} alt="#" />
                <div className='flex justify-between mt-4'>
                  <div className='flex items-center text-m_red text-base w-[236px] h-[24px]'><Down className="mr-1" />{x.name}</div>
                  <div className='flex items-center mr-2 text-slate-400 text-base'><Calender className="mr-1" />{`${new Date(x.createdTime.toString()).getDate()}/${new Date(x.createdTime.toString()).getMonth() + 1}/${new Date(x.createdTime.toString()).getFullYear()}`}</div>
                </div>
                <div className='pt-2 font-bold text-base'>{x.article.title}</div>
              </div>
            </div>
          ))}
        </div>
        <button className='border border-m_red rounded-md w-[131px] h-[48px] flex justify-center items-center m-auto text-m_red font-semibold' onClick={() => {
          pushPathName(router, dispatch, '/blog')
        }}>Xem thêm</button>
      </div >
    </div >
  )
}

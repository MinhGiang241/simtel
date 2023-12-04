'use client'
import PageWrapper from '../components/pageWrapper'
import React, { useEffect, useState } from 'react'
import Member from '../components/logo/member.svg'
import Calender from '../components/logo/calender.svg'
import Down from '../components/logo/down.svg'
import { pushPathName } from '@/services/routes';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { get_blog } from '@/services/api/blog'
import { uploadUrl } from '@/constants/apiConstant'

export default function Page() {
    const [blog, setBlog] = useState()
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        get_blog(undefined).then((v) => {
            // console.log(v);
            setBlog(v)
        })
    }, [])

    return (
        <PageWrapper>
            <div className='w-full mt-10'>
                <div className="flex pl-5" >
                    {/* <h2 className="px-2 text-m_red font-bold text-4xl"> khuyến mại</h2> */}
                    <div className='text-slate-400 pr-2'>Trang chủ</div>
                    <div className='text-slate-400 pr-2'>{">"}</div>
                    <div>Tin tức, khuyến mại</div>
                </div>

                <div className='w-full h-[500px] pt-2'>
                    <div className="lg:grid lg:grid-cols-3 lg:gap-4 flex flex-wrap">
                        {blog?.map((x, key) => (
                            <div className="col-span-1 p-4 m-2 cursor-pointer" key={key} onClick={() => {
                                pushPathName(router, dispatch, `/detail?id=${x._id}`)
                            }}>
                                <img className="w-full h-[221px]" src={`${uploadUrl}${x.article.thumb}`} alt="#" />
                                <div className='flex justify-between mt-4'>
                                    <div className='flex items-center text-m_red text-base'><Down className="mr-1" />{x.name}</div>
                                    <div className='flex items-center mr-2 text-slate-400 text-base'><Calender className="mr-1" />{`${new Date(x.createdTime.toString()).getDate()}/${new Date(x.createdTime.toString()).getMonth() + 1}/${new Date(x.createdTime.toString()).getFullYear()}`}</div>
                                </div>
                                <div className='pt-2 font-bold text-base'>{x.article.title}</div>
                            </div>
                        ))}
                    </div>
                </div >
            </div >
        </PageWrapper>
    )
}

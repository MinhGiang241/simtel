"use client"
import PageWrapper from '@/app/components/pageWrapper'
import { pushPathName } from '@/services/routes'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux'

export default function Page() {
    const router = useRouter()
    const dispatch = useDispatch()
    return (
        <PageWrapper>
            <div className='border-b pb-3 mt-4'>
                <u className='font-bold'>Lịch sử đơn hàng</u>
                <div>
                    <div className='flex justify-between items-center mt-2'>
                        <div className='font-thin'>Nạp thẻ trực tiếp</div>
                        <div className='font-light text-m_red'>Đã hoàn thành</div>
                    </div>
                    <div className='cursor-pointer' onClick={() => { pushPathName(router, dispatch, '/historicalDetail') }}>
                        <div className='border flex bg-m_gray px-7 p-5'>
                            <img width={"132px"} height={"110px"} src="" alt="#" />
                            <div>
                                <div>Mobifone 10.000</div>
                                <div>Số điện thoại: 0383873719</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-col flex items-end'>
                        <div>Tổng thanh toán: 9.550 đ</div>
                        <button className='border p-3 px-8 rounded-lg bg-m_red text-white' onClick={() => { pushPathName(router, dispatch, '/cards') }}>Mua lại</button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
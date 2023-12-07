"use client"
import PageWrapper from '@/app/components/pageWrapper'
import { pushPathName } from '@/services/routes'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_detail_history } from '@/services/api/detailHistory';

export default function Page() {
    const [detail, setDetail] = useState<any>()
    const router = useRouter()
    const dispatch = useDispatch()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    useEffect(() => {
        get_detail_history(id).then((v) => {
            console.log("detailHistory", v);
            setDetail(v)
        })
    }, [id])

    return (
        <PageWrapper>
            <div className='mt-4'>
                <div className='flex mb-3'>
                    <div>Lịch sử đơn hàng</div>
                    <div className='px-1'>{">"}</div>
                    <div>Chi tiết đơn hàng</div>
                </div>
                <div className='w-full bg-m_gray px-72 p-5'>
                    <div className='border-b flex'>
                        <img width={"132px"} height={"110px"} src="" alt="#" />
                        <div className='flex flex-col'>
                            <div className='font-semibold text-xl'>{detail?.telco} 10.000</div>
                            <div className='font-thin'>Nạp thẻ trực tiếp</div>
                            <div className='text-m_red'>Đã hoàn thành</div>
                        </div>
                    </div>
                    <div className='mt-2 border-b'>
                        <div className='flex justify-between mb-1'>
                            <div>Số điện thoại</div>
                            <div>{detail?.phoneNumber}</div>
                        </div>
                        <div className='flex justify-between mb-1'>
                            <div>Giá tiền</div>
                            <div>{detail?.value}</div>
                        </div>
                        <div className='flex justify-between mb-1'>
                            <div>Mã đơn hàng</div>
                            <div>{detail?.code}</div>
                        </div>
                        <div className='flex justify-between mb-1'>
                            <div>Thời gian tạo</div>
                            <div>{`${new Date(detail?.createdTime.toString()).getDate()}/${new Date(detail?.createdTime.toString()).getMonth() + 1}/${new Date(detail?.createdTime.toString()).getFullYear()}`}</div>
                        </div>
                    </div>
                    <div className='mt-2 border-b'>
                        <div className='mb-1'>Thông tin thanh toán</div>
                        <div className='flex justify-between'>
                            <div className='mb-1'>Giá tiền</div>
                            <div className='mb-1'>{detail?.value || 0}</div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='mb-1'>Tổng thanh toán</div>
                            <div className='mb-1'>{detail?.amount || 0}</div>
                        </div>
                    </div>
                    <div>
                        <div className='mb-1 mt-1'>Phương thức thanh toán</div>
                        <div className='flex'>
                            <img width={"64px"} height={"35px"} src="" alt="#" />
                            <div>Appatopay</div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button className='border p-3 px-8 rounded-lg bg-m_red text-white' onClick={() => { pushPathName(router, dispatch, '/cards') }}>Mua lại</button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

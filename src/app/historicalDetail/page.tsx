"use client"
import PageWrapper from '@/app/components/pageWrapper'
import { pushPathName } from '@/services/routes'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_detail_history } from '@/services/api/detailHistory';
import { FormattedNumber } from 'react-intl';
import Pay from '@/app/components/logo/pay.svg'
import { uploadUrl } from '@/constants/apiConstant';

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
    }, [])

    return (
        <PageWrapper>
            <div className='mt-4'>
                <div className='flex mb-3 ml-2 lg:ml-0'>
                    <div>Lịch sử đơn hàng</div>
                    <div className='px-1'>{">"}</div>
                    <div>Chi tiết đơn hàng</div>
                </div>
                <div className='w-full bg-slate-50 rounded-lg lg:px-72 px-5 p-5'>
                    <div className='border-b flex'>
                        <img className='pr-4 pb-2' width={"132px"} height={"110px"} src={`${uploadUrl}${detail?.image}`} alt="#" />
                        <div className='flex flex-col'>
                            <div className='font-semibold text-xl'>{detail?.telco} 10.000</div>
                            <div className='font-thin'>Nạp thẻ trực tiếp</div>
                            <div className='text-m_red'>Đã hoàn thành</div>
                        </div>
                    </div>
                    <div className='mt-2 border-b'>
                        <div className='flex justify-between mb-1'>
                            <div>Số điện thoại</div>
                            <div>{detail?.shopingcarditem[0]?.phoneNumber}</div>
                        </div>
                        <div className='flex justify-between mb-1'>
                            <div>Giá tiền</div>
                            <FormattedNumber value={(detail?.shopingcarditem[0]?.value || 0)} style='currency' currency='VND' />
                        </div>
                        <div className='flex justify-between mb-1'>
                            <div>Mã đơn hàng</div>
                            <div>{detail?.shopingcarditem[0]?.code}</div>
                        </div>
                        <div className='flex justify-between mb-3'>
                            <div>Thời gian tạo</div>
                            <div>{`${new Date(detail?.createdTime.toString()).getDate()}/${new Date(detail?.createdTime.toString()).getMonth() + 1}/${new Date(detail?.createdTime.toString()).getFullYear()}`}</div>
                        </div>
                    </div>
                    <div className='mt-2 border-b'>
                        <div className='mb-1'>Thông tin thanh toán</div>
                        <div className='flex justify-between'>
                            <div className='mb-1'>Giá tiền</div>
                            <FormattedNumber value={(detail?.shopingcarditem[0]?.amount || 0)} style='currency' currency='VND' />
                        </div>
                        <div className='flex justify-between'>
                            <div className='mb-1'>Tổng thanh toán</div>
                            <FormattedNumber value={(detail?.shopingcarditem[0]?.amount || 0)} style='currency' currency='VND' />
                        </div>
                    </div>
                    <div>
                        <div className='mb-1 mt-3'>Phương thức thanh toán</div>
                        <div className='flex items-center'>
                            <Pay className="w-[64px] h-[35px] mr-3" />
                            {/* <img width={"64px"} height={"35px"} src="" alt="#" /> */}
                            <div>Appatopay</div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button className='border p-3 mt-2 px-8 rounded-lg bg-m_red text-white' onClick={() => { pushPathName(router, dispatch, '/cards') }}>Mua lại</button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

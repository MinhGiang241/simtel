"use client"
import { RootState } from '@/GlobalRedux/store';
import PageWrapper from '@/app/components/pageWrapper'
import { User } from '@/interfaces/data';
import { pushPathName } from '@/services/routes'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { get_history } from "@/services/api/history";
import { uploadUrl } from '@/constants/apiConstant'
import Image from 'next/image'
import { FormattedNumber } from 'react-intl';

export default function Page() {
    const [history, setHistory] = useState<any>([])
    const user: User | undefined = useSelector((state: RootState) => state.auth.user);
    const router = useRouter()
    const dispatch = useDispatch()
    // console.log(user, "user");

    useEffect(() => {
        get_history(user?._id, user?.tel, undefined).then((v) => {
            setHistory(v)
            // console.log('vvv', v);
        }).catch((e) => {
            console.log('err', e);
        })
    }, [])

    return (
        <PageWrapper>
            <div className='border-b pb-3 mt-4'>
                <u className='font-bold'>Lịch sử đơn hàng</u>
                <div>
                    <div className='flex justify-between items-center mt-2'>
                        <div className='font-thin'>Nạp thẻ trực tiếp</div>
                        <div className='font-light text-m_red'>Đã hoàn thành</div>
                    </div>
                    {history?.map((x: any, key: any) => (
                        <div key={x._id} className='cursor-pointer border-b mb-5 pb-5' onClick={() => { pushPathName(router, dispatch, `/historicalDetail?id=${x?._id}`) }}>
                            <div className='border flex bg-slate-50 px-7 p-5 rounded-lg'>
                                <Image className='pr-2' width={132} height={110} src={`${uploadUrl}${x?.image}`} alt="#" />
                                {
                                    x?.shopingcarditem?.map((e: any, key1: any) => (
                                        <div key={key1}>
                                            <div>{e.telco} {e.value}</div>
                                            <div>Số điện thoại: {e.phoneNumber}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='flex-col flex items-end'>
                                <div>Tổng thanh toán: <FormattedNumber value={(x?.total_amount ?? 0)} style='currency' currency='VND' /></div>

                            </div>
                            <div className='flex-col flex items-end'>
                                <button className='border p-3 px-8 rounded-lg bg-m_red text-white' onClick={() => { pushPathName(router, dispatch, '/cards') }}>Mua lại</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    )
}
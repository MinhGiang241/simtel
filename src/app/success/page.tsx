"use client";
import React, { Dispatch, useEffect } from "react";
import PageWrapper from '../components/pageWrapper';
import { Modal } from 'antd';
import { useSearchParams } from 'next/navigation'
import Clipboard from 'clipboard';
import {
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { log } from "console";


export default function Page() {
    const searchParams = useSearchParams()
    const seriCard = searchParams.get('seriCard')
    const code = searchParams.get('order_code')

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(seriCard ?? '');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <PageWrapper>
            <Modal open={true} >
                <div className='flex flex-col items-center'>
                    <ExclamationCircleOutlined
                        className="text-5xl mb-3"
                        style={{ color: "orange" }}
                    />
                    <div className='text-xl font-medium'>Thanh toán thành công!</div>
                    <div className='font-light'>Quý khách đã thanh toán thành công cho đơn hàng {code}</div>
                    <div className='font-light'>Mã thẻ của bạn là:</div>
                    <div className='flex justify-evenly items-center border bg-m_gray w-60 m-auto'>{seriCard}<button onClick={handleCopyToClipboard}>Copy</button></div>
                </div>
            </Modal>
        </PageWrapper>
    )
}
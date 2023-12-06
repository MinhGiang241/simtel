"use client";
import React, { Dispatch, useEffect, useState } from "react";
import PageWrapper from '../components/pageWrapper';
import { Modal } from 'antd';
import { useSearchParams } from 'next/navigation'
import Clipboard from 'clipboard';
import {
    CheckCircleFilled, CopyOutlined
} from "@ant-design/icons";
import toast from "react-hot-toast";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const searchParams = useSearchParams()
    const seriCard = searchParams.get('seriCard')
    const code = searchParams.get('order_code')

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(seriCard ?? '');
            toast.success("Đã sao chép thành công!")
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <PageWrapper>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                <div className='flex flex-col items-center'>
                    <CheckCircleFilled
                        className="text-5xl mb-3 text-green-600"
                    />
                    <div className='text-xl font-medium'>Thanh toán thành công!</div>
                    <div className='font-light'>Quý khách đã thanh toán thành công cho đơn hàng:</div>
                    <div>{code}</div>
                    <div className='font-light'>Mã thẻ của bạn là:</div>
                    <div className='flex justify-between pl-6 pr-2 items-center border bg-m_gray w-60 m-auto rounded-lg'>{seriCard}<button onClick={handleCopyToClipboard}><CopyOutlined /></button></div>
                </div>
            </Modal>
        </PageWrapper>
    )
}
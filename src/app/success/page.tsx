"use client";
import React, { Dispatch, useEffect, useState } from "react";
import PageWrapper from '../components/pageWrapper';
import { Modal } from 'antd';
import { useSearchParams } from 'next/navigation'
import Clipboard from 'clipboard';
import {
    CheckCircleFilled, CopyOutlined, ExclamationCircleOutlined
} from "@ant-design/icons";
import toast from "react-hot-toast";
import { pushPathName } from "@/services/routes";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function Page() {
    const searchParams = useSearchParams()
    const seriCard = searchParams.get('seriCard')
    const code = searchParams.get('order_code')
    const errorCode = searchParams.get('errorCode')
    const type = searchParams.get('type')
    const [isModalOpen, setIsModalOpen] = useState(errorCode === "0");
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(errorCode != '0');
    const router = useRouter()
    const dispatch = useDispatch()

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
        setIsModalErrorOpen(false);
        // setIsModalSucscessErrorCode(false);
    };

    return (
        <PageWrapper>
            {/* ****************************PHONE_CARD******************************* */}
            {isModalOpen === (errorCode == "0" && type == 'PhoneCard') ? <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
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
            </Modal> : ''}
            {/* ****************************TOPUP******************************* */}
            {
                isModalOpen === (errorCode == "0" && type == 'Topup') ? <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <div className='flex flex-col items-center'>
                        <CheckCircleFilled
                            className="text-5xl mb-3 text-green-600"
                        />
                        <div className='text-xl font-medium'>Thanh toán thành công!</div>
                        <div className='font-light'>Quý khách đã thanh toán thành công cho đơn hàng:</div>
                        <div>{code}</div>
                        {/* <div className='font-light'>Mã thẻ của bạn là:</div>
                        <div className='flex justify-between pl-6 pr-2 items-center border bg-m_gray w-60 m-auto rounded-lg'>{seriCard}<button onClick={handleCopyToClipboard}><CopyOutlined /></button></div> */}
                    </div>
                </Modal> : ''
            }
            {/* ****************************FALSE******************************* */}
            <Modal open={isModalErrorOpen} onCancel={handleCancel} footer={null}>
                <div className='flex flex-col items-center'>
                    <ExclamationCircleOutlined
                        className="text-5xl mb-3"
                        style={{ color: "orange" }}
                    />
                    <div className='text-xl font-medium'>Giỏ hàng hết hiệu lực!</div>
                    <div className='font-light'>Opps, thời gian giữ tối đa là 30 phút đã qua</div>
                    <div className='font-light'>Quý khách vui lòng thực hiện lại giao dịch !</div>
                    {/* <div className='flex justify-between pl-6 pr-2 items-center border bg-m_gray w-60 m-auto rounded-lg'>{seriCard}<button onClick={handleCopyToClipboard}><CopyOutlined /></button></div> */}
                    <button className="border p-2 rounded-lg px-4 mt-5 bg-m_red text-white" onClick={() => { pushPathName(router, dispatch, '/cards') }}>Mua lại</button>
                </div>
            </Modal>
        </PageWrapper>
    )
}
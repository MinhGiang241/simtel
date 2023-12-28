"use client"
import React, { useEffect, useState } from 'react'
import PageWrapper from '../pageWrapper'
import { Button, Modal } from 'antd';
import { send_mail } from '@/services/api/sendMail';

interface Props {
    onCancel: Function;
    // switchLogin: Function;
}

export default function SendMail() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [valueEmail, setvalueEmail] = useState<string>()
    var token = localStorage.getItem("access_token");
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
    }, [])

    return (
        <PageWrapper>
            <Modal width={721} title="Email" open={isModalOpen} footer={null} onCancel={handleCancel}>
                <div className="flex flex-col items-center">
                    <input onChange={(e) => { setvalueEmail(e.target.value) }} className="w-[593px] h-[56px] border px-3 rounded-lg" type="text" placeholder="Nhập email" />
                    <button onClick={() => { send_mail(valueEmail, token); handleCancel() }} className="w-[165px] h-[48px] bg-m_red rounded-lg text-white mt-4">Tiếp tục</button>
                </div>
            </Modal>
        </PageWrapper>
    )
}
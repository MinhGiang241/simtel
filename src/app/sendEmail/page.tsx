"use client"
import React, { useEffect, useState } from 'react'
import PageWrapper from '../components/pageWrapper'
import { Button, Modal } from 'antd';
import { send_mail } from '@/services/api/sendMail';

interface Props {
    onCancel: Function;
    // switchLogin: Function;
  }

export default function Page({ onCancel }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        send_mail(undefined).then((v) => {
            console.log(v);
        })
    }, [])

    return (
        <PageWrapper>
            <Modal width={721} title="Email" open={true} footer={null} onCancel={handleCancel}>
                <div className="flex flex-col items-center">
                    <input className="w-[593px] h-[56px] border px-3 rounded-lg" type="text" placeholder="Nhập email" />
                    <button className="w-[165px] h-[48px] bg-m_red rounded-lg text-white mt-4">Tiếp tục</button>
                </div>
            </Modal>
        </PageWrapper>
    )
}
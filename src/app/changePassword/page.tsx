"use client"
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd';
import PageWrapper from '@/app/components/pageWrapper';
import { useSearchParams } from 'next/navigation';
import { change_password } from '@/services/api/changePassword';

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isValuePassword, setIsValuePassword] = useState<string>()

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    return (
        <PageWrapper>
            <Modal width={721} title="Tạo mật khẩu mới" open={isModalOpen} footer={null} onCancel={handleCancel}>
                <div className='flex flex-col justify-center items-center'>
                    <div className='pt-2'>
                        <div className=''>Mật khẩu mới</div>
                        <input onChange={(e) => { setIsValuePassword(e.target.value) }} className="w-[593px] h-[56px] border px-3 rounded-lg m-auto" type="text" placeholder="Nhập mật khẩu mới" />
                    </div>
                    <div className='pt-2'>
                        <div>Xác nhận mật khẩu</div>
                        <input className="w-[593px] h-[56px] border px-3 rounded-lg" type="text" placeholder="Nhập lại mật khẩu mới" />
                    </div>
                    <button
                        className="w-[165px] h-[48px] bg-m_red rounded-lg text-white mt-4"
                        onClick={async () => { await change_password(id, isValuePassword); handleCancel() }}
                    >Hoàn thành</button>
                </div>
            </Modal>
        </PageWrapper>
    )
}
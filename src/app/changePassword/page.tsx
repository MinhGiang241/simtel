"use client"
import React, { useEffect, useState } from 'react'
import { Button, Modal, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import PageWrapper from '@/app/components/pageWrapper';
import { useSearchParams } from 'next/navigation';
import { change_password } from '@/services/api/changePassword';
import { errorToast, successToast } from '../components/modals/CustomToast';
import { pushPathName } from '@/services/routes';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function Page() {
    // const [isModalOpen, setIsModalOpen] = useState(true);
    const [isValuePassword, setIsValuePassword] = useState<string>("undefined")

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const router = useRouter()
    const dispatch = useDispatch()

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
        setPasswordsMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e: any) => {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(e.target.value === password);
    };

    const handleSubmit = () => {
        if (!passwordsMatch) {
            console.log('Mật khẩu và xác nhận mật khẩu không giống nhau.');
            return;
        }
    };

    return (
        <PageWrapper>
            {/* <Modal width={721} title="Tạo mật khẩu mới" open={isModalOpen} footer={null} onCancel={handleCancel}>
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
                        onClick={async () => {
                            try {
                                await change_password(id, isValuePassword);
                                handleCancel();
                                successToast("Thành công", "Bạn đã thay đổi mật khẩu tài khoản đăng nhập thành công");
                            } catch (error: any) {
                                errorToast('lỗi', error.toString());
                            }
                        }}
                    >Hoàn thành</button>
                </div>
            </Modal> */}
            <div className=''>
                <div className='text-xl mt-2'>Đổi mật khẩu</div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='pt-2'>
                        <div className=''>Mật khẩu mới</div>
                        <Input.Password
                            placeholder="Nhập mật khẩu mới"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className="w-[593px] h-[56px] border px-3 rounded-lg m-auto"
                            onChange={(e) => { setIsValuePassword(e.target.value); handlePasswordChange }}
                            required
                        />
                    </div>
                    <div className='pt-2'>
                        <div>Xác nhận mật khẩu</div>
                        <Input.Password
                            placeholder="Nhập lại mật khẩu mới"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className="w-[593px] h-[56px] border px-3 rounded-lg"
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {/* {!passwordsMatch && <p style={{ color: 'red' }}>Mật khẩu và xác nhận mật khẩu không giống nhau.</p>} */}
                    <button
                        // type='submit'
                        className="w-[165px] h-[48px] bg-m_red rounded-lg text-white mt-4"
                        onClick={async () => {
                            try {
                                await change_password(id, isValuePassword);
                                // handleCancel(); 
                                handleSubmit()
                                successToast("Thành công", "Bạn đã thay đổi mật khẩu tài khoản đăng nhập thành công");
                                pushPathName(router, dispatch, '/')
                            } catch (error: any) {
                                errorToast('lỗi', error.toString());
                            }
                        }}
                    >Hoàn thành</button>
                </div>
            </div>
        </PageWrapper>
    )
}
"use client"
import React, { use, useEffect, useState } from 'react'
import PageWrapper from '@/app/components/pageWrapper'
import { User } from "@/interfaces/data";
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import {
    EditOutlined
} from "@ant-design/icons";
import { pushPathName } from '@/services/routes';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { FormikErrors, useFormik } from 'formik';
import { getAccountInfo } from '@/services/api/authApi';
import { setUserData } from '@/GlobalRedux/Auth/authSlice';
import { errorToast, successToast } from '../components/modals/CustomToast';

export default function Page() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user: User | undefined = useSelector((state: RootState) => state.auth.user);
    // console.log("user", user);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        full_name: user?.full_name || '',
        email: user?.email || '',
    });

    useEffect(() => {
    }, [])

    const handleChange = (e: any) => {
        setEditedUser({
            ...editedUser,
            full_name: e.target.value,
            email: e.target.value,
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    // const handleSave = () => {

    // };

    interface FormValues {
        mail: string;
        name: string;
    }

    const validate = (values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        if (!values.name) {
            errors.name = "Không được để trống trường bắt buộc";
        }
        if (!values.mail) {
            errors.mail = "Không được để trống trường bắt buộc";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)) {
            errors.mail = "Email không đúng định dạng";
        }
        return errors;
    };

    const formik = useFormik<FormValues>({
        initialValues: {
            name: "",
            mail: "",
        },
        validate,
        onSubmit: async () => {
            alert('onSubmit is called');
            try {
                var info = await getAccountInfo();

                dispatch(
                    setUserData({
                        user: info?.user
                    }),
                );
                setIsEditing(false);
                successToast("thành công", "Bạn đã thay đổi thông tin đăng nhập thành công");
            } catch (err: any) {
                console.log(err);
                errorToast("Lỗi", err);
            }
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);
    };

    return (
        <PageWrapper>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                formik.handleSubmit();
            }}>
                <div className='border rounded-md mt-10 p-3'>
                    <div className='flex justify-between mb-2'>
                        <button onClick={() => { pushPathName(router, dispatch, '/') }}>{"<"} Thông tin tài khoản</button>
                        {isEditing ? (
                            <button className='text-m_blue flex items-center' type='submit'>
                                <EditOutlined className='pr-2' />
                                <div>Lưu</div>
                            </button>
                        ) : (
                            <button className='text-m_blue flex items-center' onClick={handleEdit}>
                                <EditOutlined className='pr-2' />
                                <div>Sửa</div>
                            </button>
                        )}
                    </div>
                    <div className='bg-slate-50 px-60'>
                        <div className='flex justify-between border-b p-10'>
                            <div>Họ và tên</div>
                            {isEditing ? (
                                <input
                                    className='w-60 border'
                                    type="text"
                                    name="full_name"
                                    value={editedUser.full_name}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <div>{editedUser.full_name}</div>
                            )}
                        </div>
                        <div className='flex justify-between border-b p-10'>
                            <div>Số điện thoại</div>
                            <div>{user?.tel}</div>
                        </div>
                        <div className='flex justify-between border-b p-10'>
                            <div>Email</div>
                            {isEditing ? (
                                <input
                                    className='w-80 border'
                                    type="text"
                                    name="email"
                                    value={editedUser.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <div>{editedUser.email}</div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </PageWrapper>
    )
}
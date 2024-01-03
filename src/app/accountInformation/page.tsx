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
import { changeInfo } from '@/services/api/authApi';
import { setUserData } from '@/GlobalRedux/Auth/authSlice';
import { errorToast, successToast } from '../components/modals/CustomToast';
import { Button } from "antd";

export default function Page() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user: User | undefined = useSelector((state: RootState) => state.auth.user);
    console.log("user", user);
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

    interface FormValues {
        email: string;
        full_name: string;
    }

    // const validate = (values: FormValues) => {
    //     const errors: FormikErrors<FormValues> = {};
    //     if (!values.full_name) {
    //         errors.full_name = "Không được để trống trường bắt buộc";
    //     }
    //     if (!values.email) {
    //         errors.email = "Không được để trống trường bắt buộc";
    //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //         errors.email = "Email không đúng định dạng";
    //     }
    //     return errors;
    // };

    const formik = useFormik<FormValues>({
        initialValues: {
            full_name: "",
            email: "",
        },
        // validate,
        onSubmit: async (values) => {
            // console.log({ values });
            // alert(JSON.stringify(values));
            try {
                var info = await changeInfo(user?._id, { ...user, full_name: values.full_name, email: values.email });
                // console.log("info", info);
                dispatch(
                    setUserData({
                        user: info
                    }),
                );
                setIsEditing(false);
                successToast("Thành công", "Bạn đã thay đổi thông tin đăng nhập thành công");
            } catch (err: any) {
                console.log(err);
                errorToast("Lỗi", err);
            }
        },
    });

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     formik.setFieldValue(name, value);
    // };

    return (
        <PageWrapper>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                formik.handleSubmit();
            }}>
                <div className='border rounded-md mt-10 p-3'>
                    <div className='flex justify-between mb-2'>
                        <button type='button' onClick={() => { pushPathName(router, dispatch, '/') }}>{"<"} Thông tin tài khoản</button>
                        {isEditing ? (
                            <Button className='text-m_blue flex items-center' htmlType="submit">
                                <EditOutlined className='pr-2' />
                                <div>Lưu</div>
                            </Button>
                        ) : (
                            <button className='text-m_blue flex items-center' onClick={handleEdit}>
                                <EditOutlined className='pr-2' />
                                <div>Sửa</div>
                            </button>
                        )}
                    </div>
                    <div className='bg-slate-50 px-60'>
                        <div className='flex justify-between items-center border-b p-10'>
                            <div>Họ và tên</div>
                            {isEditing ? (
                                <input
                                    // error={formik.errors.name}
                                    className='w-60 border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500 placeholder-opacity-50 placeholder-blue-400 transition duration-300'
                                    type="text"
                                    name="full_name"
                                    placeholder={user?.full_name}
                                    onChange={formik.handleChange}
                                />
                            ) : (
                                <div>{user?.full_name}</div>
                            )}
                        </div>
                        <div className='flex justify-between border-b p-10'>
                            <div>Số điện thoại</div>
                            <div>{user?.tel}</div>
                        </div>
                        <div className='flex justify-between border-b p-10 items-center'>
                            <div>Email</div>
                            {isEditing ? (
                                <input
                                    className='w-80 border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500 placeholder-opacity-50 placeholder-blue-400 transition duration-300'
                                    type="text"
                                    name="email"
                                    placeholder={user?.email}
                                    onChange={formik.handleChange}
                                />
                            ) : (
                                <div>{user?.email}</div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </PageWrapper>
    )
}
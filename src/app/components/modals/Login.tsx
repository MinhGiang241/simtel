'use client'
import React from 'react'
import { Button } from 'antd';
import { error, success } from './CustomToast';
import { FormikErrors, useFormik } from 'formik';
import MInput from '../config/MInput';

interface Props {
  onCancel: Function
  switchSignUp: Function
}

interface FormValues {
  phone: string,
  password: string,
}

export default function Login({ onCancel, switchSignUp }: Props) {


  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {}
    if (!values.phone) {
      errors.phone = "Không được để trống trường bắt buộc"
    } else if (values.phone.length < 8) {
      errors.phone = "Không ít hơn 8 ký tự"
    }
    if (!values.password) {
      errors.password = 'Không được để trống trường bắt buộc'
    }

    return errors;
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      phone: '',
      password: ''
    },
    validate,
    onSubmit: async (values) => {
      try {
        alert(JSON.stringify(values, null, 2));
      } catch (error) {
        console.log(error);
      }
    },
  });


  return (
    <form className='w-full px-16' onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      formik.handleSubmit();
    }}>

      <h1 className='font-bold text-2xl mb-4 text-center'>Đăng nhập</h1>

      <MInput
        required
        title='Số điện thoại'
        id='phone'
        name='phone'
        onChange={formik.handleChange}
        error={formik.errors.phone}
        touch={formik.touched.phone}
        onBlur={formik.handleBlur}
      />

      <div className='h-4' />

      <MInput
        required
        title='Mật khẩu/ Mã OTP'
        id='password'
        name='password'
        type='password'
        onChange={formik.handleChange}
        error={formik.errors.password}
        touch={formik.touched.password}
        onBlur={formik.handleBlur} />

      <div className='flex justify-between my-3 text-m_red underline underline-offset-2'>
        <button type='button' onClick={() => success('Gửi mã xác nhận thành công', 'Gửi mã OTP thành công đến email của quý khách')} className='select-none active:opacity-70'>Lấy  mã OTP</button>
        <button type='button' onClick={() => error('Gửi mã xác nhận không thành công', 'Gửi mã OTP không thành công đến email của quý khách')} className='select-none active:opacity-70'>Quên mật khẩu</button>
      </div>

      <div className='flex w-full justify-center mb-3'>
        <Button
          htmlType="submit"
          className='bg-m_red text-white border-m_red px-5 rounded-xl' >
          Đăng nhập
        </Button>
      </div>

      <div className='text-center'>
        Quý khách chưa có tài khoản? Quý khách muốn <button type='button' onClick={() => switchSignUp()} className='text-m_red  select-none active:opacity-70'>Đăng ký</button>
      </div>

      <div className='text-center mt-3'>
        <h4>Bằng việc đăng nhập, Quý khách đã đồng ý thực hiện mọi giao dịch theo</h4>
        <button
          type='button'
          className='text-m_red select-none active:opacity-70'>
          Điều khoản sử dụng và Chính sách bảo mật của Simtel</button>
      </div>
    </form>
  )
}

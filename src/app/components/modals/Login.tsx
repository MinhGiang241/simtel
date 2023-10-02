'use client'
import React from 'react'
import { Button, Form, Input, } from 'antd';
import { error, success } from './CustomToast';
import { useFormik } from 'formik';

interface Props {
  onCancel: Function
  switchSignUp: Function
}

export default function Login({ onCancel, switchSignUp }: Props) {

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  return (
    <form className='w-full px-16' onSubmit={() => formik.handleSubmit()}>
      <h1 className='font-bold text-2xl mb-4 text-center'>Đăng nhập</h1>
      <label htmlFor='phone'>Số đện thọai <span className='text-m_red'>*</span></label>
      <Input id='phone' allowClear onChange={formik.handleChange} />
      <div className='h-4' />
      <label htmlFor='password'>Mật khẩu/ Mã OTP <span className='text-m_red'>*</span></label>
      <Input id='password' type='password' allowClear onChange={formik.handleChange} />

      <div className='flex justify-between my-3 text-m_red underline underline-offset-2'>
        <button onClick={() => success('Gửi mã xác nhận thành công', 'Gửi mã OTP thành công đến email của quý khách')} className='select-none active:opacity-70'>Lấy  mã OTP</button>
        <button onClick={() => error('Gửi mã xác nhận không thành công', 'Gửi mã OTP không thành công đến email của quý khách')} className='select-none active:opacity-70'>Quên mật khẩu</button>
      </div>

      <div className='flex w-full justify-center mb-3'>
        <Button
          onClick={() => {
            formik.handleSubmit()
          }}
          className='bg-m_red text-white border-m_red px-5 rounded-xl' >
          Đăng nhập
        </Button>
      </div>

      <div className='text-center'>
        Quý khách chưa có tài khoản? Quý khách muốn <button onClick={() => switchSignUp()} className='text-m_red  select-none active:opacity-70'>Đăng ký</button>
      </div>

      <div className='text-center mt-3'>
        <h4>Bằng việc đăng nhập, Quý khách đã đồng ý thực hiện mọi giao dịch theo</h4>
        <button
          className='text-m_red select-none active:opacity-70'>
          Điều khoản sử dụng và Chính sách bảo mật của Simtel</button>
      </div>
    </form>
  )
}

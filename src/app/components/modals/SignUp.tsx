import { Button, Input } from 'antd'
import { FormikErrors, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import MInput from '../config/MInput';

interface Props {
  onCancel: Function,
  switchLogin: Function
}

interface FormValues {
  phone: string,
  mail: string,
  re_mail: string,
  password: string,
  re_password: string,

}



export default function SignUp({ onCancel, switchLogin }: Props) {

  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {}
    if (!values.phone) {
      errors.phone = "Không được để trống trường bắt buộc"
    }
    if (!values.password) {
      errors.password = 'Không được để trống trường bắt buộc'
    }
    if (!values.mail) {
      errors.mail = 'Không được để trống trường bắt buộc'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)) {
      errors.mail = 'Email không đúng định dạng';
    }

    if (!values.re_mail) {
      errors.re_mail = 'Không được để trống trường bắt buộc'
    }
    if (!values.re_password) {
      errors.re_password = 'Không được để trống trường bắt buộc'
    } else if (values.password != values.re_password) {
      errors.re_password = 'Mật khẩu không khớp'
    }

    return errors;
  }


  const formik = useFormik<FormValues>({
    initialValues: {
      phone: '',
      mail: '',
      re_mail: '',
      password: '',
      re_password: '',
    },
    validate,
    //validateOnMount: false,
    validateOnChange: true,
    isInitialValid: false,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
      className='w-full px-16'>
      <h1 className='font-bold text-2xl mb-4 text-center'>Đăng ký tài khoản</h1>

      <MInput
        required
        title='Số điện thoại'
        id='phone'
        name='phone'
        onChange={formik.handleChange}
        error={formik.errors.phone}
        touch={formik.touched.phone}
        onBlur={formik.handleBlur} />

      <div className='h-4' />
      <MInput
        required
        title='Mail nhận OTP'
        id='mail'
        name='mail'
        onChange={formik.handleChange}
        error={formik.errors.mail}
        touch={formik.touched.mail}
        onBlur={formik.handleBlur} />

      <div className='h-4' />

      <MInput
        required
        title='Xác thực mã OTP'
        id='re_mail'
        name='re_mail'
        onChange={formik.handleChange}
        error={formik.errors.re_mail}
        touch={formik.touched.re_mail}
        onBlur={formik.handleBlur}
        action={<button type='button' className='text-m_red active:opacity-70 select-none'>Lấy mã OTP</button>} />

      <div className='h-4' />

      <MInput
        required
        title='Mật khẩu'
        id='password'
        name='password'
        type='password'
        onChange={formik.handleChange}
        error={formik.errors.password}
        touch={formik.touched.password}
        onBlur={formik.handleBlur} />

      <div className='h-4' />
      <MInput
        required
        title='Xác nhận mật khẩu '
        id='re_password'
        name='re_password'
        type='password'
        onChange={formik.handleChange}
        error={formik.errors.re_password}
        touch={formik.touched.re_password}
        onBlur={formik.handleBlur} />

      <div className='h-4' />

      <div className='text-center'>
        Khi nhấn Đăng ký, Quý khách đã đồng ý thực hiện mọi giao dịch theo
      </div>

      <div className='flex justify-center'>
        <button type='button' className='text-center text-m_red active:opacity-70 select-none'>
          Điều khoản sử dụng và Chính sách bảo mật của Simtel
        </button>
      </div>

      <div className='flex justify-center mt-3'>
        <Button htmlType='submit' className='bg-m_red border-m_red px-4 rounded-xl text-white'>
          Đăng ký tài khoản
        </Button>
      </div>

      <div className='flex justify-center mt-3'>Đã có tài khoản? Quý khách muốn&nbsp;
        <button type='button' onClick={() => switchLogin()} className='text-m_red active:opacity-70 select-none'> Đăng nhập?</button>
      </div>

    </form>
  )
}

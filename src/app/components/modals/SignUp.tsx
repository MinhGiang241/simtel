import { Button, Input } from 'antd'
import React from 'react'

interface Props {
  onCancel: Function,
  switchLogin: Function
}

export default function SignUp({ onCancel, switchLogin }: Props) {
  return (
    <div className='w-full px-16'>
      <h1 className='font-bold text-2xl mb-4 text-center'>Đăng ký tài khoản</h1>

      <label htmlFor='phone'>Số đện thọai <span className='text-m_red'>*</span></label>
      <Input id='phone' allowClear />

      <div className='h-4' />

      <label htmlFor='mail'>Mail nhận OTP <span className='text-m_red'>*</span></label>
      <Input id='mail' allowClear />

      <div className='h-4' />

      <div className='flex justify-between'>
        <label htmlFor='re-mail'>Xác thực mã OTP <span className='text-m_red'>*</span></label>
        <button className='text-m_red active:opacity-70 select-none'>Lấy mã OTP</button>
      </div>
      <Input id='re-mail' allowClear />

      <div className='h-4' />


      <label htmlFor='password'>Mật khẩu <span className='text-m_red'>*</span></label>
      <Input id='password' type='password' allowClear />

      <div className='h-4' />

      <label htmlFor='re-password'>Xác nhận mật khẩu <span className='text-m_red'>*</span></label>
      <Input id='re-password' type='password' allowClear />

      <div className='h-4' />

      <div className='text-center'>
        Khi nhấn Đăng ký, Quý khách đã đồng ý thực hiện mọi giao dịch theo
      </div>

      <div className='flex justify-center'>
        <button className='text-center text-m_red active:opacity-70 select-none'>
          Điều khoản sử dụng và Chính sách bảo mật của Simtel
        </button>
      </div>

      <div className='flex justify-center mt-3'>
        <Button className='bg-m_red border-m_red px-4 rounded-xl text-white'>
          Đăng ký tài khoản
        </Button>
      </div>

      <div className='flex justify-center mt-3'>Đã có tài khoản? Quý khách muốn&nbsp;
        <button onClick={() => switchLogin()} className='text-m_red active:opacity-70 select-none'> Đăng nhập?</button>
      </div>

    </div>
  )
}

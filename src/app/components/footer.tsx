import React from 'react'
import './component.module.css'

export default function Footer() {
  return (
    <div className='bg-m_red h-80 flex justify-center footer'>
      <div className='footer w-[160rem] max-w-7xl flex' >
        <div className='w-1/5 h-96'>
          <ul className='text-white'>
            <li>DỊCH VỤ DI ĐỘNG</li>
            <li>Mua sim số</li>
            <li>Mua gói cước</li>
          </ul>
        </div>
        <div className='w-1/5 h-96 '>
          <ul className='text-white'>
            <li>CHÍNH SÁCH</li>
            <li>Chính sách vận chuyển</li>
            <li>Thanh toán</li>
            <li>Điều kiện & Điều khoản giao dịch chung</li>
            <li>Điều khoản cam kết</li>
            <li>Đổi trả</li>
            <li>Chính sách kiểm hàng</li>
          </ul>
        </div>
        <div className='w-1/5 h-96'>
          <ul className='text-white'>
            <li>HỖ TRỢ</li>
            <li>Đăng ký TTTB</li>
            <li>Đổi/cấp lại SIM</li>
            <li>Đổi/cấp lại eSIM</li>
            <li>Liên hệ</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className='w-1/5 h-96'>
          <ul className='text-white'>
            <li>QUY TRÌNH</li>
            <li>Mua bán</li>
            <li>Quản lý chất lượng dịch vụ</li>
            <li>Giấy phép cung cấp dịch vụ viễn thông</li>
          </ul>
        </div>
        <div className='w-1/5 h-96'>
          <h4 className='text-white'>ĐI CÙNG  SIMTELL</h4>
        </div>
      </div>
    </div>
  )
}

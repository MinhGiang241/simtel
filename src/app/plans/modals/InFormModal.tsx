import { RootState } from '@/GlobalRedux/store'
import { Modal } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

interface Props {
  open: boolean
  onOk: () => void,
  onCancel: () => void,
}

export default function InFormModal({ open, onOk, onCancel }: Props) {
  var phone = useSelector((state: RootState) => state.simPack.phone)

  return (
    <Modal width={612} footer={<div />} open={open} onOk={onOk} onCancel={onCancel}>
      <div className='px-10'>
        <div className='flex justify-center mt-1 mb-4'>
          <h4 className='text-2xl font-bold'>Thông báo</h4>
        </div>

        <div className='flex justify-center w-full text-base text-center'>
          <p>
            Hệ thống đã gửi thông báo xác nhận đăng ký gói cước tới thuê bao <span className='font-semibold'>{phone}</span>. Quý khách vui lòng thực hiện xác nhận trên điện thoại để hoàn tất việc đăng ký. Trường hợp quý khách không nhận được thông báo xác nhận gửi về điện thoại, quý khách vui lòng
            <button
              onClick={() => { onOk() }}
              className='text-m_red underline-offset-2 underline active:opacity-60'>
              Đăng nhập tại đây</button> và thực hiện lại.
          </p>
        </div>
      </div>
    </Modal>
  )
}

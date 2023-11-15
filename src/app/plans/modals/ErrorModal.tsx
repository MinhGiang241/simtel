import { Button, Modal } from 'antd'
import React from 'react'
import { CloseCircleFilled } from '@ant-design/icons'

interface Props {
  open: boolean,
  onOk: () => void,
  onCancel: () => void,
  error?: string
}

export default function ErrorModal({ open, onOk, onCancel, error }: Props) {
  return (
    <Modal footer={<div />} width={524} open={open} onOk={onOk} onCancel={onCancel}>
      <div className='px-10'>
        <div className='flex justify-center mt-2 mb-4'>
          <CloseCircleFilled className='text-7xl text-m_orange' />
        </div>
        <div className='flex flex-col text-center'>
          <h4 className='text-base font-bold mb-2'>Đăng ký không thành công !</h4>
          <p>{error ?? "Quý khách đã đăng ký không thành công do đã từ chối xác nhận dịch vụ hoặc đã quá thời gian xác nhận."}</p>
        </div>
        <div className='flex justify-center mt-6'>
          <Button onClick={() => onCancel()} className='border-m_red h-12 w-[115px] text-m_red text-base font-semibold'>Quay lại</Button>
        </div>
      </div>
    </Modal>
  )
}

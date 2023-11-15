'use client'
import React, { useState } from 'react'
import MobileIcon from './icons/mobile.svg'
import DatabaseIcon from './icons/database.svg'
import { RightOutlined, CheckOutlined } from '@ant-design/icons'
import { SimPack } from '@/interfaces/data'
import { FormattedNumber } from 'react-intl'
import { Button, Modal } from 'antd'
import PlanDetailModal from '../modals/PlanDetailModal'
import ConfirmModal from '../modals/ConfirmModal'
import InFormModal from '../modals/InFormModal'
import ErrorModal from '../modals/ErrorModal'
import { pushPathName } from '@/services/routes'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

export default function PlanCard({ simpack }: { simpack: SimPack }) {
  const router = useRouter()
  const dispatch = useDispatch()

  const [open, setOpen] = useState<boolean>(false)
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const [openInform, setOpenInform] = useState<boolean>(false)
  const [openError, setOpenError] = useState<boolean>(false)

  const [type, setType] = useState<number>()
  const [errorString, setErrorString] = useState<string>()

  const handleOk = (t: number) => {
    setType(t)
    setOpen(false)
    setOpenConfirm(true)
  }
  const handleCancel = () => {
    setOpen(false)
  }
  const handleOkConfirm = (isError: boolean, e?: string) => {
    setOpenConfirm(false)
    if (isError) {
      setOpenError(true)
    } else {
      pushPathName(router, dispatch, '/plans/payments')
      //setOpenInform(true)
      setErrorString(e)
    }

  }
  const handleCancelConfirm = () => {
    setOpenConfirm(false)
  }
  const handleOkInform = () => {
    setOpenInform(false)
    setOpenError(true)
  }
  const handleCancelInform = () => {
    setOpenInform(false)
  }

  const handleOkError = () => {
  }
  const handleCancelError = () => {
    setOpenError(false)
  }


  return (
    <div className='bg-m_red h-[420px] w-[359px] mb-8 rounded-2xl border-m_red border-2'>
      <div className='bg-white h-[404px] w-[355px] mt-3 rounded-2xl flex flex-col pt-9 items-center'>
        <div className='flex w-ful justify-center items-center'>
          <p className='text-md font-extrabold'>{simpack.telco?.toUpperCase()} </p>
          <div className='h-4 w-0.5 bg-gray-300 mx-2' /><p className='text-md'>30 ngày</p>
        </div>
        <div className='text-m_red text-3xl text-center font-black mt-2'><FormattedNumber value={(simpack.price ?? 0)} style='currency' currency='VND' /></div>
        <div className='w-[290px] h-0.5 bg-m_gray mx-auto mt-6 mb-8' />
        <div className=''>
          <div className='flex'>
            <CheckOutlined className='mr-4  text-xl' style={{ color: "green" }} />
            <div>3GB tốc độ cao/ngày</div>
          </div>
          <div className='flex my-5'>
            <CheckOutlined className='mr-4  text-xl' style={{ color: "green" }} />
            <div>Miễn phí Data ,Youtube ,TikTok</div>
          </div>
          <div className='flex'>
            <CheckOutlined className='mr-4  text-xl' style={{ color: "green" }} />
            <div>3GB tốc độ cao/ngày</div>
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className='border-m_red bg-m_red text-white w-[164px] text-base font-semibold h-[48px] rounded-lg mt-10'>Đăng ký</Button>
      </div>
      <PlanDetailModal open={open} onOk={handleOk} onCacel={handleCancel} simpack={simpack} />
      <ConfirmModal open={openConfirm} onOk={handleOkConfirm} onCancel={handleCancelConfirm} simpack={simpack} type={type} />
      <InFormModal open={openInform} onOk={handleOkInform} onCancel={handleCancelInform} />
      <ErrorModal open={openError} onOk={handleOkError} onCancel={handleCancelError} error={errorString} />
    </div>
  )
}

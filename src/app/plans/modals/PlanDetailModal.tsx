import { SimPack } from '@/interfaces/data'
import { Button, Divider, Modal, Radio, RadioChangeEvent } from 'antd'
import React, { useState } from 'react'
import { FormattedNumber } from 'react-intl'
import { CheckOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { setSeleted } from '@/GlobalRedux/SimPack/SimPackSlice'

interface Props {
  open: boolean,
  onOk: (type: number) => void,
  onCacel: () => void,
  simpack: SimPack
}

export default function PlanDetailModal({ open, onOk, onCacel, simpack }: Props) {

  const [type, setType] = useState(0);
  const dispatch = useDispatch();

  return (
    <Modal footer={<div />} width={613} open={open} onOk={() => onOk(type)} onCancel={onCacel} >
      <div className='mx-10' >
        <div className='flex justify-center mb-8 mt-1'>
          <h4 className='text-2xl font-bold'>Chi tiết gói cước</h4>
        </div>
        <div className='flex justify-center'>
          <p className='text-base font-bold'>{simpack.telco?.toUpperCase()} </p>
          <div className='h-5 w-0.5 bg-gray-300 mx-2 text-base' />
          <p className='text-md'>30 ngày</p>
        </div>
        <div className='flex justify-center text-4xl font-bold text-m_red'>
          <FormattedNumber value={(simpack.price ?? 0)} style='currency' currency='VND' />
        </div>

        <Divider />
        <div className='mt-7 mb-7'>
          <div className='flex mb-3 items-start'>
            <CheckOutlined className='text-xl mr-2' style={{ color: "green" }} />
            <div className='text-base'>Chu kỳ 6 tháng tặng thêm 1 tháng khuyến mãi, gia hạn tự động.</div>
          </div>
          <div className='flex mb-3 items-start'>
            <CheckOutlined className='text-xl mr-2' style={{ color: "green" }} />
            <div className='text-base'>Truy cập Data 4G không giới hạn dung lượng dùng trên Smartphone/Tablet.</div>
          </div>
          <div className='flex mb-3 items-start'>
            <CheckOutlined className='text-xl mr-2' style={{ color: "green" }} />
            <div className='text-base'>Tại thời điểm gia hạn thất bại, gói cước chờ gia hạn 60 ngày.</div>
          </div>
          <div className='flex items-start'>
            <CheckOutlined className='text-xl mr-2' style={{ color: "green" }} />
            <div className='text-base'>Cam kết sử dụng mạng SimTel trong vòng 24 tháng, kể từ khi đăng ký gói cước thành công.</div>
          </div>
        </div>
        <Divider />
        <div className='text-base font-bold mb-3'>Chọn loại gói cước</div>
        <Radio.Group className='flex' value={type} onChange={(v: RadioChangeEvent) => {
          setType(v.target.value)
        }}>
          <Radio value={0}>
            <h1 className='ml-3'>Gói cước</h1>
          </Radio>
          <div className='flex-1' />
          <Radio value={1}>
            <h1 className='ml-3'>Gói cước kèm sim</h1>
          </Radio>
        </Radio.Group>
        <div className='flex justify-center mt-6'>
          <Button onClick={() => {
            onOk(type)
          }}
            className='bg-m_red text-white w-[165px] h-12 px-3 text-base font-semibold rounded-lg border-m_red'>Mua ngay</Button>
        </div>
      </div>
    </Modal>
  )
}

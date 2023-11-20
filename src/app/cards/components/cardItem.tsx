import React, { useEffect, useState } from 'react'
import { CheckCircleOutlined } from '@ant-design/icons'
import { PhoneCard } from '@/interfaces/data'
import { FormattedNumber } from 'react-intl'


interface Props {
  card: PhoneCard,
  selected?: string,
  onClick: Function
}

export default function CardItem({ card, selected, onClick }: Props) {
  return (
    <div className={`${card._id === selected ? "bg-[#f5f5f5] border border-m_red" : ''} border rounded-lg mx-2 mb-12 relative h-[80px] w-[261px]`}>
      <button className='w-full' onClick={(_) => onClick()}>
        <div className='text-center text-white h-6 bg-m_red w-28 rounded-br-md rounded-tl-md'>
          {card.telco}
        </div>
        {/* <CheckCircleOutlined className='text-4xl absolute top-2 right-3' style={{ color: "green" }} /> */}
        <div className='text-xl justify-center h-5/6 w-full flex items-center font-semibold pb-3 flex-col'>
          <FormattedNumber value={(card.price ?? 0)} style='currency' currency='VND' />
          <div className='line-through text-slate-400 text-sm font-thin w-[88px] h-[20px]'>Giá: 100.000đ</div>
        </div>
      </button>
    </div>
  )
}

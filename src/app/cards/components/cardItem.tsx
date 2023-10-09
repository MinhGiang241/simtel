import React from 'react'
import { CheckCircleOutlined } from '@ant-design/icons'
import { PhoneCard } from '@/interfaces/data'
import { FormattedNumber } from 'react-intl'

interface Props {
  card: PhoneCard
}

export default function CardItem({ card }: Props) {
  return (
    <div className='bg-m_white border border-m_red rounded-lg h-36 mx-2 w-64 mb-12 relative'>
      <div className='text-center text-white h-6 bg-m_red w-28 rounded-br-md rounded-tl-md'>
        {card.telco}
      </div>
      <CheckCircleOutlined className='text-4xl absolute top-2 right-3' style={{ color: "green" }} />
      <div className='text-4xl justify-center h-5/6 w-full flex items-center font-semibold'>
        <FormattedNumber value={(card.price ?? 0)} style='currency' currency='VND' />
      </div>
    </div>

  )
}

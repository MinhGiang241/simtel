import React from 'react'
import ZaloSvg from './logo/zalo.svg'
import FacebookSvg from './logo/facebook.svg'
import { Button } from 'antd'
import { PhoneFilled } from '@ant-design/icons'


export default function SupportWidget() {
  return (
    <div className='bottom-12 right-10 fixed flex flex-col z-50' >
      <Button className='h-fit w-fit bg-blue-600 p-2 rounded-full border-0 border-blue-600 shadow-gray-800 shadow-lg mb-5'>
        <PhoneFilled style={{ color: '#fff', fontSize: '356%' }} />
      </Button>


      <Button className='h-fit w-fit bg-blue-600 p-2 rounded-full mb-5 border-0 border-blue-600 shadow-gray-800 shadow-lg' >

        <FacebookSvg className='text-xl' fill='white' />
      </Button>

      <Button className='h-fit w-fit bg-blue-600 p-2 rounded-full border-0 border-blue-600 shadow-gray-800 shadow-lg '>
        <ZaloSvg className='text-2xl' fill='white' />
      </Button>

    </div>
  )
}

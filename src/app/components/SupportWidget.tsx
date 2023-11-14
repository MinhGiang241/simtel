import React from 'react'
// import ZaloSvg from './logo/zalo.svg'
// import FacebookSvg from './logo/facebook.svg'
import { Button } from 'antd'
// import { PhoneFilled } from '@ant-design/icons'
import Zl from './logo/zl.svg'
import Mss from './logo/mss.svg'
import Tel from './logo/tel.svg'


export default function SupportWidget() {
  return (
    <div className='bottom-12 right-6 fixed flex flex-col z-50' >
      <Mss />
      <Zl />
      <Tel />
      {/* <Button className='h-fit w-fit bg-blue-600 p-2 rounded-full border-0 border-blue-600 shadow-gray-800 shadow-lg mb-5'>
      </Button> */}
      {/* <Button className='h-fit w-fit bg-blue-600 p-2 rounded-full mb-5 border-0 border-blue-600 shadow-gray-800 shadow-lg' >
      </Button> */}
      {/* <Button className='h-fit w-fit bg-blue-600 p-2 rounded-full border-0 border-blue-600 shadow-gray-800 shadow-lg '>
      </Button> */}

    </div>
  )
}

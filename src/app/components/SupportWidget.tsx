import React from 'react'
// import ZaloSvg from './logo/zalo.svg'
// import FacebookSvg from './logo/facebook.svg'
import { Button } from 'antd'
// import { PhoneFilled } from '@ant-design/icons'
import Zl from './logo/zl.svg'
import Mss from './logo/mss.svg'
import Tel from './logo/tel.svg'
import Link from 'next/link'


export default function SupportWidget() {
  return (
    <div className='bottom-0 right-0 fixed flex flex-col z-50' >
      <Link target='_blank' href='https://www.facebook.com/reddichonsodep?locale=vi_VN'><Mss /></Link>
      <Link target='_blank' href='https://zalo.me/g/mnswtd365'><Zl /></Link>
      <Link target='_blank' href='tel:+84559111666'><Tel /></Link>
    </div>
  )
}

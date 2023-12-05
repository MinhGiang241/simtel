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
    <div className='bottom-0 right-0 fixed flex flex-col z-50' >
      <button>
        <Mss />
      </button>
      <button>
        <Zl />
      </button>
      <button>
        <Tel />
      </button>
    </div>
  )
}

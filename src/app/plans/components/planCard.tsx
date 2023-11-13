import React from 'react'
import MobileIcon from './icons/mobile.svg'
import DatabaseIcon from './icons/database.svg'
import { RightOutlined, CheckOutlined } from '@ant-design/icons'
import MLink from '@/app/components/config/Mlink'
import { SimPack } from '@/interfaces/data'
import { FormattedNumber } from 'react-intl'
import { Button } from 'antd'

export default function PlanCard({ simpack }: { simpack: SimPack }) {

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
        <Button className='bg-m_red text-white w-[164px] text-base font-semibold h-[48px] rounded-lg mt-10'>Đăng ký</Button>
      </div>
    </div>
  )
  /**
    return (
      <div className='flex justify-center items-center w-[350px] h-[500px] mx-1 my-1 pb-8'>
        <div className='relative bg-m_red w-[350px] h-[460px] rounded-xl shadow-gray-700 shadow-md'>
          <div className='w-28 h-7 bg-white z-20 rounded-tl-xl rounded-br-xl justify-center flex items-center text-m_red'>
            {simpack.telco}
          </div>
          <div className='w-full flex flex-col items-center'>
            <h1 className='text-6xl font-semibold text-white'>
              <FormattedNumber value={(simpack.price ?? 0)} style='currency' currency='VND' />
            </h1>
            <div className='text-white mt-2 text-xl'>

              <span className='font-semibold'>{simpack.code ?? ''}</span><span>{` | 30 ngày`}</span>
            </div>
          </div>

          <div className='h-64 flex flex-col items-center justify-center absolute bottom-14 w-full bg-white/40'>
            <div className='w-80 h-16 bg-white w-30 rounded-2xl flex  items-center px-3'>
              <DatabaseIcon /> <div className='text-lg ml-1'><span className='font-semibold'>{`${simpack.data_max ?? 0}GB tốc độ cao`}</span>/ngày </div>
            </div>
            <div className='h-6' />
            <div className='w-80 h-16 bg-white w-30 rounded-2xl flex  items-center px-3' >
              <MobileIcon /> <div className='text-lg ml-1'>Miễn phí data <span className='font-semibold'>Youtube, Tiktok</span></div>
            </div>
          </div>

          <div className='flex justify-start h-14 absolute bottom-0 z-20 bg-white rounded-bl-xl rounded-br-xl w-full'>
            <MLink link={`/orders/?pack=true&id=${simpack._id}`} className='flex items-center'>

              <span className='text-xl font-semibold ml-2 text-m_red'>Đăng ký </span> <RightOutlined style={{ color: "#ED1E23", fontSize: '110%' }} />
            </MLink>
          </div>
        </div>
      </div>
      )
      **/
}

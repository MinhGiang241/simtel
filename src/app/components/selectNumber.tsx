import { Input, Select, Space } from 'antd'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import './component.css'
import NumberList from './numberList'
import { RightOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { setPath } from '@/GlobalRedux/path/pathSlice'
import { useDispatch } from 'react-redux'
import { Pagination } from 'antd';
import Man from './logo/bro.svg'
import { FilterOutlined } from '@ant-design/icons';
import Right from './logo/right_img.svg'
import Left from './logo/left_img.svg'
import Shadow from './logo/shadow.svg'

interface Props {
  hideFilter?: boolean
}

export default function SelectNumber({ hideFilter }: Props) {
  const router = useRouter()
  const dispatch = useDispatch()
  const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const branch = ['Vietel', 'Vinaphone', 'Mobiphone', 'Vietnamobile', 'Gmobile', 'Itelecom', 'Wintel']
  const simTypes = ['Sim vật lý', 'eSim']
  const price = ['50.000đ', '100.000đ', '150.000đ']
  const { Option } = Select
  const handleSelectBranch = (v: string[]) => { }

  return (
    <>
      <div className='flex w-full bg-m_red_banner h-96 relative'>
        <Right className="absolute right-0" />
        <Left className="absolute left-[-9] bottom-16" />
        <Shadow className="absolute left-10" />
        <Man className="absolute bottom-0 left-40 w-[579px] h-[464px]" />
        <div className='w-[55%]' />
        <div className='flex flex-col pt-10'>
          <div className='mb-1 text-base text-white'>Nhập số thuê bao mong muốn:</div>
          <div className='flex items-center'>
            <Input placeholder='**** *** ***' className='text-sm h-14 w-96 input-search' allowClear />
            <button className='border border-white h-14 text-white rounded-lg ml-2 p-4'><FilterOutlined className="pr-2" />Bộ lọc</button>
          </div>
          <div className='flex justify-center items-center mt-4 p-4 rounded-lg bg-m_opacity mb-4'>
            <h2 className='text-white'>Loại trừ số:</h2>
            <div className='flex mr-2'>
              {...num.map((i, e) => (<button key={i} className='active:opacity-70 select-none mx-1 text-white rounded-full border-white border-2 px-2 py-2 h-7 w-7 text-center flex justify-center items-center'>{e}</button>))}
            </div>
          </div>
          <div className='text-white text-sm'>● Tìm sim có số 6789 bạn hãy gõ 6789</div>
          <div className='text-white text-sm'>● Tìm sim có đầu 090 đuôi 9999 bạn hãy gõ 090*9999</div>
          <div className='text-white text-sm'>● Tìm sim bắt đầu bằng 0914 đuôi bất kỳ bạn hãy gõ 0914*</div>
          <button className='text-m_red bg-white w-32 rounded-lg p-4 m-auto mt-4'>Tìm kiếm</button>
        </div>
        {/* <div className='flex px-6 w-2/5 h-full justify-between items-center'>
          <div className='flex flex-col justify-center items-center w-4/5'>
            <p className='text-white mt-3'>Điền dấu * chữ số mong muốn</p>
          </div>
          <button className='rounded-xl border-white border-2 h-14 w-14 active:opacity-70'>
            <SearchOutlined style={{ color: 'white', fontSize: '200%' }} />
          </button>
        </div> */}
        {/* <div className='w-3/5 flex h-full items-center' >
        </div> */}
      </div>
      <NumberList />
      <div className='w-full flex justify-center mt-5'>
        <button onClick={() => {
          dispatch(setPath('/sims/'))
          router.push('/sims')
        }} className='select-none active:opacity-70 text-white rounded-lg px-4 py-2 flex justify-center items-center'>
          {/* <p className='text-lg text-center pr-1'>Xem Thêm</p>
          <RightOutlined style={{ color: 'white', fontSize: '110%' }} /> */}
          <Pagination defaultCurrent={1} total={50} />
        </button>
      </div>
    </>
  )
}

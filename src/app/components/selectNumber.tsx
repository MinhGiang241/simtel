import { Input, Select, Space } from 'antd'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import './component.css'
import NumberList from './numberList'
import { RightOutlined } from '@ant-design/icons'

export default function SelectNumber() {
  const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const branch = ['Vietel', 'Vinaphone', 'Mobiphone', 'Vietnamobile', 'Gmobile', 'Itelecom', 'Wintel']
  const simTypes = ['Sim vật lý', 'eSim']
  const { Option } = Select
  const handleSelectBranch = (v: string[]) => { }

  return (
    <>
      <div className='my-12'>
        <div className="flex justify-center" >
          <h2 className="font-bold text-4xl">{'Chọn số'}</h2>
          <h2 className="px-2 text-m_red font-bold text-4xl"> {'mua sim'}</h2>
        </div>
      </div>

      <div className='flex w-full bg-m_red h-40'>
        <div className='flex px-6 w-2/5 h-full justify-between items-center'>
          <div className='flex flex-col justify-center items-center w-4/5'>
            <p className='text-white mb-3'>Nhập số thuê bao mong muốn</p>
            <Input placeholder='*********' className='h-14 w-full input-search' />
            <p className='text-white mt-3'>Điền dấu * chữ số mong muốn</p>
          </div>
          <button className='rounded-xl border-white border-2 h-14 w-14 active:opacity-70'>
            <SearchOutlined style={{ color: 'white', fontSize: '200%' }} />
          </button>
        </div>
        <div className='w-3/5 flex h-full items-center' >
          <div className='flex bg-red-700 w-4/5 h-14 ml-auto mr-9 rounded-md justify-between items-center'>
            <h2 className='text-white ml-2'>Loại trừ số:</h2>
            <div className='flex mr-2'>
              {...num.map((i, e) => (<button key={i} className='active:opacity-70 select-none mx-1 text-white rounded-full border-white border-2 px-2 py-2 h-10 w-10 text-center'>{e}</button>))}
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full h-24 justify-between items-end px-5 mb-10'>
        <h4 className='font-bold'>100.000 số hiện có</h4>
        <div className='w-80 h-14'>
          <label className='mb-2 font-bold' aria-label='branch'>Nhà mạng</label>
          <Select
            aria-label='branch'
            style={{ width: '100%', height: '3rem' }}
            placeholder="select one country"
            defaultValue={['Vietel']}
            onChange={handleSelectBranch}
            optionLabelProp="branch"
          >
            {...branch.map((v) => (
              <Option value={v} key={v} label={v}>
                <Space>
                  {v}
                </Space>
              </Option>
            ))}
          </Select>
        </div>
        <div className='w-80 h-14'>
          <label className='mb-2 font-bold' aria-label='sim'>Loại sim</label>
          <Select
            aria-label='sim'
            style={{ width: '100%', height: '3rem' }}
            placeholder="select one country"
            defaultValue={['Sim vật lý']}
            onChange={handleSelectBranch}
            optionLabelProp="sim"
          >
            {...simTypes.map((v) => (
              <Option value={v} key={v} label={v}>
                <Space>
                  {v}
                </Space>
              </Option>
            ))}
          </Select>
        </div>
      </div >

      <NumberList />

      <div className='w-full flex justify-center mt-5'>
        <button className='select-none active:opacity-70 bg-m_red text-white rounded-lg px-4 py-2 flex justify-center items-center'>
          <p className='text-lg text-center pr-1'>Xem Thêm</p>
          <RightOutlined style={{ color: 'white', fontSize: '110%' }} />
        </button>
      </div>
    </>
  )
}

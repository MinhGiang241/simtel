import React from 'react'
import { FilterOutlined } from '@ant-design/icons'
import { Col, Input, Select } from 'antd'

export default function FilterPlan() {
  return (
    <>
      <div className='flex w-full justify-end'>
        <button className='flex select-none active:opacity-70'>
          <FilterOutlined className='text-xl' style={{ color: '#ED1E23' }} /><h4 className='text-md text-m_red font-bold'>Bộ lọc</h4>
        </button>
      </div>
      <div className='flex w-full justify-evenly items-center h-28 bg-m_gray '>
        <div className='w-80 mx-6 flex flex-col ' >
          <label htmlFor='branch' className='text-lg font-bold'>Nhà mạng</label>
          <Select
            id='branch'
            style={{ height: '3rem' }}
            placeholder='Nhà mạng'
            options={[
              { value: 'mobiphone', label: 'Mobiphone' },
              { value: 'vinaphone', label: 'Vinaphone' },
              { value: 'vietnamobile', label: 'Vietnamobile' },
              { value: 'vietel', label: 'Vietel' },
              { value: 'gmobile', label: 'Gmobile' },
              { value: 'itelecom', label: 'Itelecom' },
              { value: 'wintel', label: 'Wintel' },
            ]}
          />
        </div>

        <div className='w-80 mx-6 flex flex-col' >
          <label htmlFor='type' className='text-lg font-bold'>Loại gói cước</label>
          <Select
            id='type'
            style={{ height: '3rem' }}
            placeholder='Loại gói cước'
            options={[
              { value: 'before', label: 'Trả trước' },
              { value: 'after', label: 'Trả sau' },
            ]}
          />
        </div>

        <div className='w-80 mx-6 flex flex-col' >
          <label htmlFor='price' className='text-lg font-bold'>Sắp xếp theo giá tiền</label>
          <Select
            id='price'
            style={{ height: '3rem' }}
            placeholder='Sắp xếp theo giá tiền'
            options={[
              { value: 'ins', label: 'Từ nhỏ đến lớn' },
              { value: 'des', label: 'Từ lớn đến nhỏ' },
            ]}
          />
        </div>

      </div>
    </>
  )
}

'use client'
import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { useDispatch } from 'react-redux';
import { pushPathName } from '@/services/routes';
import { useRouter } from 'next/navigation';
import { setPath } from '@/GlobalRedux/path/pathSlice';
import { Button, Tooltip, ConfigProvider } from 'antd';
import { title } from 'process';
import { Input, Select, Space } from 'antd'
interface Props {
  hideFilter?: boolean
}


interface DataType {
  id: number;
  number: string;
  branch: string;
  simType: string;
  plan: string;
  price: Object;

}
const rowStyle = { style: { background: '#e2e8f0', fontSize: '17px', fontWeight: 700 } }


const data: DataType[] = [
  {
    id: 1,
    number: "0980352112",
    branch: "Vinaphone",
    simType: "E-SIM",
    price: { 'current': 50000, 'old': 25000 },
    plan: 'Được đăng ký Gói cước MAY 77.000đ siêu ưu đãi 4GB/ngày, miễn phí gọi nội mạng VinaPhone & iTel'
  },
  {
    id: 2,
    number: "0980352112",
    branch: "Vinaphone",
    simType: "E-SIM",
    price: { 'current': 50000, 'old': 25000 },
    plan: 'Được đăng ký Gói cước MAY 77.000đ siêu ưu đãi 4GB/ngày, miễn phí gọi nội mạng VinaPhone & iTel'
  },
  {
    id: 3,
    number: "0980352112",
    branch: "Vinaphone",
    simType: "E-SIM",
    price: { 'current': 50000, 'old': 25000 },
    plan: 'Được đăng ký Gói cước MAY 77.000đ siêu ưu đãi 4GB/ngày, miễn phí gọi nội mạng VinaPhone & iTel'
  },
  {
    id: 4,
    number: "0980352112",
    branch: "Vinaphone",
    simType: "SIM VẬT LÝ",
    price: { 'current': 50000, 'old': 25000 },
    plan: 'Được đăng ký Gói cước MAY 77.000đ siêu ưu đãi 4GB/ngày, miễn phí gọi nội mạng VinaPhone & iTel'
  },

];

export default function NumberList({ hideFilter }: Props) {

  const router = useRouter()
  const dispatch = useDispatch()
  const { Option } = Select
  const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const branch = ['Vietel', 'Vinaphone', 'Mobiphone', 'Vietnamobile', 'Gmobile', 'Itelecom', 'Wintel']
  const simTypes = ['Sim vật lý', 'eSim']
  const price = ['50.000đ', '100.000đ', '150.000đ']
  const handleSelectBranch = (v: string[]) => { }
  const columns: ColumnsType<DataType> = [
    {

      onHeaderCell: (_) => rowStyle,
      title: 'Số điện thoại',
      dataIndex: 'number',
      key: 'number',
      render: (text) => <p key={text} className='font-bold text-md'>{text}</p>,
    },
    {
      onHeaderCell: (_) => rowStyle,
      title: 'Nhà mạng',
      dataIndex: 'branch',
      key: 'branch',
      render: (text) => <div key={text} className='rounded bg-m_red text-white w-20 text-center'>{text}</div>,
    },
    {
      onHeaderCell: (_) => rowStyle,
      title: 'Loại sim',
      dataIndex: 'simType',
      key: 'simType',
      render: (text) => <p key={text}>{text}</p>
    },
    {
      onHeaderCell: (_) => rowStyle,
      title: 'Gói cước',
      key: 'plan',
      dataIndex: 'plan',
      render: (text) => (
        <Tooltip key={text} placement="bottomLeft">
          {/* <p key={text}>Gói cước tự do</p> */}
          <Button title={text}>Gói cước tự do</Button>
        </Tooltip>
      ),
    },
    {
      onHeaderCell: (_) => rowStyle,
      title: 'Giá tiền',
      key: 'price',
      dataIndex: 'price',
      render: ({ current, old }) => {
        return (<TableAction current={current} old={old} />)
      },
    },
  ];


  return (
    <div>
      <div className={`flex justify-between align- items-end ${hideFilter ? 'h-10 mb-4' : 'h-24 mb-10'}`}>
        {!hideFilter && (
          <>
            <div className='flex w-6/12'>
              <div className='w-80 h-14 mr-4'>
                {/* <label className='mb-2 font-bold' aria-label='branch'>Nhà mạng</label> */}
                <Select
                  allowClear
                  aria-label='branch'
                  style={{ width: '100%', height: '3rem' }}
                  placeholder="Chọn nhà mạng"
                  // defaultValue={['Vietel']}
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

              <div className='w-80 h-14 mr-4'>
                {/* <label className='mb-2 font-bold' aria-label='sim'>Loại sim</label> */}
                <Select
                  allowClear
                  aria-label='sim'
                  style={{ width: '100%', height: '3rem' }}
                  placeholder="Chọn loại sim"
                  // defaultValue={['Sim vật lý']}
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

              <div className='w-80 h-14 mr-4'>
                {/* <label className='mb-2 font-bold' aria-label='sim'>Loại sim</label> */}
                <Select
                  allowClear
                  aria-label='sim'
                  style={{ width: '100%', height: '3rem' }}
                  placeholder="Chọn giá tiền"
                  // defaultValue={['Sim vật lý']}
                  onChange={handleSelectBranch}
                  optionLabelProp="sim"
                >
                  {...price.map((v) => (
                    <Option value={v} key={v} label={v}>
                      <Space>
                        {v}
                      </Space>
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </>
        )}
        <h4 className='font-bold'>100.000 số hiện có</h4>
      </div >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={'id'}
        onRow={(_, index: any) => ({
          style: { background: index && index % 2 != 0 && '#e2e8f0', },
        })}
      />
    </div>

  )
}


export function TableAction({ current, old }: { current: number, old: number },) {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <>
      {/* <div>
        <div className={`flex justify-between align- items-end ${hideFilter ? 'h-10 mb-4' : 'h-24 mb-10'}`}>
          {!hideFilter && (
            <>
              <div className='flex w-6/12'>
                <div className='w-80 h-14 mr-4'>
                  <Select
                    allowClear
                    aria-label='branch'
                    style={{ width: '100%', height: '3rem' }}
                    placeholder="Chọn nhà mạng"
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

                <div className='w-80 h-14 mr-4'>
                  <Select
                    allowClear
                    aria-label='sim'
                    style={{ width: '100%', height: '3rem' }}
                    placeholder="Chọn loại sim"
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
                setPage  </Select>
                </div>

                <div className='w-80 h-14 mr-4'>
                  <Select
                    allowClear
                    aria-label='sim'
                    style={{ width: '100%', height: '3rem' }}
                    placeholder="Chọn giá tiền"
                    // defaultValue={['Sim vật lý']}
                    onChange={handleSelectBranch}
                    optionLabelProp="sim"
                  >
                    {...price.map((v) => (
                      <Option value={v} key={v} label={v}>
                        <Space>
                          {v}
                        </Space>
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
            </>
          )}
          <h4 className='font-bold'>100.000 số hiện có</h4>
        </div >
      </div> */}
      <div key={current} className='flex justify-between'>
        <div className='flex flex-col mr-3'>
          <p className='text-lg'>
            {/* {`${current} đ`} */}
            <FormattedNumber value={current} style='currency' currency='VND' />
          </p>
          <p className='line-through'>
            {/* {`${old} đ`} */}
            <FormattedNumber value={old} style='currency' currency='VND' />
          </p>
        </div>
        <button onClick={() => {
          pushPathName(router, dispatch, '/orders')
        }} className='text-lg px-4 rounded-2xl text-m_red bg-white border-m_red border-2 active:opacity-70 select-none'>
          Mua ngay
        </button>
      </div>
    </>

  );

}

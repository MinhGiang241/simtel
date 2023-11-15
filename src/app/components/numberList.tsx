'use client'
import React, { HTMLAttributes, useEffect } from 'react';
import { Table, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FormattedNumber } from 'react-intl'
import { useDispatch } from 'react-redux';
import { pushPathName } from '@/services/routes';
import { useRouter } from 'next/navigation';
import { Button, Tooltip, } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { MoonLoader } from 'react-spinners';

import FilterSim from '../sims/components/FilterSim';
import { getSimFunction } from '@/services/sim/simServices';
interface Props {
  hideFilter?: boolean
  colorHeader?: string,
  colorTextHeader?: string
}

export default function NumberList({ hideFilter, colorHeader, colorTextHeader }: Props) {
  console.log({ colorTextHeader, colorHeader });

  var rowStyle = { style: { background: colorHeader ? colorHeader : '#E50914', fontSize: '17px', fontWeight: 700, color: colorTextHeader ? colorTextHeader : 'white' } }

  const router = useRouter()
  const dispatch = useDispatch()


  const page = useSelector((state: RootState) => state.sim.page)
  const data = useSelector((state: RootState) => state.sim.values)
  const loading = useSelector((state: RootState) => state.sim.loading)
  const count = useSelector((state: RootState) => state.sim.count)
  const type = useSelector((state: RootState) => state.sim.type)
  const telco = useSelector((state: RootState) => state.sim.telco)

  useEffect(() => {
    getSimFunction(dispatch, page, type, telco)
  }, [])

  interface DataType {
    _id?: string,
    createdTime?: string,
    updatedTime?: string,
    msid?: string,
    storteId?: string,
    telco?: string,
    hiddenCode?: string,
    money?: {
      price?: number,
      compare_price?: number,
    },
    seria?: string,
    status?: string,
    desciption?: string,
    highlight?: string[],
    classify?: string,
    type?: string,
  }



  useEffect(() => { }, [data, page])

  const columns: ColumnsType<DataType> = [
    {

      onHeaderCell: (_) => rowStyle,
      title: 'Số điện thoại',
      dataIndex: 'msid',
      key: 'msid',
      render: (text) => <p key={text} className='font-bold text-md'>{text}</p>,
    },
    {
      onHeaderCell: (_) => rowStyle,
      title: 'Nhà mạng',
      dataIndex: 'telco',
      key: 'telco',
      render: (text) => <div key={text} className='rounded bg-m_red text-white w-28 text-center'>{text}</div>,
    },
    {
      onHeaderCell: (_) => rowStyle,
      title: 'Loại sim',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <p key={text}>{text === "Physical" ? "Sim vật lý" : text}</p>
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
      key: 'money',
      dataIndex: 'money',
      render: ({ price, compare_price }) => {
        return (<TableAction current={price} old={compare_price} />)
      },
    },
  ];


  return (
    <div>
      <div className={`flex justify-between align- items-end ${hideFilter ? 'h-10 mb-4' : 'h-24 mb-10'}`}>
        {!hideFilter && (< FilterSim />
        )}
        <h4 className='font-bold'>{count} số hiện có</h4>
      </div >
      {loading ? <div className='h-80 w-full flex justify-center items-center'><MoonLoader color='#E50914' /></div> :
        (<Table
          bordered={false}
          columns={columns}
          dataSource={data.map<DataType>(v => ({ ...v, money: { price: v.price, compare_price: v.compare_price } }))}
          pagination={false}
          rowKey={'id'}
          onRow={(_, index: any) => ({
            style: { background: index % 2 != 0 && '#e2e8f0', },
          } as HTMLAttributes<any>)}
        />)}
    </div>
  )
}


export function TableAction({ current, old }: { current: number, old: number },) {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <>
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

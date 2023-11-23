'use client'
import React, { HTMLAttributes, useEffect } from 'react';
import { Space, Table, } from 'antd';
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
import Viettel from "../cards/logo/viettel.svg"
import Vinaphone from '../cards/logo/vinaphone.svg'
import Mobifone from '../cards/logo/mobifone.svg'
import Wintel from '../cards/logo/wintel.svg'
import Vietnamobile from '../cards/logo/vietnamobile.svg'
import Mobile from '../cards/logo/mobile.svg'
import { setSimSelected } from '@/GlobalRedux/Sim/SimSlice';
import { Sim, SimPack } from '@/interfaces/data';

const getImageTelco = (telco: string) => {
  switch (telco) {
    case 'Viettel':
      return ((<Viettel className='scale-[0.8]' />))
    case 'Vinaphone':
      return ((<Vinaphone className='scale-[0.8]' />))
    case 'Mobifone':
      return ((<Mobifone className='scale-[0.8]' />))
    case 'Itelecom':
      return ((<img src="/images/itelecom.png" alt="#" width={60} height={20} />))
    case 'Itel':
      return ((<img src="/images/itelecom.png" alt="#" width={60} height={20} />))
    case 'Gmobile':
      return ((<Mobile className='scale-[0.8]' />))
    case 'Vietnamobile':
      return ((<Vietnamobile className='scale-[0.8]' />))
    case 'Wintel':
      return ((<Wintel className='scale-[0.8]' />))
    default:
      return (<div className='flex w-full justify-center'></div>)
  }
}

interface Props {
  hideFilter?: boolean
  colorHeader?: string,
  colorTextHeader?: string
}


export default function NumberList({ hideFilter, }: Props) {

  var rowStyle = { style: { background: '#E50914', fontSize: '17px', fontWeight: 700, color: 'white' } }

  const router = useRouter()
  const dispatch = useDispatch()


  const page = useSelector((state: RootState) => state.sim.page)
  const data = useSelector((state: RootState) => state.sim.values)
  const loading = useSelector((state: RootState) => state.sim.loading)
  const count = useSelector((state: RootState) => state.sim.count)
  const type = useSelector((state: RootState) => state.sim.type)
  const telco = useSelector((state: RootState) => state.sim.telco)

  useEffect(() => {
    getSimFunction(dispatch, page, type, telco, false)
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
    description?: string,
    highlight?: string[],
    classify?: string,
    type?: string,
    sim?: Sim,
    simpack?: SimPack
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
      render: (text) => <div key={text} className=''>{getImageTelco(text)}</div>,
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
      key: 'simpack',
      dataIndex: 'simpack',
      render: (sp) => (
        <Space key={sp._id} wrap>
          <Tooltip color='#FFF' title={sp?.description?.replaceAll("\n", ' ,')} placement="bottomLeft">
            {/* <p key={text}>Gói cước tự do</p> */}
            <Button title={sp._id}>{sp?.code ? sp?.code : 'Gói cước tự do'}</Button>
          </Tooltip>
        </Space>
      ),
    },
    {
      onHeaderCell: (_) => rowStyle,
      title: 'Giá tiền',
      key: 'sim',
      dataIndex: 'sim',
      render: (v) => {
        return (<TableAction current={v.price} old={v.compare_price} sim={v} />)
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
          dataSource={data.map<DataType>(v => ({ ...v, money: { price: v.price, compare_price: v.compare_price }, sim: v, simpack: v.sp }))}
          pagination={false}
          rowKey={'id'}
          onRow={(_, index: any) => ({
            style: { background: index % 2 != 0 ? '#EDF2F7' : 'background: #F8FAFC', },
          } as HTMLAttributes<any>)}
        />)}
    </div>
  )
}


export function TableAction({ current, old, sim }: { current: number, old: number, sim: Sim },) {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <>
      <div key={current} className='flex justify-between items-center'>
        <div className='flex flex-col mr-3'>
          <p className='text-lg font-bold text-m_red'>
            <FormattedNumber value={current} style='currency' currency='VND' />
          </p>
          {old && <p className='line-through text-base'>
            <FormattedNumber value={old} style='currency' currency='VND' />
          </p>}
        </div>
        <Button onClick={() => {
          dispatch(setSimSelected(sim))
          pushPathName(router, dispatch, '/sims/payments')
        }} className='w-[95px] h-7 text-sm font-semibold rounded-xs text-m_red bg-white border-m_red border'>
          Mua ngay
        </Button>
      </div>
    </>

  );

}

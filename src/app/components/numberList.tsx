import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';



interface DataType {
  id: number;
  number: string;
  branch: string;
  simType: string;
  plan: string;
  price: Object;

}
const rowStyle = { style: { background: '#e2e8f0', fontSize: '17px', fontWeight: 700 } }

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
      <p key={text}>{text}</p>
    ),
  },
  {
    onHeaderCell: (_) => rowStyle,
    title: 'Giá tiền',
    key: 'price',
    dataIndex: 'price',
    render: ({ current, old }) => (
      <div key={current} className='flex'>
        <div className='flex flex-col mr-3'>
          <p className='text-lg'>{`${current} đ`}</p>
          <p className='line-through'>{`${old} đ`}</p>
        </div>
        <button className='text-lg px-4 rounded-2xl text-m_red bg-white border-m_red border-2 active:opacity-70 select-none'>
          Mua ngay
        </button>
      </div>
    ),
  },
];

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


export default function NumberList() {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey={'id'}
      onRow={(_, index: any) => ({
        style: { background: index && index % 2 != 0 && '#e2e8f0', }
      })}
    />

  )
}

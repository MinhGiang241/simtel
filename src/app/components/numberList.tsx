import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';



interface DataType {
  key: number;
  number: string;
  branch: string;
  simType: string;
  plan: string;
  price: Object;

}

const columns: ColumnsType<DataType> = [
  {
    title: 'Số điện thoại',
    dataIndex: 'number',
    key: 'number',
    render: (text) => <p key={text} className='font-bold'>{text}</p>,
  },
  {
    title: 'Nhà mạng',
    dataIndex: 'branch',
    key: 'branch',
    render: (text) => <div key={text} className='rounded bg-m_red text-white w-20 text-center'>{text}</div>,
  },
  {
    title: 'Loại sim',
    dataIndex: 'simType',
    key: 'simType',
    render: (text) => <p key={text}>{text}</p>
  },
  {
    title: 'Gói cước',
    key: 'plan',
    dataIndex: 'plan',
    render: (text) => (
      <p key={text}>{text}</p>
    ),
  },
  {
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
    key: 1,
    number: "0980352112",
    branch: "Vinaphone",
    simType: "E-SIM",
    price: { 'current': 50000, 'old': 25000 },
    plan: 'Được đăng ký Gói cước MAY 77.000đ siêu ưu đãi 4GB/ngày, miễn phí gọi nội mạng VinaPhone & iTel'
  },
  {
    key: 2,
    number: "0980352112",
    branch: "Vinaphone",
    simType: "E-SIM",
    price: { 'current': 50000, 'old': 25000 },
    plan: 'Được đăng ký Gói cước MAY 77.000đ siêu ưu đãi 4GB/ngày, miễn phí gọi nội mạng VinaPhone & iTel'
  },
  {
    key: 3,
    number: "0980352112",
    branch: "Vinaphone",
    simType: "E-SIM",
    price: { 'current': 50000, 'old': 25000 },
    plan: 'Được đăng ký Gói cước MAY 77.000đ siêu ưu đãi 4GB/ngày, miễn phí gọi nội mạng VinaPhone & iTel'
  },
  {
    key: 4,
    number: "0980352112",
    branch: "Vinaphone",
    simType: "SIM VẬT LÝ",
    price: { 'current': 50000, 'old': 25000 },
    plan: 'Được đăng ký Gói cước MAY 77.000đ siêu ưu đãi 4GB/ngày, miễn phí gọi nội mạng VinaPhone & iTel'
  },

];


export default function NumberList() {
  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )
}

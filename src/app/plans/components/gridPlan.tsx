'use client'
import React, { useEffect, useState } from 'react'
import PlanCard from './planCard'

import { getAllSimpack } from '@/services/api/simPackApi';
import toast from 'react-hot-toast';
import { SimPack } from '@/interfaces/data';
import { Pagination } from 'antd';

export default function GridPlan() {
  const [data, setData] = useState<Array<SimPack>>([]);
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllSimpack('data_max', 9, (page - 1) * 9).then((v) => {
      setData([])
      if (v && v.list.length > 0) {
        setData(v.list)
        setCount(v.count)
      }
      setLoading(false)
    }).catch((e) => {
      toast.error(e);
      setLoading(false)
    })
  }, [page])
  console.log('data', data);



  return (
    <>
      <div className='flex flex-wrap mt-4 justify-between'>
        {data.map((item, index) => <PlanCard key={index} simpack={item} />)}
      </div>
      <div className='w-full flex justify-center mb-14'>
        <Pagination size="default" total={count} showQuickJumper pageSize={9} showSizeChanger={false} onChange={(v) => {
          setPage(v)
          console.log(v);
        }} />
      </div>
    </>
  )
}

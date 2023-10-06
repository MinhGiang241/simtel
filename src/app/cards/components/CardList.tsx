'use client'
import React, { useEffect, useState } from 'react'
import CardItem from './cardItem'
import { PhoneCard } from '@/interfaces/data'
import { getAllPhoneCard } from '@/services/api/simPackApi'
import toast from 'react-hot-toast'
import { Pagination } from 'antd';

export default function CardList() {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [data, setData] = useState<Array<PhoneCard>>([])

  useEffect(() => {
    setLoading(true)
    getAllPhoneCard('createdTime', 8, (page - 1) * 8).then((v) => {
      setLoading(false)
      if (v && v.list.length > 0) {
        setData(v.list)
        setCount(v.count)
      }
    }).catch((e) => {
      setLoading(false)
      toast.error(e)
    })
  }, [page])

  return (
    <>
      <div className='flex flex-wrap justify-between'>
        {data.map((item, index) => (<CardItem key={index} card={item} />))}
      </div>
      <div className='w-full flex justify-center mb-14'>
        <Pagination size="default" total={count} showQuickJumper pageSize={9} showSizeChanger={false} onChange={(v) => {
          setPage(v)
        }} />
      </div>

    </>
  )
}

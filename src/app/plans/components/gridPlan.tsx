'use client'
import React, { useEffect } from 'react'
import PlanCard from './planCard'

import { getAllSimpack } from '@/services/api/simPackApi';

import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { getList, setCount, setLoading, setPage } from '@/GlobalRedux/SimPack/SimPackSlice';
import { useDispatch } from 'react-redux';
import { error } from '@/app/components/modals/CustomToast';
import { MoonLoader } from 'react-spinners';

export default function GridPlan() {
  var simPacKList = useSelector((state: RootState) => state.simPack.value)
  var count = useSelector((state: RootState) => state.simPack.count)
  var page = useSelector((state: RootState) => state.simPack.page)
  var loading = useSelector((state: RootState) => state.simPack.loading)
  var telco = useSelector((state: RootState) => state.simPack.telco)
  var type = useSelector((state: RootState) => state.simPack.type)
  var sortBy = useSelector((state: RootState) => state.simPack.sortBy)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true))
    getAllSimpack(9, (!page ? 0 : (page - 1)) * 9, telco, type, sortBy).then((v) => {

      if (v && v.list.length > 0) {
        dispatch(getList(v.list))
        dispatch(setCount(v.count))
      } else {
        dispatch(getList([]))
        dispatch(setCount(0))
      }
      dispatch(setLoading(false))
    }).catch((e) => {
      error("Lỗi", e);
      dispatch(setLoading(false))
    })


  }, [page])


  return (
    <>{loading ? <div className='h-80 w-full flex justify-center items-center'><MoonLoader color='#E50914' /></div> :
      (<>
        <div className='flex flex-wrap mt-4 justify-between'>
          {simPacKList.map((item, index) => <PlanCard key={index} simpack={item} />)}
        </div>
        <div className='w-full flex justify-center mb-14'>
          <Pagination current={page} size="default" total={count} showQuickJumper pageSize={9} showSizeChanger={false} onChange={(v) => {
            dispatch(setPage(v))
          }} />
        </div>
      </>
      )
    }

    </>
  )
}

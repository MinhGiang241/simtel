'use client'
import { Input, Select, } from 'antd'
import React, { useState } from 'react'
import './component.css'
import NumberList from './numberList'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { Pagination } from 'antd';
import Man from './logo/bro.svg'
import { FilterOutlined } from '@ant-design/icons';
import Right from './logo/right_img.svg'
import Left from './logo/left_img.svg'
import Shadow from './logo/shadow.svg'
import PageWrapper from './pageWrapper'
import { useSelector } from 'react-redux'
import { RootState } from '@/GlobalRedux/store'
import { setSimPage } from '@/GlobalRedux/Sim/SimSlice'
import { getSimFunction } from '@/services/sim/simServices'
import { Button, Modal } from 'antd';


interface Props {
  hideFilter?: boolean,
  isHome?: boolean,
}

export default function SelectNumber({ hideFilter, isHome = false }: Props) {
  const router = useRouter()
  const dispatch = useDispatch()
  const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const page = useSelector((state: RootState) => state.sim.page)
  const loading = useSelector((state: RootState) => state.sim.loading)
  const count = useSelector((state: RootState) => state.sim.count)
  const type = useSelector((state: RootState) => state.sim.type)
  const telco = useSelector((state: RootState) => state.sim.telco)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string>()
  const [selectedCard, setSelectedCard] = useState<string>()

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const itemRender = (index: number, type: "page" | "next" | "prev" | "jump-prev" | "jump-next", originalElement: React.ReactNode) => {
    if (type === "next") {
      return <div>
        <RightOutlined />
      </div>;
    }
    if (type === "prev") {
      return <div>
        <LeftOutlined />
      </div>;
    }
    if (type === 'page') {
      return (
        <div
          className={page === index ? `bg-m_red text-white rounded-sm` : `bg-m_gray text-black border border-m_gray rounded-sm`} >
          <p>{index}</p>
        </div>)
    }
    return originalElement;
  };

  var telcoImages = [
    {
      key: 1,
      value: "Viettel"
    },
    {
      key: 2,
      value: "Vinaphone"
    },
    {
      key: 3,
      value: "Mobifone"
    },
    {
      key: 4,
      value: "Itelecom"
    },
    {
      key: 5,
      value: "Gmobile"
    },
    {
      key: 6,
      value: "Vietnamobile"
    },
    {
      key: 7,
      value: "Wintel"
    },
  ]

  var simCard = [
    {
      key: 1,
      value: "Sim data"
    },
    {
      key: 2,
      value: "sim thường kèm cước"
    },
    {
      key: 3,
      value: "Sim số đẹp"
    },
    {
      key: 4,
      value: "Sim thường không kèm cước"
    },
  ]

  return (
    <>
      <div className='flex w-full bg-m_red_banner h-96 relative'>
        <Right className="absolute right-0" />
        <Left className="absolute left-[-9] bottom-16" />
        <Shadow className="absolute left-10" />
        <Man className="absolute bottom-0 left-40 w-[579px] h-[464px] hidden sm:flex" />
        <div className='sm:w-[55%] pr-3' />
        <div className='flex flex-col pt-10'>
          <div className='mb-1 text-base text-white'>Nhập số thuê bao mong muốn:</div>
          <div className='flex items-center'>
            <Input placeholder='**** *** ***' className='text-sm sm:h-14 sm:w-96 w-[291px] h-[40px] input-search' allowClear />
            <Button onClick={showModal} className='bg-transparent border border-white sm:h-14 h-[40px] flex items-center text-white rounded-lg ml-2 p-4'><FilterOutlined className="pr-2" />Bộ lọc</Button >
            <Modal className='h-[400px]' title="Bộ lọc" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
              <div className='mb-5'>
                <div className='mb-2'>Nhà mạng</div>
                <div>
                  {telcoImages?.map((x, key) => (
                    <button onClick={() => setSelected(x.value)} key={key} className={`${selected == x.value ? "bg-[#f5f5f5] border border-m_red" : ""} border p-2 rounded-3xl px-4 mr-4`}>{x.value}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className='mb-2'>Loại sim</div>
                <div>
                  {simCard?.map((e, k) => (
                    <button onClick={() => setSelectedCard(e.value)} key={k} className={`${selectedCard == e.value ? "bg-[#f5f5f5] border border-m_red" : ""}  border p-2 rounded-3xl px-4 mr-4`}>Sim Data</button>
                  ))}
                </div>
              </div>
            </Modal>
          </div>
          <div className='flex justify-center items-center mt-4 p-4 rounded-lg bg-m_opacity mb-4 w-[343px] h-[36px]'>
            <h2 className='text-white'>Loại trừ:</h2>
            <div className='flex mr-2'>
              {...num.map((i, e) => (<button key={e} className='active:opacity-70 select-none mx-1 text-white rounded-full border-white border-2 px-2 py-2 h-7 w-7 text-center flex justify-center items-center'>{i}</button>))}
            </div>
          </div>
          <div className='text-white text-sm'>● Tìm sim có số 6789 bạn hãy gõ 6789</div>
          <div className='text-white text-sm'>● Tìm sim có đầu 090 đuôi 9999 bạn hãy gõ 090*9999</div>
          <div className='text-white text-sm'>● Tìm sim bắt đầu bằng 0914 đuôi bất kỳ bạn hãy gõ 0914*</div>
          <button className='text-m_red bg-white w-32 rounded-lg p-4 m-auto mt-4'>Tìm kiếm</button>
        </div>
      </div>
      <PageWrapper isTopPadding={false}>
        <NumberList colorHeader={isHome ? '#FFB85C' : undefined} colorTextHeader={isHome ? 'black' : undefined} />
      </PageWrapper>
      <div className='w-full flex justify-center mt-5'>
        <Pagination
          itemRender={itemRender}
          defaultCurrent={page}
          total={count}
          size="default"
          pageSize={10}
          showSizeChanger={false}
          onChange={(i, __) => {
            dispatch(setSimPage(i))
            getSimFunction(dispatch, i, type, telco, false)
          }}
        />
      </div>
    </>
  )
}

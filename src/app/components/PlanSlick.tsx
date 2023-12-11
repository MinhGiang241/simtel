import { Button } from "antd"
import ConfirmModal from "../plans/modals/ConfirmModal"
import PlanDetailModal from "../plans/modals/PlanDetailModal"
import { pushPathName } from "@/services/routes"
import { SimPack } from "@/interfaces/data"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { useState } from "react"
import Image from 'next/image'
import { useSwiperSlide } from 'swiper/react';
import { FormattedNumber } from "react-intl"
import { setSeleted, setSeletedType } from "@/GlobalRedux/SimPack/SimPackSlice"

interface Props {
  urlImage: string,
  branch: string,
  name: string,
  describle: string,
  price: number,
  id: string,
  simpack: SimPack,

}

export default function PlanSlick({ urlImage, branch, name, describle, price, id, simpack, }: Props) {

  const swiperSlide = useSwiperSlide();
  const router = useRouter()
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const [type, setType] = useState<number>()

  const handleOk = (t: number, simpack: SimPack) => {
    setType(t)
    setOpen(false)
    if (t === 1) {
      dispatch(setSeleted(simpack))
      dispatch(setSeletedType(1))
      pushPathName(router, dispatch, "/plans/payments")
    } else {
      setOpenConfirm(true)
    }
  }
  const handleCancel = () => {
    setOpen(false)
  }
  const handleOkConfirm = (isError: boolean, e?: string) => {
    setOpenConfirm(false)
    if (isError) {
      //setOpenError(true)
    } else {
      pushPathName(router, dispatch, '/plans/payments')
      //setOpenInform(true)
      // setErrorString(e)
    }

  }
  const handleCancelConfirm = () => {
    setOpenConfirm(false)
  }


  return (
    <div className=" w-full flex justify-center" key={id}>
      <div className={`${swiperSlide.isActive ? `scale-x-100` : ``} w-[307px] h-[550px] mt-14`}>
        {/* <div className='left-4 w-28 h-8 bg-white z-20 translate-y-8 rounded-tl-xl rounded-br-xl justify-center flex items-center text-m_red'>
          {branch}
        </div> */}
        <div className='top-0 rounded-xl shadow-gray-700 shadow-md w-[307.35px] h-[435.84px]'>
          <Image loading="lazy" className='rounded-t-xl z-0' alt='plan' src={urlImage} width={398} height={400} />
          <div className='pt-4 px-4 h-[110px] -translate-y-8 bg-white'>
            <div className='flex justify-between mb-3 border-b pb-3' >
              <div className="flex flex-col ">
                <p className='font-bold text-[17px]'>{name}</p>
                <div className="font-normal text-[12px] h-6 w-40 text-ellipsis overflow-hidden whitespace-nowrap">{describle?.replaceAll('\n', ' ,')}</div>
              </div>
              <div className='flex items-center mt-5'>
                {/* <Button className='font-bold text-m_red bg-white border-none p-0' type="primary" onClick={() => setOpen(true)}>
                  Xem chi tiết
                </Button> */}
                <u className="font-normal cursor-pointer" onClick={() => setOpen(true)}>
                  Chi tiết
                </u>
              </div>
            </div>
            {/*   <div>{describle}</div> */}

            <div className='flex justify-between items-center mt-8 rounded-b-xl'>
              {/* <p className='ml-1 font-bold'>{`${price} đ`}</p> */}
              <div className='ml-1 font-bold text-m_red text-[21px] leading-[27px]'>
                <FormattedNumber value={(price ?? 0)} style='currency' currency='VND' />
              </div>
              <button
                onClick={() => {
                  setOpen(true)
                }}
                className='bg-m_red text-white font-semibold text-[14px] leading-5 select-none active:opacity-70 w-[102px] h-[35px] rounded-md'>
                Đăng ký
              </button>

            </div>
          </div>
        </div>
      </div >
      <PlanDetailModal open={open} onOk={handleOk} onCacel={handleCancel} simpack={simpack} />
      <ConfirmModal open={openConfirm} onOk={handleOkConfirm} onCancel={handleCancelConfirm} simpack={simpack} type={type} />

    </div>)

}

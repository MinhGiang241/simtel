import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './component.css'
import Image from 'next/image'
import { TagOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { setPath } from '@/GlobalRedux/path/pathSlice';
import { useState } from "react";
import useSWR from "swr";
import { apiGraphql } from "@/constants/apiConstant";
import { getAllSimpack } from "@/services/api/simPackApi";
import { SimPack } from "@/interfaces/data";
import MLink from "./config/Mlink";
import { Button, Modal } from 'antd';

export default function PlanList() {

  const settings = {
    centerMode: true,
    className: "center",
    centerPadding: '30px',
    slidesToShow: 3,
    focusOnSelect: true,
    dots: false,
    infinite: true,
    arrows: true,
    // responsive: [
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       arrows: false,
    //       centerMode: true,
    //       centerPadding: '40px',
    //       slidesToShow: 1
    //     }
    //   },
    // ]
  };

  const { data, isLoading } = useSWR(
    apiGraphql,
    async () => {
      return await getAllSimpack(10, 0,)
    }
  )


  const dispatch = useDispatch()
  return (
    <div className='mt-5'>
      <div className='w-full flex justify-self-end font-bold text-m_red '>
        <div className='flex-grow' />
        <Link onClick={() => dispatch(setPath('/plans/'))} href='/plans' className='mr-6'>
          Xem tất cả
        </Link>
      </div>
      {
        isLoading ? (<div>Loading ...</div>) : (
          <Slider {...settings}>

            {isLoading ? [] : data['list'].map((item: SimPack) => (<Plan
              key={item._id}
              id={item._id}
              urlImage={`/images/plan${Math.floor(Math.random() * 3) + 1}.jpg`}
              name={item.code ?? ''}
              branch={item?.telco ?? ''}
              price={item?.price ?? 0}
              describle={item?.desciption ?? ''} />))}

            {/* <Plan urlImage='/images/plan1.jpg' branch='Vietel' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' /> */}
            {/* <Plan urlImage='/images/plan2.jpg' branch='Vinaphone' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' /> */}
            {/* <Plan urlImage='/images/plan3.jpg' branch='Mobiphone' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' /> */}
            {/* <Plan urlImage='/images/plan4.jpg' branch='Vietel' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' /> */}
            {/* <Plan urlImage='/images/plan2.jpg' branch='Vinaphone' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' /> */}
            {/* <Plan urlImage='/images/plan3.jpg' branch='Mobiphone' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' /> */}
            {/* <Plan urlImage='/images/plan4.jpg' branch='Wintel' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' /> */}

          </Slider>


        )
      }
    </div>
  )
}

interface Props {
  urlImage: string,
  branch: string,
  name: string,
  describle: string,
  price: number,
  id: string,
}

function Plan({ urlImage, branch, name, describle, price, id }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-full flex justify-center">
      <div className='w-[307px] h-[550px]'>
        <div className='left-4 w-28 h-8 bg-white z-20 translate-y-8 rounded-tl-xl rounded-br-xl justify-center flex items-center text-m_red'>
          {branch}
        </div>
        <div className='top-0 rounded-xl shadow-gray-700 shadow-md w-[307.35px] h-[435.84px] scale-100'>
          <Image className='rounded-t-xl z-0' alt='plan' src={urlImage} width={398} height={400} />
          <div className='pt-4 px-4 h-[110px] -translate-y-8 rounded-tl-[40px] z-20 bg-white'>
            <div className='flex justify-between mb-3' >
              <div className="flex flex-col">
                <p className='font-bold text-2xl '>{name}</p>
                <div className="text-sm">1GB/đến 24h ngày đăng ký...</div>
              </div>
              <div className='flex items-center'>
                <Button className='font-bold text-m_red bg-white border-none p-0' type="primary" onClick={showModal}>
                  Xem chi tiết
                </Button>
                <Modal title="Chi tiết gói cước" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <div className="flex justify-center items-center">
                    <div>VIETTEL99</div>
                    <div>210 ngày</div>
                  </div>
                  <div className="flex justify-center">360.000đ</div>
                  <div>Some contents...</div>
                </Modal>
              </div>
            </div>
            <div>{describle}</div>

            <div className='flex justify-between items-center mt-8 rounded-b-xl'>
              {/* <p className='font-bold text-m_red'></p> */}
              {/* <TagOutlined style={{ fontSize: "150%" }} /> */}
              <p className='ml-1 font-bold'>{`${price} đ`}</p>
              <MLink link={`/orders/?pack=true&id=${id}`} className='bg-m_red text-white font-bold select-none active:opacity-70 px-4 py-2 rounded-md'>
                Đăng ký
              </MLink>
            </div>
          </div>
        </div>
      </div >
    </div>)

}

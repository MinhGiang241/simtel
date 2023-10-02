import React, { CSSProperties, MouseEventHandler } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './component.css'
import Image from 'next/image'
import { TagOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { setPath } from '@/GlobalRedux/path/pathSlice';

export default function PlanList() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

  };

  const dispatch = useDispatch()
  return (
    <div className='mt-3'>
      <div className='w-full flex justify-self-end font-bold text-m_red '>
        <div className='flex-grow' />
        <Link onClick={() => dispatch(setPath('/plans/'))} href='/plans' className='mr-6'>
          Xem tất cả
        </Link>
      </div>
      <Slider {...settings}>
        <Plan urlImage='/images/plan1.jpg' branch='Vietel' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' />
        <Plan urlImage='/images/plan2.jpg' branch='Vinaphone' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' />
        <Plan urlImage='/images/plan3.jpg' branch='Mobiphone' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' />
        <Plan urlImage='/images/plan4.jpg' branch='Vietel' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' />
        <Plan urlImage='/images/plan2.jpg' branch='Vinaphone' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' />
        <Plan urlImage='/images/plan3.jpg' branch='Mobiphone' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' />
        <Plan urlImage='/images/plan4.jpg' branch='Wintel' name="ST5K" price={5000} describle='500MB/đến 24h ngày đăng ký' />
      </Slider>
    </div>
  )
}

interface Props {
  urlImage: string,
  branch: string,
  name: string,
  describle: string,
  price: number,
}

function Plan({ urlImage, branch, name, describle, price }: Props) {
  return (
    <div className='w-[430px] h-[525px] '>
      <div className='mx-8 left-4 w-28 h-8 bg-white z-20 translate-y-8 rounded-tl-xl rounded-br-xl justify-center flex items-center text-m_red'>
        {branch}
      </div>
      <div className='top-0 mx-8 rounded-xl shadow-gray-700 shadow-md'>
        <Image className='rounded-t-xl z-0' alt='plan' src={urlImage} width={398} height={400} />
        <div className='pt-4 px-4 h-[110px] -translate-y-8 rounded-tl-[40px] z-20 bg-white'>
          <div className='flex justify-between ' >
            <p className='font-bold text-2xl '>{name}</p>
            <div className='flex items-center'>
              <TagOutlined style={{ fontSize: "150%" }} />
              <p className='ml-1 font-bold'>{`${price} đ`}</p>
            </div>
          </div>
          <div>{describle}</div>

          <div className='flex justify-between items-center mt-4 rounded-b-xl'>
            <p className='font-bold text-m_red'>Xem chi tiết</p>
            <button className='bg-m_red text-white font-bold select-none active:opacity-70 px-4 py-2 rounded-md'>
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div >)

}

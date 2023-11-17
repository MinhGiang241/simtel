"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './component.css'
import Image from 'next/image'
import { TagOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { setPath } from '@/GlobalRedux/path/pathSlice';
import useSWR from "swr";
import { apiGraphql } from "@/constants/apiConstant";
import { getAllSimpack } from "@/services/api/simPackApi";
import { SimPack } from "@/interfaces/data";
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import PlanSlick from "./PlanSlick";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'
import { useSwiper } from 'swiper/react';

register();
export default function PlanList() {
  const swiper = useSwiper();

  const { data, isLoading } = useSWR(
    apiGraphql,
    async () => {
      return await getAllSimpack(10, 0,)
    }
  )


  const dispatch = useDispatch()
  return (
    <div className='mt-5 w-[1140px]'>
      <div className='w-full flex justify-self-end font-bold text-m_red relative'>
        <div className='flex-grow' />
        <Link onClick={() => dispatch(setPath('/plans/'))} href='/plans' className='mr-6'>
          Xem tất cả
        </Link>
      </div>
      {
        isLoading ? (<div>Loading ...</div>) : (
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation
            centeredSlides
            loop
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}

          >
            {isLoading ? [] : data['list'].map((item: SimPack) =>
            (<SwiperSlide key={item._id}>
              <PlanSlick
                simpack={item}
                key={item._id}
                id={item._id}
                urlImage={`/images/plan${Math.floor(Math.random() * 3) + 1}.jpg`}
                name={item.code ?? ''}
                branch={item?.telco ?? ''}
                price={item?.price ?? 0}
                describle={item?.desciption ?? ''} />
            </SwiperSlide>
            )

            )}
          </Swiper>

        )
      }
    </div>
  )
}



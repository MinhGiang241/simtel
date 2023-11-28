"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./component.css";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { setPath } from "@/GlobalRedux/path/pathSlice";
import useSWR from "swr";
import { apiGraphql } from "@/constants/apiConstant";
import { getAllSimpack } from "@/services/api/simPackApi";
import { SimPack } from "@/interfaces/data";
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import PlanSlick from "./PlanSlick";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { uploadUrl } from "@/constants/apiConstant";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useSwiper } from "swiper/react";
import { MoonLoader } from "react-spinners";
import { simPackPageSize } from "@/constants/constants";

register();

export default function PlanList() {
  const { data, isLoading } = useSWR(apiGraphql, async () => {
    return await getAllSimpack(simPackPageSize, 0);
  });

  const dispatch = useDispatch();
  return (
    <div className="mt-5 w-[1140px]">
      <div className="w-full flex justify-self-end font-bold text-m_red relative">
        <div className="flex-grow" />
        <Link
          onClick={() => dispatch(setPath("/plans/"))}
          href="/plans"
          className="mr-6"
        >
          Xem tất cả
        </Link>
      </div>
      {isLoading ? (
        <div className="h-80 w-full flex justify-center items-center">
          <MoonLoader color="#E50914" />
        </div>
      ) : (
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          // navigation
          centeredSlides
          loop
          pagination={{ clickable: false }}
          // scrollbar={{ draggable: true }}
        >
          {isLoading
            ? []
            : data["list"].map((item: SimPack) => (
                <SwiperSlide key={item._id}>
                  <PlanSlick
                    simpack={item}
                    key={item._id}
                    id={item._id}
                    urlImage={`${uploadUrl}${item?.thumb}`}
                    name={item.code ?? ""}
                    branch={item?.telco ?? ""}
                    price={item?.price ?? 0}
                    describle={item?.description ?? ""}
                  />
                </SwiperSlide>
              ))}
        </Swiper>
      )}
    </div>
  );
}

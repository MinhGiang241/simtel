"use client";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import "./component.css";
import NumberList from "./numberList";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Pagination } from "antd";
import Man from "./logo/bro.svg";
import { FilterOutlined } from "@ant-design/icons";
import Right from "./logo/right_img.svg";
import Left from "./logo/left_img.svg";
import Shadow from "./logo/shadow.svg";
import PageWrapper from "./pageWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import {
  setSimPage,
  setSimSearch,
  setSimNot,
} from "@/GlobalRedux/Sim/SimSlice";
import { getSimFunction } from "@/services/sim/simServices";
import { Button } from "antd";
import FilterOnBanner from "./modals/FilterOnBanner";
import { simPageSize } from "@/constants/constants";
import { errorToast } from "./modals/CustomToast";

interface Props {
  hideFilter?: boolean;
  isHome?: boolean;
}

export default function SelectNumber({ hideFilter, isHome = false }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [text, setText] = useState<string>("");
  const search = useSelector((state: RootState) => state.sim.search);
  const not = useSelector((state: RootState) => state.sim.not);
  const [num, setNum] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      active: not?.includes(`${index}`) ?? false,
      val: `${index}`,
    })),
  );
  const page = useSelector((state: RootState) => state.sim.page);
  const loading = useSelector((state: RootState) => state.sim.loading);
  const count = useSelector((state: RootState) => state.sim.count);
  const type = useSelector((state: RootState) => state.sim.type);
  const telco = useSelector((state: RootState) => state.sim.telco);
  const price = useSelector((state: RootState) => state.sim.price);
  const [ilgodalOpen, setIlgodalOpen] = useState(false);
  const [selected, setSelected] = useState<string>();
  const [selectedCard, setSelectedCard] = useState<string>();

  const showModal = () => {
    setIlgodalOpen(true);
  };
  const handleOk = () => {
    setIlgodalOpen(false);
  };
  const handleCancel = () => {
    setIlgodalOpen(false);
  };

  const itemRender = (
    index: number,
    type: "page" | "next" | "prev" | "jump-prev" | "jump-next",
    originalElement: React.ReactNode,
  ) => {
    if (type === "next") {
      return (
        <div>
          <RightOutlined />
        </div>
      );
    }
    if (type === "prev") {
      return (
        <div>
          <LeftOutlined />
        </div>
      );
    }
    if (type === "page") {
      return (
        <div
          className={
            page === index
              ? `bg-m_red text-white rounded-lg`
              : `bg-m_gray text-black border border-m_gray rounded-lg`
          }
        >
          <p>{index}</p>
        </div>
      );
    }
    return originalElement;
  };

  return (
    <>
      <div className="flex w-full justify-center bg-m_red_banner h-96 relative">
        <Right className="absolute right-0 lg:flex hidden" />
        <Left className="absolute left-[0] bottom-16 lg:flex hidden" />
        <Shadow className="absolute left-[5rem] lg:flex hidden" />
        <Man className="-translate-y-20 -translate-x-10 w-[579px] h-[464px] lg:flex hidden " />
        {/* <div className="lg:w-[55%] pr-3 " /> */}
        <div className="flex">
          <div />
          <div className="flex flex-col pt-10 max-w-[1440px] w-full">
            <div className="mb-1 text-base text-white font-normal">
              Nhập số thuê bao mong muốn:
            </div>
            <div className="flex items-center">
              <Input
                defaultValue={search}
                onChange={(e) => {
                  setText(e.target.value.trim());
                }}
                placeholder="**** *** ***"
                className="text-lg lg:h-14 lg:w-[417px] w-[291px] h-[40px] input-search"
                allowClear
              />
              <Button
                onClick={showModal}
                className="bg-transparent border border-white lg:h-14 h-[40px] lg:w-[125px] flex items-center justify-center text-white rounded-lg lg:ml-2 ml-1 lg:p-2 lg:text-base text-xs w-[60px] pl-1"
              >
                <FilterOutlined className="pl-2 lg:text-[24px]" />
                Bộ lọc
              </Button>
            </div>
            <div className='flex justify-center items-center mt-4 p-4 rounded-lg bg-m_opacity mb-4 lg:w-[552px] lg:h-[48px] w-[350px] h-[36px]'>
              <h2 className='text-white text-xs lg:text-base'>Loại trừ:</h2>
              <div className='flex mr-2'>
                {...num.map((i, e) => (<button
                  onClick={() => {
                    num[e].active = !num[e].active;
                    setNum([...num]);
                  }}
                  key={e}
                  className={`${i.active ? "bg-m_orange" : ""
                    } text-xs active:opacity-50 select-none mx-1 text-white rounded-full border-white border-2 px-2 py-2 lg:h-6 lg:w-6 h-1 w-1 text-center flex justify-center items-center`}>{i.val}</button>))}
              </div>
            </div>
            <div className="text-white lg:text-base text-sm font-normal">
              ● Tìm sim có số 6789 bạn hãy gõ 6789
            </div>
            <div className="text-white lg:text-base text-sm font-normal">
              ● Tìm sim có đầu 090 đuôi 9999 bạn hãy gõ 090*9999
            </div>
            <div className="text-white lg:text-base text-sm font-normal">
              ● Tìm sim bắt đầu bằng 0914 đuôi bất kỳ bạn hãy gõ 0914*
            </div>
            <button
              onClick={() => {
                var notIncludes = num.filter((i) => i.active).map((v) => v.val);

                dispatch(setSimSearch(text));
                dispatch(setSimNot(notIncludes));
                getSimFunction(dispatch, 1, type, telco, true, text, notIncludes, price);
              }}
              className="text-m_red bg-white w-[134px] h-[48px] text-base font-semibold rounded-lg m-auto"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
      <PageWrapper isTopPadding={false}>
        <NumberList
          colorHeader={isHome ? "#FFB85C" : undefined}
          colorTextHeader={isHome ? "black" : undefined}
        />
      </PageWrapper>
      <div className="w-full flex justify-center mt-5">
        <Pagination
          itemRender={itemRender}
          defaultCurrent={page}
          total={count}
          size="default"
          pageSize={simPageSize}
          showSizeChanger={false}
          onChange={(i, __) => {
            dispatch(setSimPage(i));
            getSimFunction(dispatch, i, type, telco, false, text, not, price);
          }}
        />
      </div>
      <FilterOnBanner
        open={ilgodalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
}

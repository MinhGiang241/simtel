"use client";
import React, { useEffect, useState } from "react";
import CardItem from "./cardItem";
import { getAllPhoneCard, getListCardType } from "@/services/api/simPackApi";
import { Button, Pagination } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import {
  getListCard,
  setCountCard,
  setLoadingCard,
  setPageCard,
  setSelectedCard,
} from "@/GlobalRedux/PhoneCard/PhoneCardSlice";
import { useDispatch } from "react-redux";
import { errorToast } from "@/app/components/modals/CustomToast";
import { MoonLoader } from "react-spinners";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { cardPageSize } from "@/constants/constants";

export default function CardList() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string>();
  const data = useSelector((state: RootState) => state.phoneCard.value);
  const page = useSelector((state: RootState) => state.phoneCard.page);
  const telco = useSelector((state: RootState) => state.phoneCard.telco);
  const selectedCard = useSelector(
    (state: RootState) => state.phoneCard.selected,
  );
  const count = useSelector((state: RootState) => state.phoneCard.count);
  const loading = useSelector((state: RootState) => state.phoneCard.loading);

  useEffect(() => {
    dispatch(setLoadingCard(true));
    //getAllPhoneCard(undefined, 8, (page - 1) * 8)
    // getListCardType(undefined, 8, (page - 1) * 8)
    //   .then((v) => {
    //     dispatch(setLoadingCard(false))
    //     if (v && v.list.length > 0) {
    //       dispatch(getListCard(v.list))
    //       dispatch(setCountCard(v.count))
    //     } else {
    //       dispatch(getListCard([]))
    //       dispatch(setCountCard(0))
    //     }
    //   }).catch((e) => {
    //     dispatch(setLoadingCard(false))
    //     error("Lỗi", e)
    //   })
  }, [page]);
  const getCardType = (page: number) => {
    console.log("telco", telco);
    getListCardType(telco, 8, (page - 1) * 8)
      .then((v) => {
        dispatch(setLoadingCard(false));
        if (v && v.list.length > 0) {
          dispatch(getListCard(v.list));
          dispatch(setCountCard(v.count));
        } else {
          dispatch(getListCard([]));
          dispatch(setCountCard(0));
        }
      })
      .catch((e: string) => {
        dispatch(setLoadingCard(false));
        errorToast("Lỗi", e);
      });
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
      {loading ? (
        <div className="h-80 w-full flex justify-center items-center">
          <MoonLoader color="#E50914" />
        </div>
      ) : (
        <>
          {
            <div className="mt-5 flex items-center w-full flex-wrap">
              {data.map((item, index) => (
                <CardItem
                  onClick={() => {
                    setSelected(item._id);
                    dispatch(setSelectedCard(item));
                  }}
                  selected={selected}
                  key={index}
                  card={item}
                />
              ))}
            </div>
          }
          <div className="w-full flex justify-center mb-14">
            <Pagination
              itemRender={itemRender}
              current={page}
              size="default"
              total={count}
              pageSize={cardPageSize}
              showSizeChanger={false}
              showQuickJumper={false}
              onChange={(v) => {
                dispatch(setPageCard(v));
                getCardType(v);
              }}
            />
          </div>
        </>
      )}
    </>
  );
}

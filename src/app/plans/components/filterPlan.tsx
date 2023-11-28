/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getList,
  setCount,
  setLoading,
  setPage,
  setSortBy,
  setTelco,
  setType,
} from "@/GlobalRedux/SimPack/SimPackSlice";
import { RootState } from "@/GlobalRedux/store";
import { getAllSimpack } from "@/services/api/simPackApi";
import { errorToast } from "@/app/components/modals/CustomToast";
import { simPackPageSize } from "@/constants/constants";

export default function FilterPlan() {
  const dispatch = useDispatch();
  // var count = useSelector((state: RootState) => state.simPack.count)
  // var list = useSelector((state: RootState) => state.simPack.value)
  var page = useSelector((state: RootState) => state.simPack.page);
  const telco = useSelector((state: RootState) => state.simPack.telco);
  const type = useSelector((state: RootState) => state.simPack.type);
  const sortBy = useSelector((state: RootState) => state.simPack.sortBy);
  const telcos = useSelector((state: RootState) => state.config.telcos);
  const options = telcos.map((i) => ({ value: i.name, label: i.name }));

  const onChangeTelco = (v: any) => {
    dispatch(setPage(1));
    dispatch(setTelco(v));
  };
  const onChangeType = (v: any) => {
    dispatch(setPage(1));
    dispatch(setType(v));
  };
  const onChangeSort = (v: any) => {
    dispatch(setPage(1));
    dispatch(setSortBy(v));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getAllSimpack(
      simPackPageSize,
      (!page ? 0 : page - 1) * simPackPageSize,
      telco,
      type,
      sortBy,
    )
      .then((v) => {
        dispatch(setLoading(false));
        if (v && v.list.length > 0) {
          dispatch(setCount(v.count));
          dispatch(getList(v.list));
        } else {
          dispatch(setCount(0));
          dispatch(getList([]));
        }
      })
      .catch((e) => {
        errorToast("Lỗi", e);
        dispatch(setLoading(false));
      });
  }, [telco, type, sortBy, page]);

  return (
    <>
      {/* <div className='flex w-full justify-end'> */}
      {/*   <button className='flex select-none active:opacity-70'> */}
      {/*     <FilterOutlined className='text-xl' style={{ color: '#ED1E23' }} /><h4 className='text-md text-m_red font-bold'>Bộ lọc</h4> */}
      {/*   </button> */}
      {/* </div> */}
      <div className="flex w-full justify-evenly items-center h-28 bg-m_gray mt-20">
        <div className="w-[301px] h-[62] mx-6 flex flex-col ">
          {/* <label htmlFor='branch' className='text-lg font-bold'>Nhà mạng</label> */}
          <Select
            onChange={onChangeTelco}
            allowClear
            id="branch"
            style={{ height: "3rem" }}
            placeholder="Nhà mạng"
            options={options}
          />
        </div>

        <div className="w-[301px] mx-6 flex flex-col">
          {/* <label htmlFor='type' className='text-lg font-bold'>Loại gói cước</label> */}
          <Select
            onChange={onChangeType}
            allowClear
            id="type"
            style={{ height: "3rem" }}
            placeholder="Loại gói cước"
            options={[
              { value: "before", label: "Trả trước" },
              { value: "after", label: "Trả sau" },
            ]}
          />
        </div>

        <div className="w-[301px] mx-6 flex flex-col">
          {/* <label htmlFor='price' className='text-lg font-bold'>Sắp xếp theo giá tiền</label> */}
          <Select
            onChange={onChangeSort}
            allowClear
            id="price"
            style={{ height: "3rem" }}
            placeholder="Sắp xếp theo giá tiền"
            options={[
              { value: "inc", label: "Từ nhỏ đến lớn" },
              { value: "", label: "Từ lớn đến nhỏ" },
            ]}
          />
        </div>
        <div className="w-[117px] h-[48px] border-m_red border flex items-center justify-evenly mr-6 rounded-md cursor-pointer select-none">
          <FilterOutlined className="text-xl" style={{ color: "#ED1E23" }} />
          <h4 className="text-md text-m_red font-bold">Bộ lọc</h4>
        </div>
      </div>
    </>
  );
}

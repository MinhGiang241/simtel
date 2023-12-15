'use client'
import React, { useState } from "react";
import Phone from "./logo/phone.svg";
import Data from "./logo/data.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { setIsData } from "@/GlobalRedux/SimPack/SimPackSlice";


export default function PlanButton() {
  const dispatch = useDispatch()
  // const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  var isData = useSelector((state: RootState) => state.simPack.isData)
  const handlePlanClick = (isData: boolean) => {
    //setSelectedPlan(planType === selectedPlan ? null : planType);
    dispatch(setIsData(isData))
  };

  return (
    <div className="w-full flex-col items-center">
      <div className="mt-4 flex justify-center" >
        <h2 className="px-1 lg:px-2 text-m_red font-bold lg:text-[32px] text-2xl lg:pt-10 pt-5 leading-10"> {'Chọn ngay gói cước phù hợp'}</h2>
      </div>
      <div className="bg-slate-100 flex justify-center items-center mt-10 border rounded-full py-2 lg:w-[563px] lg:h-[84px] w-[360px] h-[52px] m-auto">
        <button className={`text-xs lg:text-xl px-5 py-2 rounded-full active:opacity-70 font-semibold select-none flex justify-center items-center ${isData === false ? 'active lg:w-[243px] lg:h-[60px] w-[149px] h-[36px] bg-white text-black relative' : 'w-[149px] lg:w-[243px] text-slate-300'}`} onClick={() => handlePlanClick(false)}>
          <div className={`${isData === false ? 'active border-2 border-m_red w-7 absolute bottom-0 rounded-3xl' : ''}`} />
          <Data className={`mr-2`} />
          Gói cước data
        </button>
        <div className="w-10 text-slate-300 flex justify-center items-center">|</div>
        <button className={`text-xs lg:text-xl px-5 py-2 rounded-full active:opacity-70 font-semibold select-none flex justify-center items-center ${isData === true ? 'active lg:w-[243px] lg:h-[60px] w-[149px] h-[36px] bg-white text-black relative' : 'w-[149px] lg:w-[243px] text-slate-300'}`} onClick={() => handlePlanClick(true)}>
          <div className={`${isData === true ? 'active border-2 border-m_red w-7 absolute bottom-0 rounded-3xl' : ''}`} />
          <Phone className="mr-2" />
          Gói cước thoại
        </button>
      </div>
    </div>
  );
}

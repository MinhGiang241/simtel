import React from 'react'
import Phone from './logo/phone.svg'

export default function PlanButton() {
  return (
    <div className="w-full flex-col items-center">
      <div className="mt-4 flex justify-center" >
        <h2 className="font-bold text-4xl">{'Chọn ngay'}</h2>
        <h2 className="px-2 text-m_red font-bold text-4xl"> {'gói cước'}</h2>
        <h2 className="font-bold text-4xl"> {' phù hợp'}</h2>
      </div>
      <div className="bg-slate-100 flex justify-center mt-4 border rounded-full py-2 w-2/5 m-auto">
        <button className="bg-white text-black text-lg px-5 py-2 rounded-full active:opacity-70 font-bold select-none flex justify-center items-center border-b-4 border-m_red">
          <Phone className="mr-2 text-black" />
          Gói cước data
        </button>
        <div className="w-16 text-slate-300 flex justify-center items-center">|</div>
        <button className="text-slate-300 text-lg px-5 py-2 rounded-full active:opacity-70 font-bold select-none flex justify-center items-center">
          <Phone className="mr-2" />
          Gói cước thoại
        </button>
      </div>
    </div>
  )
}
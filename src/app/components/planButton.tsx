import React from 'react'

export default function PlanButton() {
  return (
    <div className="w-full flex-col items-center">
      <div className="mt-4 flex justify-center" >
        <h2 className="font-bold text-4xl">{'Chọn ngay'}</h2>
        <h2 className="px-2 text-m_red font-bold text-4xl"> {'gói cước'}</h2>
        <h2 className="font-bold text-4xl"> {' phù hợp'}</h2>
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-m_red text-white text-lg px-5 py-2 rounded-xl active:opacity-70 font-bold select-none">
          Gói cước data
        </button>
        <div className="w-16" />
        <button className="bg-gray-400 text-white text-lg px-5 py-2 rounded-xl active:opacity-70 font-bold select-none">
          Gói cước thoại
        </button>
      </div>

    </div>
  )
}

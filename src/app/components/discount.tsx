import React from 'react'

export default function Discount() {
  return (
    <div className='w-full mt-5'>
      <div className="flex justify-center" >
        <h2 className="font-bold text-4xl">Tin tức, </h2>
        <h2 className="px-2 text-m_red font-bold text-4xl">khuyến mại</h2>
      </div>

      <div className='p-11 w-full bg-m_gray h-[500px] mt-5 '>
        <div className='flex justify-between w-full'>
          <p className='text-orange-500'>Tin nổi bật </p>
          <p className='underline-offset-2 underline'>Xem tất cả</p>
        </div>

        <div className='w-full h-[370px] flex mt-2' >
          <div className='flex flex-col justify-between py-11 mr-5 bg-white w-1/2 p-5' >
            <div className='flex justify-between'>
              <p className='text-orange-500'>Sản phẩm dịch vụ</p>
              <p>6h 26m | 19/09/2023</p>
            </div>
            <div className='font-bold'>
              Simtel điều chỉnh chính sách thời hạn sử dụng thuê bao và thời hạn khôi phục số thường từ 22/09/2023
            </div>
            <div>
              Thuê bao Simtel sẽ được sử dụng trong vòng 35 ngày kể từ ngày kích hoạt thuê bao thành công, hoặc từ ngày cuối cùng phát sinh nạp tiền hoặc phát sinh lưu lượng chiều đi (gọi thoại, tin nhắn, data).
            </div>
          </div>
          <div className='flex flex-col justify-between ml-5 w-1/2'>

            <div className='w-full h-[110px] py-2 px-4 bg-white flex flex-col justify-between'>
              <div className='flex justify-between'>
                <p className='text-orange-500'>Sản phẩm dịch vụ</p>
                <p>6h 26m | 19/09/2023</p>
              </div>
              <p className='font-bold'>Simtel điều chỉnh chính sách thời hạn sử dụng thuê bao và thời hạn khôi phục số thường từ 22/09/2023</p>
            </div>

            <div className='w-full h-[110px] py-2 px-4 bg-white flex flex-col justify-between'>
              <div className='flex justify-between'>
                <p className='text-orange-500'>Sản phẩm dịch vụ</p>
                <p>6h 26m | 19/09/2023</p>
              </div>
              <p className='font-bold'>Simtel điều chỉnh chính sách thời hạn sử dụng thuê bao và thời hạn khôi phục số thường từ 22/09/2023</p>
            </div>

            <div className='w-full h-[110px] py-2 px-4 bg-white flex flex-col justify-between'>
              <div className='flex justify-between'>
                <p className='text-orange-500'>Sản phẩm dịch vụ</p>
                <p>6h 26m | 19/09/2023</p>
              </div>
              <p className='font-bold'>Simtel điều chỉnh chính sách thời hạn sử dụng thuê bao và thời hạn khôi phục số thường từ 22/09/2023</p>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

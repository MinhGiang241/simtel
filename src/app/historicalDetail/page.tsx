import React from 'react'
import PageWrapper from '../components/pageWrapper'

export default function Page() {
    return (
        <PageWrapper>
            <div className='mt-4'>
                <div className='flex mb-3'>
                    <div>Lịch sử đơn hàng</div>
                    <div className='px-1'>{">"}</div>
                    <div>Chi tiết đơn hàng</div>
                </div>
                <div className='w-full bg-m_gray px-72 p-5'>
                    <div className='border-b flex'>
                        <img width={"132px"} height={"110px"} src="" alt="#" />
                        <div className='flex flex-col'>
                            <div className='font-semibold'>Mobifone 10.000</div>
                            <div className='font-extralight'>Nạp thẻ trực tiếp</div>
                            <div>Đã hoàn thành</div>
                        </div>
                    </div>
                    <div className='mt-2 border-b'>
                        <div className='flex justify-between mb-1'>
                            <div>Số điện thoại</div>
                            <div>03837378149</div>
                        </div>
                        <div className='flex justify-between mb-1'>
                            <div>Giá tiền</div>
                            <div>10.000</div>
                        </div>
                        <div className='flex justify-between mb-1'>
                            <div>Mã đơn hàng</div>
                            <div>11111114567</div>
                        </div>
                        <div className='flex justify-between mb-1'>
                            <div>Thời gian tạo</div>
                            <div>30/11/2023 10:20</div>
                        </div>
                    </div>
                    <div className='mt-2 border-b'>
                        <div className='mb-1'>Thông tin thanh toán</div>
                        <div className='flex justify-between'>
                            <div className='mb-1'>Giá tiền</div>
                            <div className='mb-1'>9.550</div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='mb-1'>Tổng thanh toán</div>
                            <div className='mb-1'>9.550</div>
                        </div>
                    </div>
                    <div>
                        <div className='mb-1 mt-1'>Phương thức thanh toán</div>
                        <div className='flex'>
                            <img width={"64px"} height={"35px"} src="" alt="#" />
                            <div>Appatopay</div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button>Mua lại</button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

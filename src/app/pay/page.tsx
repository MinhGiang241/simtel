import React from 'react'
import PageWrapper from '../components/pageWrapper'
import Qr from '../components/logo/qr.svg'
import Wallet from "../components/logo/vi.svg";

export default function Pay() {
    return (
        <PageWrapper>
            <div className='mt-10 mb-7'>
                <div className='flex'>
                    <div className='mr-2 text-slate-400'>Nạp thẻ</div>
                    <div className='mr-2 text-slate-400'>{">"}</div>
                    <div className='mr-2'>Thanh toán</div>
                </div>
                <div className='text-center'>Giao dịch sẽ kết thúc sau <span className='font-bold'>15:00</span> phút</div>
            </div>
            <div className='flex w-full justify-between'>
                <div className='w-[652px] h-[610px] flex items-center flex-col border border-m_gray rounded-lg'>
                    <Wallet className="mb-2 mt-8" />
                    <div className="mb-10">Bạn vui lòng thực hiện quét QR qua cổng thanh toán AppotaPay</div>
                    <Qr />
                </div>
                <div className='w-[456px] h-[476px]  border border-m_gray rounded-lg'>
                    <div className='px-6 border-b border-m_gray'>
                        <div className='border-b border-m_gray pb-7 pt-7 font-bold text-xl'>Thông tin đơn hàng</div>
                        <div className='flex justify-between mb-4 mt-5'>
                            <div className='text-slate-500 text-base'>Dịch vụ</div>
                            <div className='font-bold'>Nạp thẻ</div>
                        </div>
                        <div className='flex justify-between mb-4'>
                            <div className='text-slate-500 text-base'>Mã đơn hàng</div>
                            <div className='font-bold'>VT123</div>
                        </div>
                        <div className='flex justify-between mb-4'>
                            <div className='text-slate-500 text-base'>Số điện thoại</div>
                            <div className='font-bold'>0989888999</div>
                        </div>
                        <div className='flex justify-between mb-4'>
                            <div className='text-slate-500 text-base'>Nhà mạng</div>
                            <div className='font-bold'>Viettel</div>
                        </div>
                        <div className='flex justify-between mb-4'>
                            <div className='text-slate-500 text-base'>Mệnh giá</div>
                            <div className='font-bold'>100.000đ</div>
                        </div>
                        <div className='flex justify-between mb-4'>
                            <div className='text-slate-500 text-base'>Chiết khấu 2.5%</div>
                            <div className='font-bold'>-20.000</div>
                        </div>
                        <div className='flex justify-between mb-5'>
                            <div className='text-slate-500 text-base'>Mức phí</div>
                            <div className='font-bold'>Miễn phí</div>
                        </div>
                    </div>
                    <div className='flex justify-between px-6 mt-7'>
                        <div className='text-slate-500 text-base'>Giá trị thanh toán</div>
                        <div className='font-bold text-xl'>80.000đ</div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

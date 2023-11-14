'use client'
import React from 'react'
import PageWrapper from '../components/pageWrapper'
import Member from '../components/logo/member_sz.svg'
import Calender from '../components/logo/calender.svg'
import Down from '../components/logo/down.svg'
import Tele from '../components/logo/tele.svg'
import Fb from '../components/logo/fb.svg'
import In from '../components/logo/in.svg'
import Gg from '../components/logo/gg.svg'

export default function Page() {
    return (
        <PageWrapper>
            <div className='w-full mt-10'>
                <div className="grid grid-cols-[60fr,40fr] gap-4">
                    <div className="p-4">
                        <Member className="w-[749px] h-[461px] object-cover" />
                        <div className='text-3xl font-semibold mb-2 mt-3'>Simtel điều chỉnh chính sách thời hạn sử dụng thuê bao và thời hạn khôi phục số thường từ 22/09/2023</div>
                        <div className='flex'>
                            <Calender className="mr-2" />
                            <div className='text-slate-400'>19/09/2023</div>
                            <div className='text-slate-400 p-2 pt-0'>|</div>
                            <div className='mr-2 font-bold'>Chia sẻ:</div>
                            <div className='mr-2'><Tele /></div>
                            <div className='mr-2'><Fb /></div>
                            <div className='mr-2'><In /></div>
                            <div className='mr-2'><Gg /></div>
                        </div>
                        <div className='pb-2'>Ngày 22/09/2023, Simtel - một trong những nhà cung cấp dịch vụ viễn thông hàng đầu tại Việt Nam đã chính thức công bố sự điều chỉnh quan trọng trong chính sách thời hạn sử dụng thuê bao và thời hạn khôi phục số. Điều này đánh dấu một bước ngoặt quan trọng trong việc cung cấp dịch vụ cho khách hàng và góp phần nâng cao trải nghiệm của họ. Chính sách mới của Simtel đã được thiết kế để tạo điều kiện thuận lợi hơn cho người dùng khi quản lý số điện thoại di động của họ. Dựa trên phản hồi từ khách hàng và sự phát triển của công nghệ viễn thông, Simtel đã quyết định điều chỉnh các quy định sau:</div>
                        <div className='font-bold pb-2'>1. Thời hạn sử dụng thuê bao kéo dài:</div>
                        <div>Trước đây, thời hạn sử dụng thuê bao cho các gói cước trả trước và trả sau thường là 12 tháng. Từ ngày 22/09/2023, Simtel sẽ kéo dài thời hạn sử dụng thuê bao lên 24 tháng cho tất cả khách hàng mới đăng ký và gia hạn hợp đồng. Điều này giúp người dùng cảm thấy an tâm hơn về việc sử dụng dịch vụ của họ trong thời gian dài hơn.</div>
                    </div>
                    <div className="p-4">
                        <div className='border-b-2 border-m_gray'>
                            <div className='text-xl font-bold pb-2'>Bài viết liên quan </div>
                            <div className='flex items-center pb-2'>
                                <Down className="mr-2 " />
                                <div className='text-m_red'>Sản phẩm dịch vụ</div>
                            </div>
                            <div className='text-lg font-bold'>Simtel điều chỉnh chính sách thời hạn sử dụng thuê bao và thời hạn khôi phục số thường từ 22/09/2023</div>
                            <div className='flex pt-2 mb-4'>
                                <Calender className="mr-2" />
                                <div className='text-slate-400'>19/09/2023</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </PageWrapper>
    )
}

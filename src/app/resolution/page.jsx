'use client'
import React, { useEffect, useState } from 'react'
import PageWrapper from '../components/pageWrapper'
import { useSearchParams } from 'next/navigation'
import { get_article } from '@/services/api/policy'
import parse from 'html-react-parser';


export default function Resolution() {
    const [article, setArticle] = useState('')

    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {
        get_article(id).then((v) => {
            setArticle(v)
        })
    }, [id])

    return (
        <PageWrapper>
            <div className='mt-5'>
                <div>
                    {parse(article?.content ?? '')}
                    {/* <div className='font-bold mb-2'>Quy trình giải quyết tranh chấp, khiếu nại</div>
                    <div className='mb-2'>SIMTEL.vn luôn có trách nhiệm tiếp nhận và xử lý khiếu nại của Người dùng liên quan đến dịch vụ của SIMTEL.vn cung cấp. Khi phát sinh tranh chấp, các bên ưu tiên giải quyết bằng phương pháp tự thỏa thuận, thương lượng, hòa giải theo quy trình sau:</div>
                    <div className='font-bold mb-2'>Bước 1: Yêu cầu giải quyết khiếu nại</div>
                    <div className='mb-2'>Người dùng gửi yêu cầu khiếu nại cùng các chứng cứ, tài liệu liên quan về địa chỉ tiếp nhận khiếu nại mà SIMTEL đã công bố.</div>
                    <div className='font-bold mb-2'>Bước 2: Tiếp nhận khiếu nại:</div>
                    <div className='mb-2'>Bộ phận Chăm Sóc Khách Hàng hoặc Bộ phận Kinh doanh của SIMTEL sẽ tiếp nhận các khiếu nại của Người dùng và yêu cầu cung cấp thêm thông tin/chứng từ liên quan đến nội dung khiếu nại (nếu cần thiết).</div>
                    <div className='font-bold mb-2'>Bước 3: Giải quyết khiếu nại</div>
                    <div className='mb-2'>-  Đối với các khiếu nại đơn giản, có thể giải quyết trên cơ sở các quy chế, chính sách đã được SIMTEL công bố/ban hành, Bộ phận Chăm Sóc Khách Hàng/ Bộ phận Kinh doanh chủ động giải quyết nhanh chóng và trả lời ngay kết quả giải quyết các khiếu nại cho Người dùng.</div>
                    <div className='mb-2'>-  Trong trường hợp nội dung khiếu nại có tính chất phức tạp hoặc không được quy định tại các chính sách mà SIMTEL đã công bố thì Bộ phận Chăm Sóc Khách Hàng/ Bộ phận Kinh doanh sẽ chuyển yêu cầu khiếu nại lên Ban Giám đốc để xử lý và thông báo với Người dùng về thời hạn dự kiến trả lời khiếu nại.</div>
                    <div className='mb-2'>- Thời hạn giải quyết khiếu nại không quá 07 ngày làm việc đối với các vấn đề khiếu nại đơn giản thuộc thẩm quyền giải quyết của SIMTEL và không quá 30 ngày làm việc đối với các khiếu nại có tính chất phức tạp hoặc cần liên hệ, phối hợp giải quyết với Bên thứ ba có liên quan. Thời hạn giải quyết khiếu nại tính từ ngày SIMTEL tiếp nhận yêu cầu khiếu nại của Người dùng.</div>
                    <div className='font-bold mb-2'>Bước 4: Thi hành kết quả giải quyết khiếu nại</div>
                    <div className='mb-2'>Chuyển kết quả giải quyết khiếu nại cho các bộ phận có liên quan để thực hiện (Bộ phận Kế toán – Tài chính, Bộ phận Kĩ thuật…) và gọi điện hoặc gửi email xác nhận với Người dùng về kết quả khiếu nại đã được giải quyết.</div>
                    <div className='mb-2'>SIMTEL.vn công khai cơ chế và quy trình giải quyết tranh chấp đối với các bên liên quan là: giải quyết tranh chấp theo cơ chế trao đổi thỏa thuận thống nhất, các bên liên quan sẽ thực hiện theo quy trình trao đổi gián tiếp qua điện thoại, xác nhận văn bằng email, nếu vẫn chưa thỏa thuận được thì sẽ giải quyết thông qua gặp trực tiếp để cụ thể hóa vấn đề, giải quyết triệt để vấn đề mâu thuẩn giữa các bên sao cho có lợi nhất.</div>
                    <div className='font-bold mb-2'>Địa chỉ tiếp nhận khiếu nại:</div>
                    <div className='mb-2'>○ CÔNG TY CỔ PHẦN VIỄN THÔNG SMARTEL</div>
                    <div className='mb-2'>○ Mã số doanh nghiệp 0110499021 do Sở Kế hoạch và Đầu Tư Thành phố Hà Nội cấp đăng ký lần đầu ngày 05/10/2023</div>
                    <div className='mb-2'>○ Trụ sở chính: Xóm Mới, Thôn Đồng Trì, Xã Tứ Hiệp, Huyện Thanh Trì, Thành phố Hà Nội, Việt Nam</div>
                    <div className='mb-2'>○ Hotline: 0559.111.666</div>
                    <div className='mb-2'>○ Email: simtel.vn@gmail.com </div> */}
                </div>
            </div>
        </PageWrapper>
    )
}
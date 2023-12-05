"use client";
import React from 'react'
import PageWrapper from '../components/pageWrapper';
import { Modal } from 'antd';

export default function Page() {
    return (
        <PageWrapper>
            {/* <div>page</div> */}
            <Modal open={true} >
                <div>Thanh toán thành công</div>
            </Modal>
        </PageWrapper>
    )
}
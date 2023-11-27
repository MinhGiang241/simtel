/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import PageWrapper from "../components/pageWrapper";
import Qr from "../components/logo/qr.svg";
import Wallet from "../components/logo/vi.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import Image from "next/image";
import { uploadUrl } from "@/constants/apiConstant";
import { useSearchParams } from "next/navigation";
import { getOrderById } from "@/services/api/orderApi";
import { Order } from "@/interfaces/data";
import { FormattedNumber } from "react-intl";
import { defaults } from "autoprefixer";

export default function Pay() {
  const config = useSelector((state: RootState) => state.config.config);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const type = searchParams.get("type");
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId).then((v) => {
        if (v) {
          setOrder(v);
        }
      });
    }
  }, []);

  const genTypeServiceName = (type: string | null) => {
    switch (type) {
      case "sim":
        return "Mua sim";
      case "simpack":
        return "Gói cước";
      case "simandpack":
        return "Gói cước kèm sim";
      case "phonecard":
        return "Mua thẻ điện thoại";
      default:
        return "";
    }
  };

  return (
    <PageWrapper>
      <div className="mt-10 mb-7">
        <div className="flex">
          <div className="mr-2 text-slate-400">{genTypeServiceName(type)}</div>
          <div className="mr-2 text-slate-400">{">"}</div>
          <div className="mr-2">Thanh toán</div>
        </div>
        {/* <div className="text-center"> */}
        {/*   Giao dịch sẽ kết thúc sau <span className="font-bold">15:00</span>{" "} */}
        {/*   phút */}
        {/* </div> */}
      </div>
      <div
        className={`flex w-full ${
          order ? "justify-between" : "justify-center"
        }`}
      >
        <div className="w-[652px] h-[610px] flex items-center flex-col border border-m_gray rounded-lg">
          {/* <Wallet className="mb-2 mt-8" />  */}
          {/* <div className="mb-10"> */}
          {/*   Bạn vui lòng thực hiện quét QR qua cổng thanh toán AppotaPay */}
          {/* </div> */}
          {/* <Qr /> */}
          <Image
            loading="lazy"
            alt="Qr"
            height={460}
            width={460}
            src={`${uploadUrl}${config?.bankQr}`}
          />
        </div>
        {order && (
          <div className="w-[456px] h-[476px]  border border-m_gray rounded-lg">
            <div className="px-6 border-b border-m_gray">
              <div className="border-b border-m_gray pb-7 pt-7 font-bold text-xl">
                Thông tin đơn hàng
              </div>
              <div className="flex justify-between mb-4 mt-5">
                <div className="text-slate-500 text-base">Dịch vụ</div>
                <div className="font-bold">{genTypeServiceName(type)}</div>
              </div>
              <div className="flex justify-between mb-4">
                <div className="text-slate-500 text-base">Mã đơn hàng</div>
                <div className="font-bold">{order?.code}</div>
              </div>
              <div className="flex justify-between mb-4">
                <div className="text-slate-500 text-base">Số điện thoại</div>
                <div className="font-bold">{order?.tel}</div>
              </div>
              <div className="flex justify-between mb-4">
                <div className="text-slate-500 text-base">Nhà mạng</div>
                <div className="font-bold">{order?.i?.telco}</div>
              </div>
              <div className="flex justify-between mb-4">
                <div className="text-slate-500 text-base">Mệnh giá</div>
                <div className="font-bold">
                  <FormattedNumber
                    value={order?.total_amount ?? 0}
                    style="currency"
                    currency="VND"
                  />
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <div className="text-slate-500 text-base">Chiết khấu </div>
                <div className="font-bold">
                  <FormattedNumber
                    value={order?.discount_amount ?? 0}
                    style="currency"
                    currency="VND"
                  />
                </div>
              </div>
              <div className="flex justify-between mb-5">
                <div className="text-slate-500 text-base">Mức phí</div>
                <div className="font-bold">Miễn phí</div>
              </div>
            </div>
            <div className="flex justify-between px-6 mt-7">
              <div className="text-slate-500 text-base">Giá trị thanh toán</div>
              <div className="font-bold text-xl">
                <FormattedNumber
                  value={order?.total_amount ?? 0}
                  style="currency"
                  currency="VND"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

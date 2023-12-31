"use client";
import React, { useEffect, useState } from "react";
import PageWrapper from "../components/pageWrapper";
import { Button, Dropdown, Input, MenuProps } from "antd";
import Image from "next/image";
import PaymentSelect from "./components/paymentSelect";
import CardList from "./components/CardList";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import {
  getListCard,
  setCountCard,
  setLoadingCard,
  setPageCard,
  setTelcoCard,
} from "@/GlobalRedux/PhoneCard/PhoneCardSlice";
import { errorToast, successToast } from "../components/modals/CustomToast";
import { getAllPhoneCard, getListCardType } from "@/services/api/simPackApi";
import Viettel from "./logo/viettel.svg";
import Vinaphone from "./logo/vinaphone.svg";
import Mobifone from "./logo/mobifone.svg";
import Wintel from "./logo/wintel.svg";
import Vietnamobile from "./logo/vietnamobile.svg";
import Mobile from "./logo/mobile.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { pushPathName } from "@/services/routes";
import { Order } from "@/interfaces/data";
import {
  createOrder,
  getOrderLink,
  getOrderById,
} from "@/services/api/orderApi";
import MInput from "../components/config/MInput";

const items: MenuProps["items"] = [
  { key: "Viettel", label: <div className="text-base">Viettel</div> },
  { key: "Vinaphone", label: <div className="text-base">Vinaphone</div> },
  { key: "Mobifone", label: <div className="text-base">Mobifone</div> },
  { key: "Itelecom", label: <div className="text-base">Itelecom</div> },
  { key: "Gmobile", label: <div className="text-base">Gmobile</div> },
  { key: "Vietnamobile", label: <div className="text-base">Vietnamobile</div> },
  { key: "Wintel", label: <div className="text-base">Wintel</div> },
  { key: "", label: <div className="text-base">Tất cả</div> },
];

const getImageTelco = (telco: string) => {
  switch (telco) {
    case "Viettel":
      return <Viettel width={119} height={24} />;
    case "Vinaphone":
      return <Vinaphone width={117} height={26} />;
    case "Mobifone":
      return <Mobifone width={131} height={27} />;
    case "Itelecom":
      return <img src="/images/itelecom.png" alt="#" width={60} height={20} />;
    case "Gmobile":
      return <Mobile width={97} height={34} />;
    case "Vietnamobile":
      return <Vietnamobile width={89} height={38} />;
    case "Wintel":
      return <Wintel width={119} height={24} />;
    case "Local":
      return <img src="/images/local.jpeg" alt="#" width={60} height={10} />;
    case "Vnsky":
      return <img src="/images/vnsky.png" alt="#" width={90} height={40} />;
    case "FPT Retail":
      return <img src="/images/fpt.jpg" alt="#" width={70} height={20} />;
    case "Simtel":
      return <img src="/images/simtel.png" alt="#" width={70} height={50} />;
    default:
      return <div>Tất cả</div>;
  }
};

var telcoImages = [
  "Viettel",
  "Vinaphone",
  "Mobifone",
  "Itelecom",
  "Gmobile",
  "Vietnamobile",
  "Wintel",
  "Local",
  "Vnsky",
  "FPT Retail",
  "Simtel",
  "",
];

export default function CardPage() {
  const [image, setImage] = useState<any>(<div>Tất cả</div>);
  const router = useRouter();
  const [selected, setSelected] = useState<string>();
  const dispatch = useDispatch();
  const telco = useSelector((state: RootState) => state.phoneCard.telco);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const selectedCardType = useSelector(
    (state: RootState) => state.phoneCard.selected,
  );
  const orderId = searchParams.get("order");
  const [phone, setPhone] = useState<string>("");
  //const page = useSelector((state: RootState) => state.phoneCard.page)
  useEffect(() => {
    getCardType();

    //dispatch(setLoadingCard(true))
    //getAllPhoneCard(telco, 8, 1)
  }, []);

  const getCardType = (e?: string) => {
    console.log("telco", telco);
    getListCardType(e, 8, 0)
      .then((v) => {
        dispatch(setLoadingCard(false));
        if (v && v.list.length > 0) {
          dispatch(getListCard(v.list));
          dispatch(setCountCard(v.count));
        } else {
          dispatch(getListCard([]));
          dispatch(setCountCard(0));
        }
      })
      .catch((e: string) => {
        dispatch(setLoadingCard(false));
        errorToast("Lỗi", e);
      });
  };

  const handleDropdownClick = (e: any) => {
    dispatch(setPageCard(1));
    dispatch(setTelcoCard(e.key));
    // setImage(getImageTelco(e.key))
  };
  return (
    <PageWrapper>
      <div className="mt-5 text-lg font-bold mb-4 ">Chọn số điện thoại</div>
      <div className="px-10">
        <Input
          className="h-10"
          value={phone}
          onChange={(e: any) => {
            setPhone(e.target.value);
          }}
          allowClear
        />
      </div>
      <div className="mt-5 text-lg font-bold w-[137px] ">Chọn nhà mạng</div>
      <div className="mt-5 flex items-center justify-center w-full flex-wrap  ">
        {telcoImages?.map((e: string, i: number) => (
          <Button
            onClick={async () => {
              dispatch(setTelcoCard(e));
              setSelected(e);
              getCardType(e);
            }}
            key={i}
            className={`${
              selected == e ? "bg-[#f5f5f5] border border-m_red" : ""
            } w-[261px] h-[80px] border flex items-center justify-center mr-3 mb-3 rounded-lg`}
          >
            {getImageTelco(e)}
          </Button>
        ))}
      </div>
      <div className="w-full">
        <div className="mt-10 mb-6">
          <span className="text-lg font-bold w-[137px] h-[38px]">
            Chọn mệnh giá
          </span>
          <span className="text-m_red"> *</span>
        </div>

        {(selected || telco === "") && <CardList />}
      </div>
      <Button
        onClick={async () => {
          //pushPathName(router, dispatch, '/pay')
          try {
            setLoading(true);
            var dataSubmit: Order = {
              // full_name: "Kach",
              tel: phone,
              // email: "minhgiang@gmail.com",
              // address: `Hà Nội`,
              items: [
                {
                  type: "phonecard",
                  itemId: selectedCardType?._id,
                  value: selectedCardType?.value,
                },
              ],
              total_amount: selectedCardType?.value,
              prod_total_amount: selectedCardType?.value,
              transport_fee: 0,
              discount_amount: 0,
              process_state: "WaitProcessing",
              payment_state: "WaitToPay",
              payment_method: "Wallet",
              note: "note",
              // provinceId: values.province,
              // districtId: values.district,
              // wardId: values.ward,
            };
            // pushPathName(router, dispatch, '/pay')
            createOrder(dataSubmit)
              .then(async (v) => {
                console.log("v", v);
                console.log("slt", selectedCardType);

                setLoading(false);
                // success('Đặt hàng thành công', "Bạn đã đặt hàng thành công ,đơn hàng của bạn đã được chuyển đến bộ phận quản lý",)
                // pushPathName(router, dispatch, `/cards?order=${v}`)
                // if (method === "Wallet") {
                //   return getOrderLink({ orderId: v, amount: selectedCardType?.value ?? 0, orderInfo: "test" })
                // } else {
                //   pushPathName(router, dispatch, '/pay')
                // }
                return getOrderLink({
                  orderId: v,
                  amount: selectedCardType?.value ?? 0,
                  orderInfo: "test",
                });
              })
              .then((v) => {
                setLoading(false);
                console.log("orderLoinh", v);
                router.push(v.paymentUrl);
              })
              .catch((er) => {
                setLoading(false);
                errorToast("Thanh toán thất bại", er as string);
              });
          } catch (err) {
            setLoading(false);
            errorToast("Thanh toán thất bại", err as string);
          }
        }}
        loading={loading}
        className="select-none ml-auto active:opacity-70 bg-m_red text-white rounded-lg px-6 py-2 flex justify-center items-center m-auto mt-10 w-[177px] h-[48px]"
      >
        <p className="text-lg text-center pr-1">Thanh toán</p>
      </Button>
      <PaymentSelect />
      <div className="h-20" />
    </PageWrapper>
  );
}

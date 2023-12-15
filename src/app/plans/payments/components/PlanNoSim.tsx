import { Divider, Input, Radio, Button, RadioChangeEvent } from "antd";
import React, { useEffect, useState } from "react";
import { FormattedNumber } from "react-intl";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState } from "@/GlobalRedux/store";
import { pushPathName } from "@/services/routes";
import { Order } from "@/interfaces/data";
import {
  createOrder,
  getOrderById,
  getOrderLink,
} from "@/services/api/orderApi";
import { errorToast, successToast } from "@/app/components/modals/CustomToast";
import Image from "next/image";
import { setPhone, setSeleted } from "@/GlobalRedux/SimPack/SimPackSlice";
import { Checkbox } from 'antd';
import Link from "next/link";

export default function PlanNoSim() {
  const dispatch = useDispatch();
  const router = useRouter();
  const type = useSelector((state: RootState) => state.simPack.selectedType);
  const user = useSelector((state: RootState) => state.auth.user);
  const phone = useSelector((state: RootState) => state.simPack.phone);
  const simpack = useSelector((state: RootState) => state.simPack.selected);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  const [method, setMethod] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false);

  const handleOrder = async () => {
    try {
      setLoading(true);
      var dataSubmit: Order = {
        customerId: user?._id,
        full_name: phone,
        tel: phone,
        email: "",
        address: ``,
        items: [
          { type: "simpack", itemId: simpack?._id, value: simpack?.price },
        ],
        total_amount: simpack?.price,
        prod_total_amount: simpack?.price,
        transport_fee: 0,
        discount_amount: 0,
        process_state: "WaitProcessing",
        payment_state: "WaitToPay",
        payment_method: method,
      };
      if (!method) {
        throw " Bạn chưa chọn hình thức thanh toán";
      }
      // alert(JSON.stringify(dataSubmit))

      var orderId: any;
      await createOrder(dataSubmit)
        .then(async (v) => {
          setLoading(false);
          successToast(
            "Đặt hàng thành công",
            "Bạn đã đặt hàng thành công ,đơn hàng của bạn đã được chuyển đến bộ phận quản lý",
          );
          pushPathName(
            router,
            dispatch,
            `/plans/payments?order=${v}&nosim=true`,
          );
          orderId = v;
          if (method === "Bank") {
            return "1";
          } else if (method === "Wallet") {
            return getOrderLink({
              orderId: v,
              amount: dataSubmit.total_amount ?? 0,
              orderInfo: "test",
            });
          }
        })
        .then((val) => {
          setLoading(false);
          if (val === "1") {
            pushPathName(
              router,
              dispatch,
              `/pay?order=${orderId}&type=simpack`,
            );
          }
          if (val?.paymentUrl) {
            router.push(val?.paymentUrl);
          }
        })
        .catch((e) => {
          setLoading(false);
          errorToast("Thanh toán thất bại", e as string);
        });
    } catch (err) {
      setLoading(false);
      errorToast("Thanh toán thất bại", err as string);
    }
  };

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId).then((v) => {
        if (v) {
          dispatch(setPhone(v.tel));
          dispatch(setSeleted(v.i));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" flex lg:flex-row lg:items-start lg:justify-between flex-col items-center mb-28">
      <div className="bg-white lg:w-[652px] w-3/4 border-m_gray border-2 rounded-lg p-5">
        <div className="text-base font-bold mb-3">Chọn loại gói cước</div>
        <Radio.Group
          className="flex"
          value={type}
          defaultValue={0}
          onChange={(v: RadioChangeEvent) => { }}
        >
          <Radio value={0} >
            <h1 className="ml-3 text-base">Gói cước</h1>
          </Radio>
          <div className="lg:w-40" />
          <Radio value={1} disabled>
            <h1 className="ml-3 text-base">Gói cước kèm sim</h1>
          </Radio>
        </Radio.Group>
        <Divider />
        <div className="w-full mt-8 mb-10">
          <label className="font-semibold text-base" htmlFor="phone">
            Số điện thoại nạp cước<span className="text-m_red">*</span>
          </label>
          <Input value={phone} disabled className="h-14 mt-2" />
        </div>
        <Divider />
        <div className="mt-8 w-full flex flex-col items-start">
          <h4 className="font-semibold text-xl">Thông tin gói cước</h4>
        </div>

        <div className="flex mt-5">
          <p className="lg:text-base text-xs font-bold">
            {simpack ? simpack.telco?.toUpperCase() : "VIETTEL99"}{" "}
          </p>
          <div className="h-5 w-0.5 bg-gray-300 mx-2 text-base" />
          <p className="lg:text-base text-xs">30 ngày</p>
        </div>
        <div className="text-m_red lg:text-4xl text-2xl font-bold mt-2 mb-5">
          <FormattedNumber
            value={simpack ? simpack.price ?? 0 : 0}
            style="currency"
            currency="VND"
          />
        </div>
        {(simpack?.description ?? "").split("\n").map(
          (e, i) =>
            e && (
              <div key={i} className="flex mb-3 items-start">
                <CheckOutlined
                  className="lg:text-xl text-base mr-2"
                  style={{ color: "green" }}
                />
                <div className="lg:text-base text-sm">{e}</div>
              </div>
            ),
        )}
        <Divider />
        <div className="mt-8 w-full flex flex-col items-start mb-8">
          <h4 className="font-semibold text-xl">Hình thức thanh toán</h4>
        </div>
        <Radio.Group
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className={` w-full`}
        >
          <Radio
            value={"Wallet"}
            className={`${method === "Wallet" ? `bg-m_gray border-sky-700` : `border-m_gray`
              }  border-2 pl-3 w-full py-[22px] rounded-xl flex flex-row relative h-[68px]`}
          >
            <div className="flex justify-between w-full">
              <div className="lg:text-base text-xs">Thanh Toán qua VNPAYQR</div>
              <Image
                className="absolute right-1 top-1"
                src="/images/apota.png"
                alt="apota"
                loading="lazy"
                width={100}
                height={60}
              />
            </div>
          </Radio>
          <div className="h-5" />
          {/* <Radio
            value={"Cod"}
            className={`${method === "Cod" ? `bg-m_gray border-sky-700` : `border-m_gray`
              } border-2 pl-3 w-full py-3 rounded-xl flex flex-row relative mt-6 mb-6`}
          >
            <div>
              <div className="text-base">Thanh toán COD</div>
              <div className="text-sm">
                (Thanh toán trực tiếp cho Đơn vị vận chuyển)
              </div>
            </div>
          </Radio> */}

          <Radio
            value={"Bank"}
            className={`${method === "Bank" ? `bg-m_gray border-sky-700` : `border-m_gray`
              } border-2 pl-3 w-full py-[22px] rounded-xl flex flex-row relative h-[68px]`}
          >
            <div className="lg:text-base text-sm">Thanh toán qua tài khoản ngân hàng</div>
          </Radio>
        </Radio.Group>
      </div>

      <div className="bg-white lg:w-[456px] w-3/4 border-m_gray border-2 rounded-lg h-fit ">
        <div className="p-5 h-full">
          <div className="text-xl font-semibold mb-3">Đơn hàng (1)</div>

          <div className="flex w-full justify-between">
            <p className="font-bold text-xl">Cước data - {simpack?.telco}</p>
            <CloseOutlined />
          </div>

          <div className="flex w-full justify-between my-4">
            <p className="text-base">Tên gói cước</p>{" "}
            <p className="font-bold text-base">{simpack?.code}</p>
          </div>
          <div className="flex w-full justify-between my-4">
            <p className="text-base">CK10 (Chu kỳ 30 ngày)</p>
            <div className="font-bold text-base">
              <FormattedNumber
                value={simpack ? simpack.price ?? 0 : 0}
                style="currency"
                currency="VND"
              />
            </div>
          </div>

          <button
            onClick={() => pushPathName(router, dispatch, "/plans")}
            className="underline underline-offset-4 text-sm text-sky-700"
          >
            Đổi gói cước
          </button>
          <Divider />
          <Input
            className="h-11 relative"
            placeholder="Nhập mã giảm giá"
            suffix={
              <button
                onClick={() => { }}
                className="font-semibold text-sm right-0 absolute h-[42px] text-m_red bg-[#FFF4F0] w-[86px] rounded-r-md"
              >
                {" "}
                Áp dụng
              </button>
            }
          />
          <Divider />
          <div className="flex w-full justify-between my-4">
            <p className="text-base">Tổng tiền hàng</p>
            <div className="font-bold text-base">
              <FormattedNumber
                value={simpack ? simpack.price ?? 0 : 0}
                style="currency"
                currency="VND"
              />
            </div>
          </div>

          <div className="flex w-full justify-between my-4">
            <p className="text-base">Giảm giá</p>
            <div className="font-bold text-base">
              <FormattedNumber value={0} style="currency" currency="VND" />
            </div>
          </div>

          <div className="flex items-start">
            <Checkbox className="pr-2" />
            <div className="text-base">
              {/* Bằng việc nhấn thanh toán, Quý khách đồng ý với{" "} */}
              <span className="text-sm">
                Tôi xác nhận thông tin đơn hàng đã chính xác và xác nhận đồng ý với <button className="text-m_red text-sm" onClick={() => { pushPathName(router, dispatch, '/resolution?id=6555ca7968709b3551d5b141') }}>Điều khoản sử dụng</button> và các Chính sách của SimTel.vn{" "}
              </span>
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex justify-between mx-5 mb-8 items-center">
          <div className="flex flex-col">
            <p className="text-base">Tổng cộng</p>
            <div className="lg:text-2xl text-lg font-bold">
              <FormattedNumber
                value={simpack ? simpack.price ?? 0 : 0}
                style="currency"
                currency="VND"
              />
            </div>
          </div>
          <Button
            onClick={(_) => {
              handleOrder();
            }}
            loading={loading}
            className="lg:w-[177px] w-[136px] bg-m_red text-white border-m_red text-base font-semibold h-12"
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
}

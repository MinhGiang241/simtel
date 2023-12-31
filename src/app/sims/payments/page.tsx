"use client";
import { setPath } from "@/GlobalRedux/path/pathSlice";
import { RootState } from "@/GlobalRedux/store";
import { District, Province, Ward } from "@/interfaces/province";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import {
  getProvinceQLTN,
  getDistricts,
  getWards,
} from "@/services/api/provinces";
import { FormikErrors, useFormik } from "formik";
import { Button, Divider, Input, Radio, RadioChangeEvent } from "antd";
import MInput from "@/app/components/config/MInput";
import MDropdown from "@/app/components/config/MDropdown";
import MTextArea from "@/app/components/config/MTextArea";
import {
  createOrder,
  getOrderLink,
  getOrderById,
} from "@/services/api/orderApi";
import { Order, SimPack } from "@/interfaces/data";
import { errorToast, successToast } from "@/app/components/modals/CustomToast";
import { pushPathName } from "@/services/routes";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { FormattedNumber } from "react-intl";
import { useSearchParams } from "next/navigation";
import PlanDetailModal from "@/app/plans/modals/PlanDetailModal";
import { setSimSelected } from "@/GlobalRedux/Sim/SimSlice";
import {
  getRandomSimpackBySim,
  getSimPackById,
} from "@/services/api/simPackApi";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  province?: string;
  district?: string;
  ward?: string;
  address: string;
  note: string;
}

export default function SimPayments() {
  const dispatch = useDispatch();
  const router = useRouter();

  const simpack = useSelector((state: RootState) => state.simPack.selected);
  var sim = useSelector((state: RootState) => state.sim.selected);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const config = useSelector((state: RootState) => state.config.config);
  const transportFee = config?.enable_trans_fee ? config?.transportfee : 0;
  var order: Order;

  const [method, setMethod] = useState<string>();
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [districtLoading, setDistrictLoading] = useState<boolean>(false);
  const [wardLoading, setWardLoading] = useState<boolean>(false);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [randSimpack, setRandSimpack] = useState<SimPack>();

  useEffect(() => {}, [districts, wards, provinces, sim]);

  const getDistrictListByProvinceId = async (value: string | undefined) => {
    await formik.setFieldValue("ward", undefined);
    await formik.setFieldValue("district", undefined);

    if (!value) {
      setDistricts([]);
      setWards([]);
    } else {
      setDistrictLoading(true);
      getDistricts({ provinceId: value })
        .then((v) => {
          if (v) {
            setDistricts(v);
          }
          setDistrictLoading(false);
        })
        .catch((err: any) => {
          setDistrictLoading(false);
        });
    }
  };

  const getWardListByDistrictId = async (value: string | undefined) => {
    await formik.setFieldValue("ward", undefined);
    if (!value) {
      setWards([]);
    } else {
      setWardLoading(true);
      getWards({ districtId: value })
        .then((v) => {
          console.log("sssss", v);

          setWardLoading(false);
          if (v) {
            setWards(v);
          }
        })
        .catch((err) => {
          setWardLoading(false);
        });
    }
  };

  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.name) {
      errors.name = "Không được để trống trường bắt buộc";
    }

    if (!values.phone) {
      errors.phone = "Không được để trống trường bắt buộc";
    } else if (values.phone.length < 8) {
      errors.phone = "Không ít hơn 8 ký tự";
    } else if (!/\d/.test(values.phone)) {
      errors.phone = "Số điện thoại không hợp lệ";
    }

    if (!values.email) {
      errors.email = "Không được để trống trường bắt buộc";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
    ) {
      errors.email = "Email không hợp lệ";
    }

    if (!values.province) {
      errors.province = "Không được để trống trường bắt buộc";
    }

    if (!values.district) {
      errors.district = "Không được để trống trường bắt buộc";
    }

    if (!values.ward) {
      errors.ward = "Không được để trống trường bắt buộc";
    }

    if (!values.address) {
      errors.address = "Không được để trống trường bắt buộc";
    }

    return errors;
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      note: "",
    },
    validate,
    onSubmit: async (values) => {
      var address = wards.find((i) => i._id === values.ward);
      try {
        setLoading(true);
        var dataSubmit: Order = {
          full_name: values.name,
          tel: values.phone,
          email: values.email,
          address: `${values.address}, ${address?.path_with_type ?? ""} `,
          items: [
            {
              type: "sim",
              itemId: sim?._id,
              value: sim?.price,
              telco: sim?.telco,
            },
          ],
          total_amount: (sim?.price ?? 0) + (transportFee ?? 0),
          prod_total_amount: sim?.price ?? 0,
          transport_fee: transportFee ?? 0,
          discount_amount: 0,
          process_state: "WaitProcessing",
          payment_state: "WaitToPay",
          payment_method: method,
          note: values.note,
          provinceId: values.province,
          districtId: values.district,
          wardId: values.ward,
          // customerId: undefined,
        };
        if (!method) {
          throw " Bạn chưa chọn hình thức thanh toán";
        }
        createOrder(dataSubmit)
          .then(async (v) => {
            setLoading(false);
            successToast(
              "Đặt hàng thành công",
              "Bạn đã đặt hàng thành công ,đơn hàng của bạn đã được chuyển đến bộ phận quản lý",
            );
            pushPathName(router, dispatch, `/sims/payments?order=${v}`);

            if (method === "Wallet") {
              return getOrderLink({
                orderId: v,
                amount: dataSubmit.total_amount,
                orderInfo: "test",
              });
            } else if (method === "Bank") {
              pushPathName(router, dispatch, `/pay?order=${v}&type=sim`);
            }
          })
          .then((v) => {
            if (v?.paymentUrl) {
              router.push(v?.paymentUrl);
            }
          });
      } catch (err) {
        setLoading(false);
        errorToast("Thanh toán thất bại", err as string);
      }
    },
  });

  const [open, setOpen] = useState<boolean>(false);
  const handleOk = (t: number) => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getSimPack();
    getProvinceQLTN().then((v) => {
      if (v) {
        setProvinces(v);
      }
    });
    if (orderId) {
      getOrderById(orderId)
        .then(async (v) => {
          console.log("order", v);
          if (v) {
            order = v;
            dispatch(setSimSelected(v.i));

            await getDistrictListByProvinceId(order.provinceId);
            await getWardListByDistrictId(order.districtId);
            formik.setFieldValue("name", order?.full_name);
            formik.setFieldValue("phone", order?.tel);
            formik.setFieldValue("email", order.email);
            formik.setFieldValue("address", order.address?.split(",")[0]);
            formik.setFieldValue("province", order.provinceId);
            formik.setFieldValue("district", order.districtId);
            formik.setFieldValue("ward", order.wardId);
            formik.setFieldValue("note", order.note);
            setMethod(order.payment_method);
            getSimPackById(v.i?.simPackId).then((value) => {
              if (value) {
                setRandSimpack(value);
              }
            });
          }
        })
        .catch((e) => {
          console.log("err e", e);
        });
    }
    // if (!simpack) {
    //   dispatch(setPath('/plans/'))
    //   redirect('/plans/')
    // } else {
    //   setLoading(false)
    // }
  }, []);

  const getSimPack = () => {
    getRandomSimpackBySim("Wintel", sim, randSimpack?._id).then((v) => {
      console.log("v", v);
      if (v) {
        setRandSimpack(v);
      }
    });
  };

  return (
    <div className="w-full bg-m_backgound  flex flex-col items-center min-h-[70rem]">
      <div className="w-full h-[88px]" />
      <div className="max-w-[1140px] w-full">
        <div className="h-full mt-10 mb-10">
          <p className="text-base">
            {"Mua sim >"} <span className="font-semibold">Thanh toán</span>
          </p>
        </div>
        {loading ? (
          <div className="w-full flex justify-center items-center h-96">
            <MoonLoader color="#E50914" />
          </div>
        ) : (
          <div>
            <div className=" flex justify-between mb-28">
              <div className="bg-white  w-7/12 border-m_gray border-2 rounded-lg p-5">
                <div className="mt-8 w-full flex flex-col items-start mb-5">
                  <h4 className="font-semibold text-lg">Thông tin nhận hàng</h4>
                </div>

                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    formik.handleSubmit();
                  }}
                >
                  <div className="flex w-full mb-3">
                    <MInput
                      className="h-14"
                      required
                      title="Họ tên"
                      id="name"
                      name="name"
                      placeholder="Nhập họ tên"
                      onChange={formik.handleChange}
                      error={formik.errors.name}
                      touch={formik.touched.name}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    <div className="w-5" />
                    <MInput
                      className="h-14"
                      required
                      title="Số điện thoại liên hệ"
                      id="phone"
                      name="phone"
                      placeholder="Nhập số điện thoại"
                      onChange={formik.handleChange}
                      error={formik.errors.phone}
                      touch={formik.touched.phone}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                  </div>

                  <div className="flex w-full mb-3">
                    <MInput
                      className="h-14"
                      required
                      title="Email nhận eSIM"
                      id="email"
                      name="email"
                      placeholder="Nhập email"
                      onChange={formik.handleChange}
                      error={formik.errors.email}
                      touch={formik.touched.email}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                    <div className="w-5" />
                    <MDropdown
                      options={provinces.map((e: Province) => ({
                        value: e._id!,
                        label: e.name!,
                      }))}
                      allowClear
                      className="h-14"
                      required
                      title="Tỉnh/Thành phố"
                      id="province"
                      name="province"
                      placeholder="Chọn Tỉnh/Thành phố"
                      setValue={formik.setFieldValue}
                      error={formik.errors.province}
                      value={formik.values.province}
                      touch={formik.touched.province}
                      onBlur={formik.handleBlur}
                      afterSetValueFunction={getDistrictListByProvinceId}
                    />
                  </div>

                  <div className="flex w-full mb-3">
                    <MDropdown
                      allowClear
                      options={districts.map((e: District) => ({
                        value: e._id!,
                        label: e.name!,
                      }))}
                      className="h-14"
                      required
                      title="Quận/Huyện"
                      id="district"
                      name="district"
                      placeholder="Chọn Quận/Huyện"
                      setValue={formik.setFieldValue}
                      error={formik.errors.district}
                      touch={formik.touched.district}
                      value={formik.values.district}
                      onBlur={formik.handleBlur}
                      afterSetValueFunction={getWardListByDistrictId}
                      loading={districtLoading}
                    />
                    <div className="w-5" />
                    <MDropdown
                      allowClear
                      options={wards.map((e: District) => ({
                        value: e._id!,
                        label: e.name!,
                      }))}
                      className="h-14"
                      required
                      title="Phường/Xã"
                      id="ward"
                      name="ward"
                      placeholder="Chọn Phường/Xã"
                      setValue={formik.setFieldValue}
                      error={formik.errors.ward}
                      touch={formik.touched.ward}
                      value={formik.values.ward}
                      onBlur={formik.handleBlur}
                      loading={wardLoading}
                    />
                  </div>
                  <MInput
                    className="h-14 mb-3"
                    required
                    title="Địa chỉ chi tiết"
                    id="address"
                    name="address"
                    placeholder="Nhập địa chỉ chi tiết"
                    onChange={formik.handleChange}
                    error={formik.errors.address}
                    touch={formik.touched.address}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                  />
                  <MTextArea
                    title="Ghi chú"
                    id="note"
                    name="note"
                    placeholder="Nhập nội dung"
                    onChange={formik.handleChange}
                    error={formik.errors.note}
                    touch={formik.touched.note}
                    onBlur={formik.handleBlur}
                    value={formik.values.note}
                  />
                </form>

                <Divider />
                <div className="mt-8 w-full flex flex-col items-start mb-8">
                  <h4 className="font-semibold text-lg">
                    Hình thức thanh toán
                  </h4>
                </div>
                <Radio.Group
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className={` w-full`}
                >
                  <Radio
                    value={"Wallet"}
                    className={`${
                      method === "Wallet"
                        ? `bg-m_gray border-sky-700`
                        : `border-m_gray`
                    }  border-2 pl-3 w-full py-[22px] rounded-xl flex flex-row relative`}
                  >
                    <div className="flex justify-between w-full">
                      <div>Thanh toán online</div>
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

                  <Radio
                    value={"Cod"}
                    className={`${
                      method === "Cod"
                        ? `bg-m_gray border-sky-700`
                        : `border-m_gray`
                    } border-2 pl-3 w-full py-3 rounded-xl flex flex-row relative mt-6 mb-6`}
                  >
                    <div>
                      <div className="text-base">Thanh toán COD</div>
                      <div className="text-sm">
                        (Thanh toán trực tiếp cho ngân hàng)
                      </div>
                    </div>
                  </Radio>

                  <Radio
                    value={"Bank"}
                    className={`${
                      method === "Bank"
                        ? `bg-m_gray border-sky-700`
                        : `border-m_gray`
                    } border-2 pl-3 w-full py-[22px] rounded-xl flex flex-row relative`}
                  >
                    <div className="text-base">
                      Thanh toán qua tài khoản ngân hàng
                    </div>
                  </Radio>
                </Radio.Group>
              </div>

              <div className="bg-white w-2/5 border-m_gray border-2 rounded-lg h-fit">
                <div className="p-5 h-full">
                  <div className="text-base font-bold mb-3">Đơn hàng (1)</div>
                  <div className="flex w-full justify-between">
                    <p className="font-bold text-lg">
                      {sim?.msid} - {sim?.telco}
                    </p>
                    <CloseOutlined />
                  </div>

                  <button
                    onClick={() => {
                      pushPathName(router, dispatch, "/sims");
                    }}
                    className="underline underline-offset-4 text-base text-sky-700 mt-2"
                  >
                    Đổi số
                  </button>

                  <div className="flex w-full justify-between my-4">
                    <p className="text-base">Loại sim</p>{" "}
                    <p className="font-bold text-base">
                      {sim?.type === "Physical" ? "Sim vật lý" : "eSIM"}
                    </p>
                  </div>

                  <div className="flex w-full justify-between my-4">
                    <p className="text-base">Nhà mạng</p>{" "}
                    <p className="font-bold text-base">{sim?.telco}</p>
                  </div>

                  <div className="flex w-full justify-between my-4">
                    <p className="text-base">Phí hòa mạng</p>
                    <div className="font-bold text-base">
                      <FormattedNumber
                        value={0}
                        style="currency"
                        currency="VND"
                      />
                    </div>
                  </div>

                  <div className="flex w-full justify-between my-4">
                    <p className="text-base">CK10 (Chu kỳ 30 ngày)</p>
                    <div className="font-bold text-base">
                      <FormattedNumber
                        value={sim ? sim.price ?? 0 : 0}
                        style="currency"
                        currency="VND"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="underline underline-offset-4 text-base text-sky-700"
                  >
                    Chi tiết gói cước
                  </button>
                  <Divider />
                  <div className="flex justify-center w-full mb-5">
                    <Button
                      onClick={() => pushPathName(router, dispatch, "/sims")}
                      className="bg-white border border-m_red text-m_red w-[148px] h-10 rounded-lg font-semibold text-sm"
                      icon={<PlusOutlined />}
                    >
                      Mua thêm
                    </Button>
                  </div>
                  <Input
                    className="h-11 relative"
                    placeholder="Nhập mã giảm giá"
                    suffix={
                      <button
                        onClick={() => {}}
                        className="font-bold text-sm right-0 absolute h-[42px]   text-m_red bg-[#FFF4F0] w-[86px] rounded-r-md"
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
                        value={sim ? sim.price ?? 0 : 0}
                        style="currency"
                        currency="VND"
                      />
                    </div>
                  </div>

                  <div className="flex w-full justify-between my-4">
                    <p className="text-base">Phí vận chuyển</p>
                    <div className="font-bold text-base">
                      <FormattedNumber
                        value={transportFee ?? 0}
                        style="currency"
                        currency="VND"
                      />
                    </div>
                  </div>

                  <div className="flex w-full justify-between my-4">
                    <p className="text-base">Giảm giá</p>
                    <div className="font-bold text-base">
                      <FormattedNumber
                        value={0}
                        style="currency"
                        currency="VND"
                      />
                    </div>
                  </div>

                  <div className="text-base">
                    Bằng việc nhấn thanh toán, Quý khách đồng ý với{" "}
                    <span className="text-m_red active:opacity-70 cursor-pointer select-none">
                      Điều kiện giao dịch chung và Chính sách vận chuyển giao
                      nhận hàng{" "}
                    </span>
                    của Simtel
                  </div>
                </div>
                <Divider />
                <div className="flex justify-between mx-5 mb-8 items-center">
                  <div className="flex flex-col">
                    <p className="text-base">Tổng cộng</p>
                    <div className="text-2xl font-bold">
                      <FormattedNumber
                        value={sim ? (sim.price ?? 0) + (transportFee ?? 0) : 0}
                        style="currency"
                        currency="VND"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={async (_) => {
                      formik.handleSubmit();
                      formik.setFieldTouched("province", true);
                      formik.setFieldTouched("district", true);
                      formik.setFieldTouched("ward", true);
                    }}
                    loading={loading}
                    className="w-[177px] bg-m_red text-white border-m_red text-base font-semibold h-12"
                  >
                    Thanh toán
                  </Button>
                  <button onClick={() => formik.handleSubmit()}></button>
                </div>
                {/*  <Button onClick={() => { router.push('/plans/payments?order=111111') }}>dkfasklfjaskfjsaklfjaslk</Button> */}
              </div>
              {randSimpack && (
                <PlanDetailModal
                  typeView={1}
                  open={open}
                  onOk={handleOk}
                  onCacel={handleCancel}
                  simpack={randSimpack!}
                  isView
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

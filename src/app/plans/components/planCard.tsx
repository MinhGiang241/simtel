"use client";
import React, { useState } from "react";
import MobileIcon from "./icons/mobile.svg";
import DatabaseIcon from "./icons/database.svg";
import { RightOutlined, CheckOutlined } from "@ant-design/icons";
import { SimPack } from "@/interfaces/data";
import { FormattedNumber } from "react-intl";
import { Button, Modal } from "antd";
import PlanDetailModal from "../modals/PlanDetailModal";
import ConfirmModal from "../modals/ConfirmModal";
import InFormModal from "../modals/InFormModal";
import ErrorModal from "../modals/ErrorModal";
import { pushPathName } from "@/services/routes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setSeleted, setSeletedType } from "@/GlobalRedux/SimPack/SimPackSlice";

export default function PlanCard({ simpack }: { simpack: SimPack }) {
  const router = useRouter();
  const dispatch = useDispatch();
  var simpactContenCard = simpack.description?.split("\n") ?? [];

  if (simpactContenCard.length > 3) {
    simpactContenCard = simpactContenCard.slice(0, 3);
  }

  const [open, setOpen] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openInform, setOpenInform] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);

  const [type, setType] = useState<number>(0);
  const [errorString, setErrorString] = useState<string>();

  const handleOk = (t: number, simpack: SimPack) => {
    setType(t);
    setOpen(false);
    if (t === 1) {
      dispatch(setSeleted(simpack));
      dispatch(setSeletedType(1));
      pushPathName(router, dispatch, "/plans/payments");
    } else {
      setOpenConfirm(true);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOkConfirm = (isError: boolean, e?: string) => {
    setOpenConfirm(false);
    if (isError) {
      setOpenError(true);
    } else {
      pushPathName(router, dispatch, "/plans/payments");
      //setOpenInform(true)
      setErrorString(e);
    }
  };
  const handleCancelConfirm = () => {
    setOpenConfirm(false);
  };
  const handleOkInform = () => {
    setOpenInform(false);
    setOpenError(true);
  };
  const handleCancelInform = () => {
    setOpenInform(false);
  };

  const handleOkError = () => { };
  const handleCancelError = () => {
    setOpenError(false);
  };

  return (
    <div className="bg-m_red lg:h-[420px] lg:w-[359px] w-[170px] h-[240px] mb-8 rounded-2xl border-m_red border-2 m-2">
      <div className="bg-white lg:h-[404px] lg:w-[355px] w-[165px] h-[231px] lg:mt-3 rounded-2xl flex flex-col mt-1 lg:pt-5 items-center p-1">
        <div className="flex w-ful justify-center items-center">
          <p className="text-xs lg:text-base font-extrabold">
            {simpack.telco?.toUpperCase()}{" "}
          </p>
          <div className="h-4 w-0.5 bg-gray-300 mx-2" />
          <p className="lg:text-base text-xs">30 ngày</p>
        </div>
        <div className="text-m_red text-xs lg:text-[30px] lg:leading-10 leading-4 text-center font-black mt-2">
          <FormattedNumber
            value={simpack.price ?? 0}
            style="currency"
            currency="VND"
          />
        </div>
        <div className="w-[148px] lg:w-[290px] h-0.5 bg-m_gray mx-auto lg:mt-6 lg:mb-6 mb-2" />
        <div className="lg:h-40 flex flex-col justify-between text-ellipsis overflow-clip">
          {simpactContenCard.map((e, i) => (
            <div className="lg:mx-8 flex items-baseline text-ellipsis" key={i}>
              <CheckOutlined
                className="mr-1 lg:mr-4 lg:text-xl text-xs"
                style={{ color: "green" }}
              />
              <div className="text-xs lg:text-base">{e}</div>
            </div>
          ))}
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="border-m_red bg-m_red text-white lg:w-[164px] text-base font-semibold lg:h-[48px] rounded-lg lg:mt-7 mt-3 w-[111px] h-[32px] flex justify-center items-center"
        >
          Đăng ký
        </Button>
      </div>
      <PlanDetailModal
        open={open}
        onOk={handleOk}
        onCacel={handleCancel}
        simpack={simpack}
      />
      <ConfirmModal
        open={openConfirm}
        onOk={handleOkConfirm}
        onCancel={handleCancelConfirm}
        simpack={simpack}
        type={type}
      />
      <InFormModal
        open={openInform}
        onOk={handleOkInform}
        onCancel={handleCancelInform}
      />
      <ErrorModal
        open={openError}
        onOk={handleOkError}
        onCancel={handleCancelError}
        error={errorString}
      />
    </div>
  );
}

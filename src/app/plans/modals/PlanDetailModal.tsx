import { SimPack } from "@/interfaces/data";
import { Button, Divider, Modal, Radio, RadioChangeEvent } from "antd";
import React, { useState } from "react";
import { FormattedNumber } from "react-intl";
import { CheckOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setSeleted, setSeletedType } from "@/GlobalRedux/SimPack/SimPackSlice";

interface Props {
  open: boolean;
  onOk: (type: number, simpack: SimPack) => void;
  onCacel: () => void;
  simpack?: SimPack;
  isView?: boolean;
  typeView?: number;
}

export default function PlanDetailModal({
  open,
  onOk,
  onCacel,
  simpack,
  isView,
  typeView,
}: Props) {
  const [type, setType] = useState(0);
  const dispatch = useDispatch();

  return (
    <Modal
      footer={<div />}
      width={613}
      open={open}
      onOk={() => onOk(type, simpack!)}
      onCancel={(_) => onCacel()}
    >
      <div className="lg:mx-10">
        <div className="flex justify-center mb-8 mt-1">
          <h4 className="text-2xl font-bold">Chi tiết gói cước</h4>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-xl font-bold">
            {simpack?.code}{" "}
          </p>
          <div className="h-5 w-0.5 bg-gray-300 mx-2 text-base" />
          <p className="text-base font-normal">30 ngày</p>
        </div>
        <div className="flex justify-center text-[32px] leading-10 font-bold text-m_red">
          <FormattedNumber
            value={simpack?.price ?? 0}
            style="currency"
            currency="VND"
          />
        </div>

        <div className="flex justify-center text-base font-bold">
          {simpack?.telco?.toUpperCase()}
        </div>
        <Divider />
        <div className="mt-7 mb-7">
          {(simpack?.description ?? "").split("\n").map(
            (e, i) =>
              e && (
                <div key={i} className="flex mb-3 items-start">
                  <CheckOutlined
                    className="text-base mr-2 mt-1"
                    style={{ color: "green" }}
                  />
                  <div className="text-base">{e}</div>
                </div>
              ),
          )}
        </div>
        <Divider />
        <div className="text-base font-bold mb-3">Chọn loại gói cước</div>
        <Radio.Group
          disabled={isView}
          className="flex"
          value={typeView ?? type}
          onChange={(v: RadioChangeEvent) => {
            setType(v.target.value);
          }}
        >
          <Radio value={0}>
            <h1 className="ml-3 text-base flex items-center">Gói cước</h1>
          </Radio>
          <div className="flex-1" />
          <Radio value={1}>
            <h1 className="ml-3 text-base flex items-center">Gói cước kèm sim</h1>
          </Radio>
        </Radio.Group>
        <div className="flex justify-center mt-6">
          <Button
            onClick={() => {
              dispatch(setSeletedType(type));
              console.log("type", type);
              onOk(type, simpack!);
            }}
            className="bg-m_red text-white w-[165px] h-12 px-3 text-base font-semibold rounded-lg border-m_red"
          >
            {isView ? "Đóng" : "Mua ngay"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

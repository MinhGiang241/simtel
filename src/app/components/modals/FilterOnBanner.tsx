import { setSimTelco } from "@/GlobalRedux/Sim/SimSlice";
import { setTelco } from "@/GlobalRedux/SimPack/SimPackSlice";
import { RootState } from "@/GlobalRedux/store";
import { getSimFunction } from "@/services/sim/simServices";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface Props {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

var simCard = [
  {
    key: 1,
    value: "Sim data",
  },
  {
    key: 2,
    value: "sim thường kèm cước",
  },
  {
    key: 3,
    value: "Sim số đẹp",
  },
  {
    key: 4,
    value: "Sim thường không kèm cước",
  },
];

export default function FilterOnBanner({ open, onOk, onCancel }: Props) {
  const [selectedCard, setSelectedCard] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const telcos = useSelector((state: RootState) => state.config.telcos);
  const page = useSelector((state: RootState) => state.sim.page);
  const type = useSelector((state: RootState) => state.sim.type);
  const telcoOptions = telcos.map((i) => ({
    key: i._id,
    value: i.name,
  }));
  const dispatch = useDispatch();

  return (
    <Modal
      className="h-[400px]"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={800}
      footer={<div />}
    >
      <div className="mb-5">
        <div className="w-full text-center text-2xl font-bold">Bộ lọc</div>
        <div className="mb-2 font-semibold text-base">Nhà mạng</div>
        <div>
          {telcoOptions?.map((x, key) => (
            <button
              onClick={() => setSelected(x.value)}
              key={key}
              className={`${
                selected == x.value
                  ? "bg-[#EBF3FA] border border-[#3E6BBB]"
                  : ""
              } border p-2 rounded-3xl h-12 px-4 mr-4 text-base`}
            >
              {x.value}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 font-semibold text-base">Loại sim</div>
        <div>
          {simCard?.map((e, k) => (
            <button
              onClick={() => setSelectedCard(e.value)}
              key={k}
              className={`${
                selectedCard == e.value
                  ? "bg-[#EBF3FA] border border-[#3E6BBB]"
                  : ""
              }  border p-2 rounded-3xl h-12 px-4 mr-4 text-base`}
            >
              {e.value}
            </button>
          ))}
        </div>
        <div className="w-full flex justify-center">
          <Button
            onClick={() => {
              dispatch(setSimTelco(selected));
              getSimFunction(dispatch, page, type, selected, true);
              onCancel();
            }}
            className="text-white bg-m_red border-m_red mt-5 w-[165px] h-12 text-base font-semibold"
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
    </Modal>
  );
}

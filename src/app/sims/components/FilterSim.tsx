import { setSimTelco, setSimType } from "@/GlobalRedux/Sim/SimSlice";
import { RootState } from "@/GlobalRedux/store";
import { getAllSim } from "@/services/api/simApi";
import { getSimFunction } from "@/services/sim/simServices";
import { Select, Space } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function FilterSim() {
  const { Option } = Select;
  const dispatch = useDispatch();
  const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const branch = [
    "Viettel",
    "Vinaphone",
    "Mobifone",
    "Vietnamobile",
    "Gmobile",
    "Itelecom",
    "Wintel",
  ];
  const simTypes = [
    { value: "Physical", label: "Sim vật lý" },
    { value: "Esim", label: "Esim" },
  ];
  const price = ["50.000đ", "100.000đ", "150.000đ"];

  const page = useSelector((state: RootState) => state.sim.page);
  const telco = useSelector((state: RootState) => state.sim.telco);
  const type = useSelector((state: RootState) => state.sim.type);
  const search = useSelector((state: RootState) => state.sim.search);
  const not = useSelector((state: RootState) => state.sim.not);

  const telcos = useSelector((state: RootState) => state.config.telcos);
  const loadingTelcos = useSelector(
    (state: RootState) => state.config.loadingTelcos,
  );

  const handleSelectType = (value: any) => {
    dispatch(setSimType(value === "Sim vật lý" ? "Physical" : value));
    getSimFunction(
      dispatch,
      page,
      value === "Sim vật lý" ? "Physical" : value,
      telco,
      true,
      search,
      not,
    );
  };

  const handleSelectBranch = (value: any) => {
    dispatch(setSimTelco(value));
    getSimFunction(dispatch, page, type, value, true, search, not);
  };

  const handleSelectPrice = (value: any) => {};

  useEffect(() => {}, [telco]);

  return (
    <>
      <div className="flex w-6/12">
        <div className="w-80 h-14 mr-4">
          {/* <label className='mb-2 font-bold' aria-label='branch'>Nhà mạng</label> */}
          <Select
            allowClear
            aria-label="branch"
            style={{ width: "100%", height: "3rem" }}
            placeholder="Chọn nhà mạng"
            defaultValue={telco}
            onChange={handleSelectBranch}
            optionLabelProp="branch"
            value={telco}
          >
            {...telcos.map((v) => (
              <Option value={v.name} key={v._id} label={v.name}>
                <Space>{v.name}</Space>
              </Option>
            ))}
          </Select>
        </div>

        <div className="w-80 h-14 mr-4">
          {/* <label className='mb-2 font-bold' aria-label='sim'>Loại sim</label> */}
          <Select
            allowClear
            aria-label="sim"
            style={{ width: "100%", height: "3rem" }}
            placeholder="Chọn loại sim"
            // defaultValue={['Sim vật lý']}
            onChange={handleSelectType}
            optionLabelProp="sim"
          >
            {...simTypes.map((v) => (
              <Option value={v.label} key={v.value} label={v.label}>
                <Space>{v.label}</Space>
              </Option>
            ))}
          </Select>
        </div>

        <div className="w-80 h-14 mr-4">
          {/* <label className='mb-2 font-bold' aria-label='sim'>Loại sim</label> */}
          <Select
            allowClear
            aria-label="sim"
            style={{ width: "100%", height: "3rem" }}
            placeholder="Chọn giá tiền"
            // defaultValue={['Sim vật lý']}
            onChange={handleSelectPrice}
            optionLabelProp="sim"
          >
            {...price.map((v) => (
              <Option value={v} key={v} label={v}>
                <Space>{v}</Space>
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}

import { setSimPrice, setSimTelco, setSimType } from "@/GlobalRedux/Sim/SimSlice";
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
  const prices = [
    { from: 0, to: 100000, value: 'Sim giá dưới 100 nghìn' },
    { from: 100000, to: 200000, value: 'Sim giá 100-200 nghìn' },
    { from: 200000, to: 500000, value: 'Sim giá 200-500 nghìn' },
    { from: 500000, to: 1000000, value: 'Sim giá 500 - 1 triệu' },
    { from: 1000000, to: 3000000, value: 'Sim giá 1 - 3 triệu' },
    { from: 3000000, to: 5000000, value: 'Sim giá 3 - 5 triệu' },
    { from: 5000000, to: 10000000, value: 'Sim giá 5 - 10 triệu' },
    { from: 10000000, to: 50000000, value: 'Sim giá 10 - 50 triệu' },
    { from: 50000000, to: 100000000, value: 'Sim giá 50 - 100 triệu' },
    { from: 100000000, to: 200000000, value: 'Sim giá 100 - 200 triệu' },
    { from: 200000000, to: 300000000, value: 'Sim giá 200 - 300 triệu' },
    { from: 300000000, value: 'Sim giá trên 300 triệu' },
  ]

  //["50.000đ", "100.000đ", "150.000đ"];

  /**
   * [  {from: 0, to: 4000 ,value '0-4000'}  ]
   * 
   */

  const page = useSelector((state: RootState) => state.sim.page);
  const telco = useSelector((state: RootState) => state.sim.telco);
  const type = useSelector((state: RootState) => state.sim.type);
  const search = useSelector((state: RootState) => state.sim.search);
  const not = useSelector((state: RootState) => state.sim.not);
  const price = useSelector((state: RootState) => state.sim.price);

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
      price,
    );
  };

  const handleSelectBranch = (value: any) => {
    dispatch(setSimTelco(value));
    getSimFunction(dispatch, page, type, value, true, search, not, price);
  };

  const handleSelectPrice = (value: any) => {
    console.log(value);
    var prc = prices.find(i => i.value == value);
    dispatch(setSimPrice(`${prc?.from}-${prc?.to}`))
    getSimFunction(dispatch, page, type, telco, true, search, not, `${prc?.from}-${prc?.to}`);
  };


  useEffect(() => { }, [telco]);

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
            {...prices.map((v) => (
              <Option value={v.value} key={v.value} label={`${v.from} - ${v.to}`}>
                <Space>{v.value}</Space>
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}

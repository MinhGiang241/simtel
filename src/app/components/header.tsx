"use client";
import React, { useEffect, useState } from "react";
import Logo from "./logo/logo.svg";
import Cart from "./logo/cart.svg";
import {
  ShoppingCartOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Button, Dropdown, Menu, MenuProps, Modal } from "antd";
import Login from "./modals/Login";
import SignUp from "./modals/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { setPath } from "@/GlobalRedux/path/pathSlice";
import { pushPathName } from "@/services/routes";
import { AuthState, userLogout } from "@/GlobalRedux/Auth/authSlice";
import { successToast } from "./modals/CustomToast";
import { DownOutlined } from "@ant-design/icons";
import { Drawer, Collapse, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import MLink from "@/app/components/config/Mlink";
import { getActiveTelco } from "@/services/api/config";
import { setLoadingTelcos, setTelcos } from "@/GlobalRedux/config/ConfigSlice";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { MenuItemProps } from "rc-menu";
import { setIsData, setTelco } from "@/GlobalRedux/SimPack/SimPackSlice";
import { getSimFunction } from "@/services/sim/simServices";
import { setSimTelco } from "@/GlobalRedux/Sim/SimSlice";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [confimLogOut, setConfirmLogOut] = useState(false);
  const [modalKey, setModalKey] = useState(Date.now());
  const [isLogin, setIslogin] = useState<boolean>();
  const pathname = useSelector((state: RootState) => state.path.value);
  const isAuth = useSelector((state: RootState) => state.auth.authState);
  const dispatch = useDispatch();
  const router = useRouter();

  const [hidden, setHidden] = useState(false);
  const showDrawer = () => {
    setHidden(true);
  };
  const onClose = () => {
    setHidden(false);
  };

  const carts = [
    {
      label: (
        <MLink className="text-base" link="/plans" onClick={() => { dispatch(setIsData(true)) }}>
          Gói cước thoại
        </MLink>
      ),
      key: "0",
    },
    {
      label: (
        <MLink className="text-base" link="/plans" onClick={() => { dispatch(setIsData(false)) }}>
          Gói cước data
        </MLink>
      ),
      key: "1",
    },
  ];

  const items = [
    {
      label: (
        <MLink className="text-base" link="/sims">
          Viettel
        </MLink>
      ),
      key: "0",
    },
    {
      label: (
        <MLink className="text-base" link="/sims">
          Vinaphone
        </MLink>
      ),
      key: "1",
    },
    {
      label: (
        <MLink className="text-base" link="/sims">
          Wintel
        </MLink>
      ),
      key: "2",
    },
    {
      label: (
        <MLink className="text-base" link="/sims">
          Vietnammobile
        </MLink>
      ),
      key: "3",
    },
    {
      label: (
        <MLink className="text-base" link="/sims">
          Mobifone
        </MLink>
      ),
      key: "4",
    },
  ];

  const activeTelcos = useSelector((state: RootState) => state.config.telcos);
  const page = useSelector((state: RootState) => state.sim.page);
  const telco = useSelector((state: RootState) => state.sim.telco);
  const type = useSelector((state: RootState) => state.sim.type);
  const not = useSelector((state: RootState) => state.sim.not);
  const search = useSelector((state: RootState) => state.sim.search);
  const price = useSelector((state: RootState) => state.sim.price);

  const loadingTelcos = useSelector(
    (state: RootState) => state.config.loadingTelcos,
  );

  var telcoOption: MenuProps["items"] = activeTelcos.map((i) => ({
    label: (
      <MLink
        onClick={() => {
          dispatch(setSimTelco(i.name));
          getSimFunction(dispatch, page, type, i.name, false, search, not, price);
        }}
        className="text-base"
        link="/sims"
      >
        {i.name}
      </MLink>
    ),
    key: i._id,
  }));

  const data = [
    {
      key: "1",
      label: (<div onClick={() => {
        pushPathName(router, dispatch, "/plans");
      }}>Gói cước</div>),
      children: (
        <div>
          <div className="mb-2">
            <MLink className="text-base text-black" link="/plans" onClick={() => { dispatch(setIsData(true)) }} >
              Gói cước thoại
            </MLink>
          </div>
          <div>
            <MLink className="text-base text-black" link="/plans" onClick={() => { dispatch(setIsData(false)) }}>
              Gói cước data
            </MLink>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (<div onClick={() => {
        pushPathName(router, dispatch, "/sims");
      }}>Gói cước</div>),
      children: (
        <div>

          {activeTelcos.map((v) => (<div key={v._id} className="mb-3">
            <MLink onClick={() => {
              dispatch(setSimTelco(v.name));
              getSimFunction(dispatch, page, type, v.name, false, search, not, price);
            }} className="text-base text-black" link="/sims">
              {v.name}
            </MLink>
          </div>))}
          {/* <div className="mb-3">
            <MLink className="text-base text-black" link="/sims">
              Viettel
            </MLink>
          </div>
          <div className="mb-3">
            <MLink className="text-base text-black" link="/sims">
              Vinaphone
            </MLink>
          </div>
          <div className="mb-3">
            <MLink className="text-base text-black" link="/sims">
              Wintel
            </MLink>
          </div>
          <div className="mb-3">
            <MLink className="text-base text-black" link="/sims">
              Vietnammobile
            </MLink>
          </div>
          <div>
            <MLink className="text-base text-black" link="/sims">
              Mobifone
            </MLink>
          </div> */}
        </div>
      ),
    },
    // {
    //   key: "3",
    //   label: "Nạp thẻ",
    //   children: <button onClick={() => {
    //     pushPathName(router, dispatch, "/cards");
    //   }}>Nạp thẻ</button>,
    // },
    {
      key: "4",
      label: "Khuyến mại",
      children: <button onClick={() => {
        pushPathName(router, dispatch, "/blog");
      }}>Khuyến mại</button>,
    },
  ];

  useEffect(() => {
    window.onpopstate = () => {
      console.log("lll");

      dispatch(setPath(location.pathname));
    };
  });

  useEffect(() => {
    dispatch(setPath(location.pathname));
  }, [dispatch, open]);

  return (
    <div className="w-full h-[88px] flex justify-center shadow-lg fixed z-50 bg-white">
      <div className="flex w-[160rem] max-w-[1140px] items-center justify-between">
        <button
          className="ml-4 lg:ml-0"
          onClick={() => {
            pushPathName(router, dispatch, "/");
          }}
        >
          <Logo viewBox="0 0 130 48" width={130} height={48} />
        </button>
        <div className="text-lg justify-center items-center flex-grow lg:flex hidden ">
          <div className="w-[143px] h-[40px] flex justify-center items-center text-center">
            <Dropdown menu={{ items: carts }}>
              <button
                className={` text-base h-[24px] active:opacity-70 font-semibold select-none flex justify-center text-center ${pathname === "/plans"
                  ? " text-m_red underline-offset-4 underline "
                  : ""
                  }`}
                onClick={(e) => e.preventDefault()}
              >
                <Space onClick={() => {
                  pushPathName(router, dispatch, "/plans");
                }} className=" h-[24px]">
                  Mua gói cước
                  <DownOutlined className="scale-[0.8]" />
                </Space>
              </button>
            </Dropdown>
          </div>
          <div className="w-[143px] h-[40px] flex justify-center items-center text-center select-none">
            {/* <button className={`active:opacity-70 select-none ${pathname === '/sims/' ? 'font-bold' : ''}`} onClick={() => {
              pushPathName(router, dispatch, '/sims')
            }}>
              Mua sim
            </button> */}
            <Dropdown menu={{ items: telcoOption }}>
              <button
                className={`text-base h-[24px] active:opacity-70 font-semibold select-none flex justify-center text-center ${pathname === "/sims"
                  ? " text-m_red underline-offset-4 underline"
                  : ""
                  }`}
                onClick={(e) => e.preventDefault()}
              >
                <Space onClick={() => {
                  pushPathName(router, dispatch, "/sims");
                }}>
                  Mua sim
                  <DownOutlined className="scale-[0.8]" />
                </Space>
              </button>
            </Dropdown>
          </div>
          {/* <div className="w-[143px] h-[40px] flex justify-center items-center text-center">
            <button
              className={`w-[99px] text-base h-[24px] active:opacity-70 z-50 select-none font-semibold ${pathname === "/cards"
                ? " text-m_red underline-offset-4 underline"
                : ""
                }`}
              onClick={() => {
                pushPathName(router, dispatch, "/cards");
              }}
            >
              Nạp thẻ
            </button>
          </div> */}
          <div className="w-[143px] h-[40px] flex justify-center items-center text-center">
            <button
              className={`w-[99px] text-base h-[24px] active:opacity-70 z-50 select-none font-semibold ${pathname === "/blog"
                ? "text-m_red underline-offset-4 underline"
                : ""
                }`}
              onClick={() => {
                pushPathName(router, dispatch, "/blog");
              }}
            >
              Khuyến mại
            </button>
          </div>
        </div>

        <div className="h-full flex justify-end items-center">

          {isAuth == AuthState.LOGGED && (
            <>
              {/* <button className="border-black border-2 p-1 rounded-md active:opacity-70 mr-6">
                <ShoppingCartOutlined style={{ fontSize: "200%" }} />
              </button> */}

              <button
                className="mx-auto border-black border-2 h-12 font-semibold px-2 rounded-xl active:opacity-70 select-none lg:flex items-center hidden"
                onClick={() => {
                  setConfirmLogOut(true);
                }}
              >
                Đăng xuất
              </button>
              <button className="lg:hidden flex mr-5" onClick={showDrawer}>
                <MenuOutlined />
              </button>
            </>
          )}
          {isAuth == AuthState.NOT_LOGGED && (
            <>
              <button
                className="bg-m_red mr-4 h-12 w-[135px] text-white font-semibold px-2 rounded-xl active:opacity-70 select-none lg:flex hidden justify-center items-center"
                onClick={() => {
                  setModalKey(Date.now());
                  setOpen(true);
                  setIslogin(true);
                }}
              >
                Đăng nhập
              </button>
              <button
                className="text-m_red border-m_red border h-[48px] font-semibold w-[116px] rounded-xl active:opacity-70 select-none lg:flex hidden justify-center items-center"
                onClick={() => {
                  setModalKey(Date.now());
                  setOpen(true);
                  setIslogin(false);
                }}
              >
                Đăng ký
              </button>
              {/* <button className="border-m_gray">
                <Cart />
              </button> */}
              <button className="lg:hidden flex mr-5 ml-5" onClick={showDrawer}>
                <MenuOutlined />
              </button>
            </>
          )}
          <Drawer
            headerStyle={{ display: "none" }}
            placement="right"
            onClose={onClose}
            open={hidden}
            width="302px"
          >
            <div className="ml-2 pt-4 pb-4">
              <Logo viewBox="0 0 152 60" width={114} height={38} />
            </div>
            <div className="border-b pb-5">
              <Collapse items={data} defaultActiveKey={["1"]} />
            </div>
            {isAuth == AuthState.LOGGED && (
              <>
                <button
                  className="mx-auto border-black border-2 h-12 font-bold px-2 rounded-xl active:opacity-70 select-none lg:flex items-center flex mt-5"
                  onClick={() => {
                    setConfirmLogOut(true);
                  }}
                >
                  Đăng xuất
                </button>
              </>
            )}
            {isAuth == AuthState.NOT_LOGGED && (
              <>
                <div className="mt-5 flex justify-center">
                  <button
                    className="bg-m_red mr-4 h-12 w-[135px] text-white font-bold px-2 rounded-xl active:opacity-70 select-none"
                    onClick={() => {
                      setModalKey(Date.now());
                      setOpen(true);
                      setIslogin(true);
                    }}
                  >
                    Đăng nhập
                  </button>
                  <button
                    className="text-m_red border-m_red border h-12 font-bold w-[135px] rounded-xl active:opacity-70 select-none"
                    onClick={() => {
                      setModalKey(Date.now());
                      setOpen(true);
                      setIslogin(false);
                    }}
                  >
                    Đăng ký
                  </button>
                </div>
              </>
            )}
          </Drawer>
          <div className="h-10 w-[2px] bg-m_gray ml-6 mr-6" />
          <button className="border-m_gray">
            <Cart />
          </button>
        </div>
      </div>
      <Modal
        width={400}
        open={confimLogOut}
        onCancel={() => setConfirmLogOut(false)}
        footer={<div />}
      >
        <div className="flex flex-col items-center">
          <h4 className="mb-3 font-bold text-xl">Đăng xuất</h4>
          <ExclamationCircleOutlined
            className="text-5xl mb-3"
            style={{ color: "orange" }}
          />
          <h4 className="mb-3 text-center">Bạn có chắc chắn muốn đăng xuất</h4>
          <div className="flex justify-center">
            <Button
              className="bg-m_red border-m_red text-white rounded-xl px-6"
              onClick={() => {
                dispatch(userLogout(undefined));
                setConfirmLogOut(false);
                successToast("Thành công", "đăng xuất thành công");
              }}
            >
              Đăng xuất
            </Button>
            {/* <MenuOutlined /> */}
            <div className="w-12" />
            <Button
              className="bg-white border-m_red rounded-xl px-6 text-m_red"
              onClick={() => setConfirmLogOut(false)}
            >
              Hủy
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        key={modalKey}
        width={721}
        open={open}
        onCancel={() => setOpen(false)}
        footer={<div />}
      >
        {isLogin ? (
          <Login
            switchSignUp={() => setIslogin(false)}
            onCancel={() => setOpen(false)}
          />
        ) : (
          <SignUp
            onCancel={() => setOpen(false)}
            switchLogin={() => setIslogin(true)}
          />
        )}
      </Modal>
    </div>
  );
}

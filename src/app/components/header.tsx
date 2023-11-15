'use client'
import React, { useEffect, useState } from 'react'
import Logo from './logo/logo.svg'
import Cart from './logo/cart.svg'
import { ShoppingCartOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation';
import { Button, Modal } from 'antd';
import Login from './modals/Login';
import SignUp from './modals/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { setPath } from '@/GlobalRedux/path/pathSlice';
import { pushPathName } from '@/services/routes';
import { AuthState, userLogout } from '@/GlobalRedux/Auth/authSlice';
import { success } from './modals/CustomToast';
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import MLink from '@/app/components/config/MLink'


export default function Header() {
  const [open, setOpen] = useState(false)
  const [confimLogOut, setConfirmLogOut] = useState(false)
  const [modalKey, setModalKey] = useState(Date.now())
  const [isLogin, setIslogin] = useState<boolean>()
  const pathname = useSelector((state: RootState) => state.path.value)
  const isAuth = useSelector((state: RootState) => state.auth.authState)
  const dispatch = useDispatch()
  const router = useRouter()

  const carts = [
    {
      label: (
        <MLink className='text-base' link="/plans">
          Gói cước thoại
        </MLink>
      ),
      key: "0"
    },
    {
      label: (
        <MLink className='text-base' link="/plans">
          Gói cước data
        </MLink>
      ),
      key: "1"
    },
  ]

  const items = [
    {
      label: (
        <MLink className='text-base' link="/sims">
          Viettel
        </MLink>
      ),
      key: "0"
    },
    {
      label: (
        <MLink className='text-base' link="/sims">
          Vinaphone
        </MLink>
      ),
      key: "1"
    },
    {
      label: (
        <MLink className='text-base' link="/sims">
          Wintel
        </MLink>
      ),
      key: "2"
    },
    {
      label: (
        <MLink className='text-base' link="/sims">
          Vietnammobile
        </MLink>
      ),
      key: "3"
    },
    {
      label: (
        <MLink className='text-base' link="/sims">
          Mobifone
        </MLink>
      ),
      key: "4"
    }
  ];

  useEffect(() => {
    window.onpopstate = () => {
      console.log('location', location);
      dispatch(setPath(location.pathname))
    }
  })

  console.log('state', isAuth);

  useEffect(() => {
    dispatch(setPath(location.pathname))
  }, [open,])

  return (
    <div className='w-full h-[88px] flex justify-center shadow-lg fixed z-50 bg-white'>
      <div className='flex w-[160rem] max-w-[1140px] items-center ' >
        <button onClick={() => {
          pushPathName(router, dispatch, '/')
        }}>
          <Logo viewBox="0 0 152 60" width={130} height={48} />
        </button>
        <div className='text-lg flex justify-center items-center flex-grow ' >
          <div className='w-[143px] h-[40px] flex justify-center items-center text-center'>
            <Dropdown menu={{ items: carts }}>
              <button className={`w-[99px] text-base h-[24px] active:opacity-70 select-none flex justify-center text-center ${pathname === '/plans/' ? 'font-bold' : ''}`} onClick={(e) => e.preventDefault()}>
                <Space>
                  Gói cước
                  <DownOutlined />
                </Space>
              </button>
            </Dropdown>
          </div>
          <div className='w-[143px] h-[40px] flex justify-center items-center text-center select-none'>
            {/* <button className={`active:opacity-70 select-none ${pathname === '/sims/' ? 'font-bold' : ''}`} onClick={() => {
              pushPathName(router, dispatch, '/sims')
            }}>
              Mua sim
            </button> */}
            <Dropdown menu={{ items }}>
              <button className={`w-[99px] text-base h-[24px] active:opacity-70 select-none flex justify-center text-center ${pathname === '/sims/' ? 'font-bold' : ''}`} onClick={(e) => e.preventDefault()}>
                <Space>
                  Mua sim
                  <DownOutlined />
                </Space>
              </button>
            </Dropdown>
          </div>
          <div className='w-[143px] h-[40px] flex justify-center items-center text-center' >
            <button className={`w-[99px] text-base h-[24px] active:opacity-70 z-50 select-none ${pathname === '/cards/' ? 'font-bold' : ''}`} onClick={() => {
              pushPathName(router, dispatch, '/cards')
            }}>
              Nạp thẻ
            </button>
          </div>
          <div className='w-[143px] h-[40px] flex justify-center items-center text-center'>
            <button className={`w-[99px] text-base h-[24px] active:opacity-70 z-50 select-none ${pathname === '/blog/' ? 'font-bold' : ''}`} onClick={() => {
              pushPathName(router, dispatch, '/blog')
            }}>
              Khuyến mại
            </button>
          </div>

        </div>
        <div className='h-16 w-[1px] bg-gray-700 ml-6 mr-6' />
        <div className='h-full flex justify-end items-center'>
          {isAuth == AuthState.LOGGED && (

            <>
              <button className='border-black border-2 p-1 rounded-md active:opacity-70'>
                <ShoppingCartOutlined style={{ fontSize: '200%' }} />
              </button>

              <button className='mx-auto border-black border-2 h-12 font-bold px-2 rounded-xl active:opacity-70 select-none'
                onClick={() => {
                  setConfirmLogOut(true)
                }}
              >
                Đăng xuất
              </button>

            </>

          )}
          {
            isAuth == AuthState.NOT_LOGGED && (
              <>
                <button className='bg-m_red mr-4 h-12 w-[135px] text-white font-bold px-2 rounded-xl active:opacity-70 select-none'
                  onClick={() => {
                    setModalKey(Date.now())
                    setOpen(true)
                    setIslogin(true)
                  }}
                >
                  Đăng nhập
                </button>
                <button className='text-m_red border-m_red border h-12 font-bold w-[135px] rounded-xl active:opacity-70 select-none'
                  onClick={() => {
                    setModalKey(Date.now())
                    setOpen(true)
                    setIslogin(false)
                  }}
                >
                  Đăng ký
                </button>
                <button className='border-l-2 ml-4 pl-2.5 border-m_gray'>
                  <Cart />
                </button>
              </>
            )
          }
        </div>
      </div>
      <Modal width={400} open={confimLogOut} onCancel={() => setConfirmLogOut(false)} footer={(<div />)}>
        <div className='flex flex-col items-center'>
          <h4 className='mb-3 font-bold text-xl'>Đăng xuất</h4>
          <ExclamationCircleOutlined className='text-5xl mb-3' style={{ color: "orange" }} />
          <h4 className="mb-3 text-center">Bạn có chắc chắn muốn đăng xuất</h4>
          <div className='flex justify-center'>
            <Button className='bg-m_red border-m_red text-white rounded-xl px-6' onClick={
              () => {
                dispatch(userLogout(undefined))
                setConfirmLogOut(false)
                success("Thành công", 'đăng xuất thành công')
              }
            }>
              Đăng xuất
            </Button>
            <div className='w-12' />
            <Button className='bg-white border-m_red rounded-xl px-6 text-m_red' onClick={() => setConfirmLogOut(false)}>
              Hủy
            </Button>
          </div>
        </div>
      </Modal>
      <Modal key={modalKey} width={800} open={open} onCancel={() => setOpen(false)} footer={(<div />)} >
        {isLogin ? (
          <Login
            switchSignUp={() => setIslogin(false)}
            onCancel={() => setOpen(false)} />)
          : <SignUp onCancel={() => setOpen(false)}
            switchLogin={() => setIslogin(true)} />}
      </Modal>
    </div >
  )
}

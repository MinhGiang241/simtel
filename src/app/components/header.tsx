'use client'
import React, { useEffect, useState } from 'react'
import Logo from './logo/logo.svg'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation';
import { Modal } from 'antd';
import Login from './modals/Login';
import SignUp from './modals/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { setPath } from '@/GlobalRedux/path/pathSlice';
import { pushPathName } from '@/services/routes';


export default function Header() {
  const [open, setOpen] = useState(false)
  const [modalKey, setModalKey] = useState(Date.now())
  const [isLogin, setIslogin] = useState<boolean>()
  const pathname = useSelector((state: RootState) => state.path.value)
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    window.onpopstate = () => {
      console.log('location', location);
      dispatch(setPath(location.pathname))
    }

  })
  useEffect(() => {
    dispatch(setPath(location.pathname))
  }, [open])

  return (
    <div className='w-full h-20 flex justify-center shadow-lg fixed z-50 bg-white'>
      <div className='flex w-[160rem] max-w-7xl  items-center ' >
        <button onClick={() => {
          pushPathName(router, dispatch, '/')
        }}>
          <Logo viewBox="0 0 152 60" width={152} height={60} />
        </button>
        <div className='text-lg flex justify-center items-center flex-grow ' >
          <div className='w-1/4 text-center'>
            <button className={`active:opacity-70 select-none z-50 ${pathname === '/plans/' ? 'font-bold' : ''}`} onClick={() => {
              pushPathName(router, dispatch, '/plans')
            }}>
              Gói cước
            </button>
          </div>
          {/* <div className='w-1/4 text-center select-none'> */}
          {/*   <button className={`active:opacity-70 select-none ${pathname === '/sims/' ? 'font-bold' : ''}`} onClick={() => { */}
          {/*     pushPathName(router, dispatch, '/sims') */}
          {/*   }}> */}
          {/*     Mua sim */}
          {/*   </button> */}
          {/* </div> */}
          <div className='w-1/4 text-center' >
            <button className={`active:opacity-70 z-50 select-none ${pathname === '/cards/' ? 'font-bold' : ''}`} onClick={() => {
              pushPathName(router, dispatch, '/cards')
            }}>
              Nạp thẻ
            </button>
          </div>
          <div className='w-1/4 text-center'>
            <button className='active:opacity-70 select-none z-50'>
              Khuyến mại
            </button>
          </div>

        </div>
        <div className='h-16 w-[1px] bg-gray-700 ml-6 mr-6' />
        <div className=' w-64 h-full flex justify-between items-center'>
          <button className='border-black border-2 p-1 rounded-md active:opacity-70'>
            <ShoppingCartOutlined style={{ fontSize: '200%' }} />

          </button>
          <button className='bg-m_red h-12 text-white font-bold px-2 rounded-xl active:opacity-70 select-none'
            onClick={() => {
              setModalKey(Date.now())
              setOpen(true)
              setIslogin(true)
            }}
          >
            Đăng nhập
          </button>
          <button className='border-black border-2 h-12 font-bold px-2 rounded-xl active:opacity-70 select-none'
            onClick={() => {
              setModalKey(Date.now())
              setOpen(true)
              setIslogin(false)
            }}
          >
            Đăng ký
          </button>

        </div>
      </div>
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

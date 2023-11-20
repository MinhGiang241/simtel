'use client'
import React, { useEffect, useState } from 'react'
import PageWrapper from '../components/pageWrapper'
import moment from 'moment'
import { Button, Divider, Radio, RadioChangeEvent } from 'antd'
import { PhoneFilled, PlusOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { pushPathName } from '@/services/routes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { getSimPackById } from '@/services/api/simPackApi'
import { createOrder } from '@/services/api/orderApi'

import { Order, SimPack } from '@/interfaces/data'
import { FormattedNumber } from 'react-intl'
import { FormikErrors, useFormik } from 'formik'
import MInput from '../components/config/MInput'
import { error, success } from '@/app/components/modals/CustomToast'



interface FormValues {
  full_name: string,
  tel: string,
  email: string,
  province: string,
  district: string,
  ward: string,
  address: string,
  note: string,
}

export default function OrderPage() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<SimPack | undefined>()
  const [time, setTime] = useState("8:00")
  const [method, setMethod] = useState('Wallet')
  const router = useRouter()
  const dispatch = useDispatch()
  const params = useSearchParams()

  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {}
    if (!values.full_name) {
      errors.full_name = "Không được để trống trường bắt buộc"
    }
    if (!values.tel) {
      errors.tel = "Không được để trống trường bắt buộc"
    } else if (
      !(new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g).test(values.tel))
    ) {
      errors.tel = "Không đúng định dạng số diện thoại"
    }
    if (!values.email) {
      errors.email = "Không được để trống trường bắt buộc"
    } else if (
      !(new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]+$/g).test(values.email))
    ) {
      errors.email = 'Không đúng định dạng email'
    }
    if (!values.province) {
      errors.province = "Không được để trống trường bắt buộc"
    }
    if (!values.district) {
      errors.district = "Không được để trống trường bắt buộc"
    }
    if (!values.ward) {
      errors.ward = "Không được để trống trường bắt buộc"
    }
    if (!values.address) {
      errors.address = "Không được để trống trường bắt buộc"
    }
    if (!values.note) {
      errors.note = "Không được để trống trường bắt buộc"
    }
    return errors
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      full_name: '',
      tel: '',
      email: '',
      province: '',
      district: '',
      ward: '',
      address: '',
      note: '',
    },
    validate,
    onSubmit: async ({
      full_name, tel, email, province, district, address, ward,
    }) => {
      try {
        setLoading(true)
        //alert(JSON.stringify(values, null, 2))
        var dataSubmit: Order = {
          full_name,
          tel,
          email,
          address: `${address}, ${ward}, ${district}, ${province}`,
          item: { type: "simpack", itemId: data?._id, price: data?.price },
          total_amount: data?.price,
          prod_total_amount: data?.price,
          transport_fee: 0,
          discount_amount: 0,
          process_state: 'WaitProcessing',
          payment_state: 'WaitToPay',
          payment_method: method,
        }
        await createOrder([dataSubmit]).then((_) => {
          setLoading(false)
          success('Đặt hàng thành công', "Bạn đã đặt hàng thành công ,đơn hàng của bạn đã được chuyển đến bộ phận quản lý",)
          pushPathName(router, dispatch, '/plans/')
        })

      } catch (err) {
        setLoading(false);
        error("Thanh toán thất bại", err as string)
      }
    }
  })


  if (moment.duration(time, 'minutes').asMinutes() != 0) {
    setTimeout(
      () => {
        setTime(moment(time, 'mmss').subtract(1, 'seconds').format('mm:ss'))
      }, 1000
    )
  }

  useEffect(() => {
    getSimPackById(params.get('id')).then((v) => {
      setData(v)
    }).catch((e) => {
      error('Lỗi', e)
    })
  }, []
  )

  return (
    <PageWrapper>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formik.handleSubmit();
      }}>

        <div className='mt-2 w-full flex justify-center'>
          Giỏ hàng hết hiệu lực  trong vòng<span className='font-bold'>&nbsp;{time}&nbsp;</span>phút
        </div>

        <div className='w-full flex mt-4'>
          <div className='w-1/2'>
            <div className='flex flex-col justify-between'>


              <h1 className='mb-1 font-bold text-lg'>Thông tin đơn hàng<span className='text-m_red'> *</span></h1>
              <MInput
                className='h-9'
                placeholder='Họ tên *'
                id='full_name'
                name='full_name'
                onChange={formik.handleChange}
                error={formik.errors.full_name}
                touch={formik.touched.full_name}
                onBlur={formik.handleBlur} />


              <div className='w-full flex items-start'>
                <MInput
                  className='h-9'
                  placeholder='Số điện thoại liên hệ *'
                  id='tel'
                  name='tel'
                  onChange={formik.handleChange}
                  error={formik.errors.tel}
                  touch={formik.touched.tel}
                  onBlur={formik.handleBlur} />
                <div className='w-10' />
                <MInput
                  className='h-9'
                  placeholder='Email *'
                  id='email'
                  name='email'
                  onChange={formik.handleChange}
                  error={formik.errors.email}
                  touch={formik.touched.email}
                  onBlur={formik.handleBlur} />
              </div>

              <div className='w-full flex items-start'>
                <MInput
                  className='h-9'
                  placeholder='Tỉnh/TP *'
                  id='province'
                  name='province'
                  onChange={formik.handleChange}
                  error={formik.errors.province}
                  touch={formik.touched.province}
                  onBlur={formik.handleBlur} />
                <div className='w-10' />
                <MInput
                  className='h-9'
                  placeholder='Quận/Huyện *'
                  id='district'
                  name='district'
                  onChange={formik.handleChange}
                  error={formik.errors.district}
                  touch={formik.touched.district}
                  onBlur={formik.handleBlur} />
                <div className='w-10' />
                <MInput
                  className='h-9'
                  placeholder='Xã/Phường *'
                  id='ward'
                  name='ward'
                  onChange={formik.handleChange}
                  error={formik.errors.ward}
                  touch={formik.touched.ward}
                  onBlur={formik.handleBlur} />
              </div>

              <MInput
                className='h-9'
                placeholder='Địa chỉ chi tiết *'
                id='address'
                name='address'
                onChange={formik.handleChange}
                error={formik.errors.address}
                touch={formik.touched.address}
                onBlur={formik.handleBlur} />
              <MInput
                className='h-9'
                placeholder='Ghi chú *'
                id='note'
                name='note'
                onChange={formik.handleChange}
                error={formik.errors.note}
                touch={formik.touched.note}
                onBlur={formik.handleBlur} />

              <div className='mb-1 relative flex items-center font-bold text-lg'>
                <div className='absolute -left-11 mr-3 rounded-full shadow-black/50 shadow bg-gradient-to-l from-m_red to-red-500 w-8 h-8 flex justify-center items-center'>
                  <PhoneFilled style={{ color: '#fff' }} />
                </div>
                Hình thức thanh toán<span className='text-m_red'> *</span>
              </div>
            </div>

            <div className='bg-m_gray rounded-lg flex flex-col justify-center h-32 px-5'>
              <Radio.Group value={method} onChange={(v: RadioChangeEvent) => {
                setMethod(v.target.value)
              }}>
                <div className='w-full'>
                  <div className='flex justify-between w-full items-center'>
                    <Radio value={'Wallet'}  >
                      <h1 className='ml-4'>Thanh toán qua VNPAYQR</h1>
                    </Radio>
                    <Image src='/images/vnpay.png' alt='vnpay' height={60} width={90} className='mr-4' />

                  </div>
                </div>
                <div className='h-4' />
                <div className='w-full'>
                  <Radio value={'Cod'}>
                    <div>
                      <h1 className='ml-4'>Thanh toán COD</h1>
                      <h4 className='ml-4  text-blue-700 text-xs'>(Thanh toán trực tiếp cho nhân viên giao hàng)</h4>
                    </div>
                  </Radio>
                </div>

              </Radio.Group>

            </div>

          </div>


          <div className='w-10' />

          <div className='w-1/2 '>
            <div className='w-full'>
              <h4 className='mb-1 font-bold text-lg'>
                Đơn hàng
              </h4>
              <div className='flex items-center'>

                <h4 className='mb-1 font-bold text-lg mr-8'>
                  {data?.code}
                </h4>
                {/* <Button icon={<RedoOutlined />} className='rounded-3xl font-semibold' > */}
                {/*   Đổi gói cước */}
                {/* </Button> */}
              </div>

              <h4>{data?.telco}</h4>
              <div className='flex w-full justify-between'>
                <h4>Phí hòa mạng</h4>
                <FormattedNumber value={data?.price ?? 0} style='currency' currency='VND' />
              </div>
              <div className='flex justify-between w-full'>
                <h4>Chu kỳ gói cước</h4>
                <h4>{data?.cycle}</h4>
              </div>

              <Button htmlType='button' className='rounded-3xl font-semibold'>
                Đổi gói cước
              </Button>

              <Divider className='my-4' />

              <div className='flex w-full justify-center'>
                <Button htmlType='button' onClick={() => pushPathName(router, dispatch, '#')} icon={<PlusOutlined className='text-m_red text-3xl' />} className='rounded-2xl border-m_red flex items-center font-bold text-2xl text-m_red py-6 bg-m_red/10 border-0' >
                  Mua thêm
                </Button>
              </div>

              <div className='w-full py-6 bg-m_gray my-4 pl-5 rounded-xl'>
                Nhập mã giãm giá
              </div>

              <div className='w-full flex justify-between'>
                <h4>Tổng tiền hàng</h4>
                <FormattedNumber value={(data?.price ?? 0)} style='currency' currency='VND' />
                {/* <h4>{data ? FormattedNumber(data?.price ?? 0) : '0'}</h4> */}
              </div>

              <div className='flex w-full justify-between'>
                <h4>Phí vận chuyển</h4>
                <FormattedNumber value={0} style='currency' currency='VND' />
              </div>

              <div className='flex w-full justify-between'>
                <h4>Giảm giá</h4>
                <FormattedNumber value={(0)} style='currency' currency='VND' />
              </div>

              <Divider className='my-4' />

              <div className='flex w-full justify-between text-xl font-semibold'>
                <h4>Tổng</h4>
                <FormattedNumber value={(data?.price ?? 0)} style='currency' currency='VND' />
              </div>
              {/* <div> */}
              {/*                 Bằng việc nhấn Thanh toán, Quý khách đồng ý với Điều kiện giao dịch chung và<Link href={''}> Chính sách vận chuyển, giao nhận hàng</Link> của Simtel */}
              {/*               </div> */}

              <div className='w-full mt-8 flex justify-center'>
                <Button
                  htmlType='submit'
                  className='rounded-2xl bg-m_red text-white text-xl border-m_red disabled:bg-m_gray disabled:text-gray-400 disabled:border-0 text-center h-12 active:opacity-70'
                  disabled={time === '00:00'}
                  loading={loading}>
                  Đặt hàng
                </Button>
              </div>

            </div>
          </div>
        </div>
      </form>
    </PageWrapper>
  )
}

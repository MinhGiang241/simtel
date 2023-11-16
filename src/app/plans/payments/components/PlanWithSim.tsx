import { RootState } from '@/GlobalRedux/store'
import { Order } from '@/interfaces/data'
import { pushPathName } from '@/services/routes'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { createOrder } from '@/services/api/simPackApi'
import { useDispatch, useSelector } from 'react-redux'
import { error, success } from '@/app/components/modals/CustomToast'
import { Button, Divider, Input, Radio, RadioChangeEvent } from 'antd'
import { FormikErrors, useFormik } from 'formik'
import MInput from '@/app/components/config/MInput'
import MTextArea from '@/app/components/config/MTextArea'
import MDropdown from '@/app/components/config/MDropdown'

interface FormValues {
  name: string,
  phone: string,
  email: string,
  province?: string,
  district?: string,
  ward?: string,
  address: string,
  note: string,
}

export default function PlanWithSim() {

  const dispatch = useDispatch()
  const router = useRouter()
  const type = useSelector((state: RootState) => state.simPack.selectedType)
  const tel = useSelector((state: RootState) => state.simPack.phone)
  const simpack = useSelector((state: RootState) => state.simPack.selected)

  const [method, setMethod] = useState<number>();
  const { TextArea } = Input

  const [loading, setLoading] = useState<boolean>(false)

  const handleOrder = () => {
    pushPathName(router, dispatch, '/pay')
    try {
      setLoading(true)
      var dataSubmit: Order = {
        full_name: tel,
        tel: tel,
        email: "",
        address: ``,
        item: { type: "simpack", itemId: simpack?._id, price: simpack?.price },
        total_amount: simpack?.price,
        prod_total_amount: simpack?.price,
        transport_fee: 0,
        discount_amount: 0,
        process_state: 'WaitProcessing',
        payment_state: 'WaitToPay',
        payment_method: method === 1 ? 'Cod' : 'Wallet',
      }
      createOrder([dataSubmit]).then((_) => {
        setLoading(false)
        success('Đặt hàng thành công', "Bạn đã đặt hàng thành công ,đơn hàng của bạn đã được chuyển đến bộ phận quản lý",)
        pushPathName(router, dispatch, '/pay')
      })

    } catch (err) {
      setLoading(false);
      error("Thanh toán thất bại", err as string)
    }
  }

  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {}
    if (!values.phone) {
      errors.phone = "Không được để trống trường bắt buộc"
    } else if (values.phone.length < 8) {
      errors.phone = "Không ít hơn 8 ký tự"
    }

    if (!values.province) {
      errors.phone = "Không được để trống trường bắt buộc"
    }
    return errors;
  }


  const formik = useFormik<FormValues>({
    initialValues: {
      name: '', phone: '', email: '', address: '', note: ''
    },
    validate,
    onSubmit: async (values) => {
      alert(values)
    }
  })




  return (
    <div className=' flex justify-between mb-28'>
      <div className='bg-white  w-7/12 border-m_gray border-2 rounded-lg p-5'>
        <div className='text-base font-bold mb-3'>Chọn loại gói cước</div>
        <Radio.Group className='flex' disabled value={type} onChange={(v: RadioChangeEvent) => {
        }}>
          <Radio value={0}>
            <h1 className='ml-3'>Gói cước</h1>
          </Radio>
          <div className='w-7' />
          <Radio value={1}>
            <h1 className='ml-3'>Gói cước kèm sim</h1>
          </Radio>
        </Radio.Group>
        <Divider />
        <div className='mt-8 w-full flex flex-col items-start mb-5' >
          <h4 className='font-semibold text-lg'>Thông tin nhận hàng</h4>
        </div>

        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          formik.handleSubmit();
        }}>
          <div className='flex w-full mb-3'>
            <MInput
              className='h-14'
              required
              title='Họ tên'
              id='name'
              name='name'
              placeholder='Nhập họ tên'
              onChange={formik.handleChange}
              error={formik.errors.name}
              touch={formik.touched.name}
              onBlur={formik.handleBlur}
            />
            <div className='w-5' />
            <MInput
              className='h-14'
              required
              title='Số điện thoại liên hệ'
              id='phone'
              name='phone'
              placeholder='Nhập số điện thoại'
              onChange={formik.handleChange}
              error={formik.errors.phone}
              touch={formik.touched.phone}
              onBlur={formik.handleBlur}

            />
          </div>

          <div className='flex w-full mb-3'>
            <MInput
              className='h-14'
              required
              title='Email nhận eSIM'
              id='email'
              name='email'
              placeholder='Nhập email'
              onChange={formik.handleChange}
              error={formik.errors.email}
              touch={formik.touched.email}
              onBlur={formik.handleBlur}
            />
            <div className='w-5' />
            <MDropdown
              allowClear
              options={[
                { value: '1', label: 'aaaaa' }
              ]}
              className='h-14'
              required
              title='Tỉnh/Thành phố'
              id='province'
              name='province'
              placeholder='Chọn Tỉnh/Thành phố'
              onChange={formik.handleChange}
              error={formik.errors.province}
              value={formik.values.district}
              touch={formik.touched.province}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className='flex w-full mb-3'>
            <MDropdown
              options={[
                { value: '1', label: 'aaaaa' }
              ]}
              className='h-14'
              required
              title='Quận/Huyện'
              id='district'
              name='district'
              placeholder='Chọn Quận/Huyện'
              onChange={formik.handleChange}
              error={formik.errors.district}
              touch={formik.touched.district}
              onBlur={formik.handleBlur}
            />
            <div className='w-5' />
            <MDropdown
              options={[
                { value: '1', label: 'aaaaa' }
              ]}
              allowClear={true}
              className='h-14'
              required
              title='Phường/Xã'
              id='ward'
              name='ward'
              placeholder='Chọn Phường/Xã'

              onChange={formik.handleChange}
              error={formik.errors.ward}
              touch={formik.touched.ward}
              onBlur={formik.handleBlur}
            />
          </div>
          <MInput
            className='h-14 mb-3'
            required
            title='Địa chỉ chi tiết'
            id='address'
            name='address'
            placeholder='Nhập địa chỉ chi tiết'
            onChange={formik.handleChange}
            error={formik.errors.address}
            touch={formik.touched.address}
            onBlur={formik.handleBlur}
          />
          <MTextArea
            title='Ghi chú'
            id='note'
            name='note'
            placeholder='Nhập nội dung'
            onChange={formik.handleChange}
            error={formik.errors.note}
            touch={formik.touched.note}
            onBlur={formik.handleBlur}
          />

          <Button htmlType='submit'>Submit</Button>
        </form>


      </div>

      <div className='bg-white w-2/5 border-m_gray border-2 rounded-lg h-fit'></div>
    </div>
  )
}

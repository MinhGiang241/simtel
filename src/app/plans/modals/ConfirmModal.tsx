import { setPhone, setSeleted, setSeletedType } from '@/GlobalRedux/SimPack/SimPackSlice'
import MInput from '@/app/components/config/MInput'
import { SimPack } from '@/interfaces/data'
import { Button, Modal } from 'antd'
import { FormikErrors, useFormik } from 'formik'
import React, { useState } from 'react'
import { FormattedNumber } from 'react-intl'
import { useDispatch } from 'react-redux'

interface Props {
  open: boolean,
  onOk: (isError: boolean, error?: string) => void,
  onCancel: () => void,
  simpack: SimPack,
  type?: number
}

interface FormValues {
  phone: string
}

export default function ConfirmModal({ open, onOk, onCancel, simpack, type }: Props) {

  const dispatch = useDispatch();
  const [modalKey, _] = useState(Date.now())

  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {}
    if (!values.phone) {
      errors.phone = "Số điện thoại không được để trống "
    } else if (values.phone.length < 8) {
      errors.phone = "Không ít hơn 8 ký tự"
    } else if (!/\d/.test(values.phone)) {
      errors.phone = 'Số điện thoại không hợp lệ'
    }
    return errors
  }

  const formik = useFormik<FormValues>({
    initialValues: { phone: '' },
    validate,
    onSubmit: (values) => {
      dispatch(setSeleted(simpack))
      dispatch(setSeletedType(type))
      dispatch(setPhone(values.phone))
      onOk(false, undefined);
    }
  })

  return (
    <Modal key={modalKey} width={612} footer={<div />} onOk={(_) => onOk(false, undefined)} onCancel={(_) => onCancel()} open={open} >
      <div className='px-10'>
        <div className='flex justify-center mt-1 mb-4'>
          <h4 className='text-2xl font-bold'>Xác nhận</h4>
        </div>

        <div className='flex justify-center w-full text-base text-center mb-4'>
          <p>Quý khách xác nhận đăng ký gói cước <span className='font-semibold'>[{type === 0 ? 'Gói tự do' : 'Gói cước kèm sim'}]</span> nhà mạng <span className='font-semibold'>[{simpack.telco}]</span> với giá <span className='font-semibold'>[<FormattedNumber value={(simpack.price ?? 0)} style='currency' currency='VND' />]</span>
          </p>
        </div>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          formik.handleSubmit();
        }}>
          <label className='font-semibold text-base mb-2' htmlFor='phone'>
            Số điện thoại <span className='text-m_red'>*</span>
          </label>
          <MInput
            className='h-14'
            id='phone'
            name='phone'
            onChange={formik.handleChange}
            error={formik.errors.phone}
            touch={formik.touched.phone}
            onBlur={formik.handleBlur}
          />
          <div className='w-full flex justify-center mt-7'>
            <Button
              htmlType='submit'
              className='bg-m_red text-white w-[165px] h-12 px-3 text-base font-semibold rounded-lg border-m_red'>
              Đăng ký
            </Button>
          </div>

        </form>
      </div>
    </Modal>
  )
}

import { Input, Select } from 'antd'
import { FormikErrors } from 'formik';
import React from 'react'

interface Props {
  setValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<any>> | Promise<void>,
  title?: string,
  required?: Boolean,
  id: string,
  name: string,
  error?: string,
  value?: any,
  className?: string,
  type?: string,
  action?: React.ReactNode,
  touch?: Boolean,
  placeholder?: string,
  options?: { value: any, label: string, disabled?: boolean }[]
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
  defaultValue?: any,
  loading?: boolean,
  allowClear?: boolean,
  afterSetValueFunction?: Function
}

export default function MDropdown({
  setValue,
  required = false,
  id,
  name,
  title,
  error,
  value,
  className,
  action,
  type = 'text',
  touch = false,
  onBlur,
  placeholder,
  options,
  defaultValue,
  loading,
  allowClear,
  afterSetValueFunction,
}: Props) {


  return (
    <div className='w-full'>
      <div className={`flex ${action ? 'justify-between' : 'justify-start'} mb-1`}>
        <label className='text-base font-semibold' htmlFor={id}>{title} {required && (<span className='text-m_red'>*</span>)}</label>
        {action}
      </div>

      <div className='w-full flex flex-col mb-2'>
        <Select loading={loading} defaultValue={defaultValue} options={options} onBlur={onBlur} status={(error && touch) ? `error` : ''} className={className} id={id} allowClear={allowClear} onChange={(e) => {
          setValue(name, e);
          if (afterSetValueFunction) {
            afterSetValueFunction(e)
          }
        }} value={value} placeholder={placeholder} />
        {(error && touch) ? (<div className='text-m_red text-sm'>{error}</div>) : null}
      </div>
    </div>
  )
}


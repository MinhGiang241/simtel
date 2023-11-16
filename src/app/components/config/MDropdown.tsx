import { Input, Select } from 'antd'
import React from 'react'

interface Props {
  onChange: (e: React.ChangeEvent<any>) => void,
  title?: string,
  required?: Boolean,
  id: string,
  name: string,
  error?: string,
  value?: string,
  className?: string,
  type?: string,
  action?: React.ReactNode,
  touch?: Boolean,
  placeholder?: string,
  options: { value: string, label: string, disabled?: boolean }[]
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
  defaultValue?: string,
  loading?: boolean,
  allowClear?: boolean,
}

export default function MDropdown({
  onChange,
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
}: Props) {


  return (
    <div className='w-full'>
      <div className={`flex ${action ? 'justify-between' : 'justify-start'} `}>
        <label className='text-base font-semibold' htmlFor={id}>{title} {required && (<span className='text-m_red'>*</span>)}</label>
        {action}
      </div>

      <div className='w-full flex flex-col mb-2'>

        <Select loading={loading} defaultValue={defaultValue} options={options} onBlur={onBlur} status={(error) ? `error` : ''} type={type} className={className} name={name} id={id} allowClear={allowClear} onChange={onChange} value={value} placeholder={placeholder} />
        {(error) ? (<div className='text-m_red'>{error}</div>) : null}
      </div>
    </div>
  )
}


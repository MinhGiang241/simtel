import { Input } from 'antd'
import React, { ReactNode, useState } from 'react'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

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
  suffix?: ReactNode
  placeholder?: string,
  isPassword?: boolean
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
}

export default function MInput({
  onChange,
  required = false,
  id,
  name,
  title,
  error,
  value,
  className,
  action,
  type,
  touch = false,
  onBlur,
  placeholder,
  suffix,
  isPassword
}: Props) {

  const [visible, setVisible] = useState(!isPassword)

  return (
    <div className='w-full'>
      <div className={`flex ${action ? 'justify-between' : 'justify-start'} mb-1 `}>
        <label className='text-base font-semibold' htmlFor={id}>{title} {required && (<span className='text-m_red'>*</span>)}</label>
        {action}
      </div>

      <div className='w-full flex flex-col mb-2'>

        <Input
          onBlur={onBlur}
          status={(error && touch) ? `error` : ''}
          type={type ?? visible ? 'text' : 'password'} className={className ?? 'h-14'}
          name={name}
          id={id}
          allowClear
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          suffix={suffix ?? isPassword ? <div onClick={() => { setVisible(!visible) }} className='active:opacity-70 cursor-pointer'>{visible ? <EyeOutlined className='text-2xl' /> : <EyeInvisibleOutlined className='text-2xl' />}</div> : undefined}
        />
        {(error && touch) ? (<div className='text-m_red'>{error}</div>) : null}
      </div>
    </div>
  )
} 

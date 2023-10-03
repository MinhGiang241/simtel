import { Input } from 'antd'
import React from 'react'

interface Props {
  onChange: (e: React.ChangeEvent<any>) => void,
  title?: string,
  required: Boolean,
  id: string,
  name: string,
  error?: string,
  value?: string,
  className?: string,
  type?: string,
  action?: React.ReactNode,
  touch?: Boolean,
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
  type = 'text',
  touch = false,
  onBlur
}: Props) {


  return (
    <>
      <div className={`flex ${action ? 'justify-between' : 'justify-start'}`}>
        <label htmlFor={id}>{title} {required && (<span className='text-m_red'>*</span>)}</label>
        {action}
      </div>
      <Input onBlur={onBlur} status={(error && touch) ? `error` : ''} type={type} className={className} name={name} id={id} allowClear onChange={onChange} value={value} />
      {(error && touch) ? (<div className='text-m_red'>{error}</div>) : null}
    </>
  )
} 

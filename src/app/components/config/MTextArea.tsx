import { Input } from 'antd'
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
  row?: number
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
}

export default function MTextArea({
  onChange,
  required = false,
  id,
  name,
  title,
  error,
  value,
  className,
  action,
  row = 4,
  touch = false,
  onBlur,
  placeholder,
}: Props) {

  const { TextArea } = Input

  return (
    <div className='w-full'>
      <div className={`flex ${action ? 'justify-between' : 'justify-start'} `}>
        <label className='text-base font-semibold' htmlFor={id}>{title} {required && (<span className='text-m_red'>*</span>)}</label>
        {action}
      </div>

      <div className='w-full flex flex-col mb-2'>

        <TextArea
          autoSize={{ minRows: 6, maxRows: 6 }}
          onBlur={onBlur}
          status={(error && touch) ? `error` : ''}
          className={className}
          name={name}
          id={id}
          allowClear
          onChange={onChange}
          value={value}
          placeholder={placeholder} />
        {(error && touch) ? (<div className='text-m_red'>{error}</div>) : null}
      </div>
    </div>
  )
}


'use client'
import { setPath } from '@/GlobalRedux/path/pathSlice'
import { pushPathName } from '@/services/routes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

interface Props {
  children: React.ReactNode,
  className?: string,
  link?: string,
}

export default function MLink({ children, className, link }: Props) {
  const router = useRouter()
  const dispatch = useDispatch()
  return (
    <Link onClick={() => {
      if (link) {
        dispatch(setPath(link))
      }
    }} href={`${link}` ?? '#'} className={className} >{children}</Link>
  )
}

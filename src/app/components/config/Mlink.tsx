"use client";
import { setPath } from "@/GlobalRedux/path/pathSlice";
import { pushPathName } from "@/services/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

interface Props {
  children: React.ReactNode;
  className?: string;
  link?: string;
  onClick?: Function;
}

export default function MLink({ children, className, link, onClick }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <Link
      onClick={() => {
        if (onClick) {
          onClick();
        }
        if (link) {
          dispatch(setPath(link));
        }
      }}
      href={`${link}` ?? "#"}
      className={className}
    >
      {children}
    </Link>
  );
}

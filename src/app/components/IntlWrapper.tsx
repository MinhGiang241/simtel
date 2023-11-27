/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useDispatch } from "react-redux";
import { getActiveTelco, getConfig } from "@/services/api/config";
import {
  setConfig,
  setLoadingTelcos,
  setTelcos,
} from "@/GlobalRedux/config/ConfigSlice";

export default function IntlWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const formats = {
    number: {
      VND: {
        style: "currency",
        currency: "VND",
      },
    },
  };

  useEffect(() => {
    getActiveTelcoList();
    getConfig().then((v) => {
      console.log("config", v);
      if (v) {
        dispatch(setConfig(v));
      }
    });
  }, []);

  const getActiveTelcoList = () => {
    dispatch(setLoadingTelcos(true));
    getActiveTelco()
      .then((v) => {
        dispatch(setLoadingTelcos(false));
        console.log("active", v);
        if (v) {
          dispatch(setTelcos(v));
        }
      })
      .catch((err) => {
        console.log("errActive", err);
        dispatch(setLoadingTelcos(false));
      });
  };

  return (
    <IntlProvider locale="vi" defaultLocale="en">
      {children}
    </IntlProvider>
  );
}

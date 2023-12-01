"use client";
import React, { useState } from "react";
import { Button } from "antd";
import { errorToast, successToast } from "./CustomToast";
import { FormikErrors, useFormik } from "formik";
import MInput from "../config/MInput";
import axios, { AxiosError, AxiosResponse } from "axios";
import { customerLogin, getAccountInfo } from "@/services/api/authApi";
import { setUserData } from "@/GlobalRedux/Auth/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { useDispatch } from "react-redux";

interface Props {
  onCancel: Function;
  switchSignUp: Function;
}

interface FormValues {
  phone: string;
  password: string;
}

export default function Login({ onCancel, switchSignUp }: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.phone) {
      errors.phone = "Không được để trống trường bắt buộc";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(values.phone)) {
      errors.phone = "Định dạng số điện thoại không hợp lệ";
    }
    // else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
    //   errors.email = 'Email không hợp lệ'
    // }

    if (!values.password) {
      errors.password = "Không được để trống trường bắt buộc";
    }

    return errors;
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      phone: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        // alert(JSON.stringify(values, null, 2));
        setLoading(true);
        var token = await customerLogin(values.phone, values.password);
        var info = await getAccountInfo();

        dispatch(
          setUserData({
            user: info?.user,
            accessToken: token?.data?.access_token,
            expiredAt: token?.data?.expires_at,
          }),
        );
        setLoading(false);
        successToast("Đăng nhập thành công", "Bạn đã đăng nhập thành công");
        onCancel();
      } catch (err: any) {
        console.log(err);
        setLoading(false);
        errorToast("Lỗi", err);
      }
    },
  });

  return (
    <form
      className="w-full lg:px-16"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <h1 className="font-bold text-3xl mt-2 mb-4 text-center">Đăng nhập</h1>

      <MInput
        required
        title="Số điện thoại"
        id="phone"
        name="phone"
        placeholder="Nhập số điện thoại"
        onChange={formik.handleChange}
        error={formik.errors.phone}
        touch={formik.touched.phone}
        onBlur={formik.handleBlur}
      />

      <div className="h-4" />

      <MInput
        required
        title="Mật khẩu"
        id="password"
        name="password"
        placeholder="Nhập mật khẩu"
        onChange={formik.handleChange}
        error={formik.errors.password}
        touch={formik.touched.password}
        onBlur={formik.handleBlur}
        isPassword
      />

      <div className="flex justify-end my-3 text-m_red underline underline-offset-2">
        {/* <button */}
        {/*   type="button" */}
        {/*   onClick={() => */}
        {/*     successToast( */}
        {/*       "Gửi mã xác nhận thành công", */}
        {/*       "Gửi mã OTP thành công đến email của quý khách", */}
        {/*     ) */}
        {/*   } */}
        {/*   className="select-none active:opacity-70" */}
        {/* > */}
        {/*   Lấy mã OTP */}
        {/* </button> */}
        <button
          type="button"
          onClick={() =>
            errorToast(
              "Gửi mã xác nhận không thành công",
              "Gửi mã OTP không thành công đến email của quý khách",
            )
          }
          className="text-sm select-none active:opacity-70"
        >
          Quên mật khẩu
        </button>
      </div>

      <div className="flex w-full justify-center mb-3">
        <Button
          loading={loading}
          htmlType="submit"
          className="bg-m_red text-white border-m_red px-5 rounded-lg w-[165px] h-12 text-base font-semibold"
        >
          Đăng nhập
        </Button>
      </div>

      <div className="text-center text-base">
        Bạn chưa có tài khoản?{" "}
        <button
          type="button"
          onClick={() => switchSignUp()}
          className="text-m_red  select-none active:opacity-70"
        >
          Đăng ký
        </button>
      </div>

      {/* <div className='text-center mt-3'> */}
      {/*   <h4>Bằng việc đăng nhập, Quý khách đã đồng ý thực hiện mọi giao dịch theo</h4> */}
      {/*   <button */}
      {/*     type='button' */}
      {/*     className='text-m_red select-none active:opacity-70'> */}
      {/*     Điều khoản sử dụng và Chính sách bảo mật của Simtel</button> */}
      {/* </div> */}
    </form>
  );
}

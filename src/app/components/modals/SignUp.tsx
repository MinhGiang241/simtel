import { Button, Input } from "antd";
import { FormikErrors, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import MInput from "../config/MInput";
import { Customer } from "@/interfaces/data";
import { errorToast, successToast } from "./CustomToast";
import { createAccount } from "@/services/api/authApi";

interface Props {
  onCancel: Function;
  switchLogin: Function;
}

interface FormValues {
  phone: string;
  mail: string;
  name: string;
  password: string;
  re_password: string;
}

export default function SignUp({ onCancel, switchLogin }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const validate = (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.phone) {
      errors.phone = "Không được để trống trường bắt buộc";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(values.phone)) {
      errors.phone = "Số điện thoại không đúng định dạng";
    }
    if (!values.password) {
      errors.password = "Không được để trống trường bắt buộc";
    }
    if (!values.name) {
      errors.name = "Không được để trống trường bắt buộc";
    }

    if (!values.mail) {
      errors.mail = "Không được để trống trường bắt buộc";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)) {
      errors.mail = "Email không đúng định dạng";
    }

    if (!values.re_password) {
      errors.re_password = "Không được để trống trường bắt buộc";
    } else if (values.password != values.re_password) {
      errors.re_password = "Mật khẩu không khớp";
    }

    return errors;
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      phone: "",
      mail: "",
      password: "",
      re_password: "",
    },
    validate,
    //validateOnMount: false,
    validateOnChange: true,
    isInitialValid: false,
    onSubmit: async (values) => {
      /* alert(JSON.stringify(values, null, 2)); */
      try {
        setLoading(true);
        var customer: Customer = {
          tel: values.phone,
          password: values.password,
          email: values.mail,
          full_name: values.name,
        };
        createAccount(customer)
          .then((v) => {
            setLoading(false);
            successToast(
              "Tạo tài khoản thành công !",
              "Hãy cùng trải nghiệm với hoà mạng Simtel.vn để tận hưởng trọn vẹn hàng ngàn tiện ích.",
            );
            switchLogin();
          })
          .catch((e) => {
            setLoading(false);
            throw e;
          });
      } catch (err) {
        setLoading(false);
        errorToast("Lỗi", err as string);
      }
    },
  });

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
      className="w-full px-16"
    >
      <h1 className="font-bold text-3xl mt-2 mb-4 text-center">
        Đăng ký tài khoản
      </h1>

      <MInput
        required
        title="Họ và tên"
        id="name"
        name="name"
        onChange={formik.handleChange}
        error={formik.errors.name}
        touch={formik.touched.name}
        onBlur={formik.handleBlur}
      />

      <div className="h-4" />

      <MInput
        required
        title="Số điện thoại"
        id="phone"
        name="phone"
        onChange={formik.handleChange}
        error={formik.errors.phone}
        touch={formik.touched.phone}
        onBlur={formik.handleBlur}
      />

      <div className="h-4" />
      <MInput
        required
        title="Email"
        id="mail"
        name="mail"
        onChange={formik.handleChange}
        error={formik.errors.mail}
        touch={formik.touched.mail}
        onBlur={formik.handleBlur}
      />

      <div className="h-4" />

      <MInput
        required
        title="Mật khẩu"
        id="password"
        name="password"
        isPassword
        onChange={formik.handleChange}
        error={formik.errors.password}
        touch={formik.touched.password}
        onBlur={formik.handleBlur}
      />

      <div className="h-4" />
      <MInput
        required
        title="Xác nhận mật khẩu "
        id="re_password"
        name="re_password"
        isPassword
        onChange={formik.handleChange}
        error={formik.errors.re_password}
        touch={formik.touched.re_password}
        onBlur={formik.handleBlur}
      />

      <div className="h-4" />

      <div className="text-center">
        Khi nhấn Đăng ký, Quý khách đã đồng ý thực hiện mọi giao dịch theo
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="text-center text-m_red active:opacity-70 select-none"
        >
          Điều khoản sử dụng và Chính sách bảo mật của Simtel
        </button>
      </div>

      <div className="flex justify-center mt-3">
        <Button
          loading={loading}
          htmlType="submit"
          className="bg-m_red border-m_red px-4  text-white rounded-lg w-[165px] h-12 text-base font-semibold"
        >
          Đăng ký
        </Button>
      </div>

      <div className="flex justify-center mt-3">
        Bạn đã có tài khoản? &nbsp;
        <button
          type="button"
          onClick={() => switchLogin()}
          className="text-m_red active:opacity-70 select-none"
        >
          {" "}
          Đăng nhập?
        </button>
      </div>
    </form>
  );
}

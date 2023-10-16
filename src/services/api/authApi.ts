import axios, { AxiosError, AxiosResponse } from "axios";
import { CallApi } from "../helper";
import { loginApi } from "@/constants/apiConstant";
import { setUserData } from "@/GlobalRedux/Auth/authSlice";

export const customerLogin = async (phone: string, password: string) => {
  try {
    const formData = new FormData();
    formData.append("username", phone);
    formData.append("password", password);
    formData.append("audience", "guest");

    var response: AxiosResponse | undefined = await axios.post(loginApi, formData)
    console.log('res', response);
    if (response) {
      localStorage.setItem('access_token', response?.data?.access_token)
      localStorage.setItem('expired_at', response?.data?.expires_at)
    }
    return response;
  } catch (err: any) {
    if (err.response.status === 401) {
      throw ("Số điện thoại hoặc mật khẩu không chính xác")
    } else {
      throw (`Có lỗi xảy ra ${err.message}`)
    }

  }

}

export const getAccountInfo = async () => {

  var query = `
mutation {
    response: customer_authorization_me  {
        code
        message
        data
    }
}
`
  var accessToken = localStorage.getItem('access_token')
  var variables = {}
  var requestHeaders = { 'Authorization': `Berrer ${accessToken}` }
  return await CallApi({ query, variables, requestHeaders });

}

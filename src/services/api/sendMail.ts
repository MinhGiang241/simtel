import { CallApi } from '../helper'

export const send_mail = async (email: any) => {
    var query = `
    mutation ($email:String){
        response: mail_send_mail_otp (email: $email ) {
            code
            message
            data
        }
    }
            
    `
    // var token = localStorage.getItem("access_token");
    var variables = { email }
    // var requestHeaders = { "Authorization": `Bearer ${token}` }
    // console.log("requestHeaders", requestHeaders);

    return await CallApi({ query, variables });
}
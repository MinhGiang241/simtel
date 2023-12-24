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
    var variables = { email }
    return await CallApi({ query, variables });
}
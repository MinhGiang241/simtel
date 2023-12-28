import { CallApi } from '../helper'

export const change_password = async (id: any, password: any) => {
    var query = `
    mutation ($id:String,$password:String){
        response: mail_change_password (id: $id,password: $password ) {
            code
            message
            data
        }
    }
            
            
    `
    // var token = localStorage.getItem("access_token");
    var variables = { id, password }
    // var requestHeaders = { "Authorization": `Bearer ${token}` }
    // console.log("requestHeaders", requestHeaders);
    return await CallApi({ query, variables });
}
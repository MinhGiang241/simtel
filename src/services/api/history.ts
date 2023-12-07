import { CallApi } from '../helper'

export const get_history = async (customerId: string | undefined, phoneNumber: string | undefined, orderId: string | undefined) => {
    var query = `
    mutation ($customerId:String,$phoneNumber:String,$orderId:String){
        response: customer_history (customerId: $customerId,phoneNumber: $phoneNumber,orderId: $orderId ) {
            code
            message
            data
        }
    }
            
    `
    var token = localStorage.getItem('access_token')
    var variables = { customerId, phoneNumber, orderId }
    var requestHeaders = { headers: { 'authorization': `Bearer ${token}` } }
    return await CallApi({ query, variables, requestHeaders });
}
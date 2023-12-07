import { CallApi } from '../helper'

export const get_history = async (id: any) => {
    var query = `
    mutation ($customerId:String,$phoneNumber:String,$orderId:String){
        response: customer_history (customerId: $customerId,phoneNumber: $phoneNumber,orderId: $orderId ) {
            code
            message
            data
        }
    }
            
    `
    var variables = { id }
    return await CallApi({ query, variables });
}
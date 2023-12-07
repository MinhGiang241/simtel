import { CallApi } from '../helper'

export const get_detail_history = async (id: any) => {
    var query = `
    mutation ($id:String){
        response: customer_get_detail_history_card (id: $id ) {
            code
            message
            data
        }
    }   
    `
    var variables = { id }
    return await CallApi({ query, variables });
}
import { CallApi } from '../helper'

export const get_blog = async (id: any) => {
    var query = `
    mutation ($_id:String){
        response: promotion_get_blog (_id: $_id ) {
            code
            message
            data
        }
    }
    `
    var variables = { id }
    return await CallApi({ query, variables });
}
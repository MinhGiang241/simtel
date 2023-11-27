import { CallApi } from '../helper'

export const get_menu_header = async (id: any) => {
    var query = `
    mutation {
        response: telco_web_get_active  {
            code
            message
            data
        }
    }      
    `
    var variables = { id }
    return await CallApi({ query, variables });
}
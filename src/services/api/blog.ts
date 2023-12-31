import { CallApi } from '../helper'

export const get_blog = async (id: any) => {
    var query = `
    mutation {
        response: articlecategory_get_blog  {
            code
            message
            data
        }
    }
    `
    var variables = { id }
    return await CallApi({ query, variables });
}
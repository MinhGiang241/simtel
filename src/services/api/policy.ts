import { CallApi } from '../helper'

export const get_article_footer = async (id: any) => {
    var query = `
    mutation {
        response: article_get_article_footer  {
            code
            message
            data
        }
    }
            
    `
    var variables = { id }
    return await CallApi({ query, variables });
}
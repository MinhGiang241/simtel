import { CallApi } from '../helper'

export const get_article = async (id: any) => {
    var query = `
    mutation ($id:String){
        response: article_get_article (id: $id ) {
            code
            message
            data
        }
    }
            
    `
    var variables = { id }
    return await CallApi({ query, variables });
}
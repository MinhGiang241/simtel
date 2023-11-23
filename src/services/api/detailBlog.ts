import { CallApi } from '../helper'

export const get_detail_blog = async (id: any) => {
    var query = `
    mutation ($id:String){
        response: articlecategory_get_articlecategory (id: $id ) {
            code
            message
            data
        }
    }
            
    `
    var variables = { id }
    return await CallApi({ query, variables });
}
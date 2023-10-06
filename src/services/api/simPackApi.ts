import { CallApi } from '../helper'


export const getAllSimpack = async (sortBy: string, limit: number, skip: number) => {
  var query = `
mutation ($sortBy:String,$limit:Float,$skip:Float){
    response: simpack_get_all_simpack (sortBy: $sortBy,limit: $limit,skip: $skip ) {
        code
        message
        data
    }
} 
`
  var variables = { limit, skip, sortBy, }
  return await CallApi({ query, variables });
}

export const getAllPhoneCard = async (sortBy: string, limit: number, skip: number) => {
  var query = `
mutation ($sortBy:String,$limit:Float,$skip:Float){
    response: phonecard_get_all_phone_card (sortBy: $sortBy,limit: $limit,skip: $skip ) {
        code
        message
        data
    }
}
`
  var variables = { limit, skip, sortBy, }
  return await CallApi({ query, variables });
}

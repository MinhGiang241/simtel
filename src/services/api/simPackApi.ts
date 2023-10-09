import { CallApi } from '../helper'


export const getAllSimpack = async (limit: number, skip: number, telco: string | undefined, type: string | undefined, sortBy: string | undefined,) => {
  // throw "có lỗi xảy ra"
  var query = `
mutation ($sortBy:String,$limit:Float,$skip:Float,$type:String,$telco:String){
    response: simpack_get_all_simpack (sortBy: $sortBy,limit: $limit,skip: $skip,type: $type,telco: $telco ) {
        code
        message
        data
    }
}
         
`
  var variables = { limit, skip, sortBy, type, telco }
  return await CallApi({ query, variables });
}

export const getAllPhoneCard = async (sortBy: string | undefined, limit: number, skip: number) => {
  //throw "có lỗi xảy ra"
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

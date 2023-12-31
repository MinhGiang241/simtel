import { Sim } from '@/interfaces/data';
import { CallApi } from '../helper'


export const getAllSimpack = async (limit: number, skip: number, telco?: string | undefined, type?: string | undefined, sortBy?: string | undefined,) => {
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

export const getListCardType = async (type: string | undefined, limit: number, skip: number) => {
    var query = `
   mutation ($type:String,$skip:Float,$limit:Float){
    response: phonecard_get_list_card_type (type: $type,skip: $skip,limit: $limit ) {
        code
        message
        data
    }
}
        
    `

    var variables = { type, skip, limit }
    return await CallApi({ query, variables })
}

export const getSimPackById = async (id: string | undefined | null) => {
    var query = `
mutation(\$id: String){
    response: simpack_get_simpack_by_id(id: \$id) {
      code
      message
      data
    }
  }

`
    var variables = { id }
    return await CallApi({ query, variables });
}

export const getRandomSimpackBySim = async (telco: string | undefined, sim: Sim | undefined, oldId: string | undefined) => {
    var query = `
     mutation ($telco:String,$sim:Dictionary,$oldId:String){
        response: simpack_get_random_simpack_by_sim (telco: $telco,sim: $sim,oldId: $oldId ) {
            code
            message
            data
        }
    }
 `

    var variables = { telco, sim, oldId }
    return await CallApi({ query, variables })
}

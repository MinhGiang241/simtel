import { CallApi } from "../helper";

export const getProvinceQLTN = async (provinceId?: string) => {
  var query = `
mutation ($key:String,$provinceId:String){
    response: province_get_list_by_key (key: $key,provinceId: $provinceId ) {
        code
        message
        data
    }
}
        
        
  `
  var variables = { provinceId }
  return await CallApi({ query, variables });
}

export const getDistricts = async ({ key, provinceId, districtId }: { key?: string; provinceId?: string; districtId?: string; }) => {
  var query = `mutation ($key:String,$provinceId:String,$districtId:String){
    response: district_get_list_by_key (key: $key,provinceId: $provinceId,districtId: $districtId ) {
        code
        message
        data
    }
}   
        `

  var variables = { key, provinceId, districtId }
  return await CallApi({ query, variables });
}

export const getWards = async ({ key, districtId, wardsId }: { key?: string; districtId?: string; wardsId?: string }) => {
  var query = `mutation ($key:String,$districtId:String,$wardsId:String){
    response: ward_get_list_by_key (key: $key,districtId: $districtId,wardsId: $wardsId ) {
        code
        message
        data
    }
}        
`
  var variables = { key, districtId, wardsId }
  return await CallApi({ query, variables });
}


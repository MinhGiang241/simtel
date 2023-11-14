import { CallApi } from "../helper";

interface simList {
  telco?: string;
  not_include?: string[],
  price?: number,
  type?: string,
  search?: string,
  skip?: number,
  limit?: number,
}
export const getAllSim = async ({
  telco,
  not_include,
  price,
  type,
  search,
  skip,
  limit,
}: simList) => {
  var query = `
  mutation ($telco:String,$not_include:Dictionary,$search:String,$type:String,$price:Float,$skip:Float,$limit:Float){
    response: sim_get_sim_list (telco: $telco,not_include: $not_include,search: $search,type: $type,price: $price,skip: $skip,limit: $limit ) {
        code
        message
        data
    }
}        
  `
  var variables = { telco, not_include, price, type, search, skip, limit }
  return await CallApi({ query, variables });
}

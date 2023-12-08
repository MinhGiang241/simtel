import { SimPack } from "@/interfaces/data";
import { CallApi } from "../helper";

interface simList {
  telco?: string;
  not_include?: string[];
  price?: string;
  type?: string;
  search?: string;
  skip?: number;
  limit?: number;
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
  mutation ($telco:String,$not_include:Dictionary,$search:String,$type:String,$price:String,$skip:Float,$limit:Float){
    response: sim_get_sim_list (telco: $telco,not_include: $not_include,search: $search,type: $type,price: $price,skip: $skip,limit: $limit ) {
        code
        message
        data
    }
}
        
  `;
  var variables = { telco, not_include, price, type, search, skip, limit };
  return await CallApi({ query, variables });
};

export const getRandomSimBySimpack = async (
  telco: string | undefined,
  simpack: SimPack | undefined,
  old_number: string | undefined,
) => {
  var query = `
  mutation ($telco:String,$simpack:Dictionary,$old_number:String){
    response: sim_get_random_sim_by_simpack (telco: $telco,simpack: $simpack,old_number: $old_number ) {
        code
        message
        data
    }
}
  `;
  var variables = { telco, simpack, old_number };
  return await CallApi({ query, variables });
};

import { CallApi } from "../helper";

export const getActiveTelco = async () => {
  var query = `
   mutation {
    response: telco_web_get_active  {
        code
        message
        data
      }
    }            
    `;
  var variables = {};
  return await CallApi({ query, variables });
};

export const getConfig = async () => {
  var query = `
mutation {
    response: simtel_get_config  {
        code
        message
        data
    }
}
        
`;
  var variables = {};
  return await CallApi({ query, variables });
};

import { apiGraphql, apiGraphqlQLTN } from "@/constants/apiConstant";
import request, { gql } from "graphql-request";
import { Response } from './api/type'

interface Arguments {
  query: string,
  variables?: any,
  requestHeaders?: any,
}

export const CallApi = async ({ query, variables, requestHeaders }: Arguments) => {

  var document = gql`${query}`
  var results: Response = await request({
    url: apiGraphql, document, variables, requestHeaders
  })

  if (!results) {
    throw "Không kết nối được với server"
  }

  if (!results.response) {
    throw "Không lấy được dữ liệu";
  }

  if (results.response?.code != 0) {
    throw results.response?.message
  }

  return results.response.data;
}


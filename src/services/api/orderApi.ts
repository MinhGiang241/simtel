import { Order } from "@/interfaces/data";
import { CallApi } from "../helper"

export const createOrder = async (data: Order) => {
  var query = `
mutation ($data:Dictionary){
    response: order_create_order (data: $data ) {
        code
        message
        data
    }
    }
        
`
  var variables = { data }
  return await CallApi({ query, variables });
}




export const getOrderById = async (id: string) => {
  var query = `
mutation ($id:String){
    response: order_get_order_by_id (id: $id ) {
        code
        message
        data
    }
} 
  `

  var variables = { id }
  return await CallApi({ query, variables })
}

export const getOrderLink = async (
  { orderInfo, orderId, amount, paymentMethod, bankCode, extraData }:
    {
      orderId: string,
      orderInfo?: String,
      amount?: number,
      paymentMethod?: string,
      bankCode?: string,
      extraData?: string,
    }

) => {
  var query = `
mutation ($orderId:String,$orderInfo:String,$amount:Float,$paymentMethod:String,$bankCode:String,$extraData:String){
    response: appota_get_payment_url (orderId: $orderId,orderInfo: $orderInfo,amount: $amount,paymentMethod: $paymentMethod,bankCode: $bankCode,extraData: $extraData ) {
        code
        message
        data
    }
}


  `

  var variables = { orderInfo, orderId, amount, paymentMethod, bankCode, extraData }
  return await CallApi({ query, variables })
}

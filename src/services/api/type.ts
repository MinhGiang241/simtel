export interface Response {
  response: ResponseData
}

export interface ResponseData {
  data?: any,
  message: string,
  code: number
}

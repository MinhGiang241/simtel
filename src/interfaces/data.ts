export interface SimPack {
  _id: string,
  createdTime: string,
  updatedTime: string,
  creator?: string,
  cycle?: string,
  price?: number,
  data_max?: number,
  desciption?: string,
  priority?: number,
  sms?: number,
  telco?: string,
  thump?: string,
  code?: string,
}

export interface PhoneCard {
  _id: string,
  createdTime: string,
  updatedTime: string,
  hiddenCode?: string,
  telco: string,
  price?: number,
  seria?: number,
  code?: string,
  status?: string
}



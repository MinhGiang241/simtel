export interface User {
  address?: string;
  aud?: string;
  email?: string;
  exp?: number;
  full_name?: string;
  regcode?: string;
  sex?: string;
  tel?: string;
  tenantId?: string;
  _id?: string;
}

export interface SimPack {
  _id: string;
  createdTime: string;
  updatedTime: string;
  creator?: string;
  cycle?: string;
  price?: number;
  data_max?: number;
  description?: string;
  priority?: number;
  sms?: number;
  telco?: string;
  thumb?: string;
  code?: string;
}

export interface PhoneCard {
  _id: string;
  createdTime: string;
  updatedTime: string;
  hiddenCode?: string;
  telco: string;
  price?: number;
  seria?: number;
  code?: string;
  status?: string;
}

export interface Order {
  _id?: string;
  createdTime?: string;
  updatedTime?: string;
  code?: string;
  tel?: string;
  items?: Object;
  full_name?: string;
  address?: string;
  customerId?: string;
  voucher_code?: string;
  discount_amount?: number;
  payment_method?: string;
  prod_total_amount?: number;
  transport_fee?: number;
  total_amount?: number;
  process_state?: string;
  payment_state?: string;
  email?: string;
  sex?: string;
  birthday?: string;
  note?: string;
  itemIds?: any;
  provinceId?: string;
  districtId?: string;
  wardId?: string;
  i?: any;
}

export interface Sim {
  _id?: string;
  createdTime?: string;
  updatedTime?: string;
  msid?: string;
  storteId?: string;
  telco?: string;
  hiddenCode?: string;
  price?: number;
  seria?: string;
  status?: string;
  description?: string;
  highlight?: string[];
  classify?: string;
  compare_price?: number;
  type?: string;
  sp?: SimPack;
}

export interface CardType {
  _id?: string;
  createdTime?: string;
  updatedTime?: string;
  cardType?: string;
  code?: string;
  value?: number;
}

export interface Customer {
  _id?: string;
  createdTime?: string;
  updatedTime?: string;
  tel?: string;
  full_name?: string;
  email?: string;
  fbId?: string;
  zalo?: string;
  sex?: string;
  birthday?: string;
  password?: string;
  passwordHash?: string;
  birthyear?: number;
}

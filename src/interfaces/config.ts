export interface ActiveTelco {
  _id: string;
  createdTime: string;
  updatedTime: string;
  isActive?: boolean;
  name?: string;
  schema?: string;
}

export interface Config {
  _id: string;
  createdTime: string;
  updatedTime: string;
  schema?: string;
  addr?: string;
  contactPhone?: string;
  fullName?: string;
  district?: string;
  city?: string;
  ward?: string;
  email?: string;
  enable_trans_fee?: boolean;
  transportfee?: number;
  bankQr?: string;
}

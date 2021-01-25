export interface CreateInstantBuy {
  amount: number;
  base_product: string;
  quote_product: string;
  withdraw_address: string;
  schema_name: string;
  schema_data?: any;
}

export enum Sides {
  Sell = "sell",
  Buy = "buy",
}
export enum Types {
  Limit = "limit",
  Market = "market",
  Stop = "stop",
  StopLimit = "stop_limit",
}
export enum ProductType {
  base = "base",
  quote = "quote",
}
export type OrderSide = "sell" | "buy";
export type OrderType = "limit" | "market" | "stop" | "stop_limit";
export type OrderTimeInForce =
  | "ioc"
  | "fok"
  | "gtc"
  | "gtd"
  | "day"
  | "ato"
  | "atc"
  | "gtcrs";
export type OrderStatus =
  | "new"
  | "rejected"
  | "canceled"
  | "replaced"
  | "partially_filled"
  | "completely_filled"
  | "expired"
  | "pending_new"
  | "pending_cancel"
  | "pending_replace"
  | "suspended";

import { AccountTransaction } from "./transactions.interface";

export interface Order {
  id: string;
  exchange_id: string;
  instrument_id: string;
  type: OrderType;
  side: OrderSide;
  status: OrderStatus;
  quantity: number;
  executed_quantity: number;
  average_price?: number;
  limit_price?: number;
  stop_price?: number;
  client_user_id: string;
  oms_user_id: string;
  reason?: string;
  reason_code?: string;
  time_in_force: OrderTimeInForce;
  expires_time: number;
  open_time: number;
  close_time: number;
  trading_commission?: number;
  comission_product?: string;
  transactions: {
    [key: string]: AccountTransaction;
  };
}

export interface OrderCSV extends Order {}

export interface OrderPagedFilter {
  sort_direction?: "asc" | "desc";
  pager_limit?: number;
  pager_offset?: number;
  filter_status?: string;
  filter_filled?: "yes" | "no";
  filter_date_from?: string | Date;
  filter_date_to?: string | Date;
}

export interface OrderPagedFilterCsv extends OrderPagedFilter {
  dateFormat?: string;
  dateTimezone?: string;
  headers?: string;
}

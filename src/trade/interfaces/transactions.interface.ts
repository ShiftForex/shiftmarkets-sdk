import { TradePager } from "./trade-pager";

export interface GetAccountTransactionsDto {
  sort_direction?: "asc" | "desc";
  pager_limit?: number;
  pager_offset?: number;
  filter_date_from?: string | Date;
  filter_date_to?: string | Date;
}

export interface GetAccountTransactionsDtoCsv
  extends GetAccountTransactionsDto {
  dateFormat?: string;
  dateTimezone?: string;
  headers?: string;
}

export interface AccountTransaction {
  id: string;
  exchange_id: string;
  client_user_id: string;
  deltix_user_id: string;
  account_id: string;
  currency: string;
  amount: number;
  type: string;
  client_transaction_id?: string;
  deal_id?: string;
  sequence_number: number;
  is_rejected: boolean;
  rejection_reason?: string;
  comment: string | null;
  post_balance: number;
  timestamp: number;
}

export type AccountTransactions = TradePager<AccountTransaction>;

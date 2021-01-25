export type MarketOrderQcStatus =
  | 'new'
  | 'partially_filled'
  | 'completely_filled'
  | 'rejected';

export interface MarketOrdersQc {
  id: string;
  exchange_id: string;
  instrument_id: string;
  client_order_id: string;
  side: 'sell' | 'buy';
  status: MarketOrderQcStatus;
  quantity: number;
  executed_quantity: number;
  executed_base_quantity: number;
  user_id: string;
  exchange_user_id: string;
  rejection_reason: string;
  created_at: Date;
}

export interface MarketOrdersQcDto {
  sort_field?: keyof MarketOrdersQc;
  pager_offset?: number;
  pager_limit?: number;
  filter_instrument?: string;
  filter_side?: 'sell' | 'buy';
  filter_status?: string;
}

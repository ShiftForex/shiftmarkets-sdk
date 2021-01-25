export interface TradePager<T> {
  items: T[];
  pager_limit: number;
  pager_offser: number;
  pager_total_rows: number;
}

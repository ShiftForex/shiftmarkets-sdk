export interface TickerUpdateRecord {
  pair: string;
  bid: string;
  ask: string;
  price_24h_change: string;
  volume_24h_change: string;
  price_24h_max: string;
  price_24h_min: string;
  volume: number;
  date_ts: string;
}

export interface TickerUpdateDto {
  type: "update" | "snapshot";
  source: string;
  payload: TickerUpdateRecord;
}

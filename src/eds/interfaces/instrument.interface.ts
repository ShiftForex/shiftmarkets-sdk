export interface InstrumentFee {
  progressive_commission_method: string;
  flat_commission_method: string;
  maker_commission_progressive: number;
  taker_commission_progressive: number;
  maker_commission_flat: number;
  taker_commission_flat: number;
  source: string;
}

export interface Instrument {
  id: string;
  name: string;
  base_product: string;
  quote_product: string;
  quantity_decimals: number;
  quantity_increment: number;
  price_decimals: number;
  min_quantity: number;
  max_quantity: number;
  type: "fiat" | "crypto";
  available_destinations: string[];
  tick_size: number;
  time_in_forces: Array<string>,
  order_types: Array<string>,
  market_time_in_forces: Array<string>,
  default_market_time_in_force: string,
  default_time_in_force: string,
  fees?: {
    buy: InstrumentFee;
    sell: InstrumentFee;
  };
}

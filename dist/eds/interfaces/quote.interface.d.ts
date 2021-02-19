export interface Quote {
    pair: string;
    bid: number;
    ask: number;
    price_24h_change: number;
    volume_24h_change: number;
    price_24h_max: number;
    price_24h_min: number;
    volume: number;
    date_ts: string;
}

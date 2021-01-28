export interface OrderbookRecord {
    price: number;
    volume: number;
    side: "buy" | "sell";
}
export interface QuoteVWAPAccumulator {
    remainingVolume: number;
    filledVolume: number;
    VWAP: number;
    volume: number;
}

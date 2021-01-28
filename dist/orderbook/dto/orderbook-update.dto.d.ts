export interface OrderbookUpdateRecord {
    side: "SELL" | "BUY";
    level: number;
    price: string;
    volume: string;
    volume_percent: string;
    action: "insert" | "update" | "delete";
}
export interface OrderbookUpdateDto {
    type: "update" | "snapshot";
    source: string;
    payload: OrderbookUpdateRecord[];
}

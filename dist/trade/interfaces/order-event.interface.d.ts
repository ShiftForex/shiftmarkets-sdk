export interface OrderEvent {
    id: string;
    account: string;
    commission: number;
    commission_currency: string;
    cumulative_quantity: number;
    remaining_quantity: number;
    quantity: number;
    trade_quantity?: number;
    trade_price?: number;
    order_id: string;
    order_status: string;
    side: string;
    symbol: string;
    time_in_force: string;
    order_type: string;
    oms: string;
    oms_user_id: string;
    exchange_id: string;
    source_id: string;
    timestamp: number;
    type: string;
}

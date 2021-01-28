import { OrderSide, OrderType, OrderStatus } from "./order.interface";
export interface ActivityTransaction {
    entity_type: "DEPOSIT" | "WITHDRAW";
    product_id: string;
    amount: number;
    status: string;
    confirmations_count: number;
    confirmations_required: number;
    timestamp: number;
}
export interface ActivityOrder {
    entity_type: "ORDER";
    instrument_id: string;
    status: OrderStatus;
    type: OrderType;
    side: OrderSide;
    quantity: number;
    executed_quantity: number;
    price: number;
    timestamp: number;
}
export interface ActivityPagedFilter {
    pager_limit?: number;
}
export interface ActivityCsv extends Omit<ActivityTransaction, "entity_type" | "status">, Omit<ActivityOrder, "entity_type" | "status"> {
    entity_type: "DEPOSIT" | "WITHDRAW" | "ORDER";
    description: string;
    status: string;
    trading_commission: any;
    comission_product: any;
    remaining_quantity: any;
}
export interface ActivityPagedFilterCsv {
    dateFormat?: string;
    dateTimezone?: string;
    headers?: string;
}

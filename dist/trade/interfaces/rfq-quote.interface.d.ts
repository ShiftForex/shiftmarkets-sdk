import { TradePager } from "./trade-pager";
export interface RfqQuote {
    quote_id: string;
    instrument: string;
    client_quote_id: string;
    fees_in_price: boolean;
    bid: number;
    sell_quantity_filled: number;
    sell_quantity_remaining: number;
    ask: number;
    buy_quantity_filled: number;
    buy_quantity_remaining: number;
    expires: Date;
}
export interface GetRfqQuotesDto {
    sort_field?: keyof TrueRfqQuote;
    sort_direction?: 'ASC' | 'DESC';
    pager_offset?: number;
    pager_limit?: number;
    filter_instrument?: string;
    time_from?: Date;
    time_to?: Date;
}
export interface TrueRfqQuote {
    id: string;
    strategy_id: string;
    client_quote_id: string;
    instrument_id: string;
    fees_in_price: boolean;
    bid: number;
    original_bid: number;
    sell_quantity_filled: number;
    sell_quantity_remaining: number;
    ask: number;
    original_ask: number;
    buy_quantity_filled: number;
    buy_quantity_remaining: number;
    user_id: string;
    is_active: boolean;
    created_at: Date;
    expires_at: Date;
}
export declare type RfqQuotes = TradePager<TrueRfqQuote>;

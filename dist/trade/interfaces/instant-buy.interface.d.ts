import { Instrument } from "../..";
import { Product } from "../../eds/interfaces/product.interface";
import { Transaction } from "../../wis/interfaces/transaction.interface";
export declare type InstantBuyStatus = 'new' | 'init_error' | 'deposit_pending' | 'deposit_success' | 'deposit_error' | 'market_pending' | 'market_success' | 'market_error' | 'withdraw_pending' | 'withdraw_success' | 'withdraw_error' | 'success';
export interface InstantBuy {
    id: string;
    exchange_id: string;
    instrument_id: string;
    user_id: string;
    deposit_product_id: string;
    deposit_amount: number;
    deposit: Transaction;
    withdraw_product_id: string;
    withdraw_address: string;
    withdraw: Transaction;
    market_order_qc_id: string;
    status: InstantBuyStatus;
    schema_name: string;
    schema_data: string;
    message: string;
    created_at: Date;
    updated_at: Date;
}
export interface InstantBuyEstimate {
    amountAfterDeposit: number;
    baseQtyBeforeTrade: number;
    baseQtyAfterTrade: number;
    amountAfterWithdraw: number;
    availableQty: number;
    availableQuoteQty: number;
    vwap: any;
    quoteProduct: Product;
    baseProduct: Product;
    instrument: Instrument;
}
export interface InstantBuyFilterParams {
    sort_field?: string;
    sort_direction?: "ASC" | "DESC";
    pager_offset?: number;
    pager_limit?: number;
    filter_instrument?: string;
    filter_status?: string;
}
export declare type InstantBuysDto = [InstantBuyFilterParams] | [string?, ("ASC" | "DESC")?, number?, number?, string?, string?];

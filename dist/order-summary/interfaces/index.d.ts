import { OrderSide, Sides, OrderType, ProductType } from "../../trade/interfaces";
export interface IOrderBook {
    bids: Array<any>;
    asks: Array<any>;
}
export declare enum FeeCalculationMethod {
    quantityPercent = "quantity_percent",
    exactValue = "exact_value"
}
export declare enum AccountType {
    sourceAccount = "source_account",
    destinationAccount = "destination_account"
}
export declare enum FeeType {
    maker = "maker",
    taker = "taker"
}
export interface Fee {
    makerProgressive: number;
    takerProgressive: number;
    makerFlat: number;
    takerFlat: number;
    progressiveMethod: FeeCalculationMethod;
    flatMethod: FeeCalculationMethod;
    source: string;
}
export interface InstrumentFee {
    [Sides.Buy]: Fee;
    [Sides.Sell]: Fee;
}
export interface BidAskValues {
    bid: number;
    ask: number;
}
export interface OrderSummaryValues {
    fees: number;
    amount: number;
    price: number;
    net: number;
    total: number;
    feeProduct: string;
    totalProduct: string;
    netProduct: string;
    amountProduct: string;
    currentProduct?: string;
    isSinglePrice?: boolean;
    isQuote: boolean;
    withTrm: number;
}
export interface OrderSummaryPayload {
    commissionAccount: AccountType;
    action: OrderSide;
    amount: number;
    orderType: OrderType;
    fees: InstrumentFee;
    bidAsk: BidAskValues;
    orderBook: IOrderBook;
    limitPrice?: number;
    stopPrice?: number;
    quote: string;
    base: string;
    quoteDecimals: number;
    baseDecimals: number;
    currentProduct?: string;
    isSinglePrice?: boolean;
    takerReserveMultiplier?: number;
}
export interface OrderSummaryProperties {
    commissionAccount: AccountType;
    action: OrderSide;
    orderType: OrderType;
    amount: number;
    fees: InstrumentFee;
    bidAsk: BidAskValues;
    limitPrice: number;
    stopPrice: number;
    orderBook: IOrderBook;
    quote: string;
    base: string;
    quoteDecimals: number;
    baseDecimals: number;
    calculatedFees: number;
    calculatedNet: number;
    calculatedAmount: number;
    calculatedTotal: number;
    calculatedVWAP: number;
    calculatedPrice: number;
    feeProduct: string;
    feeDecimals: number;
    totalProduct: string;
    totalDecimals: number;
    netProduct: string;
    amountDecimals: number;
    amountProduct: string;
    currentProduct: string | undefined;
}
export interface ProductsConfig {
    amountProduct: ProductType;
    totalProduct: ProductType;
    feeProduct: ProductType;
    netProduct: ProductType;
}
export declare type ProductsConfigOptions = "sell_quote_destination_account" | "buy_quote_destination_account" | "sell_quote_source_account" | "buy_quote_source_account" | "sell_base_destination_account" | "buy_base_destination_account" | "sell_base_source_account" | "buy_base_source_account";

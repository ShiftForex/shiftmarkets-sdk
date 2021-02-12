import { AccountType, FeeCalculationMethod } from "./interfaces";
export declare enum _Action {
    Buy = "buy",
    Sell = "sell"
}
declare enum _OrderType {
    Market = "market",
    Limit = "limit",
    Stop = "stop"
}
declare const _default: {
    orderBook: {
        asks: {
            price: number;
            volume: number;
            side: _Action;
        }[];
        bids: {
            price: number;
            volume: number;
            side: _Action;
        }[];
    };
    commissionAccount: AccountType;
    action: _Action;
    amount: number;
    orderType: _OrderType;
    fees: {
        buy: {
            flatMethod: FeeCalculationMethod;
            makerFlat: number;
            makerProgressive: number;
            progressiveMethod: FeeCalculationMethod;
            source: AccountType;
            takerFlat: number;
            takerProgressive: number;
        };
        sell: {
            flatMethod: FeeCalculationMethod;
            makerFlat: number;
            makerProgressive: number;
            progressiveMethod: FeeCalculationMethod;
            source: AccountType;
            takerFlat: number;
            takerProgressive: number;
        };
    };
    bidAsk: {
        ask: number;
        bid: number;
    };
    limitPrice: number;
    stopPrice: number;
    quote: string;
    base: string;
    quoteDecimals: number;
    baseDecimals: number;
    currentProduct: string;
};
export default _default;

import { RfqQuote } from "./rfq-quote.interface";
import { TradePager } from "./trade-pager";
interface Trade {
    trade_id: string;
    client_trade_id: string;
    instrument: string;
    quantity: number;
    direction: 'sell' | 'buy';
    price: number;
    comment?: any;
}
export interface RfqTrade {
    trade: Trade;
    quote: RfqQuote;
}
export declare type RfqTrades = TradePager<Trade>;
export {};

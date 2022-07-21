import { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";
import { Order, OrderSide, OrderPagedFilter, MarketOrdersQc, InstantBuy, RfqQuote, GetRfqQuotesDto, RfqQuotes, RfqTrade, RfqTrades, InstantBuysDto, ActivityOrder, ActivityTransaction, ActivityPagedFilter, TradePager, MarketOrdersQcDto, InstantBuyEstimate, GetAccountTransactionsDto, AccountTransactions, OrderPagedFilterCsv, GetAccountTransactionsDtoCsv, ActivityPagedFilterCsv, Account } from "./interfaces";
import { OrderEvent } from "./interfaces/order-event.interface";
import { CreateOrder } from "./interfaces/create-order.interface";
import { CreateInstantBuy } from "./interfaces/create-instant.buy";
export default interface Listener<T> {
    (data: T): void;
}
export interface CreateOrderResponseDto {
    id: string;
    status: string;
    message?: string;
}
export interface GetClosedOrdersResponseDto {
    items: Order[];
    pager_limit: number;
    pager_offset: number;
    pager_total_rows: number;
}
export declare class TradeServiceError extends Error {
}
export declare function tradeServiceRequest(request: AxiosRequestConfig): Promise<any>;
export declare class TradeService {
    /**
     * Create order on exchange
     */
    createOrder(createOrder: CreateOrder): Promise<CreateOrderResponseDto>;
    /**
     * Cancel order on exchange
     * @param id
     */
    cancelOrder(id: string): Promise<void>;
    /**
    * Cancel all orders for user on exchange
    */
    cancelAllOrders(): Promise<any>;
    getOrder(id: string): Promise<Order>;
    getOrderEvents(id: string): Promise<OrderEvent[]>;
    getActivity(filter?: ActivityPagedFilter): Promise<[ActivityTransaction | ActivityOrder]>;
    exportActivitiesLink(filter: ActivityPagedFilterCsv): string;
    /**
     * Get closed orders list
     */
    getClosedOrders(filter?: OrderPagedFilter): Promise<GetClosedOrdersResponseDto>;
    /**
     * Get open orders list
     */
    getOpenOrders(): Promise<Order[]>;
    exportClosedOrdersCsvLink(filter?: OrderPagedFilterCsv): string;
    exportOpenOrdersCsvLink(filter?: OrderPagedFilterCsv): string;
    /**
     * Create Market Order Quote Currency order
     * @param instrument
     * @param quantity
     * @param side
     * @param client_order_id
     */
    createMarketOrderQc(instrument: string, quantity: number, side: OrderSide, client_order_id?: string): Promise<MarketOrdersQc>;
    /**
     * Get Market Order Quote Currency order
     * @param id
     */
    getMarketOrderQc(id: string): Promise<MarketOrdersQc>;
    /**
     * Get Accounts
     */
    getAccounts(): Promise<Account[]>;
    /**
     * Create instant buy
     * @param amount amount of quote product
     */
    createInstantBuy(createInstantBuy: CreateInstantBuy): Promise<InstantBuy>;
    /**
     * Get instant buy by id
     * @param id
     */
    getInstantBuy(id: string): Promise<InstantBuy>;
    /**
     * Create RFQ quote
     * @param instrument
     * @param quantity
     */
    createRfqQuote(instrument: string, quantity: number, client_quote_id?: string, fees_in_price?: boolean): Promise<RfqQuote>;
    /**
     * Get RFQ quote
     * @param client_quote_id
     * @param quote_id
     */
    getRfqQuote(client_quote_id?: string, quote_id?: string): Promise<RfqQuote>;
    getRfqQuotes(params?: GetRfqQuotesDto): Promise<RfqQuotes>;
    createRfqTrade(quote_id: string, direction: "sell" | "buy", quantity: number, price?: number, instrument?: string, refresh?: boolean, client_quote_id?: string, client_trade_id?: string, comment?: any): Promise<RfqTrade>;
    /**
     *
     * @param client_trade_id
     * @param trade_id
     */
    getRfqTrade(client_trade_id?: string, trade_id?: string): Promise<RfqTrade>;
    getRfqTrades(time_from?: string, time_to?: string, pager_limit?: number, pager_offset?: number): Promise<RfqTrades>;
    getInstantBuys(...params: InstantBuysDto): Promise<TradePager<InstantBuy>>;
    getMarketOrdersQc(params?: MarketOrdersQcDto): Promise<TradePager<MarketOrdersQc>>;
    /**
     *
     * @param amount amount of quote product
     */
    estimateInstantBuy(amount: number, base_product: string, quote_product: string): Promise<InstantBuyEstimate>;
    getAccountTransactions(params?: GetAccountTransactionsDto): Promise<AccountTransactions>;
    exportAccountTransactionsLink(params?: GetAccountTransactionsDtoCsv): string;
}
export interface TradeService extends SdkService {
}

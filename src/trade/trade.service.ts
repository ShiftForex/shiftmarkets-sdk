import debugFactory from "debug";
import axios, { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";

import { fieldToDate } from "../common/field-to-date";
import {
  Order,
  OrderSide,
  OrderPagedFilter,
  MarketOrdersQc,
  InstantBuy,
  RfqQuote,
  GetRfqQuotesDto,
  RfqQuotes,
  RfqTrade,
  RfqTrades,
  InstantBuysDto,
  ActivityOrder,
  ActivityTransaction,
  ActivityPagedFilter,
  InstantBuyFilterParams,
  TradePager,
  MarketOrdersQcDto,
  InstantBuyEstimate,
  GetAccountTransactionsDto,
  AccountTransactions,
  OrderPagedFilterCsv,
  GetAccountTransactionsDtoCsv,
  ActivityPagedFilterCsv,
} from "./interfaces";
import * as querystring from "querystring";
import { OrderEvent } from "./interfaces/order-event.interface";
import { CreateOrder } from "./interfaces/create-order.interface";
import { CreateInstantBuy } from "./interfaces/create-instant.buy";

export default interface Listener<T> {
  (data: T): void;
}

const debug = debugFactory("ClientSDK:TradeService");

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

export class TradeServiceError extends Error {}

export async function tradeServiceRequest(request: AxiosRequestConfig) {
  try {
    debug("REQUEST", request);
    const response = (await axios(request)).data;
    debug("RESPONSE", response);
    return response;
  } catch (error) {
    debug("ERROR", error.message);
    if (error.response?.data?.message) {
      if (Array.isArray(error.response.data.message)) {
        throw new TradeServiceError(error.response.data.message.join(", "));
      } else {
        throw new TradeServiceError(error.response.data.message);
      }
    } else {
      throw new TradeServiceError(error.message);
    }
  }
}

export class TradeService {
  /**
   * Create order on exchange
   */
  createOrder(createOrder: CreateOrder): Promise<CreateOrderResponseDto> {
    return tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/trade/order`,
      method: "post",
      headers: {
        authorization: `bearer ${this.accessToken}`,
      },
      data: createOrder,
      timeout: 15000,
    });
  }

  /**
   * Cancel order on exchange
   * @param id
   */
  async cancelOrder(id: string) {
    await tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/trade/order/${id}`,
      method: "delete",
      headers: {
        authorization: `bearer ${this.accessToken}`,
      },
      timeout: 15000,
    });
  }

   /**
   * Cancel all orders for user on exchange
   */
    async cancelAllOrders() {
      return (await tradeServiceRequest({
        url: `${this.config.trade_api_sls_url}/trade/orders/all`,
        method: "delete",
        headers: {
          authorization: `bearer ${this.accessToken}`,
        },
        timeout: 15000,
      }));
    }

  async getOrder(id: string) {
    return (await tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/trade/order/${id}`,
      method: "get",
      headers: {
        authorization: `bearer ${this.accessToken}`,
      },
      timeout: 15000,
    })) as Order;
  }

  async getOrderEvents(id: string) {
    return (await tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/trade/order/${id}/events`,
      method: "get",
      headers: {
        authorization: `bearer ${this.accessToken}`,
      },
      timeout: 15000,
    })) as OrderEvent[];
  }

  async getActivity(filter?: ActivityPagedFilter) {
    return (await tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/trade/activity`,
      method: "get",
      headers: {
        authorization: `bearer ${this.accessToken}`,
      },
      params: filter,
      timeout: 15000,
    })) as [ActivityTransaction | ActivityOrder];
  }

  exportActivitiesLink(filter: ActivityPagedFilterCsv) {
    const query = querystring.stringify(
      (filter as unknown) as querystring.ParsedUrlQueryInput
    );
    return `${this.config.trade_api_sls_url}/trade/activity/csv?token=${this.accessToken}&${query}`;
  }

  /**
   * Get closed orders list
   */
  async getClosedOrders(filter?: OrderPagedFilter) {
    const result = (await tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/trade/orders/closed`,
      method: "get",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: filter,
      timeout: 15000,
    })) as GetClosedOrdersResponseDto;
    return result;
  }

  /**
   * Get open orders list
   */
  async getOpenOrders() {
    const result = (await tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/trade/orders/open`,
      method: "get",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      timeout: 15000,
    })) as Order[];
    return result;
  }

  exportClosedOrdersCsvLink(filter: OrderPagedFilterCsv = {}) {
    const query = querystring.stringify(
      filter as querystring.ParsedUrlQueryInput
    );
    return `${this.config.trade_api_sls_url}/trade/orders/closed/csv?token=${this.accessToken}&${query}`;
  }

  exportOpenOrdersCsvLink(filter: OrderPagedFilterCsv = {}) {
    const query = querystring.stringify(
      filter as querystring.ParsedUrlQueryInput
    );
    return `${this.config.trade_api_sls_url}/trade/orders/open/csv?token=${this.accessToken}&${query}`;
  }

  /**
   * Create Market Order Quote Currency order
   * @param instrument
   * @param quantity
   * @param side
   * @param client_order_id
   */
  async createMarketOrderQc(
    instrument: string,
    quantity: number,
    side: OrderSide,
    client_order_id?: string
  ) {
    const result = (await tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/market-order-qc`,
      method: "post",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      data: {
        instrument,
        quantity,
        side,
        client_order_id,
      },
    })) as MarketOrdersQc;
    fieldToDate(result, "created_at");
    return result;
  }

  /**
   * Get Market Order Quote Currency order
   * @param id
   */
  async getMarketOrderQc(id: string) {
    const result = (await tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/market-order-qc/order/${id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })) as MarketOrdersQc;
    fieldToDate(result, "created_at");
    return result;
  }

  /**
   * Get Accounts
   */
  getAccounts() {
    return tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/trade/accounts`,
      method: "get",
      headers: {
        authorization: `bearer ${this.accessToken}`,
      },
    }) as Promise<Account[]>;
  }

  /**
   * Create instant buy
   * @param amount amount of quote product
   */
  async createInstantBuy(createInstantBuy: CreateInstantBuy) {
    const result = (await tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/instant-buy`,
      method: "post",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      data: createInstantBuy,
    })) as InstantBuy;
    fieldToDate(result, "created_at");
    fieldToDate(result, "updated_at");
    return result;
  }

  /**
   * Get instant buy by id
   * @param id
   */
  async getInstantBuy(id: string) {
    const result = (await tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/instant-buy`,
      method: "get",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        id,
      },
    })) as InstantBuy;
    fieldToDate(result, "created_at");
    fieldToDate(result, "updated_at");
    return result;
  }

  /**
   * Create RFQ quote
   * @param instrument
   * @param quantity
   */
  createRfqQuote(
    instrument: string,
    quantity: number,
    client_quote_id?: string,
    fees_in_price?: boolean
  ) {
    return tradeServiceRequest({
      url: `${this.config.rfq_sls_url}/quote`,
      method: "post",
      headers: {
        authorization: `bearer ${this.accessToken}`,
      },
      data: {
        instrument,
        quantity,
        client_quote_id,
        fees_in_price,
      },
    }) as Promise<RfqQuote>;
  }

  /**
   * Get RFQ quote
   * @param client_quote_id
   * @param quote_id
   */
  async getRfqQuote(client_quote_id?: string, quote_id?: string) {
    const result = (await tradeServiceRequest({
      url: `${this.config.rfq_sls_url}/quote`,
      method: "get",
      headers: {
        authorization: `bearer ${this.accessToken}`,
      },
      params: {
        client_quote_id,
        quote_id,
      },
    })) as RfqQuote;
    fieldToDate(result, "expires");
    return result;
  }

  async getRfqQuotes(params?: GetRfqQuotesDto) {
    const result = (await tradeServiceRequest({
      url: `${this.config.rfq_sls_url}/quotes`,
      method: "get",
      headers: {
        authorization: `bearer ${this.accessToken}`,
      },
      params,
    })) as RfqQuotes;
    result.items.forEach((item) => {
      fieldToDate(item, "created_at");
      fieldToDate(item, "expires_at");
    });
    return result;
  }

  async createRfqTrade(
    quote_id: string,
    direction: "sell" | "buy",
    quantity: number,
    price?: number,
    instrument?: string,
    refresh?: boolean,
    client_quote_id?: string,
    client_trade_id?: string,
    comment?: any
  ) {
    const result = (await tradeServiceRequest({
      url: `${this.config.rfq_sls_url}/trade`,
      method: "post",
      headers: {
        authorization: `bearer ${this.accessToken}`,
      },
      data: {
        quote_id,
        client_quote_id,
        client_trade_id,
        comment,
        direction,
        quantity,
        refresh,
        instrument,
        price,
      },
    })) as RfqTrade;
    fieldToDate(result.quote, "expires");
    return result;
  }

  /**
   *
   * @param client_trade_id
   * @param trade_id
   */
  async getRfqTrade(client_trade_id?: string, trade_id?: string) {
    const result = (await tradeServiceRequest({
      url: `${this.config.rfq_sls_url}/trade`,
      method: "get",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        client_trade_id,
        trade_id,
      },
    })) as RfqTrade;
    fieldToDate(result.quote, "expires");
    return result;
  }

  getRfqTrades(
    time_from?: string,
    time_to?: string,
    pager_limit?: number,
    pager_offset?: number
  ) {
    return tradeServiceRequest({
      url: `${this.config.rfq_sls_url}/trades`,
      method: "get",
      headers: {
        authorization: `bearer ${this.accessToken}`,
      },
      params: {
        time_from,
        time_to,
        pager_limit,
        pager_offset,
      },
    }) as Promise<RfqTrades>;
  }

  async getInstantBuys(...params: InstantBuysDto) {
    let resultParams: InstantBuyFilterParams;
    if (typeof params[0] === "string") {
      resultParams = {
        sort_field: params[0],
        sort_direction: params[1],
        pager_offset: params[2],
        pager_limit: params[3],
        filter_instrument: params[4],
        filter_status: params[5],
      };
    } else {
      resultParams = params[0] as InstantBuyFilterParams;
    }

    const result = (await tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/instant-buy/orders`,
      method: "get",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: resultParams,
    })) as TradePager<InstantBuy>;

    result.items.forEach((item) => {
      fieldToDate(item, "created_at");
      fieldToDate(item, "updated_at");
    });
    return result;
  }

  async getMarketOrdersQc(params?: MarketOrdersQcDto) {
    const result = (await tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/market-order-qc/orders`,
      method: "get",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params,
    })) as TradePager<MarketOrdersQc>;
    result.items.forEach((item) => void fieldToDate(item, "created_at"));
    return result;
  }

  /**
   *
   * @param amount amount of quote product
   */
  estimateInstantBuy(
    amount: number,
    base_product: string,
    quote_product: string
  ) {
    return tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/instant-buy/estimate`,
      method: "post",
      data: {
        amount,
        base_product,
        quote_product,
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    }) as Promise<InstantBuyEstimate>;
  }

  async getAccountTransactions(params?: GetAccountTransactionsDto) {
    const result = (await tradeServiceRequest({
      url: `${this.config.trade_api_sls_url}/trade/transactions`,
      method: "get",
      headers: {
        authorization: `bearer ${this.accessToken}`,
      },
      params,
    })) as AccountTransactions;
    return result;
  }

  exportAccountTransactionsLink(params: GetAccountTransactionsDtoCsv = {}) {
    const query = querystring.stringify(
      params as querystring.ParsedUrlQueryInput
    );
    return `${this.config.trade_api_sls_url}/trade/transactions/csv?token=${this.accessToken}&${query}`;
  }
}
export interface TradeService extends SdkService {}

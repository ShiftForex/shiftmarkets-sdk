import debugFactory from "debug";
import WebSocket from "isomorphic-ws";
import axios, { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";
import { Instrument } from "./interfaces/instrument.interface";
import { Currency } from "./dto/currency.dto";
import { Product } from "./interfaces/product.interface";
import { Quote } from "./interfaces/quote.interface";

const debug = debugFactory("ClientSDK:ExchangeDataService");

export default interface Listener<T> {
  (data: T): void;
}

export class ExchangeDataServiceError extends Error {}

export async function edsServiceRequest(request: AxiosRequestConfig) {
  try {
    debug("REQUEST", request);
    const response = (await axios(request)).data;
    debug("RESPONSE", response);
    return response;
  } catch (error) {
    debug("ERROR", error.message);
    throw new ExchangeDataServiceError(
      error.response?.data?.message || error.message
    );
  }
}

export class ExchangeDataService extends SdkService {
  /**
   * Get instruments on exchange
   */
  async getInstruments(): Promise<Instrument[]> {
    let request = {
      url: `${this.config.eds_api_url}/instruments`,
      method: "GET" as "GET",
      params: { exchange: this.exchange },
      timeout: 15000,
      headers: {},
    };
    if (this.accessToken) {
      request.headers = {
        Authorization: "Bearer " + this.accessToken,
      };
    }
    return (await edsServiceRequest(request)).instruments;
  }

  /**
   * Get products on exchange
   */
  async getProducts(): Promise<Product[]> {
    let request = {
      url: `${this.config.eds_api_url}/currencies`,
      params: { exchange: this.exchange },
      method: "GET" as "GET",
      timeout: 15000,
      headers: {},
    };

    if (this.accessToken) {
      request.headers = {
        Authorization: "Bearer " + this.accessToken,
      };
    }

    const currencies = (await edsServiceRequest(request))
      .currencies as Currency[];

    return currencies.map((currency) => {
      return {
        id: currency.id,
        name: currency.name,
        precision: currency.precision,
        type: currency.type,
        deposit: {
          available: currency.available_for_deposit
            ? parseFloat(currency.available_for_deposit)
            : 0,
          commissions: {
            flat: currency.deposit_commission_flat
              ? parseFloat(currency.deposit_commission_flat)
              : 0,
            progressive: currency.deposit_commission_progressive
              ? parseFloat(currency.deposit_commission_progressive)
              : 0,
          },
          limits: {
            daily: currency.daily_deposit_limit
              ? parseFloat(currency.daily_deposit_limit)
              : 0,
            weekly: currency.weekly_deposit_limit
              ? parseFloat(currency.weekly_deposit_limit)
              : 0,
            monthly: currency.monthly_deposit_limit
              ? parseFloat(currency.monthly_deposit_limit)
              : 0,
          },
        },
        withdraw: {
          min_amount: currency.minimal_withdrawal
            ? parseFloat(currency.minimal_withdrawal)
            : 0,
          available: currency.available_for_withdrawal
            ? parseFloat(currency.available_for_withdrawal)
            : 0,
          commissions: {
            flat: currency.withdrawal_commission_flat
              ? parseFloat(currency.withdrawal_commission_flat)
              : 0,
            progressive: currency.withdrawal_commission_progressive
              ? parseFloat(currency.withdrawal_commission_progressive)
              : 0,
          },
          limits: {
            daily: currency.daily_withdrawal_limit
              ? parseFloat(currency.daily_withdrawal_limit)
              : 0,
            weekly: currency.weekly_withdrawal_limit
              ? parseFloat(currency.weekly_withdrawal_limit)
              : 0,
            monthly: currency.monthly_withdrawal_limit
              ? parseFloat(currency.monthly_withdrawal_limit)
              : 0,
          },
        },
      } as Product;
    });
  }

  protected castQuote(response: any): Quote {
    let result: Quote = {
      instrument: response.instrument,
      ask: Number(response.ask),
      bid: Number(response.bid),
      price_24h_change: Number(response.price_24h_change),
      volume_24h_change: Number(response.volume_24h_change),
      price_24h_max: Number(response.price_24h_max),
      price_24h_min: Number(response.price_24h_min),
      volume: response.volume,
      date_ts: response.date_ts,
    };
    return result;
  }

  /**
   * Get all quotes
   */
  async getQuotes(): Promise<Quote[]> {
    let request = {
      url: `${this.config.eds_api_url}/quotes`,
      method: "GET" as "GET",
      params: { exchange: this.exchange },
      timeout: 15000,
      headers: {},
    };
    let response = await edsServiceRequest(request);
    let result = [];
    for (let quote of response) {
      result.push(this.castQuote(quote));
    }
    return result;
  }

  /**
   * Get quote of instrument
   */
  async getQuote(instrument: string): Promise<Quote> {
    let request = {
      url: `${this.config.eds_api_url}/quotes`,
      method: "GET" as "GET",
      params: { exchange: this.exchange, instrument },
      timeout: 15000,
      headers: {},
    };
    let response = await edsServiceRequest(request);
    return this.castQuote(response);
  }

  /**
   * Create new websocket connection to Exchange Data Service
   * and return connected websocket
   */
  edsWebsocketFactory(timeout = 15000): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      const connectionTimeout = setTimeout(() => {
        reject(
          new Error(`Connection timeout ${this.config.eds_ws_url} ${timeout}ms`)
        );
      }, timeout);
      const ws = new WebSocket(this.config.eds_ws_url);

      ws.onopen = () => {
        clearTimeout(connectionTimeout);
        resolve(ws);
      };

      ws.onerror = (error) => {
        clearTimeout(connectionTimeout);
        reject(error);
      };

      if (typeof ws.on == "undefined" && typeof ws.off == "undefined") {
        // dirty workaround on web browser websocket
        let listeners: Listener<any>[] = [];
        ws.onmessage = (event: WebSocket.MessageEvent) => {
          listeners.forEach((listener) => listener(event.data));
        };
        Object.assign(ws, {
          on: (event: any, listener: Listener<any>) => {
            const index = listeners.indexOf(listener);
            if (index === -1) {
              listeners.push(listener);
            }
          },
          off: (event: any, listener: Listener<any>) => {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
              listeners.splice(index, 1);
            }
          },
        });
      }
    });
  }

  subscribeUserNotifications() {}
  unsubscribeUserNotifications() {}
}
export interface ExchangeDataService extends SdkService {}

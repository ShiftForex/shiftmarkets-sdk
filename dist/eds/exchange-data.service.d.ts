/// <reference types="ws" />
import WebSocket from "isomorphic-ws";
import { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";
import { Instrument } from "./interfaces/instrument.interface";
import { Product } from "./interfaces/product.interface";
import { Quote } from "./interfaces/quote.interface";
export default interface Listener<T> {
    (data: T): void;
}
export declare class ExchangeDataServiceError extends Error {
}
export declare function edsServiceRequest(request: AxiosRequestConfig): Promise<any>;
export declare class ExchangeDataService extends SdkService {
    /**
     * Get instruments on exchange
     */
    getInstruments(): Promise<Instrument[]>;
    /**
     * Get products on exchange
     */
    getProducts(): Promise<Product[]>;
    protected castQuote(response: any): Quote;
    /**
     * Get all quotes
     */
    getQuotes(): Promise<Quote[]>;
    /**
     * Get quote of instrument
     */
    getQuote(instrument: string): Promise<Quote>;
    /**
     * Create new websocket connection to Exchange Data Service
     * and return connected websocket
     */
    edsWebsocketFactory(timeout?: number): Promise<WebSocket>;
    subscribeUserNotifications(): void;
    unsubscribeUserNotifications(): void;
}
export interface ExchangeDataService extends SdkService {
}

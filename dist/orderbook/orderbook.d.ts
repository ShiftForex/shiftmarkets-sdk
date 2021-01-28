/// <reference types="ws" />
import WebSocket from "isomorphic-ws";
import { OrderbookRecord } from "./interfaces/orderbook-record.interface";
import { VolumeWeightedAveragePrice } from "./interfaces/volume-weighted-average-price.interface";
import { OrderSide } from "../trade/interfaces";
export declare class Orderbook {
    exchange: string;
    instrument: string;
    onUpdate?: ((data: Orderbook) => void) | undefined;
    orders: OrderbookRecord[];
    ws?: WebSocket;
    sub?: (data: any) => void;
    constructor(exchange: string, instrument: string, onUpdate?: ((data: Orderbook) => void) | undefined);
    /**
     * Get BUY side rows, sorted higher price first
     */
    getBuySide(precision?: number): OrderbookRecord[];
    /**
     * Get SELL side rows, sorted lower prices first
     */
    getSellSide(precision?: number): OrderbookRecord[];
    preciseTo(records: OrderbookRecord[], precision: number): OrderbookRecord[];
    /**
     * Volume weighted average price for RFQ
     * @param side sell or buy
     * @param volume number
     */
    getVolumeWeightedAvgPrice(side: "sell" | "buy", volume: number): VolumeWeightedAveragePrice;
    calculateQuoteVolumeVWAP(action: OrderSide, quoteVolume: number): VolumeWeightedAveragePrice;
    /**
     * Crear all orderbook records
     */
    clear(): void;
    update(orders: OrderbookRecord[]): void;
    /**
     * Update orderbook with incoming order
     */
    updateRow({ price, volume, side }: OrderbookRecord): void;
    /**
     * Subscribe to updates over Exchange Data Server websocket
     * @param ws
     */
    subscribe(ws: WebSocket): void;
    /**
     * Unsubscribe from updates over Exchange Data Server websocket
     */
    unsubscribe(): void;
    protected subscriptionHandler(msg: string): void;
}

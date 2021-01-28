/// <reference types="ws" />
import WebSocket from "isomorphic-ws";
import { TickerRecord } from "./interfaces/ticker-record.interface";
export declare class Ticker {
    exchange: string;
    instrument: string;
    onUpdate?: ((data: TickerRecord) => void) | undefined;
    ws?: WebSocket;
    record?: TickerRecord;
    protected sub?: (data: any) => void;
    constructor(exchange: string, instrument: string, onUpdate?: ((data: TickerRecord) => void) | undefined);
    /**
     * Update ticker with actual values
     * @param record
     */
    update(record: TickerRecord): void;
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

/// <reference types="ws" />
import WebSocket from "isomorphic-ws";
import { TickerRecord } from "./interfaces/ticker-record.interface";
export declare class QuotesAll {
    exchange: string;
    onUpdate?: ((data: Array<TickerRecord>) => void) | undefined;
    ws?: WebSocket;
    protected sub?: (data: any) => void;
    constructor(exchange: string, onUpdate?: ((data: Array<TickerRecord>) => void) | undefined);
    /**
     * Subscribe to quotes updates over Exchange Data Server websocket
     * @param ws
     */
    subscribeAll: (ws: WebSocket) => void;
    /**
     * Subscribe to slow quotes updates over Exchange Data Server websocket
     * @param ws
     */
    subscribeAllSlow: (ws: WebSocket) => void;
    protected _update: (records: Array<TickerRecord>) => void;
    protected _subscriptionHandler: (msg: string) => void;
}

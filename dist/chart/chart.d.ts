/// <reference types="ws" />
import WebSocket from "isomorphic-ws";
import { Periodicity } from "./interfaces/periodicity.interface";
import { HistoricalBar } from "./interfaces/historical-bar.interface";
export declare class Chart {
    ws: WebSocket;
    exchange: string;
    instrument: string;
    onCurrentBarsUpdate?: (data: HistoricalBar) => void;
    private subs;
    constructor(ws: WebSocket, exchange: string, instrument: string);
    /**
     * Subscribe to real time updates
     * @param periodicity
     * @deprecated This method has wrong spelling
     */
    subscribeCurrenBars(periodicity: Periodicity): void;
    /**
     * Subscribe to real time updates
     * @param periodicity
     */
    subscribeCurrentBars(periodicity: Periodicity): void;
    /**
     * Unsubscribe from real time updates
     * @param periodicity
     */
    unsubscribeCurrentBars(periodicity: Periodicity): void;
    /**
     * Get historical bars (OHLC) for specified period
     * @param startTime
     * @param endTime
     * @param periodicity
     */
    getHistoricalBars(startTime: Date, endTime: Date, periodicity: Periodicity): Promise<HistoricalBar[]>;
    protected subscriptionHandler(msg: string): void;
}

/// <reference types="ws" />
import WebSocket from "isomorphic-ws";
export declare class NotificationEvents {
    protected ws: WebSocket;
    onUserEvent?: (event: any) => any;
    constructor(ws: WebSocket);
    protected onMessageHandler(e: string): void;
    subscribeEvents(accessToken: string, onUserEvent: (event: any) => any, timeout?: number): Promise<WebSocket>;
}

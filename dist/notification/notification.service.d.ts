/// <reference types="ws" />
import { SdkService } from "../common/sdk.service";
import WebSocket from "isomorphic-ws";
import { AxiosRequestConfig } from "axios";
export declare class NotificationServiceError extends Error {
    data?: object | undefined;
    constructor(message?: string, data?: object | undefined);
}
export declare function notificationServiceRequest(request: AxiosRequestConfig): Promise<any>;
export default interface Listener<T> {
    (data: T): void;
}
export declare class NotificationService {
    registerPushToken(token: string): Promise<null>;
    removePushToken(token: string): Promise<null>;
    notificationWebsocketFactory(timeout?: number): Promise<WebSocket>;
}
export interface NotificationService extends SdkService {
}

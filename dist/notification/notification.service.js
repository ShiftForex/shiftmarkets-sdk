"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = exports.notificationServiceRequest = exports.NotificationServiceError = void 0;
const isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
const debug_1 = __importDefault(require("debug"));
const axios_1 = __importDefault(require("axios"));
const debug = debug_1.default("ClientSDK:NotificationService");
class NotificationServiceError extends Error {
    constructor(message, data) {
        super(message);
        this.data = data;
    }
}
exports.NotificationServiceError = NotificationServiceError;
async function notificationServiceRequest(request) {
    var _a;
    try {
        debug("REQUEST", request);
        const response = (await axios_1.default(request)).data;
        debug("RESPONSE", response);
        return response;
    }
    catch (error) {
        debug("ERROR", JSON.stringify(error, undefined, ' '));
        const data = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
        const message = Array.isArray(data === null || data === void 0 ? void 0 : data.message)
            ? data.message.join(", ")
            : data === null || data === void 0 ? void 0 : data.message;
        throw new NotificationServiceError(message, data);
    }
}
exports.notificationServiceRequest = notificationServiceRequest;
class NotificationService {
    registerPushToken(token) {
        return notificationServiceRequest({
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            },
            baseURL: this.config.notification_api_url,
            url: 'push/register-token',
            method: 'post',
            data: {
                token,
            }
        });
    }
    removePushToken(token) {
        return notificationServiceRequest({
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            },
            baseURL: this.config.notification_api_url,
            url: 'push/remove-token',
            method: 'post',
            data: {
                token,
            }
        });
    }
    notificationWebsocketFactory(timeout = 15000) {
        return new Promise((resolve, reject) => {
            const ws = new isomorphic_ws_1.default(this.config.notification_ws_url);
            let rejectTimeout = setTimeout(() => {
                if (ws.readyState != ws.OPEN) {
                    new Error(`Connection timeout ${this.config.notification_ws_url} ${timeout}ms`);
                    ws.close();
                }
            }, timeout);
            ws.onopen = () => {
                clearTimeout(rejectTimeout);
                resolve(ws);
            };
            ws.onerror = (e) => {
                clearTimeout(rejectTimeout);
                reject(e);
            };
            if (typeof ws.on == "undefined" && typeof ws.off == "undefined") {
                // dirty workaround on web browser websocket
                let listeners = [];
                ws.onmessage = (event) => {
                    listeners.forEach((listener) => listener(event.data));
                };
                Object.assign(ws, {
                    on: (event, listener) => {
                        const index = listeners.indexOf(listener);
                        if (index === -1) {
                            listeners.push(listener);
                        }
                    },
                    off: (event, listener) => {
                        const index = listeners.indexOf(listener);
                        if (index !== -1) {
                            listeners.splice(index, 1);
                        }
                    },
                });
            }
        });
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map
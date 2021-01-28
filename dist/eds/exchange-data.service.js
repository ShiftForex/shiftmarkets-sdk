"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeDataService = exports.edsServiceRequest = exports.ExchangeDataServiceError = void 0;
const debug_1 = __importDefault(require("debug"));
const isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
const axios_1 = __importDefault(require("axios"));
const sdk_service_1 = require("../common/sdk.service");
const debug = debug_1.default("ClientSDK:ExchangeDataService");
class ExchangeDataServiceError extends Error {
}
exports.ExchangeDataServiceError = ExchangeDataServiceError;
async function edsServiceRequest(request) {
    var _a, _b;
    try {
        debug("REQUEST", request);
        const response = (await axios_1.default(request)).data;
        debug("RESPONSE", response);
        return response;
    }
    catch (error) {
        debug("ERROR", error.message);
        throw new ExchangeDataServiceError(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message);
    }
}
exports.edsServiceRequest = edsServiceRequest;
class ExchangeDataService extends sdk_service_1.SdkService {
    /**
     * Get instruments on exchange
     */
    async getInstruments() {
        let request = {
            url: `${this.config.eds_api_url}/instruments`,
            method: "GET",
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
    async getProducts() {
        let request = {
            url: `${this.config.eds_api_url}/currencies`,
            params: { exchange: this.exchange },
            method: "GET",
            timeout: 15000,
            headers: {},
        };
        if (this.accessToken) {
            request.headers = {
                Authorization: "Bearer " + this.accessToken,
            };
        }
        const currencies = (await edsServiceRequest(request))
            .currencies;
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
            };
        });
    }
    /**
     * Create new websocket connection to Exchange Data Service
     * and return connected websocket
     */
    edsWebsocketFactory(timeout = 15000) {
        return new Promise((resolve, reject) => {
            const connectionTimeout = setTimeout(() => {
                reject(new Error(`Connection timeout ${this.config.eds_ws_url} ${timeout}ms`));
            }, timeout);
            const ws = new isomorphic_ws_1.default(this.config.eds_ws_url);
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
    subscribeUserNotifications() { }
    unsubscribeUserNotifications() { }
}
exports.ExchangeDataService = ExchangeDataService;
//# sourceMappingURL=exchange-data.service.js.map
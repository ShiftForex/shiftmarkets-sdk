"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeService = exports.tradeServiceRequest = exports.TradeServiceError = void 0;
const debug_1 = __importDefault(require("debug"));
const axios_1 = __importDefault(require("axios"));
const field_to_date_1 = require("../common/field-to-date");
const querystring = __importStar(require("querystring"));
const debug = debug_1.default("ClientSDK:TradeService");
class TradeServiceError extends Error {
}
exports.TradeServiceError = TradeServiceError;
async function tradeServiceRequest(request) {
    var _a, _b;
    try {
        debug("REQUEST", request);
        const response = (await axios_1.default(request)).data;
        debug("RESPONSE", response);
        return response;
    }
    catch (error) {
        debug("ERROR", error.message);
        if ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) {
            if (Array.isArray(error.response.data.message)) {
                throw new TradeServiceError(error.response.data.message.join(", "));
            }
            else {
                throw new TradeServiceError(error.response.data.message);
            }
        }
        else {
            throw new TradeServiceError(error.message);
        }
    }
}
exports.tradeServiceRequest = tradeServiceRequest;
class TradeService {
    /**
     * Create order on exchange
     */
    createOrder(createOrder) {
        return tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/trade/order`,
            method: "post",
            headers: {
                authorization: `bearer ${this.accessToken}`,
            },
            data: createOrder,
            timeout: 15000,
        });
    }
    /**
     * Cancel order on exchange
     * @param id
     */
    async cancelOrder(id) {
        await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/trade/order/${id}`,
            method: "delete",
            headers: {
                authorization: `bearer ${this.accessToken}`,
            },
            timeout: 15000,
        });
    }
    /**
    * Cancel all orders for user on exchange
    */
    async cancelAllOrders() {
        return (await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/trade/orders/all`,
            method: "delete",
            headers: {
                authorization: `bearer ${this.accessToken}`,
            },
            timeout: 15000,
        }));
    }
    async getOrder(id) {
        return (await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/trade/order/${id}`,
            method: "get",
            headers: {
                authorization: `bearer ${this.accessToken}`,
            },
            timeout: 15000,
        }));
    }
    async getOrderEvents(id) {
        return (await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/trade/order/${id}/events`,
            method: "get",
            headers: {
                authorization: `bearer ${this.accessToken}`,
            },
            timeout: 15000,
        }));
    }
    async getActivity(filter) {
        return (await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/trade/activity`,
            method: "get",
            headers: {
                authorization: `bearer ${this.accessToken}`,
            },
            params: filter,
            timeout: 15000,
        }));
    }
    exportActivitiesLink(filter) {
        const query = querystring.stringify(filter);
        return `${this.config.trade_api_sls_url}/trade/activity/csv?token=${this.accessToken}&${query}`;
    }
    /**
     * Get closed orders list
     */
    async getClosedOrders(filter) {
        const result = (await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/trade/orders/closed`,
            method: "get",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            params: filter,
            timeout: 15000,
        }));
        return result;
    }
    /**
     * Get open orders list
     */
    async getOpenOrders() {
        const result = (await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/trade/orders/open`,
            method: "get",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            timeout: 15000,
        }));
        return result;
    }
    exportClosedOrdersCsvLink(filter = {}) {
        const query = querystring.stringify(filter);
        return `${this.config.trade_api_sls_url}/trade/orders/closed/csv?token=${this.accessToken}&${query}`;
    }
    exportOpenOrdersCsvLink(filter = {}) {
        const query = querystring.stringify(filter);
        return `${this.config.trade_api_sls_url}/trade/orders/open/csv?token=${this.accessToken}&${query}`;
    }
    /**
     * Create Market Order Quote Currency order
     * @param instrument
     * @param quantity
     * @param side
     * @param client_order_id
     */
    async createMarketOrderQc(instrument, quantity, side, client_order_id) {
        const result = (await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/market-order-qc`,
            method: "post",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            data: {
                instrument,
                quantity,
                side,
                client_order_id,
            },
        }));
        field_to_date_1.fieldToDate(result, "created_at");
        return result;
    }
    /**
     * Get Market Order Quote Currency order
     * @param id
     */
    async getMarketOrderQc(id) {
        const result = (await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/market-order-qc/order/${id}`,
            method: "get",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        }));
        field_to_date_1.fieldToDate(result, "created_at");
        return result;
    }
    /**
     * Get Accounts
     */
    getAccounts() {
        return tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/trade/accounts`,
            method: "get",
            headers: {
                authorization: `bearer ${this.accessToken}`,
            },
        });
    }
    /**
     * Create instant buy
     * @param amount amount of quote product
     */
    async createInstantBuy(createInstantBuy) {
        const result = (await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/instant-buy`,
            method: "post",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            data: createInstantBuy,
        }));
        field_to_date_1.fieldToDate(result, "created_at");
        field_to_date_1.fieldToDate(result, "updated_at");
        return result;
    }
    /**
     * Get instant buy by id
     * @param id
     */
    async getInstantBuy(id) {
        const result = (await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/instant-buy`,
            method: "get",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            params: {
                id,
            },
        }));
        field_to_date_1.fieldToDate(result, "created_at");
        field_to_date_1.fieldToDate(result, "updated_at");
        return result;
    }
    /**
     * Create RFQ quote
     * @param instrument
     * @param quantity
     */
    createRfqQuote(instrument, quantity, client_quote_id, fees_in_price) {
        return tradeServiceRequest({
            url: `${this.config.rfq_sls_url}/quote`,
            method: "post",
            headers: {
                authorization: `bearer ${this.accessToken}`,
            },
            data: {
                instrument,
                quantity,
                client_quote_id,
                fees_in_price,
            },
        });
    }
    /**
     * Get RFQ quote
     * @param client_quote_id
     * @param quote_id
     */
    async getRfqQuote(client_quote_id, quote_id) {
        const result = (await tradeServiceRequest({
            url: `${this.config.rfq_sls_url}/quote`,
            method: "get",
            headers: {
                authorization: `bearer ${this.accessToken}`,
            },
            params: {
                client_quote_id,
                quote_id,
            },
        }));
        field_to_date_1.fieldToDate(result, "expires");
        return result;
    }
    async getRfqQuotes(params) {
        const result = (await tradeServiceRequest({
            url: `${this.config.rfq_sls_url}/quotes`,
            method: "get",
            headers: {
                authorization: `bearer ${this.accessToken}`,
            },
            params,
        }));
        result.items.forEach((item) => {
            field_to_date_1.fieldToDate(item, "created_at");
            field_to_date_1.fieldToDate(item, "expires_at");
        });
        return result;
    }
    async createRfqTrade(quote_id, direction, quantity, price, instrument, refresh, client_quote_id, client_trade_id, comment) {
        const result = (await tradeServiceRequest({
            url: `${this.config.rfq_sls_url}/trade`,
            method: "post",
            headers: {
                authorization: `bearer ${this.accessToken}`,
            },
            data: {
                quote_id,
                client_quote_id,
                client_trade_id,
                comment,
                direction,
                quantity,
                refresh,
                instrument,
                price,
            },
        }));
        field_to_date_1.fieldToDate(result.quote, "expires");
        return result;
    }
    /**
     *
     * @param client_trade_id
     * @param trade_id
     */
    async getRfqTrade(client_trade_id, trade_id) {
        const result = (await tradeServiceRequest({
            url: `${this.config.rfq_sls_url}/trade`,
            method: "get",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            params: {
                client_trade_id,
                trade_id,
            },
        }));
        field_to_date_1.fieldToDate(result.quote, "expires");
        return result;
    }
    getRfqTrades(time_from, time_to, pager_limit, pager_offset) {
        return tradeServiceRequest({
            url: `${this.config.rfq_sls_url}/trades`,
            method: "get",
            headers: {
                authorization: `bearer ${this.accessToken}`,
            },
            params: {
                time_from,
                time_to,
                pager_limit,
                pager_offset,
            },
        });
    }
    async getInstantBuys(...params) {
        let resultParams;
        if (typeof params[0] === "string") {
            resultParams = {
                sort_field: params[0],
                sort_direction: params[1],
                pager_offset: params[2],
                pager_limit: params[3],
                filter_instrument: params[4],
                filter_status: params[5],
            };
        }
        else {
            resultParams = params[0];
        }
        const result = (await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/instant-buy/orders`,
            method: "get",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            params: resultParams,
        }));
        result.items.forEach((item) => {
            field_to_date_1.fieldToDate(item, "created_at");
            field_to_date_1.fieldToDate(item, "updated_at");
        });
        return result;
    }
    async getMarketOrdersQc(params) {
        const result = (await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/market-order-qc/orders`,
            method: "get",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            params,
        }));
        result.items.forEach((item) => void field_to_date_1.fieldToDate(item, "created_at"));
        return result;
    }
    /**
     *
     * @param amount amount of quote product
     */
    estimateInstantBuy(amount, base_product, quote_product) {
        return tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/instant-buy/estimate`,
            method: "post",
            data: {
                amount,
                base_product,
                quote_product,
            },
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        });
    }
    async getAccountTransactions(params) {
        const result = (await tradeServiceRequest({
            url: `${this.config.trade_api_sls_url}/trade/transactions`,
            method: "get",
            headers: {
                authorization: `bearer ${this.accessToken}`,
            },
            params,
        }));
        return result;
    }
    exportAccountTransactionsLink(params = {}) {
        const query = querystring.stringify(params);
        return `${this.config.trade_api_sls_url}/trade/transactions/csv?token=${this.accessToken}&${query}`;
    }
}
exports.TradeService = TradeService;
//# sourceMappingURL=trade.service.js.map
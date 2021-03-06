"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LendingService = exports.LendingServiceError = void 0;
const debug_1 = __importDefault(require("debug"));
const axios_1 = __importDefault(require("axios"));
const sdk_service_1 = require("../common/sdk.service");
const field_to_bignumber_1 = require("../common/field-to-bignumber");
const field_to_date_1 = require("../common/field-to-date");
const debug = debug_1.default("ClientSDK:LendingService");
const baseGetRequestConfig = {
    timeout: 15000,
    method: "GET",
};
class LendingServiceError extends Error {
}
exports.LendingServiceError = LendingServiceError;
async function lendingServiceRequest(request, token) {
    var _a, _b;
    try {
        debug("REQUEST", request);
        if (token) {
            request.headers = {
                Authorization: "Bearer " + token,
            };
        }
        const { data } = await axios_1.default(request);
        debug("RESPONSE", data);
        return data;
    }
    catch (error) {
        debug("ERROR", error.message);
        throw new LendingServiceError(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message);
    }
}
const prepareProducts = (products) => {
    products.forEach(product => {
        field_to_bignumber_1.fieldToBN(product, 'maximumAllocationAmount', 'maximumRedemptionAmount', 'minimumAllocationAmount', 'minimumRedemptionAmount', 'totalBalance');
    });
    return products;
};
class LendingService extends sdk_service_1.SdkService {
    prepareGetRequest(url, params) {
        return {
            url: `${this.config.lending_api_url}/${url}`,
            params: { exchange: this.exchange, ...params },
            ...baseGetRequestConfig,
        };
    }
    preparePostRequest(url, body = {}, method = "POST") {
        return {
            method,
            url: `${this.config.lending_api_url}/${url}`,
            timeout: 15000,
            data: { ...body, exchange: this.exchange },
        };
    }
    /**
     * Get lending tickets
     */
    async getLendingTickets(params = {}) {
        const request = this.prepareGetRequest('tickets', params);
        const response = await lendingServiceRequest(request, this.accessToken);
        response.forEach(ticket => {
            field_to_bignumber_1.fieldToBN(ticket, 'amount');
        });
        return response;
    }
    /**
     * Get lending tickets pagination
     */
    async getLendingTicketsPager(params = {}) {
        const request = this.prepareGetRequest('tickets/pagination', params);
        const response = await lendingServiceRequest(request, this.accessToken);
        response.items.forEach(ticket => {
            field_to_bignumber_1.fieldToBN(ticket, 'amount');
        });
        return response;
    }
    /**
     * Get lending products
     */
    async getLendingProducts(params = {}) {
        const request = this.prepareGetRequest('products', params);
        const response = await lendingServiceRequest(request, this.accessToken);
        return prepareProducts(response);
    }
    /**
     * Create product
     */
    async createLendingProduct(body) {
        const request = this.preparePostRequest(`products/create`, body);
        const response = await lendingServiceRequest(request, this.accessToken);
        return prepareProducts([response])[0];
    }
    /**
     * Update product
     */
    async updateLendingProduct(productId, body = {}) {
        const request = this.preparePostRequest(`products/update/${productId}`, body, "PUT");
        const response = await lendingServiceRequest(request, this.accessToken);
        return prepareProducts([response])[0];
    }
    /**
     * Get lending balances
     */
    async getLendingBalances(params = {}) {
        const request = this.prepareGetRequest('lending/balances', params);
        const response = await lendingServiceRequest(request, this.accessToken);
        response.forEach(balance => field_to_bignumber_1.fieldToBN(balance, 'balance'));
        return response;
    }
    /**
     * Get lending balances pagination
     */
    async getLendingBalancesPager(params = {}) {
        const request = this.prepareGetRequest('lending/balances/pagination', params);
        const response = await lendingServiceRequest(request, this.accessToken);
        response.items.forEach(balance => field_to_bignumber_1.fieldToBN(balance, 'balance'));
        return response;
    }
    /**
     * Get lending history
     */
    async getLendingHistory(params = {}) {
        const request = this.prepareGetRequest('lending/history', params);
        const response = await lendingServiceRequest(request, this.accessToken);
        response.forEach(lending => {
            field_to_bignumber_1.fieldToBN(lending, 'amount');
            field_to_date_1.fieldToDate(lending, 'updatedAt');
            field_to_date_1.fieldToDate(lending, 'createdAt');
        });
        return response;
    }
    /**
     * Get lending history pagination
     */
    async getLendingHistoryPager(params = {}) {
        const request = this.prepareGetRequest('lending/history/pagination', params);
        const response = await lendingServiceRequest(request, this.accessToken);
        response.items.forEach(lending => {
            field_to_bignumber_1.fieldToBN(lending, 'amount');
            field_to_date_1.fieldToDate(lending, 'updatedAt');
            field_to_date_1.fieldToDate(lending, 'createdAt');
        });
        return response;
    }
    /**
     * Get lending pending-transaction
     */
    async getLendingPendingTransactions(params = {}) {
        const request = this.prepareGetRequest('lending/pending-transactions', params);
        const response = await lendingServiceRequest(request, this.accessToken);
        response.forEach((pendingTransaction) => {
            field_to_bignumber_1.fieldToBN(pendingTransaction, 'amount');
            field_to_date_1.fieldToDate(pendingTransaction, 'createdAt');
            field_to_date_1.fieldToDate(pendingTransaction, 'updatedAt');
        });
        return response;
    }
    /**
     * Send withdraw
     */
    async redeemLending(body) {
        const request = this.preparePostRequest('lending/redeem', body);
        const lending = await lendingServiceRequest(request, this.accessToken);
        field_to_bignumber_1.fieldToBN(lending, 'amount');
        field_to_date_1.fieldToDate(lending, 'updatedAt');
        field_to_date_1.fieldToDate(lending, 'createdAt');
        return lending;
    }
    /**
     * Send deposit
     */
    async allocateLending(body) {
        const request = this.preparePostRequest('lending/allocate', body);
        const lending = await lendingServiceRequest(request, this.accessToken);
        field_to_bignumber_1.fieldToBN(lending, 'amount');
        field_to_date_1.fieldToDate(lending, 'updatedAt');
        field_to_date_1.fieldToDate(lending, 'createdAt');
        return lending;
    }
}
exports.LendingService = LendingService;
//# sourceMappingURL=vaults.js.map
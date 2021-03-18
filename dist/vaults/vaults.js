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
class LendingService extends sdk_service_1.SdkService {
    /**
     * Get lending products
     */
    async getLendingProducts(params = {}) {
        const request = {
            url: `${this.config.lending_api_url}/products`,
            method: "GET",
            params: { exchange: this.exchange, ...params },
            timeout: 15000,
        };
        const response = await lendingServiceRequest(request, this.accessToken);
        response.forEach(product => {
            field_to_bignumber_1.fieldToBN(product, 'maximumAllocationAmount', 'maximumRedemptionAmount', 'minimumAllocationAmount', 'minimumRedemptionAmount', 'totalBalance');
        });
        return response;
    }
    /**
     * Get lending balances
     */
    async getLendingBalances(params = {}) {
        const request = {
            url: `${this.config.lending_api_url}/lending/balances`,
            method: "GET",
            params: { exchange: this.exchange, ...params },
            timeout: 15000,
        };
        const response = await lendingServiceRequest(request, this.accessToken);
        response.forEach(balance => field_to_bignumber_1.fieldToBN(balance, 'balance'));
        return response;
    }
    /**
     * Get lending history
     */
    async getLendingHistory(params = {}) {
        const request = {
            url: `${this.config.lending_api_url}/lending/history`,
            method: "GET",
            params: { exchange: this.exchange, ...params },
            timeout: 15000,
        };
        const response = await lendingServiceRequest(request, this.accessToken);
        response.forEach(lending => {
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
        const request = {
            url: `${this.config.lending_api_url}/lending/pending-transactions`,
            method: "GET",
            params: { exchange: this.exchange, ...params },
            timeout: 15000,
        };
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
        const request = {
            url: `${this.config.lending_api_url}/lending/redeem`,
            method: "POST",
            timeout: 15000,
            data: { ...body, exchange: this.exchange },
        };
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
        const request = {
            url: `${this.config.lending_api_url}/lending/allocate`,
            method: "POST",
            timeout: 15000,
            data: { ...body, exchange: this.exchange },
        };
        const lending = await lendingServiceRequest(request, this.accessToken);
        field_to_bignumber_1.fieldToBN(lending, 'amount');
        field_to_date_1.fieldToDate(lending, 'updatedAt');
        field_to_date_1.fieldToDate(lending, 'createdAt');
        return lending;
    }
}
exports.LendingService = LendingService;
//# sourceMappingURL=vaults.js.map
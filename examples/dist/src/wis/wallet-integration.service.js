"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletIntegrationService = exports.walletIntegrationServiceRequest = exports.WalletIntegrationServiceError = void 0;
const debug_1 = __importDefault(require("debug"));
const axios_1 = __importDefault(require("axios"));
const debug = debug_1.default("ClientSDK:WalletIntegrationService");
class WalletIntegrationServiceError extends Error {
}
exports.WalletIntegrationServiceError = WalletIntegrationServiceError;
async function walletIntegrationServiceRequest(request) {
    var _a, _b;
    try {
        debug("REQUEST", request);
        const response = (await axios_1.default(request)).data;
        debug("RESPONSE", response);
        return response;
    }
    catch (error) {
        debug("ERROR", error.message);
        throw new WalletIntegrationServiceError(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message);
    }
}
exports.walletIntegrationServiceRequest = walletIntegrationServiceRequest;
class WalletIntegrationService {
    /**
     * Create withdraw request on Wallet Integration Service
     * @param product
     * @param amount
     * @param address
     * @param schemaName
     * @param schemaData
     * @param code
     */
    async createWithdraw(product, amount, address, schemaName, schemaData, code, psp, webhookUrl) {
        const trx = (await walletIntegrationServiceRequest({
            url: `${this.config.wis_api_url}/withdraw/create`,
            method: "post",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            data: {
                exchange: this.exchange,
                product,
                amount,
                address,
                code,
                schemaName,
                schemaData,
                psp,
                webhook_url: webhookUrl,
            },
        }));
        return this.getWalletTransaction(trx.txid, trx.state_hash, 5);
    }
    /**
     * Create deposit request on Wallet Integration Service
     * @param product
     * @param amount
     * @param schemaName
     * @param schemaData
     * @param code
     */
    async createDeposit(product, amount, schemaName, schemaData, code, psp, webhookUrl) {
        const trx = (await walletIntegrationServiceRequest({
            url: `${this.config.wis_api_url}/deposit/create`,
            method: "post",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            data: {
                exchange: this.exchange,
                product,
                amount,
                code,
                schemaName,
                schemaData,
                psp,
                webhook_url: webhookUrl,
            },
        }));
        return this.getWalletTransaction(trx.txid, trx.state_hash, 5);
    }
    /**
     * Get wallet transaction by id
     * @param txid
     * @param state_hash
     * @param timeout
     */
    getWalletTransaction(txid, state_hash, timeout) {
        return walletIntegrationServiceRequest({
            url: `${this.config.wis_api_url}/transaction/status`,
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            method: "get",
            params: {
                txid,
                state_hash,
                timeout,
            },
        });
    }
    /**
     * Get transaction paged history
     * @param filter
     */
    async getWalletTransactionHistory(filter) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return walletIntegrationServiceRequest({
            url: `${this.config.wis_api_url}/transaction/history`,
            method: "get",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            params: {
                exchange: this.exchange,
                status: (_a = filter.filter) === null || _a === void 0 ? void 0 : _a.status,
                type: (_b = filter.filter) === null || _b === void 0 ? void 0 : _b.type,
                product: (_c = filter.filter) === null || _c === void 0 ? void 0 : _c.product,
                address: (_d = filter.filter) === null || _d === void 0 ? void 0 : _d.address,
                message: (_e = filter.filter) === null || _e === void 0 ? void 0 : _e.message,
                pager_limit: (_f = filter.pager) === null || _f === void 0 ? void 0 : _f.limit,
                pager_offset: (_g = filter.pager) === null || _g === void 0 ? void 0 : _g.offset,
                sort_prop: (_h = filter.sort) === null || _h === void 0 ? void 0 : _h.field,
                sort_dir: (_j = filter.sort) === null || _j === void 0 ? void 0 : _j.direction.toUpperCase(),
            },
        });
    }
    /**
     * Get schemas
     * @param product
     * @param type
     */
    async getSchemas(product, type) {
        const response = (await walletIntegrationServiceRequest({
            url: `${this.config.wis_api_url}/${type}/schema`,
            method: "get",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            params: {
                exchange: this.exchange,
                product,
            },
        }));
        return response.schemas;
    }
    /**
     * Get payment options
     */
    async getPaymentRoutes(all) {
        const response = (await walletIntegrationServiceRequest({
            url: `${this.config.wis_api_url}/payment/routes`,
            method: "get",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            params: {
                exchange: this.exchange,
                all: all ? "1" : "",
            },
        }));
        return response;
    }
    /**
     * Get payment options
     */
    async getPaymentOptions(product, psp) {
        const response = (await walletIntegrationServiceRequest({
            url: `${this.config.wis_api_url}/payment/options`,
            method: "get",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            params: {
                exchange: this.exchange,
                product: product,
                psp: psp,
            },
        }));
        return response;
    }
}
exports.WalletIntegrationService = WalletIntegrationService;

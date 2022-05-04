"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WyreService = exports.WyreServiceError = void 0;
const debug_1 = __importDefault(require("debug"));
const axios_1 = __importDefault(require("axios"));
const sdk_service_1 = require("../common/sdk.service");
const debug = debug_1.default("ClientSDK:WyreService");
class WyreServiceError extends Error {
}
exports.WyreServiceError = WyreServiceError;
async function wyreServiceRequest(request, token) {
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
        throw new WyreServiceError(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message);
    }
}
class WyreService extends sdk_service_1.SdkService {
    prepareWyreGetRequest(url, params) {
        return {
            url: `${this.config.wyre_api_url}/${url}`,
            params: { exchange: this.exchange, ...params },
            timeout: 15000,
            method: "GET",
        };
    }
    prepareWyrePostRequest(url, body = {}, method = "POST") {
        return {
            method,
            url: `${this.config.wyre_api_url}/${url}`,
            timeout: 15000,
            data: { ...body, exchange: this.exchange },
        };
    }
    async getTransactionSchemas(params) {
        const request = this.prepareWyreGetRequest(`transaction/schemas`, params);
        return await wyreServiceRequest(request, this.accessToken);
    }
    async createWyreDeposit(body) {
        const request = this.prepareWyrePostRequest(`deposit/create`, body);
        return await wyreServiceRequest(request, this.accessToken);
    }
    async walletOrderCallback(body) {
        const request = this.prepareWyrePostRequest(`wallet-order-callback`, body);
        return await wyreServiceRequest(request, this.accessToken);
    }
}
exports.WyreService = WyreService;

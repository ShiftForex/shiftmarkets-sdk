"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycService = exports.kycServiceRequest = exports.KycServiceError = void 0;
const axios_1 = __importDefault(require("axios"));
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default("ClientSDK:KycService");
class KycServiceError extends Error {
    constructor(message, data) {
        super(message);
        this.data = data;
    }
}
exports.KycServiceError = KycServiceError;
async function kycServiceRequest(request) {
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
        throw new KycServiceError(message, data);
    }
}
exports.kycServiceRequest = kycServiceRequest;
class KycService {
    getConstants() {
        return kycServiceRequest({
            baseURL: this.config.kyc_api_url,
            url: 'schema/constants',
            method: 'get',
        });
    }
    getMinimalProfileSchema() {
        return kycServiceRequest({
            baseURL: this.config.kyc_api_url,
            url: 'schema/minimal',
            method: 'get',
            params: { exchange: this.exchange },
        });
    }
    getExtendedProfileSchema(userType, extra = '', isUpdate, provider = '', clientUserId = '') {
        return kycServiceRequest({
            baseURL: this.config.kyc_api_url,
            url: 'schema/openapi',
            method: 'get',
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            },
            params: {
                exchange: this.exchange,
                userType,
                extra,
                isUpdate,
                provider,
                clientUserId,
            },
        });
    }
    updateUserProfile(payload, userType, isUpdate = false, provider = '') {
        return kycServiceRequest({
            baseURL: this.config.kyc_api_url,
            url: 'input/schemaform',
            method: 'post',
            data: payload,
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            params: {
                exchange: this.exchange,
                userType,
                isUpdate,
                provider,
            },
        });
    }
    submitAgreementSignature(payload) {
        return kycServiceRequest({
            baseURL: this.config.kyc_api_url,
            url: 'input/schemaformcallback',
            method: 'post',
            data: payload,
            params: { exchange: this.exchange },
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            },
        });
    }
    getKycSummary(provider = '', accessToken = '') {
        return kycServiceRequest({
            baseURL: this.config.kyc_api_url,
            url: 'tier/view',
            method: 'get',
            params: { exchange: this.exchange, provider },
            headers: {
                Authorization: `Bearer ${accessToken || this.accessToken}`
            }
        });
    }
}
exports.KycService = KycService;

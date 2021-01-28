"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = exports.settingsServiceRequest = exports.SettingsServiceError = void 0;
const debug_1 = __importDefault(require("debug"));
const axios_1 = __importDefault(require("axios"));
const sdk_service_1 = require("../common/sdk.service");
const debug = debug_1.default("ClientSDK:SettingsService");
class SettingsServiceError extends Error {
}
exports.SettingsServiceError = SettingsServiceError;
async function settingsServiceRequest(request) {
    var _a, _b;
    try {
        debug("REQUEST", request);
        const response = (await axios_1.default(request)).data;
        debug("RESPONSE", response);
        return response;
    }
    catch (error) {
        debug("ERROR", error.message);
        throw new SettingsServiceError(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message);
    }
}
exports.settingsServiceRequest = settingsServiceRequest;
class SettingsService extends sdk_service_1.SdkService {
    /**
     * Get user settings
     */
    async getSettings() {
        let request = {
            url: `${this.config.settings_api_url}/settings`,
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
        return (await settingsServiceRequest(request)).settings;
    }
    /**
     * Set user settings
     */
    async setSettings(settings) {
        let request = {
            url: `${this.config.settings_api_url}/settings`,
            method: "POST",
            data: {
                exchange: this.exchange,
                settings,
            },
            timeout: 15000,
            headers: {},
        };
        if (this.accessToken) {
            request.headers = {
                Authorization: "Bearer " + this.accessToken,
            };
        }
        return (await settingsServiceRequest(request)).settings;
    }
}
exports.SettingsService = SettingsService;

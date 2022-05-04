"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoService = exports.geoServiceRequest = exports.GeoServiceError = void 0;
const debug_1 = __importDefault(require("debug"));
const axios_1 = __importDefault(require("axios"));
const sdk_service_1 = require("../common/sdk.service");
const debug = debug_1.default("ClientSDK:GEOService");
class GeoServiceError extends Error {
}
exports.GeoServiceError = GeoServiceError;
async function geoServiceRequest(request) {
    var _a, _b;
    try {
        debug("REQUEST", request);
        const response = (await axios_1.default(request)).data;
        debug("RESPONSE", response);
        return response;
    }
    catch (error) {
        debug("ERROR", error.message);
        throw new GeoServiceError(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message);
    }
}
exports.geoServiceRequest = geoServiceRequest;
class GeoService extends sdk_service_1.SdkService {
    /**
     * Get current location
     * @param geoAccessToken access_token which is specific for this method
     */
    async getCurrentLocation(geoAccessToken) {
        return (await geoServiceRequest({
            url: `${this.config.geo_api_url}/countries`,
            method: "GET",
            headers: {
                authorization: `Bearer ${geoAccessToken}`,
            },
        }));
    }
}
exports.GeoService = GeoService;

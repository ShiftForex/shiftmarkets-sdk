"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.authServiceRequest = exports.AuthServiceError = void 0;
const debug_1 = __importDefault(require("debug"));
const axios_1 = __importDefault(require("axios"));
const debug = debug_1.default("ClientSDK:AuthService");
class AuthServiceError extends Error {
}
exports.AuthServiceError = AuthServiceError;
async function authServiceRequest(request) {
    var _a, _b, _c, _d;
    try {
        debug("REQUEST", request);
        const response = (await axios_1.default(request)).data;
        debug("RESPONSE", response);
        return response;
    }
    catch (error) {
        debug("ERROR", error.message);
        throw new AuthServiceError(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) ||
            error.message);
    }
}
exports.authServiceRequest = authServiceRequest;
class AuthService {
    /**
     * Login (get access and refresh tokens) with username, password and MFA code
     * @param username
     * @param password
     * @param code
     */
    async login(username, password, code) {
        const response = await authServiceRequest({
            url: `${this.config.auth_api_url}/user_authentication/exchangeToken`,
            method: "post",
            data: {
                exchange: this.exchange,
                username,
                password,
                twoFACode: code,
            },
            timeout: 15000,
        });
        if (!response.result || response.result == "error") {
            throw new AuthServiceError(response.message);
        }
        return response;
    }
    /**
     * Logout from current session, dispose accessToken
     */
    async logout() {
        const response = await authServiceRequest({
            url: `${this.config.auth_api_url}/user_authentication/signOut`,
            method: "post",
            data: {
                exchange: this.exchange,
                clientToken: this.accessToken,
            },
            timeout: 15000,
        });
        if (!response.result || response.result == "error") {
            throw new AuthServiceError(response.message);
        }
        return response;
    }
    /**
     * Get new tokens with refresh token
     * @param refreshToken
     */
    async refreshAccessToken(refreshToken) {
        const response = await authServiceRequest({
            url: `${this.config.auth_api_url}/user_authentication/refreshAccessToken`,
            method: "post",
            data: {
                exchange: this.exchange,
                refreshToken,
            },
            timeout: 15000,
        });
        if (!response.result || response.result == "error") {
            throw new AuthServiceError(response.message);
        }
        return response;
    }
    /**
     * New user signup (registration)
     * @param username
     * @param password
     * @param userAttributes
     */
    async signup(username, password, userAttributes) {
        const response = await authServiceRequest({
            url: `${this.config.auth_api_url}/user_authentication/signUp`,
            method: "post",
            data: {
                exchange: this.exchange,
                username,
                password,
                attributes: userAttributes,
            },
            timeout: 15000,
        });
        if (!response.result || response.result == "error") {
            throw new AuthServiceError(response.message);
        }
        return response;
    }
    /**
     * Confirm user signup with code from email
     * @param username
     * @param code
     */
    async confirmSignup(username, code) {
        const response = await authServiceRequest({
            url: `${this.config.auth_api_url}/user_authentication/confirmSignUp`,
            method: "post",
            data: {
                exchange: this.exchange,
                username,
                code,
            },
            timeout: 15000,
        });
        if (!response.result || response.result == "error") {
            throw new AuthServiceError(response.message);
        }
        return response;
    }
    /**
     * Resend confirmation code for the user
     * @param username
     */
    async resendSignupCode(username) {
        const response = await authServiceRequest({
            url: `${this.config.auth_api_url}/user_authentication/resendSignUpCode`,
            method: "post",
            data: {
                exchange: this.exchange,
                username,
            },
            timeout: 15000,
        });
        if (!response.result || response.result == "error") {
            throw new AuthServiceError(response.message);
        }
        return response;
    }
    /**
     * Change user password
     * @param oldPassword
     * @param newPassword
     */
    async changePassword(oldPassword, newPassword) {
        const response = await authServiceRequest({
            url: `${this.config.auth_api_url}/user_authentication/changeUserPassword`,
            method: "post",
            data: {
                exchange: this.exchange,
                clientToken: this.accessToken,
                oldPassword,
                newPassword,
            },
            timeout: 15000,
        });
        if (!response.result || response.result == "error") {
            throw new AuthServiceError(response.message);
        }
        return response;
    }
    /**
     * Start forgot password procedure, you gonna get confirmation code on email
     * @param username
     */
    async startForgotPassword(username) {
        const response = await authServiceRequest({
            url: `${this.config.auth_api_url}/user_authentication/startForgotPassword`,
            method: "post",
            data: {
                exchange: this.exchange,
                username,
            },
            timeout: 15000,
        });
        if (!response.result || response.result == "error") {
            throw new AuthServiceError(response.message);
        }
        return response;
    }
    /**
     * Complete forgot password procedure with code from email
     * @param username
     * @param code
     * @param password
     */
    async completeForgotPassword(username, code, password) {
        const response = await authServiceRequest({
            url: `${this.config.auth_api_url}/user_authentication/completeForgotPassword`,
            method: "post",
            data: {
                exchange: this.exchange,
                username,
                code,
                password,
            },
            timeout: 15000,
        });
        if (!response.result || response.result == "error") {
            throw new AuthServiceError(response.message);
        }
        return response;
    }
    /**
     * Get user attributes
     */
    async getUserAttributes() {
        const response = await authServiceRequest({
            url: `${this.config.auth_api_url}/user_authentication/getUserAttributes`,
            method: "post",
            data: {
                exchange: this.exchange,
                clientToken: this.accessToken,
            },
            timeout: 15000,
        });
        if (!response.result || response.result == "error") {
            throw new AuthServiceError(response.message);
        }
        return response.listUserAttributes;
    }
    /**
     * Get user preferred MFA settings
     */
    async getUserMfaSettings() {
        const response = await authServiceRequest({
            url: `${this.config.auth_api_url}/user_authentication/getUserMfaSettings`,
            method: "post",
            data: {
                exchange: this.exchange,
                clientToken: this.accessToken,
            },
            timeout: 15000,
        });
        if (!response.result || response.result == "error") {
            throw new AuthServiceError(response.message);
        }
        return response;
    }
    /**
     * Turn on or off TOTP for the user
     * @param turnOn
     * @param code
     */
    async modifyTotpSettings(turnOn, code) {
        const response = await authServiceRequest({
            url: `${this.config.auth_api_url}/user_authentication/validateAndUpdateUserTOTPSetup`,
            method: "post",
            data: {
                exchange: this.exchange,
                clientToken: this.accessToken,
                code,
                turnOn,
            },
            timeout: 15000,
        });
        if (!response.result || response.result == "error") {
            throw new AuthServiceError(response.message);
        }
        return response;
    }
    /**
     * Get user TOTP secret
     */
    async getTotpSecret() {
        const response = await authServiceRequest({
            url: `${this.config.auth_api_url}/user_authentication/requestTOTPSetupCode`,
            method: "post",
            data: {
                exchange: this.exchange,
                clientToken: this.accessToken,
            },
            timeout: 15000,
        });
        if (!response.result || response.result == "error") {
            throw new AuthServiceError(response.message);
        }
        return response;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
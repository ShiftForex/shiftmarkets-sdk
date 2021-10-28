import { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";
import { ExchangeTokenDto } from "./dto/exchange-token.dto";
import { SignupDto } from "./dto/signup.dto";
import { RefreshAccessTokenDto } from "./dto/refresh-access-token.dto";
import { UserAttribute } from "./dto/user-attributes.dto";
import { MfaSettingsDto } from "./dto/mfa-settings.dto";
export declare class AuthServiceError extends Error {
}
export declare function authServiceRequest(request: AxiosRequestConfig): Promise<any>;
export declare class AuthService {
    /**
     * Login (get access and refresh tokens) with username, password and MFA code
     * @param username
     * @param password
     * @param code
     */
    login(username: string, password: string, code?: string): Promise<ExchangeTokenDto>;
    /**
     * Logout from current session, dispose accessToken
     */
    logout(): Promise<void>;
    /**
     * Get new tokens with refresh token
     * @param refreshToken
     */
    refreshAccessToken(refreshToken: string): Promise<RefreshAccessTokenDto>;
    /**
     * New user signup (registration)
     * @param username
     * @param password
     * @param userAttributes
     */
    signup(username: string, password: string, userAttributes: UserAttribute[]): Promise<SignupDto>;
    /**
     * Confirm user signup with code from email
     * @param username
     * @param code
     */
    confirmSignup(username: string, code: string): Promise<void>;
    /**
     * Resend confirmation code for the user
     * @param username
     */
    resendSignupCode(username: string): Promise<void>;
    /**
     * Change user password
     * @param oldPassword
     * @param newPassword
     */
    changePassword(oldPassword: string, newPassword: string): Promise<void>;
    /**
     * Start forgot password procedure, you gonna get confirmation code on email
     * @param username
     */
    startForgotPassword(username: string): Promise<void>;
    /**
     * Complete forgot password procedure with code from email
     * @param username
     * @param code
     * @param password
     */
    completeForgotPassword(username: string, code: string, password: string): Promise<void>;
    /**
     * Get user attributes
     */
    getUserAttributes(): Promise<UserAttribute[]>;
    /**
     * Get user preferred MFA settings
     */
    getUserMfaSettings(optionalAccessToken?: string): Promise<MfaSettingsDto>;
    /**
     * Turn on or off TOTP for the user
     * @param turnOn
     * @param code
     */
    modifyTotpSettings(turnOn: boolean, code: string): Promise<void>;
    /**
     * Get user TOTP secret
     */
    getTotpSecret(): Promise<string | undefined>;
}
export interface AuthService extends SdkService {
}

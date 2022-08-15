import debugFactory from "debug";
import axios, { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";
import { ExchangeTokenDto } from "./dto/exchange-token.dto";
import { SignupDto } from "./dto/signup.dto";
import { RefreshAccessTokenDto } from "./dto/refresh-access-token.dto";
import { UserAttribute } from "./dto/user-attributes.dto";
import { MfaSettingsDto } from "./dto/mfa-settings.dto";
import { RemoveAccountDto, PreferedMfaSettings } from "./dto/remove-account.dto";

const debug = debugFactory("ClientSDK:AuthService");

export class AuthServiceError extends Error {}

export async function authServiceRequest(request: AxiosRequestConfig) {
  try {
    debug("REQUEST", request);
    const response = (await axios(request)).data;
    debug("RESPONSE", response);
    return response;
  } catch (error) {
    debug("ERROR", error.message);
    throw new AuthServiceError(
      error.response?.data?.error ||
        error.response?.data?.message ||
        error.message
    );
  }
}

export class AuthService {
  /**
   * Login (get access and refresh tokens) with username, password and MFA code
   * @param username
   * @param password
   * @param code
   */
  async login(
    username: string,
    password: string,
    code?: string
  ): Promise<ExchangeTokenDto> {
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
  async logout(): Promise<void> {
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
  async refreshAccessToken(
    refreshToken: string
  ): Promise<RefreshAccessTokenDto> {
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
   * Account removal
   * @param twoFaCode
   */
  async removeUserAccount(twoFaCode: string): Promise<RemoveAccountDto> {
    const response = await authServiceRequest({
      url: `${this.config.auth_api_url}/user_authentication/removeUserData`,
      method: "post",
      data: {
        exchange: this.exchange,
        client_token: this.accessToken,
        code: twoFaCode,
        twoFAMethod: PreferedMfaSettings.TwoFaCode,
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
  async signup(
    username: string,
    password: string,
    userAttributes: UserAttribute[]
  ): Promise<SignupDto> {
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
  async confirmSignup(username: string, code: string): Promise<void> {
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
  async resendSignupCode(username: string): Promise<void> {
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
  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
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
  async startForgotPassword(username: string): Promise<void> {
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
  async completeForgotPassword(
    username: string,
    code: string,
    password: string
  ): Promise<void> {
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
  async getUserAttributes(): Promise<UserAttribute[]> {
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
  async getUserMfaSettings(
    optionalAccessToken?: string
  ): Promise<MfaSettingsDto> {
    const response = await authServiceRequest({
      url: `${this.config.auth_api_url}/user_authentication/getUserMfaSettings`,
      method: "post",
      data: {
        exchange: optionalAccessToken || this.exchange,
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
  async modifyTotpSettings(turnOn: boolean, code: string): Promise<void> {
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
  async getTotpSecret(
    optionalAccessToken?: string
  ): Promise<string | undefined> {
    const response = await authServiceRequest({
      url: `${this.config.auth_api_url}/user_authentication/requestTOTPSetupCode`,
      method: "post",
      data: {
        exchange: this.exchange,
        clientToken: optionalAccessToken || this.accessToken,
      },
      timeout: 15000,
    });

    if (!response.result || response.result == "error") {
      throw new AuthServiceError(response.message);
    }
    return response;
  }
}
export interface AuthService extends SdkService {}

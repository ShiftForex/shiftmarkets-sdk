import debugFactory from "debug";
import axios, { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";

const debug = debugFactory("ClientSDK:SettingsService");

export class SettingsServiceError extends Error { }

export async function settingsServiceRequest(request: AxiosRequestConfig) {
  try {
    debug("REQUEST", request);
    const response = (await axios(request)).data;
    debug("RESPONSE", response);
    return response;
  } catch (error) {
    debug("ERROR", error.message);
    throw new SettingsServiceError(
      error.response?.data?.message || error.message
    );
  }
}

export class SettingsService extends SdkService {

  /**
   * Get user settings
   */
  async getSettings(): Promise<any> {
    let request = {
      url: `${this.config.settings_api_url}/settings`,
      method: "GET" as "GET",
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
  async setSettings(settings: object): Promise<any> {
    let request = {
      url: `${this.config.settings_api_url}/settings`,
      method: "POST" as "POST",
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

export interface SettingsService extends SdkService { }

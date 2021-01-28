import { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";
export declare class SettingsServiceError extends Error {
}
export declare function settingsServiceRequest(request: AxiosRequestConfig): Promise<any>;
export declare class SettingsService extends SdkService {
    /**
     * Get user settings
     */
    getSettings(): Promise<any>;
    /**
     * Set user settings
     */
    setSettings(settings: object): Promise<any>;
}
export interface SettingsService extends SdkService {
}

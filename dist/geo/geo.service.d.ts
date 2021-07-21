import { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";
export interface Location {
    result: boolean;
    data: {
        ip: string;
        country_short: string;
        country_long: string;
        city: string;
        region: string;
        latitude: number;
        longitude: number;
    };
}
export declare class GeoServiceError extends Error {
}
export declare function geoServiceRequest(request: AxiosRequestConfig): Promise<any>;
export declare class GeoService extends SdkService {
    /**
     * Get current location
     * @param geoAccessToken access_token which is specific for this method
     */
    getCurrentLocation(geoAccessToken: string): Promise<Location>;
}

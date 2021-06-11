import { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";
export interface Location {
    ip: string;
    ip_no: string;
    country_short: string;
    country_long: string;
    region: string;
    city: string;
    isp: string;
    latitude: number;
    longitude: number;
    domain: string;
    zipcode: string;
    timezone: string;
    netspeed: string;
    iddcode: string;
    areacode: string;
    weatherstationcode: string;
    weatherstationname: string;
    mcc: string;
    mnc: string;
    mobilebrand: string;
    elevation: number;
    usagetype: string;
    status: string;
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

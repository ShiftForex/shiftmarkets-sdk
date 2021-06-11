import debugFactory from "debug";
import axios, { AxiosRequestConfig } from "axios";

import { SdkService } from "../common/sdk.service";

const debug = debugFactory("ClientSDK:GEOService");

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

export class GeoServiceError extends Error {}

export async function geoServiceRequest(
  request: AxiosRequestConfig
) {
  try {
    debug("REQUEST", request);
    const response = (await axios(request)).data;
    debug("RESPONSE", response);
    return response;
  } catch (error) {
    debug("ERROR", error.message);
    throw new GeoServiceError(
      error.response?.data?.message || error.message
    );
  }
}

export class GeoService extends SdkService {
  /**
   * Get current location
   * @param geoAccessToken access_token which is specific for this method
   */
  async getCurrentLocation(geoAccessToken: string): Promise<Location> {
    return await geoServiceRequest({
      url: `${this.config.geo_api_url}/countries`,
      method: "GET",
      headers: {
        "authorization": `Bearer ${geoAccessToken}`,
      },
    }) as Location;
  }
}

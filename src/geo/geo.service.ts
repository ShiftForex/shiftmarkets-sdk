import debugFactory from "debug";
import axios, { AxiosRequestConfig } from "axios";

import { SdkService } from "../common/sdk.service";

const debug = debugFactory("ClientSDK:GEOService");

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

export class GeoServiceError extends Error {}

export async function geoServiceRequest(request: AxiosRequestConfig) {
  try {
    debug("REQUEST", request);
    const response = (await axios(request)).data;
    debug("RESPONSE", response);
    return response;
  } catch (error) {
    debug("ERROR", error.message);
    throw new GeoServiceError(error.response?.data?.message || error.message);
  }
}

export class GeoService extends SdkService {
  /**
   * Get current location
   * @param geoAccessToken access_token which is specific for this method
   */
  async getCurrentLocation(geoAccessToken: string): Promise<Location> {
    return (await geoServiceRequest({
      url: `${this.config.geo_api_url}/countries`,
      method: "GET",
      headers: {
        authorization: `Bearer ${geoAccessToken}`,
      },
    })) as Location;
  }
}

import config from "../config";
export class SdkService {
  constructor() {
  
  }
}
export interface SdkService {
  accessToken: string;
  exchange: string;
  environment: string;
  config: typeof config.production;
  getAccessToken: () => string | undefined;
}

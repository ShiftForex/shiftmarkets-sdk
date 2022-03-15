import axios, { AxiosRequestConfig } from "axios";
import debugFactory from "debug";
import {
  SchemaConstants,
  UserProfilePayload,
  UpdateProfileResponse,
  SubmitAgreementDto,
  ProviderResponseObject,
  KycSummary
} from "./interfaces";

const debug = debugFactory("ClientSDK:KycService");

export class KycServiceError extends Error {
  constructor(message?: string, public data?: object) {
    super(message);
  }
}

export async function kycServiceRequest(request: AxiosRequestConfig) {
  try {
    debug("REQUEST", request);
    const response = (await axios(request)).data;
    debug("RESPONSE", response);
    return response;
  } catch (error) {
    debug("ERROR", JSON.stringify(error, undefined, ' '));
    const data = error.response?.data;
    const message = Array.isArray(data?.message)
      ? data.message.join(", ")
      : data?.message;
    throw new KycServiceError(message, data);
  }
}

export class KycService {
  [x: string]: any;

  getConstants(): Promise<SchemaConstants> {
    return kycServiceRequest({
      baseURL: this.config.kyc_api_url,
      url: 'schema/constants',
      method: 'get',
    });
  }

  getMinimalProfileSchema() {
    return kycServiceRequest({
      baseURL: this.config.kyc_api_url,
      url: 'schema/minimal',
      method: 'get',
      params: { exchange: this.exchange },
    });
  }

  getExtendedProfileSchema(
    userType: 'personal' | 'company',
    extra = '',
    isUpdate?: boolean,
    provider = '',
    clientUserId = '',
  ) {
    return kycServiceRequest({
      baseURL: this.config.kyc_api_url,
      url: 'schema/openapi',
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      params: {
        exchange: this.exchange,
        userType,
        extra,
        isUpdate,
        provider,
        clientUserId,
      },
    });
  }

  updateUserProfile(
    payload: UserProfilePayload,
    userType: 'personal' | 'company',
    isUpdate = false,
    provider = '',
  ): Promise<UpdateProfileResponse> {
    return kycServiceRequest({
      baseURL: this.config.kyc_api_url,
      url: 'input/schemaform',
      method: 'post',
      data: payload,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        exchange: this.exchange,
        userType,
        isUpdate,
        provider,
      },
    });
  }

  submitAgreementSignature(payload: SubmitAgreementDto): Promise<ProviderResponseObject> {
    return kycServiceRequest({
      baseURL: this.config.kyc_api_url,
      url: 'input/schemaformcallback',
      method: 'post',
      data: payload,
      params: { exchange: this.exchange },
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
    });
  }

  getKycSummary(provider = '', accessToken: string = ''): Promise<KycSummary> {
    return kycServiceRequest({
      baseURL: this.config.kyc_api_url,
      url: 'tier/view',
      method: 'get',
      params: { exchange: this.exchange, provider },
      headers: {
        Authorization: `Bearer ${accessToken || this.accessToken}`
      }
    });
  }
}

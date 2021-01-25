import debugFactory from "debug";
import axios, { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";
import {
  VaultDepositWithdrawPayload,
  VaultHistory,
  VaultBalance,
  VaultProduct,
  VaultDepositWithdrawResponse,
} from "./interfaces";
import { fieldToBN } from "../common/field-to-bignumber";
import { fieldToDate } from "../common/field-to-date";

const debug = debugFactory("ClientSDK:LendingService");
export class LendingServiceError extends Error { }

async function lendingServiceRequest(request: AxiosRequestConfig, token?: string) {
  try {
    debug("REQUEST", request);
    if (token) {
      request.headers = {
        Authorization: "Bearer " + token,
      };
    }
    const { data } = await axios(request);
    debug("RESPONSE", data);
    return data;
  } catch (error) {
    debug("ERROR", error.message);
    throw new LendingServiceError(
      error.response?.data?.message || error.message
    );
  }
}

export class LendingService extends SdkService {
  /**
   * Get lending products
   */
  async getLendingProducts(): Promise<VaultProduct[]> {
    const request = {
      url: `${this.config.lending_api_url}/products`,
      method: "GET" as "GET",
      params: { exchange: this.exchange },
      timeout: 15000,
    };
    const response = await lendingServiceRequest(request, this.accessToken) as VaultProduct[];
    response.forEach(product => {
      fieldToBN(product,
        'maximumAllocationAmount',
        'maximumRedemptionAmount',
        'minimumAllocationAmount',
        'minimumRedemptionAmount',
        'totalBalance');
    });
    return response;
  }

  /**
   * Get lending balances
   */
  async getLendingBalances(): Promise<VaultBalance[]> {
    const request = {
      url: `${this.config.lending_api_url}/lending/balances`,
      method: "GET" as "GET",
      params: { exchange: this.exchange },
      timeout: 15000,
    };
    const response = await lendingServiceRequest(request, this.accessToken) as VaultBalance[];
    response.forEach(balance => fieldToBN(balance, 'balance'));
    return response;
  }

  /**
   * Get lending balances
   */
  async getLendingHistory(): Promise<VaultHistory[]> {
    const request = {
      url: `${this.config.lending_api_url}/lending/history`,
      method: "GET" as "GET",
      params: { exchange: this.exchange },
      timeout: 15000,
    };
    const response = await lendingServiceRequest(request, this.accessToken) as VaultHistory[];
    response.forEach(lending => {
      fieldToBN(lending, 'amount');
      fieldToDate(lending, 'updatedAt');
      fieldToDate(lending, 'createdAt');
    });
    return response;
  }

  /**
   * Send withdraw
   */
  async redeemLending(body: VaultDepositWithdrawPayload): Promise<VaultDepositWithdrawResponse> {
    const request = {
      url: `${this.config.lending_api_url}/lending/redeem`,
      method: "POST" as "POST",
      timeout: 15000,
      data: { ...body, exchange: this.exchange },
    };
    const lending = await lendingServiceRequest(request, this.accessToken) as VaultDepositWithdrawResponse;
    fieldToBN(lending, 'amount');
    fieldToDate(lending, 'updatedAt');
    fieldToDate(lending, 'createdAt');
    return lending;
  }

  /**
   * Send deposit
   */
  async allocateLending(body: VaultDepositWithdrawPayload): Promise<VaultDepositWithdrawResponse> {
    const request = {
      url: `${this.config.lending_api_url}/lending/allocate`,
      method: "POST" as "POST",
      timeout: 15000,
      data: { ...body, exchange: this.exchange },
    };

    const lending = await lendingServiceRequest(request, this.accessToken) as VaultDepositWithdrawResponse;
    fieldToBN(lending, 'amount');
    fieldToDate(lending, 'updatedAt');
    fieldToDate(lending, 'createdAt');
    return lending;
  }
}

export interface LendingService extends SdkService { }

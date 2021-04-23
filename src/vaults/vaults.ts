import debugFactory from "debug";
import axios, { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";
import {
  VaultDepositWithdrawPayload,
  VaultHistory,
  VaultBalance,
  VaultProduct,
  VaultPendingTransaction,
  VaultDepositWithdrawResponse,
  VaultPendingTransactionQuery,
  VaultHistoryQuery,
  VaultBalancesQuery,
  VaultProductsQuery,
  LendingTicketsQuery,
  LendingTicket,
  UpdateVaultProductQuery,
  CreateVaultProductQuery,
} from "./interfaces";
import { fieldToBN } from "../common/field-to-bignumber";
import { fieldToDate } from "../common/field-to-date";

const debug = debugFactory("ClientSDK:LendingService");
const baseGetRequestConfig = {
  timeout: 15000,
  method: "GET" as "GET",
}
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

const prepareProducts = (products: VaultProduct[]) => {
  products.forEach(product => {
    fieldToBN(product,
        'maximumAllocationAmount',
        'maximumRedemptionAmount',
        'minimumAllocationAmount',
        'minimumRedemptionAmount',
        'totalBalance');
  });
  return products
}

export class LendingService extends SdkService {
  prepareGetRequest(url: string, params: any) {
    return {
      url: `${this.config.lending_api_url}/${url}`,
      params: { exchange: this.exchange, ...params },
      ...baseGetRequestConfig,
    }
  }

  preparePostRequest(url: string, body: any = {}, method = "POST" as "POST" | "PUT") {
    return {
      method,
      url: `${this.config.lending_api_url}/${url}`,
      timeout: 15000,
      data: { ...body, exchange: this.exchange },
    }
  }

  async getLendingTickets(params: LendingTicketsQuery = {}): Promise<LendingTicket[]> {
    const request = this.prepareGetRequest('tickets', params);
    const response = await lendingServiceRequest(request, this.accessToken) as LendingTicket[];
    response.forEach(ticket => {
      fieldToBN(ticket, 'amount');
    });
    return response;
  }

  /**
   * Get lending products
   */
  async getLendingProducts(params: VaultProductsQuery = {}): Promise<VaultProduct[]> {
    const request = this.prepareGetRequest('products', params);
    const response = await lendingServiceRequest(request, this.accessToken) as VaultProduct[];
    return prepareProducts(response);
  }

  /**
   * Create product
   */
  async createLendingProduct(body: CreateVaultProductQuery): Promise<VaultProduct> {
    const request = this.preparePostRequest(`products/create`, body);
    const response = await lendingServiceRequest(request, this.accessToken) as VaultProduct;
    return prepareProducts([response])[0];
  }

  /**
   * Update product
   */
  async updateLendingProduct(productId: string, body: UpdateVaultProductQuery = {}): Promise<VaultProduct> {
    const request = this.preparePostRequest(`products/update/${productId}`, body, "PUT" as "PUT");
    const response = await lendingServiceRequest(request, this.accessToken) as VaultProduct;
    return prepareProducts([response])[0];
  }

  /**
   * Get lending balances
   */
  async getLendingBalances(params: VaultBalancesQuery = {}): Promise<VaultBalance[]> {
    const request = this.prepareGetRequest('lending/balances', params);
    const response = await lendingServiceRequest(request, this.accessToken) as VaultBalance[];
    response.forEach(balance => fieldToBN(balance, 'balance'));
    return response;
  }

  /**
   * Get lending history
   */
  async getLendingHistory(params: VaultHistoryQuery = {}): Promise<VaultHistory[]> {
    const request = this.prepareGetRequest('lending/history', params);
    const response = await lendingServiceRequest(request, this.accessToken) as VaultHistory[];
    response.forEach(lending => {
      fieldToBN(lending, 'amount');
      fieldToDate(lending, 'updatedAt');
      fieldToDate(lending, 'createdAt');
    });
    return response;
  }

  /**
   * Get lending pending-transaction
   */
  async getLendingPendingTransactions(params: VaultPendingTransactionQuery = {}): Promise<VaultPendingTransaction[]> {
    const request = this.prepareGetRequest('lending/pending-transactions', params);
    const response = await lendingServiceRequest(request, this.accessToken) as VaultPendingTransaction[];
    response.forEach((pendingTransaction: VaultPendingTransaction) => {
      fieldToBN(pendingTransaction, 'amount');
      fieldToDate(pendingTransaction, 'createdAt');
      fieldToDate(pendingTransaction, 'updatedAt');
    });
    return response;
  }

  /**
   * Send withdraw
   */
  async redeemLending(body: VaultDepositWithdrawPayload): Promise<VaultDepositWithdrawResponse> {
    const request = this.preparePostRequest('lending/redeem', body);
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
    const request = this.preparePostRequest('lending/allocate', body);
    const lending = await lendingServiceRequest(request, this.accessToken) as VaultDepositWithdrawResponse;
    fieldToBN(lending, 'amount');
    fieldToDate(lending, 'updatedAt');
    fieldToDate(lending, 'createdAt');
    return lending;
  }
}

export interface LendingService extends SdkService { }

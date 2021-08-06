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
  WithPager,
  WithPagerParams,
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

const prepareGetRequest = (url: string, exchange: string) => (endpoint: string, params: any) => {
  return {
    url: `${url}/${endpoint}`,
    params: { exchange: exchange, ...params },
    ...baseGetRequestConfig,
  }
}

const preparePostRequest = (
  url: string,
  exchange: string
) => (
  endpoint: string,
  body: any = {},
  method = "POST" as "POST" | "PUT"
) => {
  return {
    method,
    url: `${url}/${endpoint}`,
    timeout: 15000,
    data: { ...body, exchange },
  }
}

export class LendingService extends SdkService {

  prepareGetPayload: Function = prepareGetRequest(this.config.lending_api_url, this.exchange);
  preparePostPayload: Function = preparePostRequest(this.config.lending_api_url, this.exchange);

  /**
   * Get lending tickets
   */
  async getLendingTickets(params: LendingTicketsQuery = {}): Promise<LendingTicket[]> {
    const request = this.prepareGetPayload('tickets', params);
    const response = await lendingServiceRequest(request, this.accessToken) as LendingTicket[];
    response.forEach(ticket => {
      fieldToBN(ticket, 'amount');
    });
    return response;
  }

  /**
   * Get lending tickets pagination
   */
  async getLendingTicketsPager(params: WithPagerParams<LendingTicketsQuery> = {}): Promise<WithPager<LendingTicket>> {
    const request = this.prepareGetPayload('tickets/pagination', params);
    const response = await lendingServiceRequest(request, this.accessToken) as WithPager<LendingTicket>;
    response.items.forEach(ticket => {
      fieldToBN(ticket, 'amount');
    });
    return response;
  }

  /**
   * Get lending products
   */
  async getLendingProducts(params: VaultProductsQuery = {}): Promise<VaultProduct[]> {
    const request = this.prepareGetPayload('products', params);
    const response = await lendingServiceRequest(request, this.accessToken) as VaultProduct[];
    return prepareProducts(response);
  }

  /**
   * Create product
   */
  async createLendingProduct(body: CreateVaultProductQuery): Promise<VaultProduct> {
    const request = this.preparePostPayload(`products/create`, body);
    const response = await lendingServiceRequest(request, this.accessToken) as VaultProduct;
    return prepareProducts([response])[0];
  }

  /**
   * Update product
   */
  async updateLendingProduct(productId: string, body: UpdateVaultProductQuery = {}): Promise<VaultProduct> {
    const request = this.preparePostPayload(`products/update/${productId}`, body, "PUT" as "PUT");
    const response = await lendingServiceRequest(request, this.accessToken) as VaultProduct;
    return prepareProducts([response])[0];
  }

  /**
   * Get lending balances
   */
  async getLendingBalances(params: VaultBalancesQuery = {}): Promise<VaultBalance[]> {
    const request = this.prepareGetPayload('lending/balances', params);
    const response = await lendingServiceRequest(request, this.accessToken) as VaultBalance[];
    response.forEach(balance => fieldToBN(balance, 'balance'));
    return response;
  }

  /**
   * Get lending balances pagination
   */
  async getLendingBalancesPager(params: WithPagerParams<VaultBalancesQuery> = {}): Promise<WithPager<VaultBalance>> {
    const request = this.prepareGetPayload('lending/balances/pagination', params);
    const response = await lendingServiceRequest(request, this.accessToken) as WithPager<VaultBalance>;
    response.items.forEach(balance => fieldToBN(balance, 'balance'));
    return response;
  }

  /**
   * Get lending history
   */
  async getLendingHistory(params: VaultHistoryQuery = {}): Promise<VaultHistory[]> {
    const request = this.prepareGetPayload('lending/history', params);
    const response = await lendingServiceRequest(request, this.accessToken) as VaultHistory[];
    response.forEach(lending => {
      fieldToBN(lending, 'amount');
      fieldToDate(lending, 'updatedAt');
      fieldToDate(lending, 'createdAt');
    });
    return response;
  }

  /**
   * Get lending history pagination
   */
  async getLendingHistoryPager(params: WithPagerParams<VaultHistoryQuery> = {}): Promise<WithPager<VaultHistory>> {
    const request = this.prepareGetPayload('lending/history/pagination', params);
    const response = await lendingServiceRequest(request, this.accessToken) as WithPager<VaultHistory>;
    response.items.forEach(lending => {
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
    const request = this.prepareGetPayload('lending/pending-transactions', params);
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
    const request = this.preparePostPayload('lending/redeem', body);
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
    const request = this.preparePostPayload('lending/allocate', body);
    const lending = await lendingServiceRequest(request, this.accessToken) as VaultDepositWithdrawResponse;
    fieldToBN(lending, 'amount');
    fieldToDate(lending, 'updatedAt');
    fieldToDate(lending, 'createdAt');
    return lending;
  }
}

export interface LendingService extends SdkService { }

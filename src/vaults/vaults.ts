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
  VaultTransactionsQuery,
  VaultTransactionsResponse,
  VaultRateTier,
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
    if (!Array.isArray(product.tiers)) return;
    product.tiers.forEach((tier: VaultRateTier) => {
      fieldToBN(tier, 'apr', 'apy', 'tierFrom', 'tierTo');
    });
  });
  return products
}

export class LendingService extends SdkService {
  prepareVaultsGetRequest(url: string, params: any) {
    return {
      url: `${this.config.lending_api_url}/${url}`,
      params: { exchange: this.exchange, ...params },
      ...baseGetRequestConfig,
    }
  }

  prepareVaultsPostRequest(url: string, body: any = {}, method = "POST" as "POST" | "PUT") {
    return {
      method,
      url: `${this.config.lending_api_url}/${url}`,
      timeout: 15000,
      data: { ...body, exchange: this.exchange },
    }
  }

  /**
   * Get lending tickets
   */
  async getLendingTickets(params: LendingTicketsQuery = {}): Promise<LendingTicket[]> {
    const request = this.prepareVaultsGetRequest('tickets', params);
    const response = await lendingServiceRequest(request, this.getAccessToken()) as LendingTicket[];
    response.forEach(ticket => {
      fieldToBN(ticket, 'amount');
    });
    return response;
  }

  /**
   * Get lending tickets pagination
   */
  async getLendingTicketsPager(params: WithPagerParams<LendingTicketsQuery> = {}): Promise<WithPager<LendingTicket>> {
    const request = this.prepareVaultsGetRequest('tickets/pagination', params);
    const response = await lendingServiceRequest(request, this.getAccessToken()) as WithPager<LendingTicket>;
    response.items.forEach(ticket => {
      fieldToBN(ticket, 'amount');
    });
    return response;
  }

  /**
   * Get lending products
   */
  async getLendingProducts(params: VaultProductsQuery = {}): Promise<VaultProduct[]> {
    const request = this.prepareVaultsGetRequest('products', params);
    const response = await lendingServiceRequest(request, this.getAccessToken()) as VaultProduct[];
    return prepareProducts(response);
  }

  /**
   * Create product
   */
  async createLendingProduct(body: CreateVaultProductQuery): Promise<VaultProduct> {
    const request = this.prepareVaultsPostRequest(`products/create`, body);
    const response = await lendingServiceRequest(request, this.getAccessToken()) as VaultProduct;
    return prepareProducts([response])[0];
  }

  /**
   * Update product
   */
  async updateLendingProduct(productId: string, body: UpdateVaultProductQuery = {}): Promise<VaultProduct> {
    const request = this.prepareVaultsPostRequest(`products/update/${productId}`, body, "PUT" as "PUT");
    const response = await lendingServiceRequest(request, this.getAccessToken()) as VaultProduct;
    return prepareProducts([response])[0];
  }

  /**
   * Get lending balances
   */
  async getLendingBalances(params: VaultBalancesQuery = {}): Promise<VaultBalance[]> {
    const request = this.prepareVaultsGetRequest('lending/balances', params);
    const response = await lendingServiceRequest(request, this.getAccessToken()) as VaultBalance[];
    response.forEach(balance => fieldToBN(balance, 'balance'));
    return response;
  }

  /**
   * Get lending balances pagination
   */
  async getLendingBalancesPager(params: WithPagerParams<VaultBalancesQuery> = {}): Promise<WithPager<VaultBalance>> {
    const request = this.prepareVaultsGetRequest('lending/balances/pagination', params);
    const response = await lendingServiceRequest(request, this.getAccessToken()) as WithPager<VaultBalance>;
    response.items.forEach(balance => fieldToBN(balance, 'balance'));
    return response;
  }

  /**
   * Get lending history
   */
  async getLendingHistory(params: VaultHistoryQuery = {}): Promise<VaultHistory[]> {
    const request = this.prepareVaultsGetRequest('lending/history', params);
    const response = await lendingServiceRequest(request, this.getAccessToken()) as VaultHistory[];
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
    const request = this.prepareVaultsGetRequest('lending/history/pagination', params);
    const response = await lendingServiceRequest(request, this.getAccessToken()) as WithPager<VaultHistory>;
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
    const request = this.prepareVaultsGetRequest('lending/pending-transactions', params);
    const response = await lendingServiceRequest(request, this.getAccessToken()) as VaultPendingTransaction[];
    response.forEach((pendingTransaction: VaultPendingTransaction) => {
      fieldToBN(pendingTransaction, 'amount');
      fieldToDate(pendingTransaction, 'createdAt');
      fieldToDate(pendingTransaction, 'updatedAt');
    });
    return response;
  }

  async getLendingTransactions(params: VaultTransactionsQuery) {
    const request = this.prepareVaultsGetRequest('lending/transactions', params);
    const response = await lendingServiceRequest(request, this.getAccessToken()) as VaultTransactionsResponse[];
    response.forEach((tx) => {
      fieldToBN(tx, 'credit');
      fieldToBN(tx, 'debit');
      fieldToDate(tx, 'createdAt');
      fieldToDate(tx, 'updatedAt');
    });
    return response;
  }

  async getLendingTransactionsPager(params: VaultTransactionsQuery) {
    const request = this.prepareVaultsGetRequest('lending/transactions/pagination', params);
    const response = await lendingServiceRequest(request, this.getAccessToken()) as WithPager<VaultTransactionsResponse>;
    response.items.forEach((tx) => {
      fieldToBN(tx, 'credit');
      fieldToBN(tx, 'debit');
      fieldToDate(tx, 'createdAt');
      fieldToDate(tx, 'updatedAt');
    });
    return response;
  }

  /**
   * Send withdraw
   */
  async redeemLending(body: VaultDepositWithdrawPayload): Promise<VaultDepositWithdrawResponse> {
    const request = this.prepareVaultsPostRequest('lending/redeem', body);
    const lending = await lendingServiceRequest(request, this.getAccessToken()) as VaultDepositWithdrawResponse;
    fieldToBN(lending, 'amount');
    fieldToDate(lending, 'updatedAt');
    fieldToDate(lending, 'createdAt');
    return lending;
  }

  /**
   * Send deposit
   */
  async allocateLending(body: VaultDepositWithdrawPayload): Promise<VaultDepositWithdrawResponse> {
    const request = this.prepareVaultsPostRequest('lending/allocate', body);
    const lending = await lendingServiceRequest(request, this.getAccessToken()) as VaultDepositWithdrawResponse;
    fieldToBN(lending, 'amount');
    fieldToDate(lending, 'updatedAt');
    fieldToDate(lending, 'createdAt');
    return lending;
  }
}

export interface LendingService extends SdkService { }
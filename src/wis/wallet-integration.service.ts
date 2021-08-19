import debugFactory from "debug";
import axios, { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";
import {
  Transaction,
  TransactionPagedFilter,
  TransactionPagedHistory,
} from "./interfaces/transaction.interface";
import { TransactionDto } from "./dto/transaction.dto";

const debug = debugFactory("ClientSDK:WalletIntegrationService");

export interface SchemaItem {
  id: string;
  title: string;
  schema: string;
  form: any;
}

export interface GetSchemaResponseDto {
  success: boolean;
  schemas: SchemaItem[];
}

export interface PaymentRouteDto {
  product_id: string;
  exchange_id: string;
  psp_service_id: string;
  withdraw_enabled: boolean;
  deposit_enabled: boolean;
  require_2fa: boolean;
  require_2fa_deposit: boolean;
  require_2fa_withdraw: boolean;
  require_idm_deposit: boolean;
  require_idm_withdraw: boolean;
}

export interface DepositOptionsDto {
  deposit_limit_check: boolean;
  min_amount: number;
  flat_fee: number;
  progressive_fee: number;
  daily_limit: number;
  weekly_limit: number;
  monthly_limit: number;
  psp: SchemaItem[];
}

export interface WithdrawOptionsDto {
  min_amount: number;
  flat_fee: number;
  progressive_fee: number;
  daily_limit: number;
  weekly_limit: number;
  monthly_limit: number;
  psp: SchemaItem[];
}

export interface PaymentOptionsDto {
  success: boolean;
  deposit: DepositOptionsDto;
  withdraw: WithdrawOptionsDto;
}

export class WalletIntegrationServiceError extends Error {}

export async function walletIntegrationServiceRequest(
  request: AxiosRequestConfig
) {
  try {
    debug("REQUEST", request);
    const response = (await axios(request)).data;
    debug("RESPONSE", response);
    return response;
  } catch (error) {
    debug("ERROR", error.message);
    throw new WalletIntegrationServiceError(
      error.response?.data?.message || error.message
    );
  }
}

export class WalletIntegrationService {
  /**
   * Create withdraw request on Wallet Integration Service
   * @param product
   * @param amount
   * @param address
   * @param schemaName
   * @param schemaData
   * @param code
   */
  async createWithdraw(
    product: string,
    amount: number,
    address?: string,
    schemaName?: string,
    schemaData?: any,
    code?: string,
    psp?: string,
    webhookUrl?: string
  ): Promise<Transaction> {
    const trx = (await walletIntegrationServiceRequest({
      url: `${this.config.wis_api_url}/withdraw/create`,
      method: "post",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      data: {
        exchange: this.exchange,
        product,
        amount,
        address,
        code,
        schemaName,
        schemaData,
        psp,
        webhook_url: webhookUrl,
      },
    })) as TransactionDto;
    return this.getWalletTransaction(trx.txid, trx.state_hash, 5);
  }

  /**
   * Create deposit request on Wallet Integration Service
   * @param product
   * @param amount
   * @param schemaName
   * @param schemaData
   * @param code
   */
  async createDeposit(
    product: string,
    amount: number,
    schemaName?: string,
    schemaData?: any,
    code?: string,
    psp?: string,
    webhookUrl?: string
  ): Promise<Transaction> {
    const trx = (await walletIntegrationServiceRequest({
      url: `${this.config.wis_api_url}/deposit/create`,
      method: "post",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      data: {
        exchange: this.exchange,
        product,
        amount,
        code,
        schemaName,
        schemaData,
        psp,
        webhook_url: webhookUrl,
      },
    })) as TransactionDto;

    return this.getWalletTransaction(trx.txid, trx.state_hash, 5);
  }

  /**
   * Get wallet transaction by id
   * @param txid
   * @param state_hash
   * @param timeout
   */
  getWalletTransaction(
    txid: string,
    state_hash?: string,
    timeout?: number
  ): Promise<Transaction> {
    return walletIntegrationServiceRequest({
      url: `${this.config.wis_api_url}/transaction/status`,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      method: "get",
      params: {
        txid,
        state_hash,
        timeout,
      },
    });
  }

  /**
   * Get transaction paged history
   * @param filter
   */
  async getWalletTransactionHistory(
    filter: TransactionPagedFilter
  ): Promise<TransactionPagedHistory> {
    return walletIntegrationServiceRequest({
      url: `${this.config.wis_api_url}/transaction/history`,
      method: "get",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        exchange: this.exchange,
        status: filter.filter?.status,
        type: filter.filter?.type,
        product: filter.filter?.product,
        address: filter.filter?.address,
        message: filter.filter?.message,
        pager_limit: filter.pager?.limit,
        pager_offset: filter.pager?.offset,
        sort_prop: filter.sort?.field,
        sort_dir: filter.sort?.direction.toUpperCase(),
      },
    });
  }

  /**
   * Get schemas
   * @param product
   * @param type
   */
  async getSchemas(product: string, type: "deposit" | "withdraw") {
    const response = (await walletIntegrationServiceRequest({
      url: `${this.config.wis_api_url}/${type}/schema`,
      method: "get",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        exchange: this.exchange,
        product,
      },
    })) as GetSchemaResponseDto;
    return response.schemas;
  }

  /**
   * Get payment options
   */
  async getPaymentRoutes(all?: boolean, is_development?: boolean) {
    const response = (await walletIntegrationServiceRequest({
      url: `${this.config.wis_api_url}/payment/routes`,
      method: "get",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        exchange: this.exchange,
        all: all ? "1" : "",
        is_development: is_development ? "1" : "",
      },
    })) as PaymentRouteDto[];
    return response;
  }

  /**
   * Get payment options
   */
  async getPaymentOptions(product: string, psp?: string) {
    const response = (await walletIntegrationServiceRequest({
      url: `${this.config.wis_api_url}/payment/options`,
      method: "get",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        exchange: this.exchange,
        product: product,
        psp: psp,
      },
    })) as PaymentOptionsDto;
    return response;
  }
}
export interface WalletIntegrationService extends SdkService {}

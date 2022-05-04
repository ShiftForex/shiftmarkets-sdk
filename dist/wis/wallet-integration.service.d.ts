import { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";
import { Transaction, TransactionPagedFilter, TransactionPagedHistory, CreateTransactionData } from "./interfaces/transaction.interface";
export interface SchemaItem {
    id: string;
    title: string;
    schema: string;
    form: any;
}
export interface HeadersItem {
    [key: string]: string;
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
export declare class WalletIntegrationServiceError extends Error {
}
export declare function walletIntegrationServiceRequest(request: AxiosRequestConfig): Promise<any>;
export declare class WalletIntegrationService {
    /**
     * Create withdraw request on Wallet Integration Service
     * @param data
     * @param additionalHeaders
     */
    createWithdraw(data: CreateTransactionData, additionalHeaders?: HeadersItem): Promise<Transaction>;
    /**
     * Create deposit request on Wallet Integration Service
     * @param data
     * @param additionalHeaders
     */
    createDeposit(data: CreateTransactionData, additionalHeaders?: HeadersItem): Promise<Transaction>;
    /**
     * Get wallet transaction by id
     * @param txid
     * @param state_hash
     * @param timeout
     */
    getWalletTransaction(txid: string, state_hash?: string, timeout?: number): Promise<Transaction>;
    /**
     * Get transaction paged history
     * @param filter
     */
    getWalletTransactionHistory(filter: TransactionPagedFilter): Promise<TransactionPagedHistory>;
    /**
     * Get schemas
     * @param product
     * @param type
     */
    getSchemas(product: string, type: "deposit" | "withdraw"): Promise<SchemaItem[]>;
    /**
     * Get payment options
     */
    getPaymentRoutes(all?: boolean, is_development?: boolean): Promise<PaymentRouteDto[]>;
    /**
     * Get payment options
     */
    getPaymentOptions(product: string, psp?: string): Promise<PaymentOptionsDto>;
}
export interface WalletIntegrationService extends SdkService {
}

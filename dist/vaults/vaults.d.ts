import { SdkService } from "../common/sdk.service";
import { VaultDepositWithdrawPayload, VaultHistory, VaultBalance, VaultProduct, VaultPendingTransaction, VaultDepositWithdrawResponse, VaultPendingTransactionQuery, VaultHistoryQuery, VaultBalancesQuery, VaultProductsQuery, LendingTicketsQuery, LendingTicket, UpdateVaultProductQuery, CreateVaultProductQuery } from "./interfaces";
export declare class LendingServiceError extends Error {
}
export declare class LendingService extends SdkService {
    prepareGetRequest(url: string, params: any): {
        timeout: number;
        method: "GET";
        url: string;
        params: any;
    };
    preparePostRequest(url: string, body?: any, method?: "POST" | "PUT"): {
        method: "POST" | "PUT";
        url: string;
        timeout: number;
        data: any;
    };
    getLendingTickets(params?: LendingTicketsQuery): Promise<LendingTicket[]>;
    /**
     * Get lending products
     */
    getLendingProducts(params?: VaultProductsQuery): Promise<VaultProduct[]>;
    /**
     * Create product
     */
    createLendingProduct(body: CreateVaultProductQuery): Promise<VaultProduct>;
    /**
     * Update product
     */
    updateLendingProduct(productId: string, body?: UpdateVaultProductQuery): Promise<VaultProduct>;
    /**
     * Get lending balances
     */
    getLendingBalances(params?: VaultBalancesQuery): Promise<VaultBalance[]>;
    /**
     * Get lending history
     */
    getLendingHistory(params?: VaultHistoryQuery): Promise<VaultHistory[]>;
    /**
     * Get lending pending-transaction
     */
    getLendingPendingTransactions(params?: VaultPendingTransactionQuery): Promise<VaultPendingTransaction[]>;
    /**
     * Send withdraw
     */
    redeemLending(body: VaultDepositWithdrawPayload): Promise<VaultDepositWithdrawResponse>;
    /**
     * Send deposit
     */
    allocateLending(body: VaultDepositWithdrawPayload): Promise<VaultDepositWithdrawResponse>;
}
export interface LendingService extends SdkService {
}

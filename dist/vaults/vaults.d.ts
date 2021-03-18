import { SdkService } from "../common/sdk.service";
import { VaultDepositWithdrawPayload, VaultHistory, VaultBalance, VaultProduct, VaultPendingTransaction, VaultDepositWithdrawResponse, VaultPendingTransactionQuery, VaultHistoryQuery, VaultBalancesQuery, VaultProductsQuery } from "./interfaces";
export declare class LendingServiceError extends Error {
}
export declare class LendingService extends SdkService {
    /**
     * Get lending products
     */
    getLendingProducts(params?: VaultProductsQuery): Promise<VaultProduct[]>;
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

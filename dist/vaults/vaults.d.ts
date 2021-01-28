import { SdkService } from "../common/sdk.service";
import { VaultDepositWithdrawPayload, VaultHistory, VaultBalance, VaultProduct, VaultDepositWithdrawResponse } from "./interfaces";
export declare class LendingServiceError extends Error {
}
export declare class LendingService extends SdkService {
    /**
     * Get lending products
     */
    getLendingProducts(): Promise<VaultProduct[]>;
    /**
     * Get lending balances
     */
    getLendingBalances(): Promise<VaultBalance[]>;
    /**
     * Get lending balances
     */
    getLendingHistory(): Promise<VaultHistory[]>;
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

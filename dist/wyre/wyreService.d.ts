import { SdkService } from "../common/sdk.service";
import { CreateDepositDto, WalletOrderUpdateDto } from "./interfaces";
export declare class WyreServiceError extends Error {
}
export declare class WyreService extends SdkService {
    prepareGetRequest(url: string, params: any): {
        url: string;
        params: any;
        timeout: number;
        method: "GET";
    };
    preparePostRequest(url: string, body?: any, method?: "POST" | "PUT"): {
        method: "POST" | "PUT";
        url: string;
        timeout: number;
        data: any;
    };
    getTransactionSchemas(params: any): Promise<any>;
    createWyreDeposit(body: CreateDepositDto): Promise<any>;
    walletOrderCallback(body: WalletOrderUpdateDto): Promise<any>;
}

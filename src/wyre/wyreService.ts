import debugFactory from "debug";
import axios, { AxiosRequestConfig } from "axios";
import { SdkService } from "../common/sdk.service";
import { CreateDepositDto, WalletOrderUpdateDto } from "./interfaces";

const debug = debugFactory("ClientSDK:WyreService");
export class WyreServiceError extends Error { }

async function wyreServiceRequest(request: AxiosRequestConfig, token?: string) {
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
        throw new WyreServiceError(
            error.response?.data?.message || error.message
        );
    }
}

export class WyreService extends SdkService {
    prepareGetRequest(url: string, params: any) {
        return {
            url: `${this.config.wyre_api_url}/${url}`,
            params: { exchange: this.exchange, ...params },
            timeout: 15000,
            method: "GET" as "GET",
        }
    }

    preparePostRequest(url: string, body: any = {}, method = "POST" as "POST" | "PUT") {
        return {
            method,
            url: `${this.config.wyre_api_url}/${url}`,
            timeout: 15000,
            data: { ...body, exchange: this.exchange },
        }
    }

    async getTransactionSchemas(params: any): Promise<any> {
        const request = this.prepareGetRequest(`transaction/schemas`, params);
        return await wyreServiceRequest(request, this.accessToken) as any;
    }

    async createWyreDeposit(body: CreateDepositDto): Promise<any> {
        const request = this.preparePostRequest(`deposit/create`, body);
        return await wyreServiceRequest(request, this.accessToken) as any;
    }

    async walletOrderCallback(body: WalletOrderUpdateDto): Promise<any> {
        const request = this.preparePostRequest(`wallet-order-callback`, body);
        return await wyreServiceRequest(request, this.accessToken) as any;
    }
}

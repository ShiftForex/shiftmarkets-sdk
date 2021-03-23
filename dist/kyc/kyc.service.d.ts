import { AxiosRequestConfig } from "axios";
import { SchemaConstants, UserProfilePayload, UpdateProfileResponse, SubmitAgreementDto, ProviderResponseObject, KycSummary } from "./interfaces";
export declare class KycServiceError extends Error {
    data?: object | undefined;
    constructor(message?: string, data?: object | undefined);
}
export declare function kycServiceRequest(request: AxiosRequestConfig): Promise<any>;
export declare class KycService {
    [x: string]: any;
    getConstants(): Promise<SchemaConstants>;
    getMinimalProfileSchema(): Promise<any>;
    getExtendedProfileSchema(userType: 'personal' | 'company', extra?: string, isUpdate?: boolean, provider?: string): Promise<any>;
    updateUserProfile(payload: UserProfilePayload, userType: 'personal' | 'company', isUpdate?: boolean): Promise<UpdateProfileResponse>;
    submitAgreementSignature(payload: SubmitAgreementDto): Promise<ProviderResponseObject>;
    getKycSummary(provider?: string): Promise<KycSummary>;
}

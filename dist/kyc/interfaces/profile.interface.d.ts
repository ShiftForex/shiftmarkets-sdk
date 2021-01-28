export interface KycSummary {
    provider: string;
    provider_user_id: string;
    exchange_user_id: string;
    client_user_id: string;
    exchange_kyc_status: string;
    current_tier: number;
    organization_structure: ExchangeOrgStructure[];
    profile: any;
    message: string;
}
export interface ExchangeOrgStructure {
    orgUnitType: string;
    orgUnitName: string;
    orgUnitId: string;
}
export interface UpdateProfileResponse {
    allSuccess: boolean;
    successfulResponses: ProviderResponseObject[];
    responsesWithError: ProviderResponseObject[];
}
export interface ProviderResponseObject {
    statusCode: number;
    errorMsg: string;
    callback_uuid: string;
    serviceResponse: any;
}

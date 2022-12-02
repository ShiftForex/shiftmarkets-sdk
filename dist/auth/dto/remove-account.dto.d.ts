export declare enum PreferedMfaSettings {
    TwoFaCode = "SOFTWARE_TOKEN_MFA"
}
export interface RemoveAccountDto {
    twoFaCode: string;
    twoFAMethod: PreferedMfaSettings;
}

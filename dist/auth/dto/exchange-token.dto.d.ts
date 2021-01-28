export interface ExchangeTokenDto {
    result: string;
    message: string;
    user_id: string;
    client_user_id: string;
    username: string;
    client_username: string;
    exchange_access_token: string;
    exchange_refresh_token: string;
    expires_in: number;
    client_access_token: string;
    client_refresh_token: string;
}

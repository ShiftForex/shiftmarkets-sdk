export interface RefreshAccessTokenDto {
  result: boolean;
  message: string;
  exchange_access_token: string;
  exchange_refresh_token: string;
  expires_in: number;
  client_access_token: string;
  client_refresh_token: string;
}

export interface Currency {
  id: string;
  name: string;
  type: "crypto" | "fiat";
  precision: number;

  available_for_deposit?: string;
  deposit_commission_progressive?: string;
  deposit_commission_flat?: string;
  daily_deposit_limit?: string;
  weekly_deposit_limit?: string;
  monthly_deposit_limit?: string;

  available_for_withdrawal?: string;
  monthly_withdrawal_limit?: string;
  withdrawal_commission_progressive?: string;
  withdrawal_commission_flat?: string;

  daily_withdrawal_limit?: string;
  weekly_withdrawal_limit?: string;
  montly_withdrawal_limit?: string;
  minimal_withdrawal?: string;
}

export interface CurrenciesDto {
  currencies: Currency[];
}

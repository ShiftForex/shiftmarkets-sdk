import { SDKv2 } from "../src";

async function onAppReady() {
  const sdk = new SDKv2(
    process.env.SDK_EXCHANGE || "",
    process.env.SDK_ENVIRONMENT || ""
  );

  const tokens = await sdk.login(
    process.env.SDK_USERNAME || "",
    process.env.SDK_PASSWORD || ""
  );
  sdk.accessToken = tokens.client_access_token;

  // Get all (including non default) routes
  const routes = await sdk.getPaymentRoutes(true);
  console.log("ROUTES", routes);
  // Get payment options for non default route
  const paymentOptions = await sdk.getPaymentOptions("BCH", "TEST");
  console.log("PAYMENT_OPTIONS", paymentOptions);
}

onAppReady();

/* OUTPUT
ROUTES [
  {
    product_id: 'BCH',
    exchange_id: 'DEMO',
    psp_service_id: 'TEST',
    withdraw_enabled: true,
    deposit_enabled: true,
    require_2fa: true,
    require_2fa_deposit: false,
    require_2fa_withdraw: true,
    require_idm_deposit: false,
    require_idm_withdraw: false
  },
  {
    product_id: 'BTC',
    exchange_id: 'DEMO',
    psp_service_id: 'BITGO',
    withdraw_enabled: true,
    deposit_enabled: true,
    require_2fa: false,
    require_2fa_deposit: false,
    require_2fa_withdraw: false,
    require_idm_deposit: false,
    require_idm_withdraw: false
  },
  {
    product_id: 'CAD',
    exchange_id: 'DEMO',
    psp_service_id: 'DELTIX',
    withdraw_enabled: true,
    deposit_enabled: true,
    require_2fa: false,
    require_2fa_deposit: false,
    require_2fa_withdraw: false,
    require_idm_deposit: false,
    require_idm_withdraw: false
  },
  {
    product_id: 'ETH',
    exchange_id: 'DEMO',
    psp_service_id: 'NEXINTER',
    withdraw_enabled: true,
    deposit_enabled: true,
    require_2fa: false,
    require_2fa_deposit: false,
    require_2fa_withdraw: false,
    require_idm_deposit: false,
    require_idm_withdraw: false
  },
  {
    product_id: 'EUR',
    exchange_id: 'DEMO',
    psp_service_id: 'DELTIX',
    withdraw_enabled: true,
    deposit_enabled: true,
    require_2fa: false,
    require_2fa_deposit: false,
    require_2fa_withdraw: false,
    require_idm_deposit: false,
    require_idm_withdraw: false
  },
  {
    product_id: 'GBP',
    exchange_id: 'DEMO',
    psp_service_id: 'DELTIX',
    withdraw_enabled: true,
    deposit_enabled: true,
    require_2fa: false,
    require_2fa_deposit: false,
    require_2fa_withdraw: false,
    require_idm_deposit: false,
    require_idm_withdraw: false
  },
  {
    product_id: 'JPY',
    exchange_id: 'DEMO',
    psp_service_id: 'DELTIX',
    withdraw_enabled: true,
    deposit_enabled: true,
    require_2fa: false,
    require_2fa_deposit: false,
    require_2fa_withdraw: false,
    require_idm_deposit: false,
    require_idm_withdraw: false
  },
  {
    product_id: 'LTC',
    exchange_id: 'DEMO',
    psp_service_id: 'TEST',
    withdraw_enabled: true,
    deposit_enabled: true,
    require_2fa: false,
    require_2fa_deposit: false,
    require_2fa_withdraw: false,
    require_idm_deposit: false,
    require_idm_withdraw: false
  },
  {
    product_id: 'USD',
    exchange_id: 'DEMO',
    psp_service_id: 'DELTIX',
    withdraw_enabled: true,
    deposit_enabled: true,
    require_2fa: false,
    require_2fa_deposit: false,
    require_2fa_withdraw: false,
    require_idm_deposit: false,
    require_idm_withdraw: false
  },
  {
    product_id: 'USDT',
    exchange_id: 'DEMO',
    psp_service_id: 'OTC365',
    withdraw_enabled: true,
    deposit_enabled: true,
    require_2fa: false,
    require_2fa_deposit: false,
    require_2fa_withdraw: false,
    require_idm_deposit: false,
    require_idm_withdraw: false
  },
  {
    product_id: 'XLM',
    exchange_id: 'DEMO',
    psp_service_id: 'TEST',
    withdraw_enabled: true,
    deposit_enabled: true,
    require_2fa: false,
    require_2fa_deposit: false,
    require_2fa_withdraw: false,
    require_idm_deposit: false,
    require_idm_withdraw: false
  },
  {
    product_id: 'XRP',
    exchange_id: 'DEMO',
    psp_service_id: 'TEST',
    withdraw_enabled: true,
    deposit_enabled: false,
    require_2fa: false,
    require_2fa_deposit: false,
    require_2fa_withdraw: false,
    require_idm_deposit: false,
    require_idm_withdraw: false
  }
]
PAYMENT_OPTIONS {
  success: true,
  deposit: {
    deposit_limit_check: false,
    min_amount: 0,
    flat_fee: 0,
    progressive_fee: 0,
    daily_limit: 1000000000,
    weekly_limit: 1000000000,
    monthly_limit: 1000000000,
    psp: []
  },
  withdraw: {
    min_amount: 0,
    flat_fee: 0,
    progressive_fee: 0,
    daily_limit: 1000000000,
    weekly_limit: 1000000000,
    monthly_limit: 1000000000,
    psp: []
  }
}
*/

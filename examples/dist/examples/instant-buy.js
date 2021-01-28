"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
(async () => {
    const btcAddress = "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy";
    const sdk = new src_1.SDKv2(process.env.SDK_EXCHANGE || "", process.env.SDK_ENVIRONMENT || "");
    const tokens = await sdk.login(process.env.SDK_USERNAME || "", process.env.SDK_PASSWORD || "");
    sdk.accessToken = tokens.client_access_token;
    const estimation = await sdk.estimateInstantBuy(400, "BTC", "USD");
    console.log("INSTANT_BUY_ESTIMATION", estimation);
    let instantBuy = await sdk.createInstantBuy({
        amount: 400,
        base_product: "BTC",
        quote_product: "USD",
        withdraw_address: btcAddress,
        schema_name: "name",
        schema_data: {},
    });
    console.log("INSTANT_BUY", instantBuy);
    while (instantBuy.status !== "deposit_pending" &&
        !instantBuy.status.endsWith("error")) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        instantBuy = await sdk.getInstantBuy(instantBuy.id);
    }
    if (instantBuy.status.endsWith("error"))
        throw new Error(instantBuy.message);
    console.log("INSTANT_BUY_DEPOSIT", instantBuy.deposit);
})();
/* OUTPUT
INSTANT_BUY_ESTIMATION {
  amountAfterDeposit: 400,
  baseQtyBeforeTrade: 0.0380775574160779,
  baseQtyAfterTrade: 0.03800902,
  amountAfterWithdraw: 0.03800902,
  availableQty: 1.07,
  availableQuoteQty: 11240.216785,
  vwap: { price: 10504.8755, volume: 1.07 },
  quoteProductFee: {
    message: null,
    withdrawalFlatFee: 0,
    withdrawalProgressiveFee: 0,
    depositFlatFee: 0,
    depositProgressiveFee: 0,
    dailyDepositLimit: 1000000000,
    dailyWithdrawalLimit: 1000000000,
    weeklyDepositLimit: 1000000000,
    weeklyWithdrawalLimit: 1000000000,
    monthlyDepositLimit: 1000000000,
    monthlyWithdrawalLimit: 1000000000,
    withdrawalMinAmount: 0
  },
  baseProductFee: {
    message: null,
    withdrawalFlatFee: 0,
    withdrawalProgressiveFee: 0,
    depositFlatFee: 0,
    depositProgressiveFee: 0,
    dailyDepositLimit: 1000000000,
    dailyWithdrawalLimit: 1000000000,
    weeklyDepositLimit: 1000000000,
    weeklyWithdrawalLimit: 1000000000,
    monthlyDepositLimit: 1000000000,
    monthlyWithdrawalLimit: 1000000000,
    withdrawalMinAmount: 0
  },
  instrument: {
    id: 'BTCUSD',
    name: 'BTCUSD',
    base_product: 'BTC',
    quote_product: 'USD',
    quantity_decimals: 8,
    quantity_increment: '0.0001',
    price_decimals: 6,
    available_destinations: [ 'SHIFTFX' ],
    min_quantity: 0.001,
    max_quantity: 10,
    type: 'crypto',
    tick_size: '0.00001',
    fees: { buy: [Object], sell: [Object] }
  }
}
INSTANT_BUY {
  id: 'e8dcff06-c5d1-42bf-85d8-06966f9edc7e',
  exchange_id: 'DEMO',
  instrument_id: 'BTCUSD',
  user_id: 'f4a26b49-9f07-4e81-ae0c-e6ff0da966df',
  deposit_product_id: 'USD',
  withdraw_product_id: 'BTC',
  withdraw_address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
  status: 'new',
  schema_name: 'any',
  schema_data: {},
  deposit_amount: 400,
  deposit: {},
  withdraw: {},
  estimate: {
    amountAfterDeposit: 400,
    baseQtyBeforeTrade: 0.0380775574160779,
    baseQtyAfterTrade: 0.03800902,
    amountAfterWithdraw: 0.03800902,
    availableQty: 1.07,
    availableQuoteQty: 11240.216785,
    vwap: { price: 10504.8755, volume: 1.07 },
    quoteProductFee: {
      message: null,
      withdrawalFlatFee: 0,
      withdrawalProgressiveFee: 0,
      depositFlatFee: 0,
      depositProgressiveFee: 0,
      dailyDepositLimit: 1000000000,
      dailyWithdrawalLimit: 1000000000,
      weeklyDepositLimit: 1000000000,
      weeklyWithdrawalLimit: 1000000000,
      monthlyDepositLimit: 1000000000,
      monthlyWithdrawalLimit: 1000000000,
      withdrawalMinAmount: 0
    },
    baseProductFee: {
      message: null,
      withdrawalFlatFee: 0,
      withdrawalProgressiveFee: 0,
      depositFlatFee: 0,
      depositProgressiveFee: 0,
      dailyDepositLimit: 1000000000,
      dailyWithdrawalLimit: 1000000000,
      weeklyDepositLimit: 1000000000,
      weeklyWithdrawalLimit: 1000000000,
      monthlyDepositLimit: 1000000000,
      monthlyWithdrawalLimit: 1000000000,
      withdrawalMinAmount: 0
    },
    instrument: {
      id: 'BTCUSD',
      name: 'BTCUSD',
      base_product: 'BTC',
      quote_product: 'USD',
      quantity_decimals: 8,
      quantity_increment: '0.0001',
      price_decimals: 6,
      available_destinations: [Array],
      min_quantity: 0.001,
      max_quantity: 10,
      type: 'crypto',
      tick_size: '0.00001',
      fees: [Object]
    }
  },
  created_at: '2020-09-22T13:42:55.516Z',
  updated_at: '2020-09-22T13:42:55.516Z',
  market_order_qc_id: null,
  message: null
}
*/

# Shift Client SDK

SDK for working with exchanges running on Shift Markets' Cointrader technology. Provides quick access to market data, trading, KYC, deposits & withdrawals, and more.

## Installation

```sh
npm install https://github.com/ShiftForex/shiftmarkets-sdk
```

## Getting Started

1. Clone the SDK `git clone https://github.com/ShiftForex/shiftmarkets-sdk.git`
2. Run `npm install`
3. You can optionally install ts-node globally to make it easier to run examples: `npm install -g ts-node`
4. In the code examples, environment variables are used to initiate the SDK and receive access tokens: `SDK_EXCHANGE`, `SDK_ENVIRONMENT`, `SDK_USERNAME`, `SDK_PASSWORD`
5. Navigate into the [examples](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples) directory to run TypeScript examples with ts-node. E.g.:  
```sh
cd examples/
ts-node get-settings.ts
```
6. Alternatively, if you're not running ts-node: compile the TypeScript code and navigate into [examples/dist/examples](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/dist/examples) to run examples with Node. E.g.:
```sh
npm run build-examples
cd examples/dist/examples/
node get-settings.js
```

## Overview of Code Examples

[Subscribe to user order updates, create a limit order, query for the order, and cancel the order](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/create-orders-and-subscribe-order-updates.ts)

[Get instruments and products available on given exchange](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-instruments-and-products.ts)

[Get KYC schema and submit an updated user profile](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-kyc-schema-and-update-profile.ts)

[Get summary of user KYC details](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-kyc-summary.ts)

[Get payment routes and get payment options for given product](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-payment-routes-and-options.ts)

[Get quote from RFQ system for given instrument and amount](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-rfq-quotes.ts)

[Set test user settings and query for settings](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-settings.ts)

[Query for wallet transactions using various filters](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-transactions.ts)

[Get webconfig for given exchange](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-webconfig.ts)

[Get instant buy estimate, create instant buy order, and query for the instant buy order](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/instant-buy.ts)

[Create quote currency market order and get market orders](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/market-order-qc.ts)

[Register and remove push tokens](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/register-remove-push-tokens.ts)

[Get deposit schema and create deposit](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/retrieve-schema-and-create-deposit.ts)

[Get deposit schema and create deposit for custom payment provider](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/retrieve-schema-and-create-deposit-custom-psp.ts)

[Get withdrawal schema and create withdrawal](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/retrieve-schema-and-create-withdraw.ts)

[Subscribe to bar updates and get historical bars](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/subscribe-bar-updates-and-get-historical-bars.ts)

[Subscribe to ticker and orderbook](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/subscribe-ticker-and-orderbook.ts)

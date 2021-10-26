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

## Code Examples

[Working with Orders](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/create-orders-and-subscribe-order-updates.ts): In this example, we authenticate with the SDK before subscribing to websocket order updates, placing a limit order, querying for the order, cancelling the order, and finally closing the websocket connection.

[Instruments and Products](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-instruments-and-products.ts): We initiate the SDK aginst a given exchange and authenticate, then get the instruments and products available on the exchange.

[Submitting KYC Data](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-kyc-schema-and-update-profile.ts): After authenticating, the example shows how to use the SDK to query for the KYC schema and submit updated KYC data.

[Getting KYC Data](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-kyc-summary.ts): In this example, we authenticate with the SDK before querying for a summary of the user's KYC details.

[Payment Routes and Options](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-payment-routes-and-options.ts): After authenticating, this example uses the SDK to get payment routes and payment options for a given product.

[Working with RFQ](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-rfq-quotes.ts): This example shows how to authenticate and use the SDK to get quotes from the Shift RFQ system for a given instrument and amount.

[Working with User Settings](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-settings.ts): After authenticating, the example shows how to use the SDK to set some mock user settings and query for the settings.

[Wallet Transaction History](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-transactions.ts): After authentication with the SDK, the example queries for user's wallet transactions using various filters.

[Getting Webconfig](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-webconfig.ts): After initiating the SDK against a given exchange, the example shows how to get the webconfig for that exchange. Authentication is not required for this endpoint.

[Instant Buy](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/instant-buy.ts): In this example, we authenticate then use the SDK to get an instant buy estimate, create an instant buy order, and query for the instant buy order.

[Quote Currency Market Order](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/market-order-qc.ts): We authenticate with the SDK, then create a quote currency market order using the BTCUSD instrument, and finally query for market orders using an example filter.

[Working with Deposits](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/retrieve-schema-and-create-deposit.ts): After authenticating, the example shows how to get the deposit schema for a given product and create a deposit.

[Working with Withdrawals](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/retrieve-schema-and-create-withdraw.ts): After authenticating, the example shows how to get the withdrawal schema for a given product and create a withdrawal.

[Historical and Current Bars](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/subscribe-bar-updates-and-get-historical-bars.ts): This example shows how to use the SDK to get historical bars and subscribe to bar updates, before finally unsubscribing. Authentication is not required for these endpoints.

[Tickers and Orderbooks](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/subscribe-ticker-and-orderbook.ts): In this example, we show how to initiate the SDK against an exchange, then subscribe to a given instrument's ticker and orderbook websocket updates, before unsubscribing after 30 seconds. Authentication is not required for these endpoints.

[Vault transactions](https://github.com/ShiftForex/shiftmarkets-sdk/blob/master/examples/get-vault-transactions.ts): This example shows how to get accrual fees for NXL owner

# Shift Client SDK

## Installation

**IMPORTANT: you should have .npmrc file next to package.json with your personal access token**

.npmrc file content:

    //npm.pkg.github.com/:_authToken={YOUR_GITHUB_ACCESS_TOKEN}
    @shiftforex:registry=https://npm.pkg.github.com

Change _{YOUR_GITHUB_ACCESS_TOKEN}_ to your token generated in [Developer settings](https://github.com/settings/tokens)

``` sh
npm i @shiftforex/client-sdkv2
```

## Code examples

[Create orders and subscribe order updates](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/create-orders-and-subscribe-order-updates.ts)

[CSV export](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/csv-export.ts)

[Get instruments and products](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/get-instruments-and-products.ts)

[Get KYC schema and update user profile](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/get-kyc-schema-and-update-profile.ts)

[Get KYC summary](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/get-kyc-summary.ts)

[Get payment routes and options](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/get-payment-routes-and-options.ts)

[Get RFQ quotes](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/get-rfq-quotes.ts)

[Get transactions](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/get-transactions.ts)

[Instant buy](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/instant-buy.ts)

[Market quote currency order](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/market-order-qc.ts)

[Retrieve schema and create deposit](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/retrieve-schema-and-create-deposit.ts)

[Retrieve schema and create withdraw](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/retrieve-schema-and-create-withdraw.ts)

[Subscribe bar updates and get historical bars](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/subscribe-bar-updates-and-get-historical-bars.ts)

[Subscribe ticker and orderbook](https://github.com/ShiftForex/shift-markets-sdk/blob/master/examples/subscribe-ticker-and-orderbook.ts)
